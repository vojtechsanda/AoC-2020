const fs = require('file-system');
const path = require('path')

const exampleData = false;

const dataPath = path.resolve(__dirname, `input${exampleData ? '-example' : ''}.txt`);
const rawData = fs.readFileSync(dataPath);


/*----------------------*/
/*-- Input formatting --*/
/*----------------------*/
const rows = rawData.toString().split('\r\n');


/*------------*/
/*-- Part 1 --*/
/*------------*/
const solvePart1 = (input, consoleOutput = true) => {
    // PART 1 CODE HERE

    if (consoleOutput) {
        console.log(`The answer to the part 1 is => ${'PART_1_SOLUTION'}`); // Should be: PART_1_SOLUTION
    }

    return ['PART_1_SOLUTION'];
}
solvePart1('INPUT');


/*------------*/
/*-- Part 2 --*/
/*------------*/
const solvePart2 = (input, consoleOutput = true) => {
    // PART 2 CODE HERE

    if (consoleOutput) {
        console.log(`The answer to the part 2 is => ${'PART_2_SOLUTION'}`); // Should be: PART_2_SOLUTION
    }

    return ['PART_2_SOLUTION'];
}
solvePart2('INPUT');