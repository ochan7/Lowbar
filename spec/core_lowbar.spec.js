const path = require('path');
const expect = require('chai').expect;
const _  = require(path.join(__dirname, '..', './core_lowbar.js'));
const {notAVowel, isEven, lessThanThis, equalToThis, sum, makeSquares, countNames, makeUpperCase}  = require(path.join(__dirname, '..', './utils'));

describe('_', () => {
    'use strict';
    it('is an object', () => {
        expect(_).to.be.an('object');
    });
});

describe('#identity', () => {
    it('it is a function', () => {
        expect(_.identity).to.be.a('function');
    });
    it('returns undefined when given no arguments', () => {
        expect(_.identity()).to.equal(undefined);
    });
    it('returns the argument given to it', () => {
        expect(_.identity('hello')).to.equal('hello');
        expect(_.identity(5)).to.equal(5);
        expect(_.identity(undefined)).to.equal(undefined);
    });
    it('returns the same object or array given to it', () => {
        const arr = ['hello'], obj = {1:'hello'};
        expect(_.identity(arr)).to.equal(arr);
        expect(_.identity(obj)).to.equal(obj);
    });
});

describe('#values', () => {
    it('it is a function', () => {
        expect(_.values).to.be.a('function');
    });
    it('returns an empty object when not given an array or object', () => {
        expect(_.values()).to.eql([]);
        expect(_.values('hello')).to.eql([]);
        expect(_.values(null)).to.eql([]);
    });
    it('returns the array when given an array', () => {
        expect(_.values(['hello'])).to.eql(['hello']);
        expect(_.values([1,2,3])).to.eql([1,2,3]);
    });
    it('returns an array of values when given an object', () => {
        expect(_.values({0:0, 1:1})).to.eql([0,1]);
        expect(_.values({one: 1, two: 2, three: 3})).to.eql([1,2,3]);
    });
});
describe('#first', () => {
    it('it is a function', () => {
        expect(_.first).to.be.a('function');
    });
    it('returns undefined if first argument is not of object type or string', () => {
        expect(_.first()).to.eql(undefined);
        expect(_.first(5)).to.eql(undefined);
    });
    it('returns the first element of an array if not given n', () => {
        expect(_.first('abc')).to.equal('a');
        expect(_.first(['a','b','c'])).to.equal('a');
    });
    it('returns the element with a key of 0 in an object when n is not defined', () => {
        expect(_.first({0:'hello', 1: 'a', 2: 10, 3: 'b'})).to.equal('hello');
        expect(_.first({1:'hello', 0: 'a', 2: 10, 3: 'b'})).to.equal('a');
    });
    it('returns an empty array if object has a key of 0 and n is a number', () => {
        expect(_.first({1:'hello', 0: 'a', 2: 10, 3: 'b'}, 1)).to.eql([]);
    });
    it('returns the first n elements of an array or string', () => {
        expect(_.first(['hello',  'a',10, 'b'], 2)).to.eql(['hello', 'a']);
        expect(_.first(['hello',  'a',10, 'b'], 10)).to.eql(['hello', 'a', 10, 'b']);
        expect(_.first('hello', 10)).to.eql(['h', 'e', 'l', 'l', 'o']);
        expect(_.first('hello', 1)).to.eql(['h']);
        expect(_.first('hello', 2)).to.eql(['h', 'e']);
    });
});

describe('#last', () => {
    it('it is a function', () => {
        expect(_.last).to.be.a('function');
    });
    it('returns undefined if not given an Array or string', () => {
        expect(_.last()).to.equal(undefined);
        expect(_.last({})).to.equal(undefined);
    });
    it('returns the last character of a string if not given n', () => {
        expect(_.last('hello')).to.equal('o');
    });
    it('returns the last element of an array if not given n', () => {
        expect(_.last([1,2,3,4])).to.equal(4);
    });
    it('returns an array of the last n elements when given n', () => {
        expect(_.last([1,2,3,4], 2)).to.eql([3,4]);
        expect(_.last('hello', 2)).to.eql(['l', 'o']);
    });
});

