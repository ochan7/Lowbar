const path = require('path');
const _ = require(path.join(__dirname, './core_lowbar'));

_.once = (func) => {
    let flag = true;
    return () => {
        if (flag) {
            flag = false;
            return func();
        }
    };
};

_.shuffle = (list) => {
 let newList = [];
 if (typeof list === 'string') newList = list.split('');
 if (typeof list === 'object') newList = _.values(list);
 newList = newList.slice();
 let n = newList.length, index, placeholder;
    while (n) {
        index = Math.floor(Math.random() * n--);
        placeholder = newList[n];
        newList[n] = newList[index];
        newList[index] = placeholder;
    }
 return newList;
};

_.invoke = (list, method, ...args) => {
    let result = [];
    _.each(list,  (item) => {
        result.push(item[method](...args));
    });
    return result;
};

_.sortBy = (list) => {
    let newList = list;
    if (typeof newList === 'string') newList = newList.split('');
    else newList = _.values(newList);
    return newList.sort();
};
module.exports = _;