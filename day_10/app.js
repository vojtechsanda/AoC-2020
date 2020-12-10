const fs = require('file-system');
const path = require('path')

const exampleData = false;

const dataPath = path.resolve(__dirname, `input${exampleData ? '-example' : ''}.txt`);
const rawData = fs.readFileSync(dataPath);


/*----------------------*/
/*-- Input formatting --*/
/*----------------------*/
const rows = rawData.toString().split('\r\n');
const numRows = rows.map(strRow => Number(strRow));

numRows.sort((a,b) => a-b);


/*------------*/
/*-- Part 1 --*/
/*------------*/
const solvePart1 = (input, consoleOutput = true) => {
    let sum = [];

    for (let i = 1; i < numRows.length; i++) {
        const item = numRows[i];
        const prevItem = numRows[i-1];

        const diff = item - prevItem;

        if (!sum[diff-1]) {
            sum[diff-1] = 1;
        }
        sum[diff-1]++;
    }

    const finalNum = sum[0] * sum[2];

    if (consoleOutput) {
        console.log(`The answer to the part 1 is => ${finalNum}`); // Should be: 2240
    }

    return [finalNum];
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