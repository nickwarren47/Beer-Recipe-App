let isForm = false;

const addBeerButton = document.getElementById('new-beer-btn');
const formContainer = document.querySelector('.container');

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
    h4.innerHTML = beer.name;
    img.src = beer.image_url;
    p.innerHTML = beer.tagline;
    btn.id = 'upvote'
    div.append(h4,img,p,btn);
    mainDiv.append(div);
    console.log("LOGGING: \n")
    console.log(beer.name + '\n')
    console.log(beer.image_url + '\n')
    })
}

fetchBeers(renderCards);

