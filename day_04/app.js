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
let x = 0
let d = []

rows.forEach(r => {
    if (!d[x]) {
        d[x] = []
    }

    if (r === '') {
        x++
    } else {
        d[x].push(r)
    }
})

q = d.map(e => e.join(' '))

r = q.map(d => d.split(' '))

c = r.map(s => s.map(b => b.split(':')))

required = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
]

h = c.filter(arr => {
    arr = arr.map(p => p[0])
    let x = required.filter(fil => {
        if (arr.indexOf(fil) >= 0) {
            return false
        }

        return true
    })

    if (x.length > 0) {
        return false
    }

    return true
})

g = h.filter(q => {
    k = {}
    o = q.forEach(w => {
        k[w[0]] = w[1]
    })

    if (Number(k.byr) >= 1920 && Number(k.byr) <= 2002) {
        
        if (Number(k.iyr) >= 2010 && Number(k.iyr) <= 2020) {
            
            if (Number(k.eyr) >= 2020 && Number(k.eyr) <= 2030) {
                
                if (['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(k.ecl) >= 0) {
                    
                    if (!isNaN(k.pid) && k.pid.length === 9) {
                        
                        let hcl = k.hcl.split('')
                        let hash = hcl.splice(0, 1).join('')

                        if (hash === '#') {
                            
                            let allowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

                            x = hcl.filter(j => allowed.indexOf(j) >= 0)

                            if (x.length === hcl.length) {
                                
                                hgt = k.hgt.split('')

                                unit = hgt.splice((hgt.length - 2)).join('')
                                num = Number(hgt.join(''))

                                if (unit === 'cm' && num >= 150 && num <= 193) {
                                    
                                    return true
                                } else if (unit === 'in' && num >= 59 && num <= 76) {
                                    
                                    return true
                                }

                                return false
                            }
                        }
                    }
                }
            }
        }
    }
})
console.log(g.length);


// (() => {
//     // PART 1 CODE HERE
//     console.log(`Part 1: ${'PART_1_VAR'}`); // Should be: PART 1 Solution
// })()


/*------------*/
/*-- Part 2 --*/
/*------------*/
// (() => {
//     // PART 2 CODE HERE
//     console.log(`Part 2: ${'PART_2_VAR'}`); // Should be: PART 2 Solution
// })()