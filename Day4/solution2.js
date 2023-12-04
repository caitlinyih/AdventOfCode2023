/* START OF DATA PROCESSING */
const fs = require('fs');

let cards
try {
    let input = fs.readFileSync('sampleInput.txt', 'utf8')
    cards = input.split('\n')
} catch (err) {
    console.error(err);
}
/* END OF DATA PROCESSING */

let cardMap = new Map();

for (let i = 0; i < cards.length; i++) {
    let cardNumber = parseInt(cards[i].split(':')[0].split(' ')[1])

    const numbers = cards[i].split(':')[1].split('|')
    const winningNumbers = numbers[0].trim().split(' ')
    const playingNumbers = numbers[1].trim().split(' ')

    let matchCount = 0
    
    for (let i = 0; i < playingNumbers.length; i++) {
        if (playingNumbers[i].trim().length === 0) {
            continue
        }
       
        if (winningNumbers.includes(playingNumbers[i])) {
            matchCount++
        }
    }

    cardMap.set(cardNumber, matchCount)
}

console.log(cardMap)



let cardPile = [1,2,3,4,5,6]

for (let i = 0; i < cards.length; i++) {
    const numbers = cards[i].split(':')[1].split('|')
    const winningNumbers = numbers[0].trim().split(' ')
    const playingNumbers = numbers[1].trim().split(' ')

    let cardNumber = parseInt(cards[i].split(':')[0].split(' ')[1])
    
    for (let i = 0; i < playingNumbers.length; i++) {
        if (playingNumbers[i].trim().length === 0) {
            continue
        }
       
        if (winningNumbers.includes(playingNumbers[i])) {
            cardPile.push(cardNumber + 1)
            cardNumber++
        }
    }
}

let sum = 0
console.log(cardPile)

for (let i = 0; i < cardPile.length; i++) {
    const cardNumber = cardPile[i]
    const cardsGenerated = cardMap.get(cardNumber)
    console.log(cardNumber + ", " + cardsGenerated)
    sum += cardsGenerated
}

console.log(sum)




/*
let cardsCopy = Array.from(cards)

for (let i = 0; i < cards.length; i++) {
    if (cards[i] === undefined || cards[i].trim().length === 0) {
        continue
    }

    let cardNumber = parseInt(cards[i].split(':')[0].split(' ')[1])

    const numbers = cards[i].split(':')[1].split('|')
    const winningNumbers = numbers[0].trim().split(' ')
    const playingNumbers = numbers[1].trim().split(' ')
    console.log(playingNumbers)
    
    for (let i = 0; i < playingNumbers.length; i++) {
        if (playingNumbers[i].trim().length === 0) {
            continue
        }
       
        if (winningNumbers.includes(playingNumbers[i])) {
            cards.push(cardsCopy[cardNumber])
            cardNumber++
        }
    }
}

console.log(cards.length)
*/