/* START OF DATA PROCESSING */
const fs = require('fs')

let rows

try {
    const input = fs.readFileSync('input.txt', 'utf8')
    rows = input.split('\n')

    const columnCount = rows[0].length

    // Expand universe rows
    let emptyRows = []
    for (let i = 0; i < rows.length; i++) {
        if (!rows[i].includes('#')) {
            emptyRows.push(i)
        }
    }
    let offset = 0
    for (let emptyRow of emptyRows) {
        emptyRow += offset
        rows.splice(emptyRow + 1, 0, '.'.repeat(columnCount))
        offset++
    }

    // Expand universe columns
    let emptyColumns = []
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
    for (let i = 0; i < rows.length; i++) {
        let offset = 0
        for (let emptyColumn of emptyColumns) {
            emptyColumn = emptyColumn + offset
            rows[i] = rows[i].slice(0, emptyColumn+1) + '.' + rows[i].slice(emptyColumn+1)
            offset++
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