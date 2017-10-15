module.exports = {
    notAVowel: (letter) => {
        const vowels = 'aeiou';
        return !vowels.includes(letter);
    },
    isEven: (num) => {
        return num % 2 !== 1;
    },
    lessThanThis: function (item) {
        return item < this;
    },
    equalToThis: function (item, i) {
        return item === this[i];
    },
    sum: (acc, item) => {
        return acc + item;
    },
    makeSquares: (acc, item) => {
        acc.push(item * item);
        return acc;
    },
    countNames: (acc, item) => {
        if (acc[item] === undefined) acc[item] = 0;
        acc[item] += 1;
        return acc;
    }
};