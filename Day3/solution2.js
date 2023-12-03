/* START OF DATA PROCESSING */
const fs = require('fs');

let rows
try {
    let schematic = fs.readFileSync('workInput.txt', 'utf8')
    rows = schematic.split('\n')
} catch (err) {
    console.error(err);
}

let previousRow = null

let sumOfGearRatios = 0

for (let i = 0; i < rows.length; i++) {
    if (previousRow === null) {
        previousRow = rows[i]
        continue
    }
    let nextRow = rows[i+1]

    let gearIndices = findGearIndices(rows[i])
    if (gearIndices.length === 0) {
        console.log("no gears")
        previousRow = rows[i]
        continue
    }

    // CHECKS:
    // is the gear adjacent to a number above?
    // is the gear adjacent to a number below?
    // is the gear adjacent to a number either side?

    for (gearIndex of gearIndices) {
        let matchedNumbers = []

        let previousLineNumberIndices = findNumberIndices(previousRow)
        for (const [startIndex, endIndex] of previousLineNumberIndices) {
            if (gearIndex >= startIndex-1 && gearIndex <=endIndex+1) {
                matchedNumbers.push(parseInt(previousRow.substring(startIndex, endIndex+1)))
            }
        }

        let nextLineNumberIndices = findNumberIndices(nextRow)
        for (const [startIndex, endIndex] of nextLineNumberIndices) {
            if (gearIndex >= startIndex-1 && gearIndex <=endIndex+1) {
                matchedNumbers.push(parseInt(nextRow.substring(startIndex, endIndex+1)))
            }
        }

        let currentLineNumberIndices = findNumberIndices(rows[i])
        for (const [startIndex, endIndex] of currentLineNumberIndices) {
            if (gearIndex == startIndex-1 || gearIndex == endIndex+1) {
                matchedNumbers.push(parseInt(rows[i].substring(startIndex, endIndex+1)))
            }
        }

        if (matchedNumbers.length == 2) {
            let gearRatio = matchedNumbers[0] * matchedNumbers[1]
            sumOfGearRatios += gearRatio
        }
    }

    previousRow = rows[i]
}

console.log(sumOfGearRatios)

function findGearIndices(str) {
    const regex = /\*+/g;
    const matches = str.matchAll(regex);
    const indices = [];

    for (const match of matches) {
        indices.push(match.index);
    }

    return indices;
}

function findNumberIndices(str) {
    const regex = /\d+/g;
    const matches = str.matchAll(regex);
    const indices = [];

    for (const match of matches) {
        // The start index is `match.index`
        // The end index is `match.index + match[0].length - 1`
        indices.push([match.index, match.index + match[0].length - 1]);
    }

    return indices;
}