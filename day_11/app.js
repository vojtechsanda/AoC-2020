const fs = require('file-system');
const path = require('path')

const exampleData = false;

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
const handleState = (originalField, field, x, y) => {
    const seat = originalField[y][x];

    if (
        // Empty -> Occupied
        seat === 'L' &&
        ((originalField[y-1] && (originalField[y-1][x-1] !== '#')) || !originalField[y-1]) &&
        ((originalField[y+1] && (originalField[y+1][x-1] !== '#')) || !originalField[y+1]) &&
        ((originalField[y-1] && (originalField[y-1][x+1] !== '#')) || !originalField[y-1]) &&
        ((originalField[y+1] && (originalField[y+1][x+1] !== '#')) || !originalField[y+1]) &&
        ((originalField[y+1] && (originalField[y+1][x] !== '#')) || !originalField[y+1]) &&
        ((originalField[y-1] && (originalField[y-1][x] !== '#')) || !originalField[y-1]) &&
        originalField[y][x+1] !== '#' &&
        originalField[y][x-1] !== '#'
    ) {
        field[y][x] = '#';
    } else if (seat === '#') {
        // Occupied -> Empty
        let occupiedCounter = 0;
        occupiedCounter += (originalField[y-1] && originalField[y-1][x-1] === '#' ? 1 : 0);
        occupiedCounter += (originalField[y+1] && originalField[y+1][x-1] === '#' ? 1 : 0);
        occupiedCounter += (originalField[y-1] && originalField[y-1][x+1] === '#' ? 1 : 0);
        occupiedCounter += (originalField[y+1] && originalField[y+1][x+1] === '#' ? 1 : 0);
        occupiedCounter += (originalField[y+1] && originalField[y+1][x] === '#' ? 1 : 0);
        occupiedCounter += (originalField[y-1] && originalField[y-1][x] === '#' ? 1 : 0);
        occupiedCounter += (originalField[y][x+1] === '#' ? 1 : 0);
        occupiedCounter += (originalField[y][x-1] === '#' ? 1 : 0);

        if (occupiedCounter >= 4) {
            field[y][x] = 'L';
        }
    }

    return field;
}

const changeSeats = input => {
    let inputJSON = JSON.stringify(input);
    let field = JSON.parse(inputJSON);
    let newField = JSON.parse(inputJSON);

    field.forEach((row, y) => {
        row.forEach((seat, x) => {
            newField = handleState(field, newField, x, y);
        })
    })

    return newField;
}

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


/*------------*/
/*-- Part 2 --*/
/*------------*/
const solvePart2 = (input, consoleOutput = true) => {
    // PART 2 CODE HERE

    if (consoleOutput) {
        console.log(`The answer to the part 2 is => ${'PART_2_SOLUTION'}`); // Should be: PART_2_SOLUTION
    }

    return ['PART_2_SOLUTION'];
}
solvePart2('INPUT');