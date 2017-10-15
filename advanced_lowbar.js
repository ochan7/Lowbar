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

module.exports = _;