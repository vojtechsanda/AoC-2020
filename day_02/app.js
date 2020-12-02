const fs = require('file-system');
const path = require('path')

const exampleData = false;

const dataPath = path.resolve(__dirname, `input${exampleData ? '-example' : ''}.txt`);
const rawData = fs.readFileSync(dataPath);
const rows = rawData.toString().split('\r').join('').split('\n');


/*----------------------*/
/*-- Input formatting --*/
/*----------------------*/
const splittedRows = rows.map(row => row.split(': '));
const formattedInput = splittedRows.map(row => {
    const letter = row[0].split(' ')[1];
    const minTimes = Number(row[0].split(' ')[0].split('-')[0]);
    const maxTimes = Number(row[0].split(' ')[0].split('-')[1]);
    const pass = row[1];

    return {
        letter,
        minTimes,
        maxTimes,
        pass
    };
})


/*------------*/
/*-- Part 1 --*/
/*------------*/
const validInputs = formattedInput.filter(row => {
    counter = 0
    row.pass.split('').forEach(letter => {
        if (letter == row.letter) {
            counter++
        }
    })

    if (row.minTimes <= counter && row.maxTimes >= counter) {
        return true;
    }

    return false
})

console.log(`Part 1: ${validInputs.length}`); // Should be: 439


/*------------*/
/*-- Part 2 --*/
/*------------*/
const validInputsPart2 = formattedInput.filter(input => {
    const firstPositionValid = input.pass.charAt(input.minTimes-1) === input.letter
    const secondPositionValid = input.pass.charAt(input.maxTimes-1) === input.letter
    
    if ((firstPositionValid && !secondPositionValid) || (!firstPositionValid && secondPositionValid)) {
        return true
    }

    return false
})

console.log(`Part 2: ${validInputsPart2.length}`); // Should be: 584