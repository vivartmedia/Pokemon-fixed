

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

document.addEventListener('DOMContentLoaded', () => {
    digimonApi('652').then(() => {
        updateHeartIcon(); 
    });
});

const digimonApi = async (pokemon) => {
    const promise = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon);
    const data = await promise.json();
    console.log(data);
    let number = data.id;

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
    nameTxt.textContent = CapFirst(pokemonData.name);
    numberTxt.textContent = "#" + pokemonData.id;

    let types = pokemonData.types.map(data => CapFirst(data.type.name));
    typeTxt.textContent = types.join(', ');

    let moves = pokemonData.moves.map(data => CapFirst(data.move.name));
    movesTxt.textContent = moves.join(', ');

    let abilities = pokemonData.abilities.map(data => CapFirst(data.ability.name));
    abilitiesTxt.textContent = abilities.join(', ');
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
    let currentPokemonName = nameTxt.textContent.trim();
    let favorites = getlocalStorage();
    if (!favorites.includes(currentPokemonName)) {

        favorites.push(currentPokemonName);
        addItemToList(currentPokemonName); 
        heartIco.innerHTML = "&#9829;"; 
    } else {
        favorites = favorites.filter(name => name !== currentPokemonName);
        heartIco.innerHTML = "&#9825;"; 
    }

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
    const li = document.createElement('li');
    li.classList.add("flex", "items-center", "gap-2");
    li.setAttribute('data-name', itemName);

    const nameSpan = document.createElement('span');
    nameSpan.classList.add("flex-1");
    nameSpan.textContent = itemName;

    li.innerHTML = `<button class="remove-item text-red-500 hover:text-red-700 px-2 py-1">X</button>`;
    li.appendChild(nameSpan);
    list.appendChild(li);

    li.querySelector('.remove-item').addEventListener('click', function () {
        li.remove(); 
        removeItemFromLocalStorage(itemName); 
    });

    nameSpan.addEventListener('click', function () {
        fetchAndDisplayPokemon(itemName); 
    });
}

async function fetchAndDisplayPokemon(pokemonName) {
    try {
        const pokemonData = await digimonApi(pokemonName.toLowerCase());
        updatePokemonUI(pokemonData); 
    } catch (error) {
        console.error("Failed to fetch Pokémon data:", error);
    }
}



function removeItemFromLocalStorage(itemName) {
    let favorites = getlocalStorage(); 
    const updatedFavorites = favorites.filter(name => name !== itemName); 
    localStorage.setItem("Favorites", JSON.stringify(updatedFavorites)); 
    updateHeartIcon()
}

function refreshFavoritesList() {
    let favorites = getlocalStorage();
    favsTxtList.innerHTML = ''; 

    favorites.forEach(favoriteName => {
        addItemToList(favoriteName);
    });
}




const getRandomPokemonName = async () => {
    const randomId = Math.floor(Math.random() * 600) + 1; 
    const pokemonData = await digimonApi(randomId.toString());
    updatePokemonUI(pokemonData)
    return pokemonData.name; 
};


randomBtn.addEventListener('click', async () => {
    let randomPokemonData = await getRandomPokemonName();
    updatePokemonUI(randomPokemonData);
});
