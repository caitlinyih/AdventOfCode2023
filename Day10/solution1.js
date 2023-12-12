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
let steps = 0
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
        // record step
        steps += 1
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
        // record step
        steps += 1
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
        // record step
        steps += 1
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
        // record step
        steps += 1
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

console.log(steps / 2)