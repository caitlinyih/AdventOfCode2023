/* START OF DATA PROCESSING */
const fs = require('fs');

let parsedSections = {};

try {
    let input = fs.readFileSync('sampleInput.txt', 'utf8')
    const sections = input.split('\n\n'); // Split by double

    for (let i = 0; i < sections.length; i++) {
        if (i == 0) {
            const segments = sections[i].split(':')
            const title = segments[0].trim()
            const value = segments[1].trim()
            const numbers = value.split(/\s+/).map(Number); // Split by whitespace and convert to numbers

            parsedSections[title] = numbers

            continue
        }

        const lines = sections[i].split('\n') // Split each section into lines
        const title = lines[0].trim() // The first line is the title
        parsedSections[title] = []

        for (let i = 1; i < lines.length; i++) { // Start from the second line
            const numbers = lines[i].trim().split(/\s+/).map(Number) // Split by whitespace and convert to numbers
            parsedSections[title].push(numbers)
        }
    }
} catch (err) {
    console.error(err);
}
/* END OF DATA PROCESSING */



// Seed array
const seedArray = parsedSections['seeds']

// seed-to-soil map
const seedToSoil = parsedSections['seed-to-soil map:']

// soil-to-fertilizer map
const soilToFertilizer = parsedSections['soil-to-fertilizer map:']

// fertilizer-to-water map
const fertilizerToWater = parsedSections['fertilizer-to-water map:']

// water-to-light map
const waterToLight = parsedSections['water-to-light map:']

// light-to-temperature map
const lightToTemperature = parsedSections['light-to-temperature map:']

// temperature-to-humidity map
const temperatureToHumidity = parsedSections['temperature-to-humidity map:']

// humidity-to-location map
const humidityToLocation = parsedSections['humidity-to-location map:']


const generateMappingData = (arrays) => {
    let maps = []
    for (array of arrays) {
        let map = new Map()

        let destinationRangeStart = array[0]
        let sourceRangeStart = array[1]
        let rangeLength = array[2]
        let destinationRangePointDiff = destinationRangeStart - sourceRangeStart

        map.set("destinationRangeStart", destinationRangeStart)
        map.set("sourceRangeStart", sourceRangeStart)

        map.set("rangeLength", rangeLength)

        map.set("destinationRangePointDiff", destinationRangePointDiff)

        map.set("destinationRange", [destinationRangeStart, destinationRangeStart+rangeLength-1])
        map.set("sourceRange", [sourceRangeStart, sourceRangeStart+rangeLength-1])

        maps.push(map)
    }
    return maps
}

let seedToSoilMappingData = generateMappingData(seedToSoil)
console.log(seedToSoilMappingData)
let soilToFertilizerMappingData = generateMappingData(soilToFertilizer)
let fertilizerToWaterMappingData = generateMappingData(fertilizerToWater)
let waterToLightMappingData = generateMappingData(waterToLight)
let lightToTemperatureMappingData = generateMappingData(lightToTemperature)
let temperatureToHumidityMappingData = generateMappingData(temperatureToHumidity)
let humidityToLocationsMappingData = generateMappingData(humidityToLocation)

const getDestination = (source, maps) => {
    let destination
    for (const map of maps) {
        if (source >= map.get('sourceRange')[0] && source <= map.get('sourceRange')[1]) {
            destination = source + map.get('destinationRangePointDiff')
            break
        }
    }
    if (destination === undefined) {
        destination = source
    }
    return destination
}

let seedLocations = []

for (const seed of seedArray) {
    let soil = getDestination(seed, seedToSoilMappingData)
    let fertilizer = getDestination(soil, soilToFertilizerMappingData)
    let water = getDestination(fertilizer, fertilizerToWaterMappingData)
    let light = getDestination(water, waterToLightMappingData)
    let temperature = getDestination(light, lightToTemperatureMappingData)
    let humidity = getDestination(temperature, temperatureToHumidityMappingData)
    let location = getDestination(humidity, humidityToLocationsMappingData)

    seedLocations.push(location)
}

console.log(seedLocations.sort((a, b) => a - b)[0])