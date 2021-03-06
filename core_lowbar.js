const _ = {};
const {binarySearch} = require('./utils');
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
    if ((typeof list === 'number' || typeof list === 'boolean') && typeof n === 'number') return [];
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

_.each = (list, iteratee, context = this) => {
    let newList = _.values(list);
    if (typeof list === 'string') newList = list;
    for (let i = 0; i < newList.length; i++) {
        iteratee.call(context, newList[i], i);
    }
    return list;
};

_.indexOf = (list, target, isSorted = false) => {
    let result = -1;
    const forLoop = (i = 0) => {
        for (i; i < list.length; i++) {
            if (list[i] === target) return i;
        }
        return result;
    };
    if (!Array.isArray(list) && typeof list !== 'string') return result;
    if (isSorted === false || isSorted === undefined) {
        return forLoop();
    }
    if (typeof isSorted === 'number') {
        return forLoop(isSorted);
    }
    if (isSorted === true) {
        return binarySearch(list, target);
    }
};

_.filter = (list, predicate, context = this) => {
    let result = [];
    if (!list || typeof list === 'number') return result;
    _.each(list, function (item, index) {
        if (predicate) {
            if (predicate.call(context, item, index, list)) result.push(item);
        } 
        else result.push(item);
    });
    return result;
};


_.negate = (func) => {
    if (typeof func !== 'function') return _.negate;
    return function () {
        return !func.apply(this, arguments);
    };
};

_.reject = (list, predicate, context = this) => {
    if (predicate) {
        return _.filter.call(null, list, _.negate(predicate), context);
    }
    return [];
};

_.uniq = (array, isSorted = false, iteratee = _.identity) => {
    if (typeof isSorted === 'function') {
        iteratee = isSorted;
        isSorted = false;
    }
    const result = [],
        checkIteratee = [];
    _.each.call(null, array, function (item) {
        if (_.indexOf.call(checkIteratee, this, iteratee(item), isSorted) === -1) {
            this.push(iteratee(item));
            result.push(item);
        }
    }, checkIteratee);
    return result;
};

_.map = (list, iteratee = _.identity, context = this) => {
    const result = [];
    iteratee = iteratee.bind(context);
    _.each(list, item => result.push(iteratee(item)));
    return result;
};

_.contains = (list, target, fromIndex = 0) => {
    let validList;
    typeof list === 'object' ? validList = _.values(list) :
    typeof list === 'string' ? validList = list : validList = [];
    return _.indexOf(validList.slice(fromIndex), target) !== -1;
};

_.pluck = (list, propertyName) => {
    return _.map(list, obj => obj[propertyName]);
};

_.reduce = (list, iteratee, acc, context = this) => {
    let newList = list;
    if (typeof list === 'object') newList = _.values(list);
    if (typeof iteratee !== 'function') return newList[0];
    if (acc === undefined) {
        newList = list.slice(1);
        acc = list[0];
    }
    _.each(newList, (item, index) => {
        acc = iteratee.call(context, acc, item, index);
    });
    return acc;
};

_.every = (list, predicate, context = this) => {
    let flag = true, newList = list;
    if (typeof predicate !== 'function') return flag;
    if (typeof list === 'object') newList = _.values(list);
    for (let i = 0; i < newList.length; i++) {
        if (!flag) return flag;
        flag = predicate.call(context,newList[i]);
    }
    return flag;
};

_.some = (list, predicate = _.identity, context = this) => {
    let newList = list;
    predicate = predicate.bind(context);
    if (typeof list !== 'string' ) newList = _.values(list);
    for (let i = 0; i < newList.length; i++) {
      if (predicate(newList[i]) != false) return true;
    }
    return false;
};

_.extends = (destination, ...sources) => {
   return _.reduce(sources, (acc, item) => {
    for (let key in item) {
        acc[key] = item[key];
    }
    return acc;
   }, destination);
};

_.defaults = (object, ...sources) => {
    return _.reduce(sources, (acc, item) => {
        for (let key in item) {
            if (acc[key] === undefined) acc[key] = item[key];
        }
        return acc;
    }, object);
};
module.exports = _;