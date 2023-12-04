const fs = require('fs');
const readline = require('readline');

const stream = fs.createReadStream(__dirname + '/input.txt');

const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
});

rl.on('line', (l) => {
    processLine(l);
});

rl.on('error', (e) => {
    console.error(e);
});

let sum = 0

const processLine = (line) => {
    const numbers = line.split(':')[1].split('|')
    const winningNumbers = numbers[0].trim().split(' ')
    const playingNumbers = numbers[1].trim().split(' ')

    let matchScore = 0
    
    for (let i = 0; i < playingNumbers.length; i++) {
        if (playingNumbers[i].trim().length === 0) {
            continue
        }
        if (winningNumbers.includes(playingNumbers[i])) {
            if (matchScore == 0) {
                matchScore += 1
            } else {
                matchScore = matchScore*2
            }
        }
    }

    sum += matchScore
    console.log(sum)
}