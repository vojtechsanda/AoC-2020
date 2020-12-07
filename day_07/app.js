const fs = require('file-system');
const path = require('path')

const exampleData = false;

const dataPath = path.resolve(__dirname, `input${exampleData ? '-example' : ''}.txt`);
const rawData = fs.readFileSync(dataPath);


/*----------------------*/
/*-- Input formatting --*/
/*----------------------*/
const rows = rawData.toString().split('\r\n');

const cleanRows = rows.map(row => row.slice(0, -1));

const divided = cleanRows.map(row => row.split(' contain '));

const cleanItems = divided.map(row => {
    return [row[0].split(' ').slice(0, -1).join(' '), row[1].split(', ').map(r => r.split(' ').slice(0, -1).join(' '))]
})

const evenCleanerItems = cleanItems.map(item => {
    const items = item[1].map(bag => {
        const splittedBag = bag.split(' ');
        let num = splittedBag.shift();
        num = isNaN(num) ? num : Number(num);

        return [num, splittedBag.join(' ')];
    })

    return [item[0], items];
});


/*------------*/
/*-- Part 1 --*/
/*------------*/
const solvePart1 = (input, consoleOutput = true) => {
    // PART 1 CODE HERE
    let shinyGolds = cleanItems.filter(item => item[1].find(txt => txt.indexOf('shiny gold') >= 0)).map(i => i[0]);
    let shinyItems = [];

    do {
        shinyItems.push(shinyGolds);

        const anotherShinyGoldItems = shinyGolds.map(shinyGoldItem => {
            return cleanItems.filter(item => item[1].find(txt => txt.indexOf(shinyGoldItem) >= 0)).map(i => i[0]);
        })
        
        const uniqueItems = uniqueArr(anotherShinyGoldItems);
        shinyGolds = uniqueItems;

    } while (shinyGolds.length !== 0);

    uniqueShinyItemsCount = uniqueArr(shinyItems).length;

    if (consoleOutput) {
        console.log(`The answer to the part 1 is => ${uniqueShinyItemsCount}`); // Should be: 259
    }

    return [uniqueShinyItemsCount];
}
solvePart1(cleanItems);


/*------------*/
/*-- Part 2 --*/
/*------------*/
const solvePart2 = (input, consoleOutput = true) => {
    // PART 2 CODE HERE
    const allInnerBags = howMany('shiny gold');

    function howMany(name) {
        const item = input.find(inputItem => inputItem[0] === name)[1];

        if (item[0][0] === 'no') {
            // "No" other bags
            return false;
        }

        let count = 0;
        item.forEach(bag => {
            const bagColor = bag[1];
            const bagCount = bag[0];
            
            const counted = howMany(bagColor);
            count += (bagCount * (!counted ? 1 : counted));

            if (counted) {
                count += bag[0];
            }
        })

        return count;
    }

    if (consoleOutput) {
        console.log(`The answer to the part 2 is => ${allInnerBags}`); // Should be: 45018
    }

    return [allInnerBags];
}
solvePart2(evenCleanerItems);


/*---------------*/
/*-- Utilities --*/
/*---------------*/
function uniqueArr(arr) {
    const uniqueObj = arr.reduce((acc, val) => {
        val.forEach(v => {
            acc[v] = '';
        })
        return acc;
    }, {});

    return Object.keys(uniqueObj);
}