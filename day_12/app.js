const fs = require('file-system');
const path = require('path')

const exampleData = false;

const dataPath = path.resolve(__dirname, `input${exampleData ? '-example' : ''}.txt`);
const rawData = fs.readFileSync(dataPath);


/*----------------------*/
/*-- Input formatting --*/
/*----------------------*/
const rows = rawData.toString().split('\r\n');
const splittedRows = rows.map(row => [row.slice(0, 1), Number(row.slice(1))]);


/*------------*/
/*-- Part 1 --*/
/*------------*/
const solvePart1 = (input, consoleOutput = true) => {
    // PART 1 CODE HERE
    const facings = ['E', 'S', 'W', 'N'];
    let facingDir = 0;
    let coords = [0, 0];

    input.forEach(cmnd => {
        const dir = cmnd[0];

        if (dir === 'R' || dir === 'L') {
            facingDir = rotateFacing(cmnd, facingDir, facings.length);
        } else {
            updateCoords(coords, dir === 'F' ? facings[facingDir] : dir, cmnd[1]);
        }
    })

    const manhattanDistance = coords.reduce((acc, val) => acc + Math.abs(val), 0);

    if (consoleOutput) {
        console.log(`The answer to the part 1 is => ${manhattanDistance}`); // Example: 25, Normal: 364
    }

    return [manhattanDistance];
}
solvePart1(splittedRows);


/*------------*/
/*-- Part 2 --*/
/*------------*/
const solvePart2 = (input, consoleOutput = true) => {
    let waypointCoords = [10, 1];
    let ferryCoords = [0, 0];

    input.forEach(cmnd => {
        const dir = cmnd[0];

        const xDiff = waypointCoords[0] - ferryCoords[0];
        const yDiff = waypointCoords[1] - ferryCoords[1];

        if (dir === 'F') {
            ferryCoords[0] += xDiff * cmnd[1];
            ferryCoords[1] += yDiff * cmnd[1];

            waypointCoords[0] += xDiff * cmnd[1];
            waypointCoords[1] += yDiff * cmnd[1];
        } else if (dir === 'R' || dir === 'L') {
            rotateWaypoint(cmnd, [xDiff, yDiff], ferryCoords, waypointCoords);
        } else {
            updateCoords(waypointCoords, dir, cmnd[1]);
        }
    })

    const manhattanDistance = ferryCoords.reduce((acc, val) => acc + Math.abs(val), 0);

    if (consoleOutput) {
        console.log(`The answer to the part 2 is => ${manhattanDistance}`); // Example: 286, Normal: 39518
    }

    return [manhattanDistance];
}
solvePart2(splittedRows);


/*---------------*/
/*-- Utilities --*/
/*---------------*/
function rotateFacing(cmnd, facingDir, facingsLength) {
    const rotateNum = cmnd[1] / 90;
            
    if (cmnd[0] === 'R') {
        let newRawDirNum = facingDir + rotateNum;
        facingDir = Math.floor(newRawDirNum % facingsLength);
    } else {
        let newRawDirNum = facingDir - rotateNum;
        newRawDirNum = Math.floor(newRawDirNum % facingsLength);
        facingDir = (newRawDirNum < 0 ? facingsLength : 0) + newRawDirNum;
    }

    return facingDir;
}

function rotateWaypoint(cmnd, difs, ferryCoords, waypointCoords) {
    let newPositivnessIndex;

    const [xDiff, yDiff] = difs;

    const positivnesses = [
        [true, true],
        [true, false],
        [false, false],
        [false, true]
    ];
            
    const rotateNum = cmnd[1] / 90;

    const isXPositive = xDiff >= 0;
    const isYPositive = yDiff >= 0;

    let currentPositivnessIndex = positivnesses.findIndex(item => item[0] === isXPositive && item[1] === isYPositive);
    
    if (cmnd[0] === 'R') {
        let newRawDirNum = currentPositivnessIndex + rotateNum;
        newPositivnessIndex = Math.floor(newRawDirNum % positivnesses.length);
    } else {
        let newRawDirNum = currentPositivnessIndex - rotateNum;
        newRawDirNum = Math.floor(newRawDirNum % positivnesses.length);
        newPositivnessIndex = (newRawDirNum < 0 ? positivnesses.length : 0) + newRawDirNum;
    }
    
    const finalPositivness = positivnesses[newPositivnessIndex];

    const newXDiff = finalPositivness[0] !== (rotateNum % 2 === 0 ? isXPositive : isYPositive) ? (rotateNum % 2 === 0 ? xDiff : yDiff) * (-1) : (rotateNum % 2 === 0 ? xDiff : yDiff);
    const newYDiff = finalPositivness[1] !== (rotateNum % 2 === 0 ? isYPositive : isXPositive) ? (rotateNum % 2 === 0 ? yDiff : xDiff) * (-1) : (rotateNum % 2 === 0 ? yDiff : xDiff);

    waypointCoords[0] = ferryCoords[0] + newXDiff;
    waypointCoords[1] = ferryCoords[1] + newYDiff;
}

function updateCoords(coords, dir, num) {
    if (dir === 'E') {
        coords[0] += num;
    } else if (dir === 'W') {
        coords[0] -= num;
    } else if (dir === 'N') {
        coords[1] += num;
    } else if (dir === 'S') {
        coords[1] -= num;
    }
}