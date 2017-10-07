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
module.exports = _;