const fs = require('file-system');
const path = require('path')

const exampleData = true;

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
    let fixNum = 0;
    for (let i = storage.length; i < 2020; i++) {
        const lastNum = storage[i-1-fixNum];
        const restStorage = storage.slice(0, -1);
        restStorage.reverse();

        const prevLastNumIndex = restStorage.find(item => {
            return item[0] === lastNum[0];
        });
        
        // if (prevLastNumIndex) {
        //     const evenResterStorage = storage.slice(0, prevLastNumIndex[1]);
        //     evenResterStorage.reverse();

        //     const evenPrevLastNumIndex = evenResterStorage.find(item => {
        //         return item[0] === lastNum[0];
        //     });

        //     if (evenPrevLastNumIndex) {
        //         storage.splice(evenPrevLastNumIndex[1], 1);
        //         fixNum++;
        //     }
        // }

        if (prevLastNumIndex === undefined) {
            storage.push([0, i]);
        } else {
            storage.push([i - (prevLastNumIndex[1] + 1), i]);
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