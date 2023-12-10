/* START OF DATA PROCESSING */
const fs = require('fs')
const readline = require('readline')

const fileStream = fs.createReadStream('input.txt')

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
})

let dataStart = false
let directions
let locationObj = {}

rl.on('line', (line) => {
  // Check for the start of the actual data
  if (!dataStart) {
    if (line.trim() === '') { // The empty line marks the start of data
      dataStart = true
      return
    }
    directions = line.split('')
    return
  }

  let splitLine = line.split('=')
  let key = splitLine[0].trim()
  let value = splitLine[1].trim()
  // Remove the parentheses and then split by ', '
  let valueAsArray = value.replace(/[()]/g, '').split(', ')

  locationObj[key] = valueAsArray
})

rl.on('close', () => {
    countStepsToTargetLocation()
})
/* END OF DATA PROCESSING */



const countStepsToTargetLocation = () => {
    let steps = 0
    let location = 'AAA'
    
    let finalLocationFound = false
    let index = 0

    while (!finalLocationFound) {
        let direction = directions[index % directions.length]
        let locationOptions = locationObj[location]

        if (direction === 'L') {
            location = locationOptions[0]
            steps++
            index++
        }
        if (direction === 'R') {
            location = locationOptions[1]
            steps++
            index++
        }
        if (location === 'ZZZ') {
            finalLocationFound = true
        }
    }

    console.log(steps)
}