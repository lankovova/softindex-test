/**
 * Check if string contains only digits
 *
 * @param {String} string String to check
 * @returns {Boolean} Returns true if string contains only digits, otherwise - returns false
 */
export function onlyNumbers(string) {
    return /^\d+$/.test(string);
}

/**
 * Check if string is valid name
 *
 * @param {String} string String to check
 * @returns {Boolean} Returns true if string is valid name, otherwise - returns false
 */
export function validName(string) {
    return /^[a-zA-Z-' ]+$/.test(string);
}

/**
 * Sorting array of objects by specific property
 *
 * @param {Object[]} whatToSort array to Sort
 * @param {String} sortByWhat Property to sort by
 * @returns {Object[]} Returns sorted array
 */
export function sortArrayByProperty(whatToSort, sortByWhat) {
    return whatToSort.slice().sort((a, b) => {
        if (a[sortByWhat] < b[sortByWhat]) return -1;
        if (a[sortByWhat] > b[sortByWhat]) return 1;
        return 0;
    });
}

