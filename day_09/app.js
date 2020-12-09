const fs = require('file-system');
const path = require('path')

const exampleData = false;

const dataPath = path.resolve(__dirname, `input${exampleData ? '-example' : ''}.txt`);
const rawData = fs.readFileSync(dataPath);


/*----------------------*/
/*-- Input formatting --*/
/*----------------------*/
const rows = rawData.toString().split('\r\n');
const numRows = rows.map(strNum => Number(strNum));


/*------------*/
/*-- Part 1 --*/
/*------------*/
const solvePart1 = (input, consoleOutput = true) => {
    let foundItem, invalidItem;
    const preambleLength = exampleData ? 5 : 25;
    const preamblessInput = input.slice(preambleLength);

    for (let i = 0; i < preamblessInput.length; i++) {
        const item = preamblessInput[i];
        const workingItems = input.slice(i, (preambleLength + i));

        for (const workingItem of workingItems) {
            foundItem = workingItems.find(workingItem2 => workingItem2 + workingItem === item);

            if (foundItem) {
                break;
            }
        }

        if (!foundItem) {
            invalidItem = item;
            break;
        }
    }

    if (consoleOutput) {
        console.log(`The answer to the part 1 is => ${invalidItem}`); // Example: 127, Normal: 217430975
    }

    return [invalidItem];
}
solvePart1(numRows);


/*------------*/
/*-- Part 2 --*/
/*------------*/
const solvePart2 = (input, consoleOutput = true) => {
    let minMaxSeq;
    const invalidNumber = solvePart1(input, false)[0];

    for (let i = 0; i < input.length; i++) {
        let checkSum = 0, addedNums = [];
        
        for (let j = 1; j < input.length - i; j++) {
            const nextItem = input[(i+j)-1];

            checkSum += nextItem;
            addedNums.push(nextItem);

            if (checkSum === invalidNumber) {
                minMaxSeq = [Math.min(...addedNums), Math.max(...addedNums)];
                break;
            } else if (checkSum > invalidNumber) {
                break;
            }
        }

        if (minMaxSeq) {
            break;
        }
    }

    const [minNum, maxNum] = minMaxSeq;
    const finalSum = minNum + maxNum;

    if (consoleOutput) {
        console.log(`The answer to the part 2 is => ${finalSum}`); // Example: 62, Normal: 28509180
    }

    return [finalSum];
}
solvePart2(numRows);