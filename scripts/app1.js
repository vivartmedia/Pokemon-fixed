
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
let pokemon = "chesnaught";

searchFld.addEventListener('keydown', async(event)=> {
    if (event.key === "Enter") {
     pokemon =   await pokemonApi(event.target.value)
    }CapFirst
    
})

let pokJsonData;
let types
const pokemonApi = async (pokemon) => {
    const promise = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon);
    pokJsonData = await promise.json();
    console.log(pokJsonData);
    pokemon = CapFirst(pokJsonData.forms[0].name);
    let number = pokJsonData.id;
    pokeImgMain.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`;
                      
    types = pokJsonData.types.map(data => CapFirst(data.type.name));
    console.log(number);
    pokemon = pokemon[0].toUpperCase() + pokemon.slice(1);
    console.log(pokemon);
    console.log(number)
    console.log(types)
        .then(result => {
            nameTxt.textContent = result.name;
            numberTxt.textContent = "#" + result.number;
            typeTxt.textContent = result.types.join(', ');
            return { pokemon, number, types };
        }
    }

// pokemonApi(pokemon).then(result => {
//     nameTxt.textContent = result.name;
//     numberTxt.textContent = "#" + result.number;
//     typeTxt.textContent = result.types.join(', ');
// })

function CapFirst(word, removeDash = '-', putSpace = ' ') {
    let wordsArray = word.split(removeDash);
    let capWoooords = [];

    for (let i = 0; i < wordsArray.length; i++){
        let capWord = wordsArray[i].charAt(0).toUpperCase() + wordsArray[i].slice(1);
        capWoooords.push(capWord);
    }
    return capWoooords.join(putSpace);
}

let locFetched = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`)
let location = locFetched[0].location_area.name;
locationTxt.textContent = CapFirst(location);