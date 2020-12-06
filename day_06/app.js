const fs = require('file-system');
const path = require('path')

const exampleData = false;

const dataPath = path.resolve(__dirname, `input${exampleData ? '-example' : ''}.txt`);
const rawData = fs.readFileSync(dataPath);


/*----------------------*/
/*-- Input formatting --*/
/*----------------------*/
const groups = rawData.toString().split('\r\n\r\n');
const rowGroups = groups.map(group => group.split('\r\n'));


/*------------*/
/*-- Part 1 --*/
/*------------*/
const solvePart1 = (input, consoleOutput = true) => {
    const groupTexts = input.map(group => group.join(''));
    const groupsUniqueAns = [];

    groupTexts.forEach((txt, i) => {
        if (!groupsUniqueAns[i] && groupsUniqueAns[i] !== '') {
            groupsUniqueAns[i] = '';
        }

        txt.split('').forEach(char => {
            if (groupsUniqueAns[i].indexOf(char) === -1) {
                groupsUniqueAns[i] += char;
            }
        })
    })

    const totalSum = groupsUniqueAns.reduce((acc, val) => acc += val.length, 0);

    if (consoleOutput) {
        console.log(`The answer to the part 1 is => ${totalSum}`); // Should be: 6585
    }

    return [totalSum];
}
solvePart1(rowGroups);


/*------------*/
/*-- Part 2 --*/
/*------------*/
const solvePart2 = (input, consoleOutput = true) => {
    let answersInCommon = [];

    input.forEach(group => {
        const baseTxt = group[0].split('');

        answersInCommon = [...answersInCommon, ...baseTxt.filter(char => {
            let isEverywhere = true;

            for (let i = 1; i < group.length && isEverywhere; i++) {
                if (group[i].indexOf(char) === -1) {
                    isEverywhere = false;
                }
            }

            return isEverywhere;
        })];
    });

    const totalSum = answersInCommon.length;

    if (consoleOutput) {
        console.log(`The answer to the part 2 is => ${totalSum}`); // Should be: 3276
    }

    return [totalSum];
}
solvePart2(rowGroups);