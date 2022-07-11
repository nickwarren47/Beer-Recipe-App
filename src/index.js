let isForm = false;

const addBeerButton = document.getElementById('new-beer-btn');
const formContainer = document.querySelector('.container');

let beerArr = [];

const fetchBeers = (callback) =>
{
    fetch(`https://api.punkapi.com/v2/beers`)
    .then(data =>  data.json())
    .then(beers => callback(beers));
}

addBeerButton.addEventListener('click', () => 
{
    isForm = !isForm;

    if(!isForm)
        formContainer.style.display = "none";

    if(isForm)
        formContainer.style.display = "block";
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
    p.innerHTML = beer.tagline;

    div.append(h4,img,p,btn);
    mainDiv.append(div);
    })
}
const populateArray = (data) =>
{
    data.forEach(beer =>{
        beerArr.push(beer);
    })
    console.log(beerArr)
}
let beerAttributes = {abv: [], ibu: [], name: [],}
const createObjectOfBeerAttributeValues = (array,callback) =>
{
    for(let index in array)
    {
    let beerObj = array[index]
    for(let key in beerObj) {
        if(key !== 'id' && key !== 'image_url'&& key !== 'description'&& key !== 'tagline')
        {
            let objAtkey = beerObj[key];
            callback(objAtKey);
        }
        }
    }
}
const attributeDropDown = () =>
{
    
}
fetchBeers(populateArray);
createObjectOfBeerAttributeValues(beerArr)
fetchBeers(renderCards);

