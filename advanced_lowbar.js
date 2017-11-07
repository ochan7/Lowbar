const path = require('path');
const _ = require(path.join(__dirname, './core_lowbar'));
const { binaryIndex } = require('./utils');
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
    _.each(list, (item) => {
        result.push(item[method](...args));
    });
    return result;
};

_.sortBy = (list, iteratee = _.identity, context = this) => {
    let newList = list;
    if (typeof newList === 'string') newList = newList.split('');

    else newList = _.values(newList);

    iteratee = iteratee.bind(context);

    return newList.sort((a, b) => iteratee(b) < iteratee(a));
};

_.zip = (...args) => {
    const result = [];
    if (!_.every(args, item => typeof item === 'string' || Array.isArray(item)
    )) return result;

    if (args.length === 1 && typeof args[0] === 'string') return _.map(args[0], str => [str]);

    else _.each(args, (list, i) => {

        if (typeof list === 'string') result[i] = list;

        else for (let j = 0; j < args[0].length; j++) {

            if (result[j] === undefined) result[j] = [];

            result[j][i] = args[i][j];
        }
    });
    return result;
};

_.sortedIndex = (list, value, iteratee, context = this) => {

    if (
        typeof list !== 'string' && !Array.isArray(list)
        || value === undefined
    ) return 0;

    return typeof iteratee === 'string' ?

        binaryIndex(_.map(list, item => item[iteratee]), value[iteratee]) :

        typeof iteratee === 'function' ?

            (iteratee = iteratee.bind(context),

                binaryIndex(_.map(list, item => iteratee(item)), iteratee(value))) :

            binaryIndex(list, value);
};

_.flatten = (list, shallow = false) => {
    const result = [];
    if (!Array.isArray(list) && typeof list !== 'string') return result;

    const innerFunction = (list) => {
        _.each(list, item => {
            if (!Array.isArray(item)) result.push(item);
            else {
                if (shallow) result.push(...item);
                else return innerFunction(item);
            }
        });
        return result;
    };

    return innerFunction(list);
};

_.intersection = (...list) => {
    const result = [];
    if (_.every(list, item => {
        return typeof item === 'string' && item.length === 1;
    })) return list;

    _.each(list[0], item => {
        if (_.every(list, (part) => {
            return _.contains(part, item);
        })) result.push(item);
    });

    return result;
};

_.difference = (list, ...others) => {
    const result = [], mappedList = _.map(list);
    if (typeof list !== 'object' && typeof list !== 'string' || list === null) return result;

    if (others.length === 0) return mappedList;

    else {
        const mergeOthers = _.uniq(_.flatten(others));
        _.each(mappedList, item => {
            if (!_.contains(mergeOthers, item)) result.push(item);
        });

    }
    return result;
};

_.memoize = (func, hasher) => {
    const cache = {};
    const memoize = (...args) => {
        const idx = hasher ? hasher(...args) : JSON.stringify(args);
        if (cache[idx] === undefined) {
            cache[idx] = func(...args);
        }
        return cache[idx];
    };
    memoize.cache = cache;
    return memoize;
};

_.delay = (func, wait, ...args) => {

    return wait ? setTimeout(func, wait, ...args) : func(...args);
};


_.where = (list, properties) => {

    return _.filter(list, item => {
        let flag = true;
        for (let key in properties) {
            if (item[key] !== properties[key]) flag = false;
        }
        return flag;
    });
};

_.throttle = (func, wait = 0, options = {leading: true}) => {
    const begin = Date.now();
    let callCount = 0;
    let loadBegin;
    let loadFlag = true;
    const caller = function (...args) {

        if (callCount === 0) {
            loadBegin = Date.now();
            callCount++;
            return options.leading === false ? _.delay(func, wait, ...args) : func(...args);
        }

        if (callCount > 0) {
            if ((options.leading === true || options.trailing === true) && loadFlag) {
                loadFlag = false;
                return _.delay(func, wait - Date.now() - loadBegin, ...args);
            }
        }
        if (Date.now() - begin > wait) {
            callCount = 0;
            loadFlag = true;
        }
    };
    return caller;
};

_.partial = (func, ...partials) => {
    const innerFunction =  (...args) => {
        
    if (partials.length === 0) return func(...args);
    const newArgs = _.map(partials, arg => {
        if (arg === _) return args.shift();
        return arg;
    });
    return func(...newArgs, ...args);
    };
    return innerFunction;
};
module.exports = _;