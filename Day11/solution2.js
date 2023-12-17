/* START OF DATA PROCESSING */
const fs = require('fs')

let rows
let emptyRows = []
let emptyColumns = []

try {
    const input = fs.readFileSync('input.txt', 'utf8')
    rows = input.split('\n')

    const columnCount = rows[0].length

    // Expand universe rows
    for (let i = 0; i < rows.length; i++) {
        if (!rows[i].includes('#')) {
            emptyRows.push(i)
        }
    }

    // Expand universe columns
    for (let i = 0; i < columnCount; i++) {
        let isEmpty = true
        for (let row of rows) {
            let value = row[i]
            if (value === '#') {
                isEmpty = false
                break
            }
        }
        if (isEmpty) {
            emptyColumns.push(i)
        }
    }
} catch (err) {
    console.error(err)
}
/* END OF DATA PROCESSING */



// Get galaxy coordinates
let galaxyCoordinates = []
const columnCount = rows[0].length

for (let x = 0; x < rows.length; x++) {
    for (let y = 0; y < columnCount; y++) {
        if (rows[x][y] === '#') {
            galaxyCoordinates.push([x,y])
        }
    }
}

// Update galaxy coordinates for universe row expansion
let rowOffset = 0
for (let emptyRow of emptyRows) {
    emptyRow += rowOffset
    for (let i = 0; i < galaxyCoordinates.length; i++) {
        if (galaxyCoordinates[i][0] > emptyRow) {
            galaxyCoordinates[i] = [galaxyCoordinates[i][0] + 999999, galaxyCoordinates[i][1]]
        }
    }
    rowOffset += 999999
}

// Update galaxy coordinates for universe column expansion
let columnOffset = 0
for (let emptyColumn of emptyColumns) {
    emptyColumn += columnOffset
    for (let i = 0; i < galaxyCoordinates.length; i++) {
        if (galaxyCoordinates[i][1] > emptyColumn) {
            galaxyCoordinates[i] = [galaxyCoordinates[i][0], galaxyCoordinates[i][1] + 999999]
        }
    }
    columnOffset += 999999
}

// Calculate sum of shortest distances
let sum = 0

for (let i = 0; i < galaxyCoordinates.length; i++) {
    let currentCoordinate = galaxyCoordinates[i]

    for (let j = 0; j < galaxyCoordinates.length; j++) {
        if (i !== j) { // Skip calculating distance to the same coordinate
            let comparisonCoordinate = galaxyCoordinates[j]
            let distance = Math.abs(currentCoordinate[0] - comparisonCoordinate[0]) +
                           Math.abs(currentCoordinate[1] - comparisonCoordinate[1])
            sum += distance
        }
    }
}

console.log(sum / 2)