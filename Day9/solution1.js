/* START OF DATA PROCESSING */
const fs = require('fs')
const readline = require('readline')

const fileStream = fs.createReadStream('input.txt')

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
})

let results = []

rl.on('line', (line) => {
    let array = line.split(' ').map(Number)
    let lastElement = array[array.length - 1]

    let finalDiffArrayReached = false

    while (!finalDiffArrayReached) {
        let diffs = array.slice(1).map((num, index) => num - array[index])
        let lastDiff = diffs[diffs.length - 1]

        lastElement += lastDiff

        finalDiffArrayReached = diffs.every(element => element === diffs[0])

        array = diffs
    }

    results.push(lastElement)
})

rl.on('close', () => {
    const sum = results.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    console.log(sum)
})
/* END OF DATA PROCESSING */