let isForm = false;

const addBeerButton = document.getElementById("new-beer-btn");
const formContainer = document.querySelector(".container");
const popUpBox = document.querySelector(".hover_bkgr_fricc");
const popupCloseButton = document.querySelector(".popupCloseButton");
const keyData = document.querySelector("#keyData");

const fetchBeers = (callback) => {
  fetch(`https://api.punkapi.com/v2/beers`)
    .then((data) => data.json())
    .then((beers) => callback(beers));
};

addBeerButton.addEventListener("click", () => {
  isForm = !isForm;

  if (!isForm) formContainer.style.display = "none";

  if (isForm) formContainer.style.display = "block";
});


formContainer.addEventListener('submit', (event) =>
{
    event.preventDefault();
    let newBeer = {};
    newBeer.name = document.getElementById('1').value;
    newBeer.image_url = document.getElementById('2').value;
    newBeer.tagline = document.getElementById('3').value;
    renderCards([newBeer]);
})

const mainDiv = document.getElementById('beer-collection');

const renderCards = (beers) =>
{
    //im sorry
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

   
    div.append(h4, img, p, btn);
    mainDiv.append(div);
    // console.log("LOGGING: \n")
    // console.log(beer.name + '\n')
    // console.log(beer.image_url + '\n')

    //populate key info when image is clicked
    const renderKeyData = () => {
      //pop up textbox that displays key data

      popUpBox.style.display = "inline";
      const data = document.createElement("h2");
      const beerName = document.createElement("h2");
      const abv = document.createElement("h3");
      const ibu = document.createElement("h3");
      const description = document.createElement("p");
      const popupCloseButton = document.createElement('div')

      data.textContent = `KEY DATA`;
      beerName.textContent = beer.name;
      abv.textContent = `ABV: ` + beer.abv;
      ibu.textContent = `IBU: ` + beer.ibu;
      description.textContent = `Description: ` + beer.description;
    //   popupCloseButton.textContent = '&times;'

      data.style["text-decoration"] = "underline";
      popupCloseButton.className = 'popupCloseButton'

      keyData.append( data, beerName, abv, ibu, description );

    }
    
    img.addEventListener("click", renderKeyData);

    //closes the popup box when its clicked

    const closePopUpBox = () => {
      popUpBox.style.display = "none";
      keyData.replaceChildren()
    };
    popupCloseButton.addEventListener("click", closePopUpBox);

    div.append(h4,img,p,btn);
    mainDiv.append(div);
    })
}

const createObjectOfBeerAttributeValues = (data) =>
{
    let beerAttributes = {abv: [], ibu: [], name: [], hop: [], ph: [], yeast: []};
    data.forEach((beer) => {beerAttributes.abv.push(beer.abv)
    beerAttributes.ibu.push(beer.ibu)
    beerAttributes.name.push(beer.name)
    beerAttributes.hop.push(beer.hop)
    beerAttributes.ph.push(beer.ph)
    beerAttributes.yeast.push(beer.ingredients.yeast)
    });
    beerAttributes.abv.sort();
    beerAttributes.ibu.sort();
    beerAttributes.name.sort();
    beerAttributes.hop.sort();
    beerAttributes.ph.sort();
    beerAttributes.yeast.sort();
    populateDropdown(beerAttributes);
}
const populateDropdown = (obj) =>
{
    obj.abv.forEach(value => {
        let option = document.createElement('option');
        option.innerHTML = value;
        document.getElementById('abv').append(option);
    })
    obj.ibu.forEach(value => {
        let option = document.createElement('option');
        option.innerHTML = value;
        document.getElementById('ibu').append(option);
    })
    obj.name.forEach(value => {
        let option = document.createElement('option');
        option.innerHTML = value;
        document.getElementById('name').append(option);
    })
    obj.hop.forEach(value => {
        let option = document.createElement('option');
        option.innerHTML = value;
        document.getElementById('hop').append(option);
    })
    obj.ph.forEach(value => {
        let option = document.createElement('option');
        option.innerHTML = value;
        document.getElementById('ph').append(option);
    })
    obj.yeast.forEach(value => {
        let option = document.createElement('option');
        option.innerHTML = value;
        document.getElementById('yeast').append(option);
    })
    console.log(obj)
}

fetchBeers(renderCards);
fetchBeers(createObjectOfBeerAttributeValues);





