const fs = require('file-system');
const path = require('path')

const exampleData = false;

const dataPath = path.resolve(__dirname, `input${exampleData ? '-example' : ''}.txt`);
const rawData = fs.readFileSync(dataPath);


/*----------------------*/
/*-- Input formatting --*/
/*----------------------*/
const rows = rawData.toString().split('\r\n');
const rowsSplitted = rows.map(row => row.split(''));


/*------------*/
/*-- Part 1 --*/
/*------------*/
(() => {
    const allRowsNum = rowsSplitted.length;
    const oneColumnWidth = rowsSplitted[0].length;
    
    const requiredColumns = Math.ceil(((allRowsNum-1)*3)/oneColumnWidth);
    
    const fullWidthRows = rowsSplitted.map(row => {
        let newRow = [];
    
        for (let i = 0; i < requiredColumns; i++) {
            newRow = [...newRow, ...row];
        }
    
        return newRow;
    });
    
    let xPos = 0;
    let yPos = 0;
    let treeEncounters = 0;
    
    for (let i = 0; i < allRowsNum; i++) {
        if (fullWidthRows[yPos][xPos] === '#') {
            treeEncounters++;
        }
    
        xPos += 3;
        yPos += 1;
    }
    
    console.log(`Part 1: ${treeEncounters}`); // Should be: 211
})();


/*------------*/
/*-- Part 2 --*/
/*------------*/
(() => {
    const allRowsNum = rowsSplitted.length;
    const oneColumnWidth = rowsSplitted[0].length;
    
    const ways = [
        {
            rightStep: 1,
            downStep: 1
        },
        {
            rightStep: 3,
            downStep: 1
        },
        {
            rightStep: 5,
            downStep: 1
        },
        {
            rightStep: 7,
            downStep: 1
        },
        {
            rightStep: 1,
            downStep: 2
        }
    ];
    
    const largestRightStep = Math.max(...ways.map(way => Number(way.rightStep)));
    const requiredColumns = Math.ceil(((allRowsNum-1)*largestRightStep)/oneColumnWidth);
    
    const fullWidthRows = rowsSplitted.map(row => {
        let newRow = [];
    
        for (let i = 0; i < requiredColumns; i++) {
            newRow = [...newRow, ...row];
        }
    
        return newRow;
    });
    
    
    const treeEncountersStorage = [];
    ways.forEach(way => {
        let xPos = 0;
        let yPos = 0;
        let treeEncounters = 0;
    
        for (let i = 0; i < allRowsNum; i++) {
            if (fullWidthRows[yPos]) {
                if (fullWidthRows[yPos][xPos] === '#') {
                    treeEncounters++;
                }
                xPos += way.rightStep;
                yPos += way.downStep;
            }
        }
    
        treeEncountersStorage.push(treeEncounters);
    });
    
    const multipliedTreeEncounters = treeEncountersStorage.reduce((acc, val) => acc*val);
    
    console.log(`Part 2: ${multipliedTreeEncounters}`); // Should be: 3584591857
})()