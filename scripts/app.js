
let searchFld = document.getElementById("searchFld");
let searchBtn = document.getElementById("searchBtn");
let randomBtn = document.getElementById("randomBtn");
let favsBtn = document.getElementById("favoritesButton");
let numberTxt = document.getElementById("numberTxt");
let nameTxt = document.getElementById("nameTxt");
let heartIco = document.getElementById("heartIco");
let pokeImgMain = document.getElementById("pokeImgMain");
let typeText1 = document.getElementById("typeText");
let typeText2 = document.getElementById("typeText");
let locationTxt = document.getElementById("locationTxt");
let abilitiesTxt = document.getElementById("abilitiesTxt");
let movesTxt = document.getElementById("movesTxt");
let evol1Img = document.getElementById("evol1Img");
let evol2Img = document.getElementById("evol2Img");
let evol3Img = document.getElementById("evol3Img");
let favsTxtList = document.getElementById("favsTxtList");

const pokemonApi = async (pokemon) => {
    const promise = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon);
    const data = await promise.json();
    console.log(data);
    return data
}

pokemonApi("ditto");