describe('#each', () => {
    'use strict';
    it('it is a function', () => {
        expect(_.each).to.be.a('function');
    });
    it('returns the list argument passed to it', () => {
        expect(_.each(5)).to.equal(5);
        expect(_.each([])).to.eql([]);
        expect(_.each({})).to.eql({});
    });
    it('calls a function the same number of times as the length of the list', () => {
        let countArray = 0;
        const incrementCountArray = () => {
            countArray++;
        };
        _.each([1,2,3,4], incrementCountArray);
        expect(countArray).to.equal(4);

        let countStr = 0;
        const incrementCountStr = () => {
            countStr++;
        };
        _.each('1234', incrementCountStr);
        expect(countStr).to.equal(4);

        let countObj = 0;
        const incrementCountObj = () => {
            countObj++;
        };
        _.each({1:1, 2:2, 3:3, 4:4}, incrementCountObj);
        expect(countObj).to.equal(4);
    });
    it('applies context to the iteratee function if given context argument', () => {
        let arr = ['a','b','c','d'];
        const popContext = function() {
          this.pop();
        };
        _.each([1,2,3], popContext, arr);
        expect(arr.length).to.equal(1);
    });
});

describe('#indexOf', () => {
    'use strict';
    it('it is a function', () => {
        expect(_.indexOf).to.be.a('function');
    });
    it('returns -1 when not given an array or string', () => {
        expect(_.indexOf({0:0}, 0)).to.equal(-1);
        expect(_.indexOf(5, 5)).to.equal(-1);
        expect(_.indexOf()).to.equal(-1);
    });
    it('returns -1 when not given a target', () => {
        expect(_.indexOf([1,2,3,4,5])).to.equal(-1);
        expect(_.indexOf([])).to.equal(-1);
    });
    it('returns the index of an item if given a valid array and target', () => {
        expect(_.indexOf([1,2,3,4,5], 1)).to.equal(0);
        expect(_.indexOf([1,2,3,4,5], 1, true)).to.equal(0);
    });
    it('returns -1 when using binary search on a nonsorted list', () => {
        expect(_.indexOf([5,6,3,1,9,8,5,2], 2, true)).to.equal(-1);
    });
});

describe('#filter', () => {
    'use strict';
    it('it is a function', () => {
        expect(_.filter).to.be.a('function');
    });
    it('returns an empty array when not given a valid argument', () => {
        expect(_.filter()).to.eql([]);
        expect(_.filter(1)).to.eql([]);
        expect(_.filter('')).to.eql([]);
        expect(_.filter({})).to.eql([]);
    });
    it('returns the list if not given a predicate', () => {
        expect(_.filter('hello')).to.eql(['h', 'e', 'l', 'l', 'o']);
        expect(_.filter({0:'a', 1: 'b', 2: 'c', 3: 'd'})).to.eql(['a', 'b', 'c', 'd']);
    });
    it('returns a filtered array when passed a predicate', () => {
        expect(_.filter(['a', 'e', 'c', 'd', 'b', 'i', 'o', 'p'], notAVowel)).to.eql(['c', 'd', 'b', 'p']);
        expect(_.filter({0: 'a', 1: 'e', 2: 'c', 3: 'd', 5: 'b', 6: 'p' }, notAVowel)).to.eql(['c', 'd', 'b', 'p']);
        expect(_.filter('aeioucdbp', notAVowel)).to.eql(['c', 'd', 'b', 'p']);
        expect(_.filter([1,2,3,4,5,6], isEven)).to.eql([2,4,6]);
    });
    it('can apply context to the predicate function', () => {
        let num = 5; 
        expect(_.filter([1,2,3,4,5,6,7,8,9,10], lessThanThis, num)).to.eql([1,2,3,4]);
    });
});

describe( '#negate', () => {
    'use strict';
    it('it is a function', () => {
        expect(_.negate).to.be.a('function');
    });
    it('returns the function itself if not passed a function as an argument', () => {
        expect(_.negate()).to.be.a('function');
    });
    it('negates the result of a function passed to it', () => {
        let isFalsy = _.negate(Boolean);
        expect(isFalsy(false)).to.be.true;
        expect(isFalsy(true)).to.be.false;
        let isOdd = _.negate(isEven);
        expect(isOdd(1)).to.be.true;
    });

});
describe('#reject', () => {
    'use strict';
    it('it is a function', () => {
        expect(_.reject).to.be.a('function');
    });
    it('returns an empty array when not given a list', () => {
        expect(_.reject()).to.eql([]);
        expect(_.reject(543)).to.eql([]);
    });
    it('returns an empty array when given not given a predicate', () => {
        expect(_.reject('hello')).to.eql([]);
        expect(_.reject('hello')).to.eql([]);
        expect(_.reject([1,2,3,4,5])).to.eql([]);
        expect(_.reject({1:'a',2:'b',3:'c',4:'d',5:'e'})).to.eql([]);
    });
    it('returns a filtered array containing rejected values when passed a list and predicate', () => {
         expect(_.reject('aeioubcd', notAVowel)).to.eql(['a', 'e', 'i', 'o', 'u']);
        expect(_.reject('bcdfg', notAVowel)).to.eql([]);
        expect(_.reject([1,2,3,4], isEven)).to.eql([1,3]);
        expect(_.reject({a:1,b:2,c:3,d:4}, isEven)).to.eql([1,3]);
    });
    it('can apply context to the function as the third argument', () => {
        let contextArr = ['a', 'b', 'c', 'd', 'e'];
        expect(_.reject([2,4,5,6,7,8,9], lessThanThis, 5)).to.eql([5,6,7,8,9]);
        expect(_.reject('adcfe', equalToThis, contextArr)).to.eql(['d', 'f']);
    });
});

