export { getlocalStorage, removeFromLocalStorage };

// const saveToLocalStorage = (pokemon) => {
//     let favorites = getlocalStorage();
//     if (!favorites.includes(pokemon)) {
//         favorites.push(pokemon);

//     }
//     localStorage.setItem("Favorites", JSON.stringify(favorites));
// }

const getlocalStorage = () => {
    let localStorageData = localStorage.getItem("Favorites");
    if (localStorageData == null) {
        return [];
    }
    return JSON.parse(localStorageData);

}

const removeFromLocalStorage = (pokemon) => {
    let favorites = getlocalStorage();
    let namedIndex = favorites.indexOf(pokemon);
    favorites.splice(namedIndex, 1);
    localStorage.setItem("Favorites", JSON.stringify(favorites))
}
