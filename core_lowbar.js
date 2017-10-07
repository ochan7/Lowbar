const _ = {};
_.identity = (x) => {
    return x;
};

_.values = (obj) => {
    if (typeof obj !== 'object' || obj === null) return [];
    else {
        const values = [];
        if (Array.isArray(obj)) return obj;
        for (let key in obj) {
            values.push(obj[key]);
        }
        return values;
    }
};

_.first = (list, n) => {
    if (typeof list !== 'object' && typeof list !== 'string') return;
    if (!n) return list[0];
    else {
        if (typeof list === 'string') return list.split('').slice(0, n);
        else if (Array.isArray(list)) return list.slice(0, n);
        return [];
    }
};

_.last = (list, n) => {
    if (!Array.isArray(list) && typeof list !== 'string') return;
    if (!n) return list[list.length - 1];
    else {
        if (typeof list === 'string') return list.split('').slice(-n);
        return list.slice(-n);
    }
};

_.each = (list, iteratee, context = null) => {
    let newList = _.values(list);
    if (typeof list === 'string') newList = list;
    for (let i = 0; i < newList.length; i++) {
        iteratee.call(context, newList[i], i);
    }
    return list;
};

_.indexOf = (list, target, isSorted = false) => {
    let result = -1;
    if (!Array.isArray(list) && typeof list !== 'string') return result;

    if (!isSorted) {
        for (let i = 0; i < list.length; i++) {
            if (list[i] === target) return i;
        }
        return result;
    }

    if (isSorted) {
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
        return result;
    }
};

module.exports = _;