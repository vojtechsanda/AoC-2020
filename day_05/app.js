const fs = require('file-system');
const path = require('path')

const exampleData = false;

const dataPath = path.resolve(__dirname, `input${exampleData ? '-example' : ''}.txt`);
const rawData = fs.readFileSync(dataPath);


/*----------------------*/
/*-- Input formatting --*/
/*----------------------*/
const rows = rawData.toString().split('\r\n');


/*------------*/
/*-- Part 1 --*/
/*------------*/
const getSeat = directions => {
    let rowsNum = [0, 128];
    let columnsNum = [0, 8];

    directions.forEach((dir, index) => {
        if (index < 7) {
            const lower = rowsNum[0];
            const higher = rowsNum[1];
            const half = (higher-lower)/2;
            
            if (dir === 'F') {
                rowsNum[1] -= half;
            } else if (dir === 'B') {
                rowsNum[0] += half;
            }
        } else {
            const lower = columnsNum[0];
            const higher = columnsNum[1];
            const half = (higher-lower)/2;
            
            if (dir === 'L') {
                columnsNum[1] -= half;
            } else if (dir === 'R') {
                columnsNum[0] += half;
            }
        }
    });

    const seatRow = rowsNum[0];
    const seatColumn = columnsNum[0];

    return [seatRow, seatColumn];
}

const solvePart1 = (input, consoleOutput = true) => {
    const seatIds = input.map(inp => {
        const directions = inp.split('');
        
        const [seatRow, seatColumn] = getSeat(directions);

        const seatId = seatRow * 8 + seatColumn;

        return seatId;
    })

    const maxId = Math.max(...seatIds);

    if (consoleOutput) {
        console.log(`The answer to the part 1 is => ${maxId}`); // Should be: 838
    }

    return [maxId];
}
solvePart1(rows);


/*------------*/
/*-- Part 2 --*/
/*------------*/
const solvePart2 = (input, consoleOutput = true) => {
    const seats = input.map(inp => {
        const directions = inp.split('');
        
        return getSeat(directions);
    })

    let emptySeats = [];

    for (let row = 0; row < 128; row++) {
        for (let column = 0; column < 8; column++) {
            const seat = seats.find(seat => seat[0] === row && seat[1] === column);
            
            if (!seat) {
                emptySeats.push([row, column]);
            }
        }
    }

    const mySeat = emptySeats.find(seat => {
        const nearbySeats = [];
        nearbySeats.push([seat[0] + 1, seat[1]]);
        nearbySeats.push([seat[0] - 1, seat[1]]);
        nearbySeats.push([seat[0], seat[1] + 1]);
        nearbySeats.push([seat[0], seat[1] - 1]);

        const isNearbySeatEmpty = nearbySeats.find(nearbySeat => {
            const isSeatEmpty = seats.find(seat => seat[0] === nearbySeat[0] && seat[1] === nearbySeat[1]) ? false : true;

            return isSeatEmpty;
        }) ? true : false;

        return !isNearbySeatEmpty;
    });

    if (!mySeat) {
        console.log('All we had to do, was board the right plane, User!');
        return null;
    }

    const mySeatId = mySeat[0] * 8 + mySeat[1];

    if (consoleOutput) {
        console.log(`The answer to the part 2 is => ${mySeatId}`); // Should be: 714
    }

    return [mySeatId];
}
solvePart2(rows);