describe('#uniq', () => {
    'use strict';
    it('it is a function', () => {
        expect(_.uniq).to.be.a('function');
    });
    it('returns an empty array when not given a string or array', () => {
        expect(_.uniq()).to.eql([]);
        expect(_.uniq(554545)).to.eql([]);
        expect(_.uniq(true)).to.eql([]);
    });
    it('returns an array of 1 value when given a list of the same the value repeated', () => {
        expect(_.uniq('aaaaaaaaa')).to.eql(['a']);
        expect(_.uniq(['a','a','a'])).to.eql(['a']);
        expect(_.uniq([1,1,1,1,1,1])).to.eql([1]);
    });
    it('returns an array of only unique values when passed a list with repeats', () => {
        expect(_.uniq('aaabbbcccdddeeefff')).to.eql(['a', 'b', 'c', 'd', 'e', 'f']);
        expect(_.uniq(['a', 'a', 'b', 'b', 'c' ,'c', 'd', 'e', 'e', 'e', 'f', 'f'])).to.eql(['a', 'b', 'c', 'd', 'e', 'f']);
    });
    it('returns an array of unique values based on iteratee argument' , () => {
        expect(_.uniq([2.1, 2.3, 2.4, 3.1, 3.2], false, Math.floor )).to.eql([2.1, 3.1]);
        expect(_.uniq([2.1, 2.3, 2.4, 3.1, 3.2],  Math.floor )).to.eql([2.1, 3.1]);
    });
});

describe('#map', () => {
    'use strict';
    it('it is a function', () => {
        expect(_.map).to.be.a('function');
    });
    it('returns an array', () => {
        expect(_.map()).to.be.a('array');
    });
    it('returns an empty array when not given a valid list', () => {
        expect(_.map(45)).to.eql([]);
        expect(_.map()).to.eql([]);
    });
    it('returns the list if not given a function', () => {
        expect(_.map('abc')).to.eql(['a', 'b', 'c']);
        expect(_.map(['a', 'b', 'c'])).to.eql(['a', 'b', 'c']);
        expect(_.map([1,2,3,4])).to.eql([1,2,3,4]);
        expect(_.map({a: 1, b: 2, c: 3})).to.eql([1,2,3]);
    });
    it('returns a mapped version of the list', () => {
        expect(_.map('abc', letter => letter.toUpperCase())).to.eql(['A', 'B', 'C']);
        expect(_.map([1,2,3], num => num * num)).to.eql([1,4,9]);
        expect(_.map({0:[1,2,3],1: [4,5,6],2:[7,8,9]}, _.first)).to.eql([1,4,7]);
    });
    it('returns a mapped verion of the list with a function using context', () => {
        expect(_.map([1,2,3], function(num) {return num * this;}, 5)).to.eql([5,10,15]);
    });
});

describe('#contains', () => {
    it('it is a function', () => {
        expect(_.contains).to.be.a('function');
    });
    it('returns a boolean', () => {
        expect(_.contains()).to.be.a('boolean');
        expect(_.contains('hello')).to.be.a('boolean');
        expect(_.contains([])).to.be.a('boolean');
    });
    it('returns false if not given a valid list', () => {
        expect(_.contains(1,1)).to.equal(false);
        expect(_.contains(true)).to.equal(false);
    });
    it('returns false if not given a target value', () => {
        expect(_.contains('abc')).to.equal(false);
        expect(_.contains([1,2,3])).to.equal(false);
    });
    it('returns true if the target value is in the list', () => {
        expect(_.contains('abc', 'a')).to.equal(true);
        expect(_.contains([1,2,3,4], 3)).to.equal(true);
        expect(_.contains({1:'a'}, 'a')).to.equal(true);
    });
    it('returns boolean if value is contained in the list from a certain index', () => {
        expect(_.contains('abc', 'a', 0)).to.equal(true);
        expect(_.contains('abc', 'a', 1)).to.equal(false);
        expect(_.contains('abc', 'b', 2)).to.equal(false);
    });
});

