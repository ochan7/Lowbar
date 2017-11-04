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
    },
    makeUpperCase: (acc, letter) => {
        acc.push(letter.toUpperCase());
        return acc;
    },
    binarySearch:  (list, target) => {
        let startIndex = 0,
        stopIndex = list.length - 1,
        middle;
        while (startIndex < stopIndex) {
            middle = Math.floor((stopIndex + startIndex) / 2);
            if (list[middle] === target)
            return middle;
            if (target < list[middle]) {
                stopIndex = middle - 1;
            } else {
                startIndex = middle + 1;
            }
        }
        return -1;

    },
    binaryIndex: (list, value) => {
        let mid,
            min = 0,
            max = list.length - 1;
    
        while (min <= max) {
            mid = Math.floor((min + max) / 2);
            if (mid === 0 && list[mid] > value) {
                return mid;
            }
            else if (mid === list.length - 1 && list[mid] < value) {
                return mid + 1;
            }
    
            else if (list[mid] <= value && list[mid + 1] >= value) {
                return mid + 1;
            }
            else if (list[mid] < value) min = mid + 1;

            else max = mid - 1;
        }
        return 0;
    }
};