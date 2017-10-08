module.exports = {
    notAVowel: (letter) => {
        const vowels = 'aeiou';
        return !vowels.includes(letter);
    },
    isEven: (num) => {
        return num % 2 !== 1;
    }
};