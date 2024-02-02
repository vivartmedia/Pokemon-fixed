// import {  getlocalStorage, removeFromLocalStorage } from "./localstorage.js";

let searchFld = document.getElementById("searchFld");
let searchBtn = document.getElementById("searchBtn");
let randomBtn = document.getElementById("randomBtn");
let favsBtn = document.getElementById("favoritesButton");
let numberTxt = document.getElementById("numberTxt");
let nameTxt = document.getElementById("nameTxt");

let heartIco = document.getElementById("heartIco");
let pokeImgMain = document.getElementById("pokeImgMain");
let typeTxt = document.getElementById("typeTxt");
let locationTxt = document.getElementById("locationTxt");
let abilitiesTxt = document.getElementById("abilitiesTxt");
let movesTxt = document.getElementById("movesTxt");
let evol1Img = document.getElementById("evol1Img");
let evol2Img = document.getElementById("evol2Img");
let evol3Img = document.getElementById("evol3Img");
let favsTxtList = document.getElementById("favsTxtList");



let pokemon = "652";
//let digimon = [];
// let types; 
const digimonApi = async (pokemon) => {
    const promise = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon);
    const data = await promise.json();
    console.log(data);
    let number = data.id;
    // pokeImgMain.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`;
    // let types = pokemon.types.map(data => CapFirst(data.type.name));
    // typeTxt.textContent = pokemon.types.join(', ');

    let locationFetched = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.id}/encounters`)
    let locationData = await locationFetched.json();
    console.log(locationData)
    if (locationData.length === 0) {
        locationData = [{ location_area: { name: 'N/A' } }];
    }
    locationTxt.textContent = CapFirst(locationData[0].location_area.name)

    const mainImgSrc = [
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`,
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${number}.png`
    ];
    let currentIndex = 0;
    pokeImgMain.src = mainImgSrc[currentIndex];
    pokeImgMain.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`;
    pokeImgMain.addEventListener('click',  () => {
        
        currentIndex = currentIndex === 0 ? 1 : 0;
        pokeImgMain.src = mainImgSrc[currentIndex];
    })


    evol3Img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${data.id}.gif`
    
    return data;
}


searchFld.addEventListener('keydown', async (event) => {
    if (event.key === "Enter") {
        pokemon = await digimonApi(event.target.value.toLowerCase());
        
        nameTxt.textContent = CapFirst(pokemon.name);
        numberTxt.textContent = "#" + pokemon.id;

        let types = pokemon.types.map(data => CapFirst(data.type.name));
        typeTxt.textContent = types.join(', ');

        let moves = pokemon.moves.map(data => CapFirst(data.move.name))
        movesTxt.textContent = moves.join(', ')

        let abilities = pokemon.abilities.map(data => CapFirst(data.ability.name))
        abilitiesTxt.textContent = abilities.join(', ')
        searchFld.value = "";}})

function CapFirst(word, removeDash = '-', putSpace = ' ') {
    let wordsArray = word.split(removeDash);
    let capWoooords = [];

    for (let i = 0; i < wordsArray.length; i++) {
        let capWord = wordsArray[i].charAt(0).toUpperCase() + wordsArray[i].slice(1);
        capWoooords.push(capWord);
    }
    return capWoooords.join(putSpace);
}
if (localStorage.getItem("Favorites")) {
        
    }

heartIco.addEventListener('click', () => {
    // saveToLocalStorage(pokemon.name);
    let favorites = getlocalStorage();
    if (!favorites.includes(pokemon.name)) {
        favorites.push(pokemon.name);
        addItemToList(pokemon.name)
        heartIco.innerHTML = "&#9829";
    } else if (favorites.includes(pokemon.name)) {
        favorites.splice(favorites.indexOf(pokemon), 1);
        localStorage.setItem("Favorites", JSON.stringify(favorites))
        heartIco.innerHTML = "&#9825";
    }
    // else {
    //     heartIco.innerHTML = "&#9825";
    // }
    

    localStorage.setItem("Favorites", JSON.stringify(favorites));
})

const getlocalStorage = () => {
    let localStorageData = localStorage.getItem("Favorites");
    if (localStorageData == null) {
        heartIco.innerHTML = "&#9825";
        return [];
    }
    return JSON.parse(localStorageData);
}

function addItemToList(itemName) {
    const list = document.getElementById('favsTxtList');

    // Create a new list item
    const li = document.createElement('li');
    li.classList.add("flex", "items-center", "gap-2"); // Use flex to align items horizontally with a gap

    li.innerHTML = `
      <button class="remove-item text-red-500 hover:text-red-700 px-2 py-1">X</button>
      <span class="flex-1">${itemName}</span>
    `;

    // Append the new item to the list
    list.appendChild(li);

    // Add an event listener to the "X" button for item removal
    li.querySelector('.remove-item').addEventListener('click', function () {
        li.remove(); // Remove the list item
    });
}



const getRandomPokemonName = () => {
    const randomId = Math.random() * 600 + 1;
    return PokemonApi(randomId);
};

randomBtn.addEventListener('click', async () => {
    pokemon = await getRandomPokemonName();
    Pokemon = await PokemonApi(pokemon);
    PokemonApi(pokemon);
});