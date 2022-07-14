const fetchBeers = (callback, param = "beers", url ='https://api.punkapi.com/v2/') => {
  fetch(`${url}${param}`)
    .then((data) => data.json())
    .then((beers) => callback(beers))
    .then(console.log("searching with param: ", param));
};


const postSavedBeers = (object) => {
    fetch('http://localhost:3000/savedBeer', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    })
  };

const deleteSavedBeer = (id) => {
    fetch(`http://localhost:3000/savedBeer/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': "application/json"
      }
    })
  }

const initListeners = () => {
  const addBeerButton = document.getElementById("new-beer-btn");
  const inputDiv = document.querySelector(".container");
  const forwardButton = document.getElementById("page-forward");
  const filterForm = document.getElementById("beer-filter");
  const mainDiv = document.getElementById("beer-collection");
  const savedBeersURL = "http://localhost:3000/savedBeer";
  const savedBeerButton = document.querySelector("#saved-beer-btn");
  let isForm = false;

  document.getElementById('home').addEventListener("click", () => {
    document.location.reload();
  });
  document.getElementById('title').addEventListener("click", () => {
    document.location.reload();
  });

  addBeerButton.addEventListener("click", () => {
    isForm = !isForm;

    if (!isForm) inputDiv.style.display = "none";

    if (isForm) inputDiv.style.display = "block";
  });

  let pageNumber = 1;
  let param = "";

  forwardButton.addEventListener("click", () => {
    if (param) {
      pageNumber++;
      param = "&" + param;
      mainDiv.innerHTML = "";
      fetchBeers(renderCards, `beers?page=${pageNumber}${param}`);
    } else {
      pageNumber++;
      mainDiv.innerHTML = "";
      fetchBeers(renderCards, `beers?page=${pageNumber}`);
      window.scrollTo(0, 0);
    }
  });

  filterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    pageNumber = 1;
    const dropDown = document.getElementById("param");
    const search = document.getElementById("search");
    if (search.value !== "") {
      if (dropDown.value === "Beer Name") {
        mainDiv.innerHTML = "";
        param = `beer_name=${search.value}`;
        fetchBeers(renderCards, 'beers?' + param);
      }
      if (dropDown.value === "Yeast Name") {
        mainDiv.innerHTML = "";
        param = `yeast=${search.value}`;
        fetchBeers(renderCards,'beers?' + param);
      }
      if (dropDown.value === "Hops Variety") {
        mainDiv.innerHTML = "";
        param = `hops=${search.value}`;
        fetchBeers(renderCards,'beers?' + param);
      }
      if (dropDown.value === "Malt Name") {
        mainDiv.innerHTML = "";
        param = `malt=${search.value}`;
        fetchBeers(renderCards,'beers?' + param);
      }
      if (dropDown.value === "Food Pairing") {
        mainDiv.innerHTML = "";
        param = `food=${search.value}`;
        fetchBeers(renderCards,'beers?' + param);
      }
      forwardButton.style.display = "flex";
    }
    search.value = "";
    dropDown.value = "Beer Name";
  });
  savedBeerButton.addEventListener('click', ()=> {
    mainDiv.innerHTML = ""
    fetchBeers(renderCards, "", savedBeersURL);
    doDelete = !doDelete;
    forwardButton.style.display = "none";
  })

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
  const yeast = document.createElement("h3");

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

  malts.textContent =
    "Malts: " + beer.ingredients.malt.map((element) => " " + element.name);
  hops.textContent =
    "Hops: " + beer.ingredients.hops.map((element) => " " + element.name);
  yeast.textContent = "Yeast: " + beer.ingredients.yeast;
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

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))
function togglePopup(){
  document.getElementById('popup-1').classList.toggle("active");
}

let doDelete = false;

const renderCards = (beers) => {
  const mainDiv = document.getElementById("beer-collection");


  beers.forEach((beer) => {
    const div = document.createElement("div");
    const h4 = document.createElement("h2");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const btn = document.createElement("button");
    div.style.display = "inline-grid";
    div.id = "card";

    btn.classname = "like-btn";
    btn.textContent = "Save Beer";
    btn.className = "upvote";
    h4.innerHTML = beer.name;

    img.src = beer.image_url;
    img.id = "productImage";
    p.innerHTML = beer.tagline;



    img.addEventListener("click", (event) => {
      if (event) detailCards(beer);
    });
    const savedNote = document.createElement("h3")
    btn.addEventListener("click", () => {
        postSavedBeers(beer)
        savedNote.textContent = "Product Saved"
        savedNote.className = "popup"
        div.prepend(savedNote)
    })
    savedNote.remove();


    div.append(h4, img, p, btn);
    mainDiv.append(div);
    if(doDelete)
    {
        const deleteButton = document.createElement('button');
        deleteButton.className = "close-btn"
        deleteButton.innerHTML = "×"
        deleteButton.addEventListener('click', () =>{
            div.remove();
            deleteSavedBeer(beer.id)
        })
        div.append(deleteButton);
    }
  });
  doDelete = false;
};

//On page load
window.onload = () => {
  initListeners();
  fetchBeers(renderCards);
};




