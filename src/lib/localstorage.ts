function saveToLocalStorageByName(name:string) {
    if (typeof window === 'undefined') return; // Prevents error on server

    const namesArr = getLocalStorage();

    if (!namesArr.includes(name)) {
        namesArr.push(name);
    }

    localStorage.setItem('PokeFavs', JSON.stringify(namesArr));
}

function getLocalStorage() {
    if (typeof window === 'undefined') return []; // Prevents error on server

    const localStorageData = localStorage.getItem('PokeFavs');

    if (localStorageData == null) {
        return [];
    }

    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(name:string) {
    if (typeof window === 'undefined') return; // Prevents error on server

    const namesArr = getLocalStorage();

    const nameindex = namesArr.indexOf(name);

    if (nameindex !== -1) {
        namesArr.splice(nameindex, 1);
        localStorage.setItem('PokeFavs', JSON.stringify(namesArr));
    }
}

export { saveToLocalStorageByName, getLocalStorage, removeFromLocalStorage };
