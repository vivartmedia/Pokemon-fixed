// import {  getlocalStorage, removeFromLocalStorage } from "./localstorage.js";

let searchFld = document.getElementById("searchFld");
let searchBtn = document.getElementById("searchBtn");
let randomBtn = document.getElementById("randomBtn");
let favsBtn = document.getElementById("favsBtn");
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



// let pokemon = 652;
// document.addEventListener('DOMContentLoaded', () => {
//     digimonApi(pokemon);
// });
document.addEventListener('DOMContentLoaded', () => {
    digimonApi('652').then(() => {
        updateHeartIcon(); // Ensure the heart icon is correct for the initial Pokémon
    });
});
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
        let searchpokemon = await digimonApi(event.target.value.toLowerCase());
        updatePokemonUI(searchpokemon)
        
        
        searchFld.value = "";
         }
    }
)

function updatePokemonUI(pokemonData) {
    // Assuming pokemonData is the object with all necessary Pokémon details
    nameTxt.textContent = CapFirst(pokemonData.name);
    numberTxt.textContent = "#" + pokemonData.id;

    let types = pokemonData.types.map(data => CapFirst(data.type.name));
    typeTxt.textContent = types.join(', ');

    let moves = pokemonData.moves.map(data => CapFirst(data.move.name));
    movesTxt.textContent = moves.join(', ');

    let abilities = pokemonData.abilities.map(data => CapFirst(data.ability.name));
    abilitiesTxt.textContent = abilities.join(', ');

    // Update the heart icon based on the new data
    updateHeartIcon();
}


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


favsBtn.addEventListener('click', () => {
    refreshFavoritesList()
})
heartIco.addEventListener('click', () => {
    // Retrieve the current Pokémon's name displayed in the UI
    let currentPokemonName = nameTxt.textContent;

    // Fetch the current list of favorites from local storage
    let favorites = getlocalStorage();

    // Check if the current Pokémon's name is in the favorites list
    if (!favorites.includes(currentPokemonName)) {
        // If not, add it to the favorites list
        favorites.push(currentPokemonName);
        addItemToList(currentPokemonName); // Update the UI to reflect the addition
        heartIco.innerHTML = "&#9829;"; // Change the heart icon to indicate it's a favorite
    } else {
        // If it is already a favorite, remove it
        favorites = favorites.filter(name => name !== currentPokemonName);
        heartIco.innerHTML = "&#9825;"; // Change the heart icon to indicate it's not a favorite anymore
    }

    // Update local storage with the new favorites list
    localStorage.setItem("Favorites", JSON.stringify(favorites));
    refreshFavoritesList();
});

function updateHeartIcon() {
    let currentPokemonName = nameTxt.textContent;
    let favorites = getlocalStorage();
    if (favorites.includes(currentPokemonName)) {
        heartIco.innerHTML = "&#9829;";
    } else {
        heartIco.innerHTML = "&#9825;"; 
    }
}

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
        // Remove the item from local storage
        removeItemFromLocalStorage(itemName);
    });
}
function removeItemFromLocalStorage(itemName) {
    let favorites = getlocalStorage(); // Fetch the current list of favorites
    const updatedFavorites = favorites.filter(name => name !== itemName); // Remove the specified item
    localStorage.setItem("Favorites", JSON.stringify(updatedFavorites)); // Update local storage
    updateHeartIcon()
}

function refreshFavoritesList() {
    let favorites = getlocalStorage();
    favsTxtList.innerHTML = ''; // Clear the existing list

    // Repopulate the list with items from local storage
    favorites.forEach(favoriteName => {
        addItemToList(favoriteName);
    });
}




const getRandomPokemonName = async () => {
    const randomId = Math.floor(Math.random() * 600) + 1; // Ensure integer value
    const pokemonData = await digimonApi(randomId.toString()); // Assuming API needs ID as string
    updatePokemonUI(pokemonData)
    return pokemonData.name; // Assuming you want to return the name for some reason
};


randomBtn.addEventListener('click', async () => {
    // Assuming getRandomPokemonName fetches and returns Pokémon data
    let randomPokemonData = await getRandomPokemonName(); // Make sure this function returns the full Pokémon data
    updatePokemonUI(randomPokemonData);
});
