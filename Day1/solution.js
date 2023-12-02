/*
    Problem:
    For each string, get the first and last digit of a string and concatenate them to form a single, two-digit number.
    E.g:
    * two1nine - 29
    * eightwothree - 83
    * abcone2threexyz - 13
    * xtwone3four - 24
    * 4nineeightseven2 - 42
    * zoneight234 - 14
    * 7pqrstsixteen - 76
    * sevenine - 79

    The solution to the problem is the sum of each two-digit number.
    In the example given above, the solution is 29 + 83 + 13 + 24 + 42 + 14 + 76 + 79 = 360

    Note: The digit may be in string form, i.e. 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'
*/

/*
    Reversing a string is O(n) because time scales with number of characters
    This solution finds the first digit in a string using a Regex negative lookbehind assertation; i.e. match x if x not preceded by y, where y = x
    This solution finds the last digit in exactly the same way, just with the input string reversed and match values reversed
    This covers inputs like sevenine
    Finding the last digit using a negative lookahead, i.e. match x if x not followed by y, where y = x, would result in a match of "seven", because "seven" in the input string is technically followed by "ine" not "nine"
    By reversing the string and matching in reverse, the match correctly becomes "nine"
*/


const fs = require('fs');

let startTime = process.hrtime();

let stringArray
try {
    let data = fs.readFileSync('input.txt', 'utf8')
    stringArray = data.split('\n')
} catch (err) {
    console.error(err);
}

const wordForms = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
const reversedWordForms = wordForms.map(str => str.split('').reverse().join(''))

const wordFormsRegexMatchPattern = wordForms.join('|')
const reversedWordFormsRegexMatchPattern = reversedWordForms.join('|')

// Negative lookbehind assertions
const wordFormsRegex = new RegExp(`(?<!.*(${wordFormsRegexMatchPattern}|\\d))(${wordFormsRegexMatchPattern}|\\d)`)
const reversedWordFormsRegex = new RegExp(`(?<!.*(${reversedWordFormsRegexMatchPattern}|\\d))(${reversedWordFormsRegexMatchPattern}|\\d)`)

sum = 0

stringArray.forEach((string) => {
    // Get the first digit in the string
    let firstDigitMatch = getFirstOccurence(string, wordFormsRegex, wordForms)

    // Get the last digit in the string
    reversedString = string.split('').reverse().join('')
    let lastDigitMatch = getFirstOccurence(reversedString, reversedWordFormsRegex, reversedWordForms)

    let combinedDigits = parseInt(`${firstDigitMatch}${lastDigitMatch}`)

    sum+=combinedDigits
});

function getFirstOccurence(inputString, regexPattern, wordForms) {
    let match = inputString.match(regexPattern)
    if (match === null) {
        return 0
    }

    let matchIndex = wordForms.indexOf(match[0])
    if (matchIndex === -1) {
        // matched number is not in word form
        match = parseInt(match[0])        
    } else {
        // matched number is in word form, get digit form by taking index position and adding 1
        match = matchIndex + 1
    }

    return match
}

// Log the solution
console.log(sum)

let endTime = process.hrtime(startTime);
console.log(`Execution time: ${endTime[0]}s ${endTime[1] / 1000000}ms`);