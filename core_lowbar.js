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
module.exports = _;