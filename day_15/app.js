const fs = require('file-system');
const path = require('path')

const exampleData = false;

const dataPath = path.resolve(__dirname, `input${exampleData ? '-example' : ''}.txt`);
const rawData = fs.readFileSync(dataPath);


/*----------------------*/
/*-- Input formatting --*/
/*----------------------*/
const rows = rawData.toString().split('\r\n');
const inputNums = rows[0].split(',').map(strNum => Number(strNum));


/*------------*/
/*-- Part 1 --*/
/*------------*/
const solvePart1 = (input, consoleOutput = true) => {
    let storage = [...input];
    for (let i = storage.length; i < 2020; i++) {
        const lastNum = storage[i-1];
        const prevLastNumIndex = storage.slice(0, -1).lastIndexOf(lastNum);

        if (prevLastNumIndex === -1) {
            storage.push(0);
        } else {
            storage.push(i - (prevLastNumIndex+1));
        }
    }

    const finalNum = storage[storage.length - 1];

    if (consoleOutput) {
        console.log(`The answer to the part 1 is => ${finalNum}`); // Example: 436, Normal: 387
    }

    return ['PART_1_SOLUTION'];
}
solvePart1(inputNums);


/*------------*/
/*-- Part 2 --*/
/*------------*/
const solvePart2 = (input, consoleOutput = true) => {
    let storage = input.map((row, i) => [row, i]);
    for (let i = storage.length; i < 30000000; i++) {
        const lastNum = storage[storage.length-1];
        const restStorage = storage.slice(0, -1);
        restStorage.reverse();

        const prevLastNumIndex = restStorage.find(item => {
            return item[0] === lastNum[0];
        });
        
        if (prevLastNumIndex) {
            const evenResterStorage = storage.slice(0, prevLastNumIndex[1]);

            const evenPrevLastNumIndex = evenResterStorage.findIndex(item => {
                return item[0] === lastNum[0];
            });

            if (evenPrevLastNumIndex > -1) {
                storage.splice(evenPrevLastNumIndex, 1);
            }
        }

        if (prevLastNumIndex === undefined) {
            storage.push([0, i]);
        } else {
            storage.push([i - (prevLastNumIndex[1] + 1), i]);
        }

        if (i % 1000 === 0) {
            console.log(i/1000 + '/' + 30000 + ' - ' + ((i / 30000000) * 100).toFixed(4) + '%');
        }
    }

    const finalNum = storage[storage.length - 1][0];

    if (consoleOutput) {
        console.log(`The answer to the part 2 is => ${finalNum}`); // Example: EXAMPLE_PART_2_SOLUTION, Normal: PART_2_SOLUTION
    }

    return [finalNum];
}
solvePart2(inputNums);


/*---------------*/
/*-- Utilities --*/
/*---------------*/