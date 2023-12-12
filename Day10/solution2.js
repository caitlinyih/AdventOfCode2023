/* START OF DATA PROCESSING */
const fs = require('fs')

let lines
let startLineIndex
let startPositionIndex

try {
    const maze = fs.readFileSync('input.txt', 'utf8')
    lines = maze.split('\n')
    for (let i = 0; i < lines.length; i++) {
        lines[i] = lines[i].split('')
    }
    startLineIndex = lines.findIndex(arr => arr.includes('S'))
    startPositionIndex = lines[startLineIndex].indexOf('S')
} catch (err) {
    console.error(err)
}
/* END OF DATA PROCESSING */

// TRAVEL TO
const upToTiles = ['|', '7', 'F', 'S']
const rightToTiles = ['-', 'J', '7', 'S']
const downToTiles = ['|', 'L', 'J', 'S']
const leftToTiles = ['-', 'L', 'F', 'S']

// TRAVEL FROM
const upFromTiles = ['|', 'L', 'J', 'S']
const rightFromTiles = ['-', 'L', 'F', 'S']
const downFromTiles = ['|', '7', 'F', 'S']
const leftFromTiles = ['-', 'J', '7', 'S']

let loopClosed = false
let loopCoordinates = [[startLineIndex, startPositionIndex]]
let lastMove

// record last move, don't go back the way you came!

while (!loopClosed) {
    let currentLine = lines[startLineIndex]
    let currentTile = currentLine[startPositionIndex]

    let previousLine = lines[startLineIndex-1]
    let nextLine = lines[startLineIndex + 1]

    // Look UP, RIGHT, DOWN, LEFT

    let up = previousLine[startPositionIndex]
    if (upFromTiles.includes(currentTile) && upToTiles.includes(up) && lastMove != "down") {
        // move up
        startLineIndex = startLineIndex - 1
        // record loop coordinate
        loopCoordinates.push([startLineIndex, startPositionIndex])
        // record move
        lastMove = "up"

        if (up == 'S') {
            loopClosed = true
        }
        continue
    }

    let right = currentLine[startPositionIndex + 1]
    if (rightFromTiles.includes(currentTile) && rightToTiles.includes(right) && lastMove != "left") {
        // move right
        startPositionIndex = startPositionIndex + 1
        // record loop coordinate
        loopCoordinates.push([startLineIndex, startPositionIndex])
        // record move
        lastMove = "right"

        if (right == 'S') {
            loopClosed = true
        }
        continue
    }

    let down = nextLine[startPositionIndex]
    if (downFromTiles.includes(currentTile) && downToTiles.includes(down) && lastMove != "up") {
        // move down
        startLineIndex = startLineIndex + 1
        // record loop coordinate
        loopCoordinates.push([startLineIndex, startPositionIndex])
        // record move
        lastMove = "down"

        if (down == 'S') {
            loopClosed = true
        }
        continue
    }

    let left = currentLine[startPositionIndex - 1]
    if (leftFromTiles.includes(currentTile) && leftToTiles.includes(left) && lastMove != "right") {
        // move left
        startPositionIndex = startPositionIndex - 1
        // record loop coordinate
        loopCoordinates.push([startLineIndex, startPositionIndex])
        // record move
        lastMove = "left"

        if (left == 'S') {
            loopClosed = true
        }
        continue
    }

    console.log("DEAD END")
    break
}

function excludeCoordinates(firstArray, excludeArray) {
    return firstArray.filter(coord1 =>
        !excludeArray.some(coord2 => coord1[0] === coord2[0] && coord1[1] === coord2[1])
    )
}

function generateGridCoordinates(rows, columns) {
    const coordinates = []
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            coordinates.push([row, column])
        }
    }
    return coordinates
}

const rows = lines.length
const columns = lines[0].length

const gridCoordinates = generateGridCoordinates(rows, columns)

function isPointOnPolygonEdge(point, polygon) {
    let x = point[0], y = point[1]
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        let xi = polygon[i][0], yi = polygon[i][1]
        let xj = polygon[j][0], yj = polygon[j][1]

        // Check if point is on an edge
        let onEdge = ((y === yi && y === yj) && (x >= Math.min(xi, xj) && x <= Math.max(xi, xj))) || 
                     ((x === xi && x === xj) && (y >= Math.min(yi, yj) && y <= Math.max(yi, yj)))

        if (onEdge) return true
    }
    return false
}

function isPointInsidePolygon(point, polygon) {
    if (isPointOnPolygonEdge(point, polygon)) {
        return false; // Exclude points on the edge
    }

    let x = point[0], y = point[1]
    let inside = false
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        let xi = polygon[i][0], yi = polygon[i][1]
        let xj = polygon[j][0], yj = polygon[j][1]

        let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
        if (intersect) inside = !inside
    }
    return inside
}

function findPointsInPolygon(grid, polygon) {
    let pointsInside = []
    for (let point of grid) {
        if (isPointInsidePolygon(point, polygon)) {
            pointsInside.push(point)
        }
    }
    return pointsInside
}

console.log(findPointsInPolygon(gridCoordinates, loopCoordinates).length)