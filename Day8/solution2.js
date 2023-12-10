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

// greatest common denominator
function gcd(a, b) {
    if (b === 0) return a
    return gcd(b, a % b)
}

// lowest common multiple
function lcm(a, b) {
    return Math.abs(a * b) / gcd(a, b)
}

function lcmArray(arr) {
    return arr.reduce((lcmSoFar, current) => lcm(lcmSoFar, current), 1)
}

rl.on('close', () => {
    const locationsEndingInA = Object.keys(locationObj).filter(key => key.endsWith('A'))

    let steps = []

    for (let location of locationsEndingInA) {
        steps.push(countStepsToTargetLocation(location))
    }

    console.log(lcmArray(steps))
})
/* END OF DATA PROCESSING */



const countStepsToTargetLocation = (location) => {
    let steps = 0
    
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
        if (location.endsWith('Z')) {
            finalLocationFound = true
        }
    }

    return steps
}