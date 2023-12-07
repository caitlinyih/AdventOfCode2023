/* START OF DATA PROCESSING */
const fs = require('fs');

let times
let distances
try {
    let schematic = fs.readFileSync('workInput.txt', 'utf8')
    let lines = schematic.split('\n')
    time = parseInt(lines[0].split(':')[1].replace(/\s/g, '').trim())
    distance = parseInt(lines[1].split(':')[1].replace(/\s/g, '').trim())
} catch (err) {
    console.error(err);
}
/* END OF DATA PROCESSING */


function solveQuadratic(a, b, c) {
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
        return []; // No real roots
    } else if (discriminant === 0) {
        return [-b / (2 * a)]; // One real root
    } else {
        const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        return [root1, root2]; // Two real roots
    }
}

function range(start, end) {
    const rangeArray = []
    for (let i = start; i <= end; i++) {
        rangeArray.push(i)
    }
    return rangeArray
}

const roots = solveQuadratic(-1, time, -distance)
const beatingNumbers = range(Math.floor(roots[0]+1), Math.ceil(roots[1]-1))

console.log(beatingNumbers.length)