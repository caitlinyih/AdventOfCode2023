/* START OF DATA PROCESSING */
const fs = require('fs');
const readline = require('readline');

const stream = fs.createReadStream(__dirname + '/workInput.txt');

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

rl.on('close', () => {
    postProcess()
});
/* END OF DATA PROCESSING */



let handCategories = {
    'fiveOfAKind': [], 
    'fourOfAKind': [], 
    'fullHouse': [], 
    'threeOfAKind': [],
    'twoPair': [],
    'onePair': [],
    'highCard': []
}

const cardStrengths = {
    A: 22,
    K: 21,
    Q: 20,
    J: 19,
    T: 18,
    9: 17,
    8: 16,
    7: 15,
    6: 14,
    5: 13,
    4: 12,
    3: 11,
    2: 10
}

const fiveOfAKind = [ 5 ]
const fourOfAKind = [ 1, 4 ]
const fullHouse = [ 2, 3 ]
const threeOfAKind = [ 1, 1, 3 ]
const twoPair = [ 1, 2, 2 ]
const onePair = [ 1, 1, 1, 2 ]
const highCard = [ 1, 1, 1, 1, 1 ]

function generateSortedCardOccurrenceCounts(arr) {
    const counts = arr.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
    }, {});

    return Object.values(counts).sort();
}

function determineHandCategory(hand) {
    const handCards = hand.split('')
    const sortedCardOccurenceCounts = generateSortedCardOccurrenceCounts(handCards)
    if (arraysEqual(sortedCardOccurenceCounts, fiveOfAKind)) {
        return "fiveOfAKind"
    }
    if (arraysEqual(sortedCardOccurenceCounts, fourOfAKind)) {
        return "fourOfAKind"
    }
    if (arraysEqual(sortedCardOccurenceCounts, fullHouse)) {
        return "fullHouse"
    }
    if (arraysEqual(sortedCardOccurenceCounts, threeOfAKind)) {
        return "threeOfAKind"
    }
    if (arraysEqual(sortedCardOccurenceCounts, twoPair)) {
        return "twoPair"
    }
    if (arraysEqual(sortedCardOccurenceCounts, onePair)) {
        return "onePair"
    }
    if (arraysEqual(sortedCardOccurenceCounts, highCard)) {
        return "highCard"
    }
}

function arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

function generateHandScore(hand) {
    const cards = hand.split('')
    let score = ""
    for (const card of cards) {
        score = score + cardStrengths[card]
    }
    return parseInt(score)
}

function processLine(line) {
    const hand = line.split(/\s/g)[0].trim()
    const bid = parseInt(line.split(/\s/g)[1].trim())

    const handCategory = determineHandCategory(hand)
    const handScore = generateHandScore(hand)

    handCategories[handCategory].push([hand, handScore, bid])
}

function postProcess() {
    console.log(handCategories)

    let rankedHands = []

    for (const handCategory in handCategories) {
        const hands = handCategories[handCategory]
        if (hands.length === 0) {
            continue
        }
        const rankedCategoryHands = hands.sort((a, b) => b[1] - a[1]);   // high to low
        for (const hand of rankedCategoryHands) {
            rankedHands.unshift(hand)
        }
    }

    let sum = 0
    let rank = 1
    for (hand of rankedHands) {
        sum += rank*hand[2]
        rank++
    }

    console.log(sum)
}