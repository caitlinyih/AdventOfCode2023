let startTime = process.hrtime();

/* START OF DATA PROCESSING */
const fs = require('fs');

let gameEntries
try {
    let data = fs.readFileSync('input.txt', 'utf8')
    gameEntries = data.split('\n')
} catch (err) {
    console.error(err);
}

let games = []

for (const gameEntry of gameEntries) {
    const gameRounds = gameEntry.split(':')[1].split(';')

    let game = []

    for (const round of gameRounds) {
        let roundEntries = round.split(',')
        let roundObject = {}

        for (let roundEntry of roundEntries) {
            roundEntry = roundEntry.trim()

            let colour = roundEntry.split(' ')[1]
            let count = roundEntry.split(' ')[0]

            roundObject[colour] = count
        }

        game.push(roundObject)
    }

    games.push(game)
}

console.log(games)
/* END OF DATA PROCESSING */



/* START OF SOLUTION */
const maxRed = 12
const maxGreen = 13
const maxBlue = 14

let gameNumberSum = 0

// iterate games
games.forEach((game, gameIndex) => {
    let gameNumber = gameIndex + 1

    let possible = true

    // iterate rounds
    for (const round of game) {
        if ((round.red ?? 0) > maxRed || (round.green ?? 0) > maxGreen || (round.blue ?? 0) > maxBlue) {
            possible = false
            break; // Exits the loop when the condition is met
        }
    }

    if (possible) {
       gameNumberSum += gameNumber 
    }
});

console.log(gameNumberSum)
/* END OF SOLUTION */

let endTime = process.hrtime(startTime);
console.log(`Execution time: ${endTime[0]}s ${endTime[1] / 1000000}ms`);