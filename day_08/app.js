const fs = require('file-system');
const path = require('path')

const exampleData = false;

const dataPath = path.resolve(__dirname, `input${exampleData ? '-example' : ''}.txt`);
const rawData = fs.readFileSync(dataPath);


/*----------------------*/
/*-- Input formatting --*/
/*----------------------*/
const rows = rawData.toString().split('\r\n');
const formattedRows = rows.map(row => {
    let splittedRow = row.split(' ');
    splittedRow[1] = Number(splittedRow[1]);

    return splittedRow;
});


/*------------*/
/*-- Part 1 --*/
/*------------*/
const solvePart1 = (input, consoleOutput = true, changeIndex = -1) => {
    let acc = 0, nextIndex = 0, indexHistory = [], possibleChangeCounter = 0;

    input = JSON.parse(JSON.stringify(input));

    while (indexHistory.indexOf(nextIndex) === -1 && nextIndex < input.length) {
        const command = input[nextIndex];
        indexHistory.push(nextIndex);

        // Part 2 code start
        if (command[0] === 'jmp' || command[0] === 'nop') {
            if (possibleChangeCounter === changeIndex) {
                command[0] = command[0] === 'nop' && command[1] !== 0 ? 'jmp' : 'nop';
            }
            possibleChangeCounter++;
        }
        // Part 2 code end

        if (command[0] === 'acc') {
            acc = eval(acc + command[1]);
        }

        if (command[0] === 'jmp') {
            nextIndex = eval(nextIndex + command[1]);
        } else {
            nextIndex++;
        }
    }


    if (consoleOutput) {
        console.log(`The answer to the part 1 is => ${acc}`); // Should be: 1586
    }

    return [acc, nextIndex >= input.length];
}
solvePart1(formattedRows);


/*------------*/
/*-- Part 2 --*/
/*------------*/
const solvePart2 = (input, consoleOutput = true) => {
    let i = 0, found = false, foundItem;

    while (!found) {
        foundItem = solvePart1(input, false, i);
        found = foundItem[1];

        i++;
    }

    const finalAcc = foundItem[0];

    if (consoleOutput) {
        console.log(`The answer to the part 2 is => ${finalAcc}`); // Should be: 703
    }

    return [finalAcc];
}
solvePart2(formattedRows);