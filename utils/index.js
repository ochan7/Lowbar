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
    }
};