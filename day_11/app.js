const fs = require('file-system');
const path = require('path')

const exampleData = true;

const dataPath = path.resolve(__dirname, `input${exampleData ? '-example' : ''}.txt`);
const rawData = fs.readFileSync(dataPath);


/*----------------------*/
/*-- Input formatting --*/
/*----------------------*/
const rows = rawData.toString().split('\r\n');
const seats = rows.map(row => row.split(''));


/*------------*/
/*-- Part 1 --*/
/*------------*/
const solvePart1 = (input, consoleOutput = true) => {
    let newInput = JSON.parse(JSON.stringify(input));
    let prevStr, newStr;

    do {
        prevStr = newInput.join('');
        newInput = changeSeats(newInput);
        newStr = newInput.join('');
    } while (prevStr !== newStr);
    
    const occupiedSeats = newInput.map(row => row.filter(seat => seat === '#').length).reduce((acc, val) => acc += val, 0);
    
    if (consoleOutput) {
        console.log(`The answer to the part 1 is => ${occupiedSeats}`); // Example: 37, Normal: 2321
    }

    return [occupiedSeats];
}
solvePart1(seats);

function handleStatePart1(originalField, field, x, y) {
    const seat = originalField[y][x];
    const nearbyOccupiedNum = countNearbyOccupiedSeats(originalField, x, y, 1);

    if (seat === 'L') {
        // Empty -> Occupied
        if (nearbyOccupiedNum === 0) {
            field[y][x] = '#';
        }
    } else if (seat === '#') {
        // Occupied -> Empty
        if (nearbyOccupiedNum >= 4) {
            field[y][x] = 'L';
        }
    }

    return field;
}


/*------------*/
/*-- Part 2 --*/
/*------------*/
const solvePart2 = (input, consoleOutput = true) => {
    let newInput = JSON.parse(JSON.stringify(input));
    let prevStr, newStr;

    do {
        prevStr = newInput.join('');
        newInput = changeSeats(newInput, true);
        newStr = newInput.join('');
    } while (prevStr !== newStr);

    const occupiedSeats = newInput.map(row => row.filter(seat => seat === '#').length).reduce((acc, val) => acc += val, 0);

    if (consoleOutput) {
        console.log(`The answer to the part 2 is => ${occupiedSeats}`); // Example: 26, Normal: 2102
    }

    return [occupiedSeats];
}
solvePart2(seats);

function handleStatePart2(originalField, field, x, y) {
    const seat = originalField[y][x];
    const nearbyOccupiedNum = countNearbyOccupiedSeats(originalField, x, y, Infinity);

    if (seat === 'L') {
        // Empty -> Occupied
        if (nearbyOccupiedNum === 0) {
            field[y][x] = '#';
        }
    } else if (seat === '#') {
        // Occupied -> Empty
        if (nearbyOccupiedNum >= 5) {
            field[y][x] = 'L';
        }
    }

    return field;
}

/*---------------*/
/*-- Utilities --*/
/*---------------*/
function countNearbyOccupiedSeats(field, x, y, range = 1) {
    const dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
        [1, 1],
        [-1, 1],
        [1, -1],
        [-1, -1]
    ];

    let nearbySeats = [];

    for (let j = 1; j <= range && nearbySeats.filter(item => item).length < dirs.length ; j++) {
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];

            if (nearbySeats[i]) {
                continue;
            }

            if (!field[y + (j * dir[1])] || !field[y + (j * dir[1])][x + (j * dir[0])]) {
                nearbySeats[i] = 'x';
            } else if (field[y + (j * dir[1])][x + (j * dir[0])] === '#') {
                nearbySeats[i] = '#';
            } else if (field[y + (j * dir[1])][x + (j * dir[0])] === 'L') {
                nearbySeats[i] = 'L';
            }
        }
    }

    const occupiedNum = nearbySeats.filter(seat => seat === '#').length;

    return occupiedNum;
}

function changeSeats(input, isPart2 = false) {
    let inputJSON = JSON.stringify(input);
    let field = JSON.parse(inputJSON);
    let newField = JSON.parse(inputJSON);
    
    field.forEach((row, y) => {
        row.forEach((seat, x) => {
            if (isPart2) {
                newField = handleStatePart2(field, newField, x, y);
            } else {
                newField = handleStatePart1(field, newField, x, y);
            }
        })
    })

    return newField;
}