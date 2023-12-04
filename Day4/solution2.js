/* START OF DATA PROCESSING */
const fs = require('fs');

let scratchcards
try {
    let input = fs.readFileSync('input.txt', 'utf8')
    scratchcards = input.split('\n')
} catch (err) {
    console.error(err);
}
/* END OF DATA PROCESSING */


let scratchcardCounter = new Map();

for (let i = 0; i < scratchcards.length; i++) {
    let cardNumber = parseInt(scratchcards[i].split(':')[0].split(/\s+/)[1])
    scratchcardCounter.set(cardNumber, 1)
}

for (let i = 0; i < scratchcards.length; i++) {
    let scratchcardNumber = parseInt(scratchcards[i].split(':')[0].split(/\s+/)[1])
    let scratchcardCount = scratchcardCounter.get(scratchcardNumber)

    const numbers = scratchcards[i].split(':')[1].split('|')
    const winningNumbers = numbers[0].trim().split(/\s+/)
    const playingNumbers = numbers[1].trim().split(/\s+/)

    for (let i = 0; i < playingNumbers.length; i++) {       
        if (winningNumbers.includes(playingNumbers[i])) {
            let nextScratchcardNumber = scratchcardNumber + 1
            let nextScratchcardCount = scratchcardCounter.get(nextScratchcardNumber)

            scratchcardCounter.set(nextScratchcardNumber, nextScratchcardCount + scratchcardCount)

            scratchcardNumber++
        }
    }
}

let sum = 0
scratchcardCounter.forEach(value => {
    sum += value;
});
console.log(sum)