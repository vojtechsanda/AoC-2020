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
const rows1 = rawData1.toString().split('\r\n');
const blocks1 = formatInput(rows1);

const rows2 = rawData2.toString().split('\r\n');
const blocks2 = formatInput(rows2);



/*------------*/
/*-- Part 1 --*/
/*------------*/
const solvePart1 = (input, consoleOutput = true) => {
    let memory = [];

    input.forEach(block => {
        const safeInput = JSON.parse(JSON.stringify(block));
        const maskIndex = safeInput.findIndex(row => row[0] === 'mask');
        const mask = safeInput.splice(maskIndex, 1)[0][1];
        
        const mems = safeInput.map(row => {
            const memNum = row[0].split('[')[1].split(']')[0];
            return [memNum, row[1]];
        })
    
        mems.forEach(mem => {
            let binVal = Number(mem[1]).toString(2);
            
            while (binVal.length !== 36) {
                binVal = '0' + binVal;
            }
    
            const splittedMask = mask.split('');
            const maskedBinVal = binVal.split('').map((bit, i) => splittedMask[i] === 'X' ? bit : splittedMask[i]).join('');
    
            const maskedVal = parseInt(maskedBinVal, 2);
            memory[mem[0]] = maskedVal;
        })
    })

    const filteredMemory = memory.filter(mem => mem);
    const finalNum = filteredMemory.reduce((acc, val) => acc += val, 0);

    if (consoleOutput) {
        console.log(`The answer to the part 1 is => ${finalNum}`); // Example: 165, Normal: PART_1_SOLUTION
    }

    return [finalNum];
}
solvePart1(blocks1);


/*------------*/
/*-- Part 2 --*/
/*------------*/
const solvePart2 = (input, consoleOutput = true) => {
    let memory = [];

    input.forEach((block, i) => {
        const safeInput = JSON.parse(JSON.stringify(block));
        const maskIndex = safeInput.findIndex(row => row[0] === 'mask');
        const mask = safeInput.splice(maskIndex, 1)[0][1];
        
        const mems = safeInput.map(row => {
            const memNum = row[0].split('[')[1].split(']')[0];
            return [memNum, row[1]];
        })
        
        mems.forEach(mem => {
            let binVal = Number(mem[0]).toString(2);
            while (binVal.length !== 36) {
                binVal = '0' + binVal;
            }

            const splittedMask = mask.split('');
            const maskedBinVal = binVal.split('').map((bit, i) => splittedMask[i] === 'X' ? 'X' : (splittedMask[i] === '1' ? '1' : bit)).join('');

            let indexes = [];
            let i = -1;
            while ((i = mask.indexOf('X', i+1)) !== -1){
                indexes.push(i);
            }
            
            let combinations = [];
            findCombination(indexes.length, 0, combinations, []);
            findCombination(indexes.length, 1, combinations, []);
            
            combinations = combinations.filter((item, i) => i % 2 === 0);

            let addresses = combinations.map(comb => {
                let splittedMask = maskedBinVal.split('');

                indexes.forEach((index, i) => {
                    splittedMask.splice(index, 1, comb[i]);
                })
                return parseInt(splittedMask.join(''), 2);
            })

            addresses.forEach(address => {
                memory[Number(address)] = mem[1];
            })
        })
    })

    const filteredMemory = memory.filter(mem => mem);
    const finalNum = filteredMemory.reduce((acc, val) => acc += Number(val), 0);

    if (consoleOutput) {
        console.log(`The answer to the part 2 is => ${finalNum}`); // Example: 208, Normal: PART_2_SOLUTION
    }

    return [finalNum];
}
solvePart2(blocks2);


/*---------------*/
/*-- Utilities --*/
/*---------------*/
function findCombination(leftIterations, currentBit, arr, tmpArr) {
    if (leftIterations > 0) {
        tmpArr = [...tmpArr];
        tmpArr.push(currentBit);

        findCombination(leftIterations - 1, 0, arr, tmpArr);
        findCombination(leftIterations - 1, 1, arr, tmpArr);
    } else {
        arr.push(tmpArr);
    }

    return currentBit;
}

function formatInput(rows) {
    const splittedRows = rows.map(row => row.split(' = '));

    let blockBreakingIndexes = [];
    splittedRows.forEach((row, i) => {
        if (row[0] == 'mask') {
            blockBreakingIndexes.push(i);
        }
    })
    blockBreakingIndexes.push(splittedRows.length);
    
    let blocks = [];
    blockBreakingIndexes.forEach((index, i) => {
        if (i > 0) {
            const prevIndex = blockBreakingIndexes[i - 1];
            blocks.push(splittedRows.slice(prevIndex, index));
        }
    })

    return blocks;
}