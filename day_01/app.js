/**
 * --- Day 1: Report Repair ---
 * After saving Christmas five years in a row, you've decided to take
 * a vacation at a nice resort on a tropical island. Surely, Christmas will go on without you.
 *
 * The tropical island has its own currency and is entirely cash-only. The gold coins
 * used there have a little picture of a starfish; the locals just call them stars.
 * None of the currency exchanges seem to have heard of them, but somehow, you'll need to
 * find fifty of these coins by the time you arrive so you can pay the deposit on your room.
 *
 * To save your vacation, you need to get all fifty stars by December 25th.
 *
 * Collect stars by solving puzzles. Two puzzles will be made available on each day in
 * the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle
 * grants one star. Good luck!
 *
 * Before you leave, the Elves in accounting just need you to fix your expense report (your puzzleinput);
 * apparently, something isn't quite adding up.
 *
 * Specifically, they need you to find the two entries that sum to 2020 and
 * then multiply those two numbers together.
 *
 * For example, suppose your expense report contained the following:
 * 1721
 * 979
 * 366
 * 299
 * 675
 * 1456
 * In this list, the two entries that sum to 2020 are 1721 and 299. Multiplying them
 * together produces 1721 * 299 = 514579, so the correct answer is 514579.
 * 
 * --- Part Two ---
 * The Elves in accounting are thankful for your help; one of them even offers you
 * a starfish coin they had left over from a past vacation. They offer you
 * a second one if you can find three numbers in your expense report that meet the same criteria.
 *
 * Using the above example again, the three entries that sum to 2020 are 979, 366, and 675.
 * Multiplying them together produces the answer, 241861950.
 *
 * In your expense report, what is the product of the three entries that sum to 2020?
 */

const fs = require('file-system');
const path = require('path')

const rawdata = fs.readFileSync(path.resolve(__dirname, 'input.json'));
const input = JSON.parse(rawdata);

/*------------*/
/*-- Part 1 --*/
/*------------*/
let matchedPair, finalNum;

let index = 0;
for (const num of input) {
    const foundNum = input.slice(index+1).find(findingNum => num + findingNum === 2020);

    if (foundNum) {
        matchedPair = [num, foundNum]
        break;
    }
    index++;
}

finalNum = matchedPair.reduce((acc, val) => acc*val);

console.log(`Part 1: ${finalNum}`); // Should be: 197451

/*------------*/
/*-- Part 2 --*/
/*------------*/
let matchedPairPart2;
input.forEach(num1 => {
    input.forEach(num2 => {
        input.forEach(num3 => {
            if (num1 + num2 + num3 === 2020) {
                matchedPairPart2 = [num1, num2, num3];
            }
        })
    })
})

finalNumPart2 = matchedPairPart2.reduce((acc, val) => acc*val);

console.log(`Part 2: ${finalNumPart2}`); // Should be: 138233720