describe('#pluck', () => {
    it('it is a function', () => {
        expect(_.pluck).to.be.a('function');
    });
    it('returns an empty array if not given a valid list', () => {
        expect(_.pluck(5)).to.eql([]);
        expect(_.pluck(null)).to.eql([]);
        expect(_.pluck({})).to.eql([]);
    });
    it('returns an array of matching values for the property name', () => {
        expect(_.pluck([{name: 'olie'}, {name: 'chan'}], 'name')).to.eql(['olie', 'chan']);
        expect(_.pluck(['a', 'b', 'c', 'd'], 0)).to.eql(['a','b','c','d']);
        expect(_.pluck('abc',0)).to.eql(['a', 'b', 'c']);

        const stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
        expect(_.pluck(stooges, 'name')).to.eql(['moe', 'larry', 'curly']);
        expect(_.pluck(['a', 'b', 'c', 'd'], 0)).to.eql(['a', 'b', 'c', 'd']);
    });
});

describe('#reduce', () => {
    it('it is a function', () => {
        expect(_.reduce).to.be.a('function');
    });
    it('returns undefined when not given a valid list', () => {
        expect(_.reduce('')).to.equal(undefined);
        expect(_.reduce(5)).to.equal(undefined);
        expect(_.reduce([])).to.equal(undefined);
        expect(_.reduce({})).to.equal(undefined);
    });
    it('returns the single element from a list if given a list of length 1', () => {
        expect(_.reduce('a')).to.equal('a');
        expect(_.reduce({a:'a'})).to.equal('a');
        expect(_.reduce(['a'])).to.equal('a');
    });
    it('can reduce a list to a single value', () => {
        expect(_.reduce([1,2,3], sum, 0)).to.equal(6);
        expect(_.reduce([1,2,3], sum)).to.equal(6);
    });
    it('returns a mapped version of the list', () => {
        expect(_.reduce([1,2,3], makeSquares, [])).to.eql([1,4,9]);   
        expect(_.reduce( [[0, 1], [2, 3], [4, 5]], ( acc, cur ) => acc.concat(cur),
        [])).to.eql([0,1,2,3,4,5]);  
        expect(_.reduce('abc', makeUpperCase, [])).to.eql(['A', 'B', 'C']);
        expect(_.reduce({0:[0, 1], 1:[2, 3], 2:[4, 5]}, ( acc, cur ) => acc.concat(cur),
        [])).to.eql([0,1,2,3,4,5]);  
    });
    it('returns an object tallying items in an array', () => {
        expect(_.reduce(['alice', 'ben', 'alice', 'ben', 'frank', 'alex', 'olie', 'olie'], countNames, {})).to.eql({alice:2, ben: 2, frank: 1,alex: 1, olie: 2 });
    });
    it('can use context in the iteratee', () => {
        expect(_.reduce('abcdefghi', function(acc, letter) {
            if (!this[letter]) acc.push(letter);
            return acc;
        }, [], {a: true, b: true, c: true, d: true})).to.eql(['e', 'f' , 'g', 'h', 'i']);
    });
});

describe.only('#every', () => {
    it('it is a function', () => {
        expect(_.every).to.be.a('function');
    });
    it('returns true if not given a valid list', () => {
        expect(_.every()).to.equal(true);
        expect(_.every(5)).to.equal(true);
        expect(_.every('hello')).to.equal(true);
        expect(_.every(['hello'])).to.equal(true);
        expect(_.every({0:'hello'})).to.equal(true);
    });
    it('returns false if an item in an array does not pass the predicate', () => {
        expect(_.every([0,2,4,6,1,2,4,6],isEven)).to.equal(false);
         expect(_.every('bcdfagh',notAVowel)).to.equal(false);
    });
    it('can apply context to the predicate', () => {
        expect(_.every([1,2,3,4,5], lessThanThis, 9)).to.equal(true);
        expect(_.every([1,2,3,4,5], lessThanThis, 1)).to.equal(false);
    });
});