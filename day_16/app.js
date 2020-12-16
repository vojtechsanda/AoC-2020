const fs = require('file-system');
const path = require('path')

const exampleData = true;

const dataPath = path.resolve(__dirname, `input${exampleData ? '-example' : ''}.txt`);
const rawData = fs.readFileSync(dataPath);


/*----------------------*/
/*-- Input formatting --*/
/*----------------------*/
const rows = rawData.toString().split('\r\n\r\n').map(row => row.split('\r\n'));


/*------------*/
/*-- Part 1 --*/
/*------------*/
const solvePart1 = (input, consoleOutput = true) => {
    const fields = [...input[0]].map(field => {
        const fieldDivided = field.split(': ')
        const fieldName = fieldDivided[0];
        const fieldRanges = fieldDivided[1].split(' or ').map(range => range.split('-').map(strNum => Number(strNum)));

        return [fieldName, fieldRanges];
    });
    const nearbyTickets = [...input[2].slice(1)].map(ticket => ticket.split(',').map(strNum => Number(strNum)));
    const nearbyTicketsBulk = nearbyTickets.reduce((acc, val) => acc = [...acc, ...val], [])

    const invalidTickets = [];

    nearbyTicketsBulk.forEach(ticket => {
        const possibleField = fields.find(field => {
            const ranges = field[1];
            let inRange = false;

            for (const range of ranges) {
                if (ticket >= range[0] && ticket <= range[1]) {
                    inRange = true;
                    break;
                }
            }

            return inRange;
        })

        if (!possibleField) {
            invalidTickets.push(ticket);
        }
    })

    const finalNum = invalidTickets.reduce((acc, val) => acc += val, 0)

    if (consoleOutput) {
        console.log(`The answer to the part 1 is => ${finalNum}`); // Example: 71, Normal: 21956
    }

    return [finalNum];
}
solvePart1(rows);


/*------------*/
/*-- Part 2 --*/
/*------------*/
const solvePart2 = (input, consoleOutput = true) => {
    // PART 2 CODE HERE

    if (consoleOutput) {
        console.log(`The answer to the part 2 is => ${'PART_2_SOLUTION'}`); // Example: EXAMPLE_PART_2_SOLUTION, Normal: PART_2_SOLUTION
    }

    return ['PART_2_SOLUTION'];
}
solvePart2('INPUT');


/*---------------*/
/*-- Utilities --*/
/*---------------*/