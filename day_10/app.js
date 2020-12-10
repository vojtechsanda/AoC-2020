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

    for (let i = 1; i < input.length; i++) {
        const item = input[i];
        const prevItem = input[i-1];

        const diff = item - prevItem;

        if (!sum[diff-1]) {
            sum[diff-1] = 1;
        }
        sum[diff-1]++;
    }

    const finalNum = sum[0] * sum[2];

    if (consoleOutput) {
        console.log(`The answer to the part 1 is => ${finalNum}`); // Example: 220, Normal: 2240
    }

    return [finalNum];
}
solvePart1(numRows);


/*------------*/
/*-- Part 2 --*/
/*------------*/
const solvePart2 = (input, consoleOutput = true) => {
    const editableInput = [0, ...Array.from(input)];

    let blocks = [];
    let lastSplit = 0;

    for (let index = 1; index < editableInput.length; index++) {
        const item = editableInput[index];
        const prevItem = editableInput[index-1];

        if (item - prevItem === 3) {
            blocks = [...blocks, editableInput.slice(lastSplit, index)];
            lastSplit = index;
        } else if (index === editableInput.length - 1) {
            blocks = [...blocks, editableInput.slice(lastSplit)];
        }
    }

    const maxBlockLength = Math.max(...blocks.map(block => block.length));
    const blockLengthPaths = findTribonacci(maxBlockLength);

    const blockPaths = blocks.map(block => blockLengthPaths[block.length - 1]);
    
    const finalNum = blockPaths.reduce((acc, val) => acc *= val, 1);

    if (consoleOutput) {
        console.log(`The answer to the part 2 is => ${finalNum}`); // Example: 19208, Normal: 99214346656768
    }

    return [finalNum];
}
solvePart2(numRows);


/*---------------*/
/*-- Utilities --*/
/*---------------*/
function findTribonacci(num) {
    let tribonacci = [1];

    for (let i = 1; i < num; i++) {
        const lastThree = tribonacci.slice(i - 3 > 0 ? i - 3 : 0, i);
        const lastThreeSum = lastThree.reduce((acc, val) => acc += val);

        tribonacci.push(lastThreeSum);
    }

    return tribonacci;
}