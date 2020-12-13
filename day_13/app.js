const fs = require('file-system');
const path = require('path')

const exampleData = false;

const dataPath = path.resolve(__dirname, `input${exampleData ? '-example' : ''}.txt`);
const rawData = fs.readFileSync(dataPath);


/*----------------------*/
/*-- Input formatting --*/
/*----------------------*/
const rows = rawData.toString().split('\r\n');
const betterRows = [Number(rows[0]), rows[1].split(',').map(strNum => isNaN(strNum) ? strNum : Number(strNum))];


/*------------*/
/*-- Part 1 --*/
/*------------*/
const solvePart1 = (input, consoleOutput = true) => {
    const estimatedTimestamp = input[0];
    const busLines = input[1].filter(num => !isNaN(num));
    
    const earliestBusTimestamps = busLines.map(line => {
        let earliestLineTimestamp = 0;

        while (earliestLineTimestamp < estimatedTimestamp) {
            earliestLineTimestamp += line;
        }

        return [earliestLineTimestamp, line];
    })

    const bestBusTimestamp = Math.min(...earliestBusTimestamps.map(stampObj => stampObj[0]));

    const finalNum = (bestBusTimestamp - estimatedTimestamp) * earliestBusTimestamps.find(stampObj => stampObj[0] === bestBusTimestamp)[1];

    if (consoleOutput) {
        console.log(`The answer to the part 1 is => ${finalNum}`); // Example: 295, Normal: 2935
    }

    return [finalNum];
}
solvePart1(betterRows);


/*------------*/
/*-- Part 2 --*/
/*------------*/
const solvePart2 = (input, consoleOutput = true) => {
    const lines = input[1];

    const linesArr = lines.reverse().map((line, i) => [line, i]);
    const filteredLines = linesArr.filter(line => line[0] !== 'x');
    
    const firstNum = filteredLines[0][0];
    const secondNum = filteredLines[1][0];
    const secondOffset = filteredLines[1][1];

    let secondNumMultiplier = 1;
    let prevSum = 0;

    while ((prevSum = (secondNum * secondNumMultiplier + secondOffset)) % firstNum !== 0) {
        secondNumMultiplier++;
    }

    for (let i = 2; i < filteredLines.length; i++) {
        let prevNums = filteredLines.map(line => line[0]).slice(0, i);
        let currentNum = filteredLines[i][0];
        let currentOffset = filteredLines[i][1];

        prevSum = findRemindedLcm(prevNums, currentNum, currentOffset, prevSum);
    }

    const earliestTimestamp = prevSum - filteredLines[filteredLines.length - 1][1];

    if (consoleOutput) {
        console.log(`The answer to the part 2 is => ${earliestTimestamp}`); // Example: 1068781, Normal: 836024966345345
    }

    return [earliestTimestamp];
}
solvePart2(betterRows);


/*---------------*/
/*-- Utilities --*/
/*---------------*/
function findRemindedLcm(prevNums, currentNum, currentOffset, prevFinal) {
    const lcm = prevNums.reduce((acc, val) => acc * val, 1);

    const randomSum = prevFinal - currentOffset;

    const lcmReminder = lcm % currentNum;
    const randomSumReminder = randomSum % currentNum;

    let lcmMultiplier = 1;
    while ((s = (lcmReminder * lcmMultiplier + randomSumReminder)) % currentNum !== 0) {
        lcmMultiplier++;
    }

    let sum = lcm * lcmMultiplier + prevFinal;

    return sum;
}