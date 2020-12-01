const fs = require('file-system');
const path = require('path')

const exampleData = false;

const dataPath = path.resolve(__dirname, `input${exampleData ? '-example' : ''}.txt`);
const rawData = fs.readFileSync(dataPath);
const rows = rawData.toString().split('\r').join('').split('\n');

/*------------*/
/*-- Part 1 --*/
/*------------*/
// PART 1 CODE

console.log(`Part 1: ${'PART_1_VAR'}`); // Should be: PART 1 Solution

/*------------*/
/*-- Part 2 --*/
/*------------*/
// PART 2 CODE

console.log(`Part 1: ${'PART_1_VAR'}`); // Should be: PART 2 Solution