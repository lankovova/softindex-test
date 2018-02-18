/**
 * Check if string contains only digits
 * @param {String} string String to check
 * @returns {Boolean} Returns true if string contains only digits, otherwise - returns false
 */
export function onlyDigits(string) {
    return /^\d+$/.test(string);
}

/**
 * Check if string contains only letters
 * @param {String} string String to check
 * @returns {Boolean} Returns true if string contains only letters, otherwise - returns false
 */
export function onlyLetters(string) {
    return /^[a-zA-Z]+$/.test(string);
}
