const fs = require('fs');
const readline = require('readline');

// This method is asynchronous and non-blocking. It reads the file in chunks, emitting events as it processes the file, which makes it suitable for reading large files without consuming too much memory at once.
const stream = fs.createReadStream(__dirname + '/input.txt');

// The stream emits events as it reads data from the file, and the readline interface defined below consumes these events
// As it receives data chunks, it extracts lines from this data
// For each complete line that readline extracts from the data chunks, it emits a 'line' event
// So when you use the readline module to process data from a stream, it emits its own set of events as it reads and interprets the data. 
const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
});

rl.on('line', (l) => {
    //console.log(l);
    processLine(l);
    //console.log('==============');
});

rl.on('error', (e) => {
    console.error(e);
});

const specialChars = ['*','#','+','$','%','-','=','&','@','/']
let previousLine = null
let sum = 0

// for each line, check if numbers are touching a special char in line above and if special chars are touching numbers in line above
const processLine = (line) => {
    if (previousLine === null) {
        previousLine = line
        return
    }

    let previousLineNumberIndices = findNumberIndices(previousLine)
    let previousLineSpecialCharIndices = findSpecialCharIndices(previousLine)

    let numberIndices = findNumberIndices(line)
    let specialCharIndices = findSpecialCharIndices(line)
    
    for (const [startIndex, endIndex] of numberIndices) {
        let specialCharFound = false

        // is there a special character in the previous line at index points startindex-1 to endindex+1?
        for (let index of previousLineSpecialCharIndices) {
            if (index >= startIndex-1 && index <=endIndex+1) {
                sum += parseInt(line.substring(startIndex, endIndex+1))
                specialCharFound = true;
            }
        }
        // is there a special character either side?
        if (!specialCharFound && specialChars.includes(line.charAt(startIndex-1)) || specialChars.includes(line.charAt(endIndex+1))) {
            sum += parseInt(line.substring(startIndex, endIndex+1))
        }
    }

    for (const index of specialCharIndices) {   // of returns values not index positions :)
        console.log(index)
        // is there a number in the previous line adjacent to this special char
        for (const [startIndex, endIndex] of previousLineNumberIndices) {
            console.log(startIndex + ", " + endIndex)
            if (index >= startIndex-1 && index <=endIndex+1) {
                console.log("hi")
                console.log(parseInt(previousLine.substring(startIndex, endIndex+1)))
                sum += parseInt(previousLine.substring(startIndex, endIndex+1))
            }
        }
    }

    previousLine = line

    console.log(sum)
};

function findNumberIndices(str) {
    const regex = /\d+/g;
    const matches = str.matchAll(regex);
    const indices = [];

    for (const match of matches) {
        // The start index is `match.index`
        // The end index is `match.index + match[0].length - 1`
        indices.push([match.index, match.index + match[0].length - 1]);
    }

    return indices;
}

function findSpecialCharIndices(str) {
    const regex = /(\*|\#|\+|\$|\%|\-|\=|\&|\@|\/)/g;
    const matches = str.matchAll(regex);
    const indices = [];

    for (const match of matches) {
        // The start index is `match.index`
        // The end index is `match.index + match[0].length - 1`
        indices.push(match.index);
    }

    return indices;
}