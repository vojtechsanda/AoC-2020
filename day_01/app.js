const fs = require('file-system');
const path = require('path')

const rawData = fs.readFileSync(path.resolve(__dirname, 'input.txt'));
const rows = rawData.toString().split('\r').join('').split('\n');

const numRows = rows.map(strNum => Number(strNum));

/*------------*/
/*-- Part 1 --*/
/*------------*/
let matchedPair, finalNum;

let index = 0;
for (const num of numRows) {
    const foundNum = numRows.slice(index+1).find(findingNum => num + findingNum === 2020);

    if (foundNum) {
        matchedPair = [num, foundNum]
        break;
    }
    index++;
}

finalNum = matchedPair.reduce((acc, val) => acc*val);

console.log(`Part 1: ${finalNum}`); // Should be: 197451

/*------------*/
/*-- Part 2 --*/
/*------------*/
let matchedPairPart2;
numRows.forEach(num1 => {
    numRows.forEach(num2 => {
        numRows.forEach(num3 => {
            if (num1 + num2 + num3 === 2020) {
                matchedPairPart2 = [num1, num2, num3];
            }
        })
    })
})

finalNumPart2 = matchedPairPart2.reduce((acc, val) => acc*val);

console.log(`Part 2: ${finalNumPart2}`); // Should be: 138233720