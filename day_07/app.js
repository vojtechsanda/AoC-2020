const fs = require('file-system');
const path = require('path')

const exampleData = true;

const dataPath = path.resolve(__dirname, `input${exampleData ? '-example' : ''}.txt`);
const rawData = fs.readFileSync(dataPath);


/*----------------------*/
/*-- Input formatting --*/
/*----------------------*/
const rows = rawData.toString().split('\r\n');

const cleanRows = rows.map(row => row.slice(0, -1));

const divided = cleanRows.map(row => row.split(' contain '));

const cleanItems = divided.map(row => [row[0].split(' ').slice(0, -1).join(' '), row[1].split(', ').map(r => r.split(' ').slice(0, -1).join(' '))])

let shinyGolds = cleanItems.filter(item => item[1].find(txt => txt.indexOf('shiny gold') >= 0)).map(i => i[0]);


let counter = 0;

do {
    counter += shinyGolds.length;

    const anotherShinyGoldItems = shinyGolds.map(shinyGoldItem => {
        return cleanItems.filter(item => item[1].find(txt => txt.indexOf(shinyGoldItem) >= 0)).map(i => i[0]);
    })
    
    const x = anotherShinyGoldItems.reduce((acc, val) => {
        val.forEach(v => {
            acc[v] = '';
        })
    
        return acc;
    }, {});
    
    shinyGolds = Object.keys(x);
} while (shinyGolds.length !== 0);

console.log(counter);

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