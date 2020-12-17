const fs = require('file-system');
const path = require('path')

const exampleData = false;

const dataPath1 = path.resolve(__dirname, `input${exampleData ? '-example' : ''}.txt`);
const rawData1 = fs.readFileSync(dataPath1);
const dataPath2 = path.resolve(__dirname, `input${exampleData ? '-example-2' : ''}.txt`);
const rawData2 = fs.readFileSync(dataPath2);


/*----------------------*/
/*-- Input formatting --*/
/*----------------------*/
const rows1 = rawData1.toString().split('\r\n\r\n').map(row => row.split('\r\n'));
const rows2 = rawData2.toString().split('\r\n\r\n').map(row => row.split('\r\n'));


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
// solvePart1(rows);


/*------------*/
/*-- Part 2 --*/
/*------------*/
const solvePart2 = (input, consoleOutput = true) => {
    const fields = [...input[0]].map(field => {
        const fieldDivided = field.split(': ')
        const fieldName = fieldDivided[0];
        const fieldRanges = fieldDivided[1].split(' or ').map(range => range.split('-').map(strNum => Number(strNum)));

        return [fieldName, fieldRanges];
    });
    const myFields = [...input[1].slice(1)].map(ticket => ticket.split(',').map(strNum => Number(strNum)))[0].reverse();
    const nearbyTickets = [...input[2].slice(1)].map(ticket => ticket.split(',').map(strNum => Number(strNum)));

    const filteredNearbyTickets = nearbyTickets.map(ticketNums => {
        const filteredTicketNums = ticketNums.filter(ticket => {
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

            if (possibleField) {
                return true;
            }
            return false;
        })

        return filteredTicketNums;
    })

    const columns = [];
    for (let i = 0; i < filteredNearbyTickets[0].length; i++) {
        const tickets = filteredNearbyTickets[i];

        tickets.forEach((ticket, j) => {
            if (!columns[j]) {
                columns[j] = [];
            }
            columns[j].push(ticket);
        })
    }

    const originalPossiblePositionNames = columns.map((column, i) => {
        const possibleFields = column.map(ticket => {
            const possibleField = fields.filter(field => {
                const ranges = field[1];
                let inRange = false;

                for (const range of ranges) {
                    if (ticket >= range[0] && ticket <= range[1]) {
                        inRange = true;
                        break;
                    }
                }

                return inRange;
            }).map(possibleField => possibleField[0])

            return possibleField;
        })

        const checkingPossibleFields = possibleFields[0];
        const reallyPossibleFields = checkingPossibleFields.filter(field => {
            const fieldsContaining = possibleFields.filter(possField => possField.indexOf(field) >= 0);
            return fieldsContaining.length === possibleFields.length;
        });

        return [i, reallyPossibleFields];
    });

    
    let possiblePositionNames = [...originalPossiblePositionNames];
    let positionNames = [];

    //! BUG: There is applied bad sorting
    // TODO: It should be sorted based on the number of occurences in other columns
    for (let i = 0; i < originalPossiblePositionNames.length; i++) {
        const posName = possiblePositionNames.shift();
        const realPosName = posName[1].find(name => positionNames.indexOf(name) === -1);
        positionNames[posName[0]] = realPosName;
    }

    let finalNum;
    if (!exampleData) {
        const positionNamesWithIndex = positionNames.map((posName, i) => [i, posName]);
        const departuresIndexes = positionNamesWithIndex.filter(posName => posName[1].startsWith('departure')).map(dep => dep[0]);
        console.log(positionNames, departuresIndexes);
        
        finalNum = departuresIndexes.reduce((acc, val) => acc *= myFields[val], 1);
    } else {
        finalNum = null;
    }

    if (consoleOutput) {
        console.log(`The answer to the part 2 is => ${finalNum}`); // Example: -------, Normal: PART_2_SOLUTION
    }

    return [finalNum];
}
solvePart2(rows2);


/*---------------*/
/*-- Utilities --*/
/*---------------*/