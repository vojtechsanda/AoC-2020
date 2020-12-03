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
(() => {
    // PART 1 CODE HERE
    console.log(`Part 1: ${'PART_1_VAR'}`); // Should be: PART 1 Solution
})()


/*------------*/
/*-- Part 2 --*/
/*------------*/
(() => {
    // PART 2 CODE HERE
    console.log(`Part 2: ${'PART_2_VAR'}`); // Should be: PART 2 Solution
})()