const fetchBeers = (callback, param = "beers") => {
  fetch(`https://api.punkapi.com/v2/${param}`)
    .then((data) => data.json())
    .then((beers) => callback(beers))
    .then(console.log("searching with param: ", param));
};

const initListeners = () => {
  const addBeerButton = document.getElementById("new-beer-btn");
  const formContainer = document.querySelector(".add-beer-form");
  const inputDiv = document.querySelector(".container");
  const forwardButton = document.getElementById("page-forward");
  const filterForm = document.getElementById("beer-filter");
  const mainDiv = document.getElementById("beer-collection");
  const header = document.getElementById("beer-story");
  let isForm = false;

  header.addEventListener("click", () => {
    window.location.replace("http://127.0.0.1:5500/index.html");
  })
  
  addBeerButton.addEventListener("click", () => {
    isForm = !isForm;

    if (!isForm) inputDiv.style.display = "none";

    if (isForm) inputDiv.style.display = "block";
  });

  formContainer.addEventListener("submit", (event) => {
    event.preventDefault();
    let newBeer = {};
    newBeer.name = document.getElementById("1").value;
    newBeer.image_url = document.getElementById("2").value;
    newBeer.tagline = document.getElementById("3").value;
    newBeer.ingredients = [];
    newBeer.ingredients["hops"] = ["n/a"];
    renderCards([newBeer]);
  });

  let pageNumber = 1;
  let param = "";

  forwardButton.addEventListener("click", () => {
    if(param)
    {
        pageNumber++;
        param = "&" + param;
        mainDiv.innerHTML = "";
        fetchBeers(renderCards, `beers?page=${pageNumber}${param}`)
    }
    else
    {
        pageNumber++;
        mainDiv.innerHTML = "";
        fetchBeers(renderCards, `beers?page=${pageNumber}`);
        window.scrollTo(0, 0);
    }
  });

  filterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const dropDown = document.getElementById("param");
    const search = document.getElementById("search")
    if(search.value !== '')
    {
        if(dropDown.value === "Beer Name")
        {
            mainDiv.innerHTML ='';
            param = `beers?beer_name=${search.value}`
            fetchBeers(renderCards,param);
        }
        if(dropDown.value === "Yeast Name")
        {
            mainDiv.innerHTML ='';
            param = `beers?yeast=${search.value}`
            fetchBeers(renderCards,param);
        }
        if(dropDown.value === "Hops Variety")
        {
            mainDiv.innerHTML ='';
            param = `beers?hops=${search.value}`
            fetchBeers(renderCards,param);
        }
        if(dropDown.value === "Malt Name")
        {
            mainDiv.innerHTML ='';
            param = `beers?malt=${search.value}`
            fetchBeers(renderCards,param);
        }
        if(dropDown.value === "Food Pairing")
        {
            mainDiv.innerHTML ='';
            param = `beers?food=${search.value}`
            fetchBeers(renderCards,param);
        }
    }
  });
};

const detailCards = (beer) => {
  const popUpBox = document.querySelector(".hover_bkgr_fricc");
  const keyData = document.getElementById("keyData");


  const data = document.createElement("h2");
  const beerName = document.createElement("h2");
  const abv = document.createElement("h3");
  const ibu = document.createElement("h3");
  const volume = document.createElement("h3");
  const ph = document.createElement("h3");
  const mashTemp = document.createElement("h3");
  const ferment = document.createElement("h3");
  const description = document.createElement("p");
  const closeButtonContainer = document.getElementById("popupCloseButton");
  const malts = document.createElement("h3");
  const hops = document.createElement("h3");
  const yeast = document.createElement("h3")

  data.textContent = `KEY DATA`;
  beerName.textContent = beer.name;
  abv.textContent = `ABV: ` + beer.abv;
  ibu.textContent = `IBU: ` + beer.ibu;
  volume.textContent = `Volume: ` + beer.volume.value + " " + beer.volume.unit;
  ph.textContent = `ph: ` + beer.ph;

  mashTemp.textContent =
  "Mash Temp: " +
  beer.method["mash_temp"][0].temp.value +
  " " +
  beer.method["mash_temp"][0].temp.unit;

  ferment.textContent =
  "Fermentation: " +
  beer.method.fermentation.temp.value +
  " " +
  beer.method.fermentation.temp.unit;

  malts.textContent = "Malts: " + beer.ingredients.malt.map((element) => " " + element.name)
  hops.textContent = "Hops: " + beer.ingredients.hops.map((element) => " " + element.name)
  yeast.textContent = "Yeast: " + beer.ingredients.yeast
  description.textContent = `Description: ` + beer.description;

  popUpBox.style.display = "inline";
  keyData.style.display = "inline-block";
  data.style["text-decoration"] = "underline";
  closeButtonContainer.className = "popupCloseButton";

  newdiv = document.createElement("div");
  newdiv.id = "infobox";
  newdiv.append(
    data,
    beerName,
    abv,
    ibu,
    ph,
    volume,
    mashTemp,
    ferment,
    malts,
    hops,
    yeast,
    description
  );
  keyData.append(newdiv);

  closeButtonContainer.addEventListener("click", () => {
    keyData.style.display = "none";
    popUpBox.style.display = "none";
    newdiv.innerHTML = "";
  });
};

const renderCards = (beers) => {
  const mainDiv = document.getElementById("beer-collection");
  beers.forEach((beer) => {
    const div = document.createElement("div");
    const h4 = document.createElement("h2");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const btn = document.createElement("button");

    div.style.display = "inline-grid";
    div.style.width = "250px";
    div.style.height = "550px";
    div.id = "card";

    btn.classname = "like-btn";
    btn.textContent = "↑upvote↑";
    btn.className = "upvote";
    h4.innerHTML = beer.name;

    img.src = beer.image_url;
    img.id = "productImage";
    p.innerHTML = beer.tagline;

    img.addEventListener("click", (event) => {
      if (event) detailCards(beer);
    });

    div.append(h4, img, p, btn);
    mainDiv.append(div);
  });

};

//On page load
window.onload = () => {
  initListeners();
  fetchBeers(renderCards);
};


