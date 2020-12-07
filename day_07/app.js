const fs = require('file-system');
const path = require('path')

const exampleData = true;

const dataPath = path.resolve(__dirname, `input${exampleData ? '-example' : ''}.txt`);
const rawData = fs.readFileSync(dataPath);


/*----------------------*/
/*-- Input formatting --*/
/*----------------------*/
const rows = rawData.toString().split('\r\n');

const cleanRows = rows.map(row => row.slice(0, -1));

const divided = cleanRows.map(row => row.split(' contain '));

const cleanItems = divided.map(row => {
    try {
        return [row[0].split(' ').slice(0, -1).join(' '), row[1].split(', ').map(r => r.split(' ').slice(0, -1).join(' '))]
    } catch {
        console.log(row);
    }
})

let shinyGolds = cleanItems.filter(item => item[1].find(txt => txt.indexOf('shiny gold') >= 0)).map(i => i[0]);

let counter = 0;

let w = [];

do {
    counter += shinyGolds.length;
    w.push(shinyGolds);

    const anotherShinyGoldItems = shinyGolds.map(shinyGoldItem => {
        return cleanItems.filter(item => item[1].find(txt => txt.indexOf(shinyGoldItem) >= 0)).map(i => i[0]);
    })
    
    const x = anotherShinyGoldItems.reduce((acc, val) => {
        val.forEach(v => {
            acc[v] = '';
        })
    
        return acc;
    }, {});
    
    shinyGolds = Object.keys(x);

} while (shinyGolds.length !== 0);

d = w.reduce((acc, val) => {
    val.forEach(v => {
        acc[v] = '';
    })
    return acc;
}, {});

// console.log(Object.keys(d).length);


const idk = cleanItems.map(d => {
    x = d[1].map(w => w.split(' '));
    x = x.map(w => {
        w[0] = isNaN(w[0]) ? w[0] : Number(w[0]);
        w.splice(1, 2, w[1] + ' ' + w[2]);
        return w;
    });

    return [d[0], x];
})

// console.log(idk);

// const theShiny = idk.find(a => a[0] === 'shiny gold');

let countttt = 0;

const findCount = (inp, wanted) => {
    const theWanted = inp.find(a => a[0] === wanted);
    if (!theWanted) {
        return 1;
    }
    let d = 0;

    // console.log(theWanted);
    // if (isNaN(theWanted[1][0][0])) {
    //     console.log(theWanted[1][0][0]);
    //     return 1;
    // }
    
    for (const a of theWanted[1]) {
        let x = a[0];

        if (x === 'no') {
            return 1;
        }

        
        const count = findCount(inp, a[1]);
        d += x*count;
        countttt += d;
        console.log(x, count, countttt, theWanted);
        // console.log(d);
        // if (isNaN(d)) {
        //     console.log(x, count);
        // } else {
        //     console.log('SAD');
        // }
    }


    return d;
}
findCount(idk, 'shiny gold');
console.log(countttt);

/*------------*/
/*-- Part 1 --*/
/*------------*/
const solvePart1 = (input, consoleOutput = true) => {
    // PART 1 CODE HERE

    if (consoleOutput) {
        console.log(`The answer to the part 1 is => ${'PART_1_SOLUTION'}`); // Should be: PART_1_SOLUTION
    }

    return ['PART_1_SOLUTION'];
}
solvePart1('INPUT');


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