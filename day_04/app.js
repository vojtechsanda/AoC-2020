const fs = require('file-system');
const path = require('path')

const exampleData = false;

const dataPath = path.resolve(__dirname, `input${exampleData ? '-example' : ''}.txt`);
const rawData = fs.readFileSync(dataPath);


/*----------------------*/
/*-- Input formatting --*/
/*----------------------*/
const rows = rawData.toString().split('\r\n');

const passportRows = [];
let passportIndex = 0;

for (const row of rows) {
    if (row === '') {
        passportIndex++;
        continue;
    }
    if (!passportRows[passportIndex]) {
        passportRows[passportIndex] = [];
    }
    
    passportRows[passportIndex].push(row);
};

const passportStrings = passportRows.map(row => row.join(' '));

const passports = passportStrings.map(passportString => {
    const items = passportString.split(' ').map(item => item.split(':'));

    const passportObj = {};
    
    items.forEach(item => {
        passportObj[item[0]] = item[1];
    })

    return passportObj;
});

/*------------*/
/*-- Part 1 --*/
/*------------*/
const solvePart1 = (input, consoleOutput = true) => {
    const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

    const validPassports = input.filter(passport => {
        const missingFields = requiredFields.filter(requiredField => !passport[requiredField]);

        return missingFields.length === 0;
    })

    if (consoleOutput) {
        console.log(`The answer to the part 1 is => ${validPassports.length}`); // Should be: 192
    }

    return [validPassports.length, validPassports];
}
solvePart1(passports);


/*------------*/
/*-- Part 2 --*/
/*------------*/
const solvePart2 = (input, consoleOutput = true) => {
    const prevalidatedInput = solvePart1(input, false)[1];

    const validators = {
        cid: cid => true,
        byr: byr => Number(byr) >= 1920 && Number(byr) <= 2002,
        iyr: iyr => Number(iyr) >= 2010 && Number(iyr) <= 2020,
        eyr: eyr => Number(eyr) >= 2020 && Number(eyr) <= 2030,
        ecl: ecl => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(ecl) > -1,
        pid: pid => !isNaN(pid) && pid.length === 9,
        hcl: hcl => {
            const hexVals = '0123456789abcdef';
            const invalidVals = hcl.slice(1).split('').filter(char => hexVals.indexOf(char) === -1);

            return hcl[0] === '#' && invalidVals.length === 0;
        },
        hgt: hgt => {
            const unit = hgt.slice(-2);
            const val = Number(hgt.slice(0, hgt.length-2));

            if (
                unit === 'cm' && val >= 150 && val <= 193 ||
                unit === 'in' && val >= 59 && val <= 76
            ) {
                return true;
            }

            return false;
        }
    };

    const fullyValidPassports = prevalidatedInput.filter(passport => {
        const invalidItems = Object.keys(passport).filter(item => !validators[item](passport[item]));

        return invalidItems.length === 0;
    });

    if (consoleOutput) {
        console.log(`The answer to the part 2 is => ${fullyValidPassports.length}`); // Should be: 101
    }
    
    return [fullyValidPassports.length, fullyValidPassports];
}
solvePart2(passports);