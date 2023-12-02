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
let sumOfPowers = 0

// iterate games
games.forEach((game) => {
    let minRequiredRed = 1
    let minRequiredGreen = 1
    let minRequiredBlue = 1

    // iterate rounds
    for (const round of game) {
        if ((parseInt(round.red) ?? 1) > minRequiredRed) {
            minRequiredRed = round.red
        }
        if ((parseInt(round.green) ?? 1) > minRequiredGreen) {
            minRequiredGreen = round.green
        }
        if ((parseInt(round.blue) ?? 1) > minRequiredBlue) {
            minRequiredBlue = round.blue
        }
    }

    let power = minRequiredRed * minRequiredGreen * minRequiredBlue
    sumOfPowers += power
});

console.log(sumOfPowers)
/* END OF SOLUTION */

let endTime = process.hrtime(startTime);
console.log(`Execution time: ${endTime[0]}s ${endTime[1] / 1000000}ms`);