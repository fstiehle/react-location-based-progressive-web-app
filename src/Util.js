/**
 * Saves key, value pair to storage
 *
 * @param key
 * @param value
 */
export function saveToStorage(key, value) {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem(key, value);
    } else {
        console.log("No local storage");
    }
}

/**
 * Gets value from storage via key
 *
 * @param key Key to retreive
 */
export function getFromStorage(key) {
    if (typeof(Storage) !== "undefined") {
        return localStorage.getItem(key);
    } else {
        console.log("No local storage");
    }
}

/**
 * Deletes value from storage via key
 *
 * @param key Key to delete
 */
export function deleteFromStorage(key) {
    if (typeof(Storage) !== "undefined") {
        if (getFromStorage(key)) {
            localStorage.removeItem(key);
        }
    } else {
        console.log("No local storage");
    }
}

/**
 * Generates URL from parameters
 *
 * @param String url Base-url to be called
 * @param Array parameter Array of parameters to be added to the url
 * in format: "name=value"
 */
export function genUrlwithParam(url, parameter) {
    if (!(parameter instanceof Array)) {
        return;
    }
    url += "?";
    for (let i of parameter) {
        url += "&" + i;
    }
    return url
}   