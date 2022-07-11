const fetchBeers = (callback) => {
  fetch(`https://api.punkapi.com/v2/beers`)
    .then((data) => data.json())
    .then((beers) => callback(beers));
};

const initListeners = () =>
{
    const addBeerButton = document.getElementById("new-beer-btn");
    const formContainer = document.querySelector(".add-beer-form");
    const inputDiv = document.querySelector(".container")
    let isForm = false;

    addBeerButton.addEventListener("click", () => {
        isForm = !isForm;
      
        if (!isForm) inputDiv.style.display = "none";
      
        if (isForm) inputDiv.style.display = "block";
      });
      

    formContainer.addEventListener('submit', (event) =>
    {
        event.preventDefault();
        let newBeer = {};
        newBeer.name = document.getElementById('1').value;
        newBeer.image_url = document.getElementById('2').value;
        newBeer.tagline = document.getElementById('3').value;
        newBeer.ingredients = []
        newBeer.ingredients['hops'] = ['n/a']
        renderCards([newBeer]);
    })

}

const detailCards = beer =>
{
    const popUpBox = document.querySelector(".hover_bkgr_fricc");
    const keyData = document.getElementById('keyData');

    popUpBox.style.display = "inline";

    keyData.style.display = "inline-block"
    const data = document.createElement("h2");
    const beerName = document.createElement("h2");
    const abv = document.createElement("h3");
    const ibu = document.createElement("h3");
    const description = document.createElement("p");
    const closeButtonContainer = document.getElementById('popupCloseButton');

    data.textContent = `KEY DATA`;
    beerName.textContent = beer.name;
    abv.textContent = `ABV: ` + beer.abv;
    ibu.textContent = `IBU: ` + beer.ibu;
    description.textContent = `Description: ` + beer.description;

    data.style["text-decoration"] = "underline";
    closeButtonContainer.className = 'popupCloseButton'

    newdiv = document.createElement('div');
    newdiv.id = 'infobox'
    newdiv.append( data, beerName, abv, ibu, description);
    keyData.append(newdiv);
    
    closeButtonContainer.addEventListener("click", () => 
    {
        keyData.style.display = "none";
        popUpBox.style.display = "none";
        newdiv.innerHTML = '';
    })
}

const renderCards = (beers) =>
{
    const mainDiv = document.getElementById('beer-collection');

    beers.forEach(beer => {
    const div = document.createElement('div');
    const h4 = document.createElement('h2');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const btn = document.createElement('button');

    div.style.display = "inline-grid"
    div.style.width = '250px'
    div.classname = 'card'

    btn.classname = 'like-btn'
    btn.textContent = '↑upvote↑';
    btn.id = 'upvote'

    h4.innerHTML = beer.name;

    img.src = beer.image_url;
    img.id = "productImage";
    p.innerHTML = beer.tagline;

    img.addEventListener("click", (event) => 
    {
        if(event)detailCards(beer)
    });

    div.append(h4, img, p, btn);
    mainDiv.append(div);
    })
    createObjectOfBeerAttributeValues(beers)
}

const createObjectOfBeerAttributeValues = (beers) =>
{
    let beerAttributes = {abv: [], ibu: [], name: [], hop: [], ph: [], yeast: []};

    beers.forEach((beer) => 
    {
    beerAttributes.abv.push(beer.abv)
    beerAttributes.ibu.push(beer.ibu)
    beerAttributes.name.push(beer.name)

    beer.ingredients.hops.forEach(id =>
    {
        beerAttributes.hop.push(id.name);
    })

    beerAttributes.ph.push(beer.ph)
    beerAttributes.yeast.push(beer.ingredients.yeast)
    });

    beerAttributes.abv.sort((a,b) => a-b);
    beerAttributes.ibu.sort((a,b) => a-b);
    beerAttributes.name.sort();
    beerAttributes.hop.sort();
    beerAttributes.ph.sort((a,b) => a-b);
    beerAttributes.yeast.sort();

    populateDropdown(beerAttributes);
}
const filterBeersFromDropdownByAttribute = (attribute) => 
{
    
}
const populateDropdown = (obj) =>
{
    let memory;
    const filterDropdown = (key) =>
    {
        obj[key].forEach(value =>
        {
            if(memory!==value){
            let option = document.createElement('option');
            option.innerHTML = value;
            document.getElementById(`${key}`).append(option);
            }
            memory = value;
        })
        memory = undefined;
    }
    let keys = Object.keys(obj);
    keys.forEach(key => filterDropdown(key));
}



//On page load
window.onload = () => 
{
initListeners();
fetchBeers(renderCards);
}