const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');
const _ = require(path.join(__dirname,'..','./advanced_lowbar.js'));
const {sum} = require('../utils');
'use strict';
describe('#once', () => {
    it('it is a function', () => {
        expect(_.once).to.be.a('function');
    });
    it('it returns a function', () => {
        expect(_.once()).to.be.a('function');
    });
    it('returns a function that only be called once', () => {
        const spy = sinon.spy(console.log);
        const callOnce = _.once(spy);
        callOnce('hello'); callOnce('hello'); callOnce('hello');
        expect(spy.callCount).to.equal(1);
    });
});

describe('#shuffle', () => {
    it('it is a function', () => {
        expect(_.shuffle).to.be.a('function');
    });
    it('it returns an empty array when not given a valid list', () => {
        expect(_.shuffle()).to.eql([]);
        expect(_.shuffle(5656474)).to.eql([]);
        expect(_.shuffle([])).to.eql([]);
        expect(_.shuffle({})).to.eql([]);
    });
    it('it returns a list of the same length', () => {
        expect(_.shuffle([1,2,3,4]).length).to.equal(4);
    });
    it('it does not mutate the array given to it', () => {
        let arr = [1,2,3,4,5];
        expect(_.shuffle(arr)).to.not.equal(arr);
    });
    it('it returns a shuffled copy of the list', () => {
        const arr = [1,2,3,4,5,5,6];
        const str = 'hello';
        const obj = {0:0, 1:1, 2:2, 3:3};
        expect(_.shuffle(arr)).to.not.eql(arr);
        expect(_.shuffle(str)).to.not.eql(str);
        expect(_.shuffle(obj)).to.not.eql(obj);
    });
});

describe('#invoke', () => {
    it('it is a function', () => {
        expect(_.invoke).to.be.a('function');
    });
    it('it returns an empty array if not given a valid list', () => {
        expect(_.invoke()).to.eql([]);
        expect(_.invoke(5)).to.eql([]);
        expect(_.invoke([])).to.eql([]);
        expect(_.invoke({})).to.eql([]);
    });
    it('it calls the method on each item in the list', () => {
        expect(_.invoke([[5, 1, 7], [3, 2, 1]], 'sort')).to.eql([[1, 5, 7], [1, 2, 3]]);
        expect(_.invoke([[5, 1, 7], [3, 2, 1]], 'pop')).to.eql([7,1]);
        expect(_.invoke([[5, 1, 7], [3, 2, 1]], 'reverse')).to.eql([[7,1,5], [1,2,3]]);
        expect(_.invoke([1,2,3],'toString')).to.eql(['1', '2', '3']);
        expect(_.invoke('abc','toUpperCase')).to.eql(['A', 'B', 'C']);
    });
});

describe('#sortBy', () => {
    it('it is a function', () => {
        expect(_.sortBy).to.be.a('function');
    });
    it('returns an empty array when not given valid list', () => {
        expect(_.sortBy()).to.eql([]);
        expect(_.sortBy(12)).to.eql([]);
        expect(_.sortBy(false)).to.eql([]);
    });
    it('it returns an array of elements sorted alphabetically when given a string', () => {
        const str = 'cba';
        const expected = ['a', 'b', 'c'];
        expect(_.sortBy(str)).to.eql(expected);
    });
    it('it returns an array of sorted elements when given an array', () => {
        const expectedNums = [1, 2, 3, 4];
        const Nums = [4, 3, 2, 1];
        const expectedStr = ['a', 'b', 'c', 'd'];
        const Str = ['d', 'c', 'b', 'a'];
        const Obj = {a:4, b:3, c:2, d:1};
        expect(_.sortBy(Nums)).to.eql(expectedNums);
        expect(_.sortBy(Obj)).to.eql(expectedNums);
        expect(_.sortBy(Str)).to.eql(expectedStr);
    });
    it('it returns an array of sorted elements based on the iteratee', () => {
        const Nums = [1,2,3,4,5,6];
        const expectedNums = [5, 4, 6, 3, 1, 2];
        const Strs = ['aaaa', 'aaa', 'aa', 'a'];
        const Obj = {0: 'aaaa', 1: 'aaa', 2: 'aa', 3: 'a'};
        const expectedStrs = ['a', 'aa', 'aaa', 'aaaa'];
        expect(_.sortBy(Nums, num => Math.sin(num))).to.eql(expectedNums);
        expect(_.sortBy(Strs, str => str.length)).to.eql(expectedStrs);
        expect(_.sortBy(Obj, str => str.length)).to.eql(expectedStrs);
    });
    it('it returns an array of sorted elements based on an iteratee using context', () => {
        const Nums = [1,2,3,4,5,6];
        const oneOverThis = function(num ) {
            return this / num;
        };
        const expectedNums = [6,5,4,3,2,1];
        expect(_.sortBy(Nums, oneOverThis, 1)).to.eql(expectedNums);
    });
});
describe('#zip', () => {
    it('it is a function', () => {
        expect(_.zip).to.be.a('function');
    });
    it('it returns an empty array when not given an array or string', () => {
        expect(_.zip()).to.eql([]);
        expect(_.zip(false)).to.eql([]);
        expect(_.zip(null)).to.eql([]);
        expect(_.zip(1)).to.eql([]);
        expect(_.zip({a:'a', b:'b'})).to.eql([]);
    });
    it('it returns an array when given one string', () => {
        expect(_.zip('ab')).to.eql([['a'], ['b']]);
    });
    it('it returns an array when given a list of strings as arguments', () => {
        expect(_.zip('a','b')).to.eql(['a', 'b']);
    });
    it('it returns an array when given a list of arrays', () => {
        expect(_.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false])).to.eql([['moe', 30, true], ['larry', 40, false], ['curly', 50, false]]);
    });
    it('returns an array with elements that are undefined when number and dimension of arrays do not match', () => {
        expect(_.zip([1,2,3], ['a', 'b'])).to.eql([[1,'a'], [2, 'b'], [3, undefined]]);
    });
});

describe('#sortedIndex', () => {
    it('it is a function', () => {
        expect(_.sortedIndex).to.be.a('function');
    });
    it('it returns 0 when not given an array or string as the first argument', () => {
        expect(_.sortedIndex({})).to.equal(0);
        expect(_.sortedIndex(1)).to.equal(0);
        expect(_.sortedIndex(true)).to.equal(0);
        expect(_.sortedIndex()).to.equal(0);
    });
    it('it returns 0 when not given a value for the second argument', () => {
        expect(_.sortedIndex('abc')).to.equal(0);
        expect(_.sortedIndex([1,2,3])).to.equal(0);
        expect(_.sortedIndex(['a','b','c'])).to.equal(0);
    });
    it('it returns the index of where to insert value to maintain order', () => {
        expect(_.sortedIndex('abc', 'd')).to.equal(3);
        expect(_.sortedIndex([1,2,3,4], 5)).to.equal(4);
    });
    it('it returns 0 if the value can not be sorted amongst the items in the list', () => {
        expect(_.sortedIndex('abc', 1)).to.equal(0);
        expect(_.sortedIndex([1,2,3], 'a')).to.equal(0);
    });
    it('it returns an index based on a property', () => {
        const stooges = [{name: 'moe', age: 40}, {name: 'curly', age: 60}];
        expect(_.sortedIndex([[], [1], [1,1]], [1,1,1], 'length')).to.equal(3);
        expect(_.sortedIndex(stooges, {name: 'larry', age: 50}, 'age')).to.equal(1);
        expect(_.sortedIndex(stooges, {name: 'larry', age: 39}, 'age')).to.equal(0);
    });
    it('returns an index based on a iteratee function', () => {
        expect(_.sortedIndex(['a', 'aa', 'aaa', 'aaa', 'aaaa'], 'aaa', item => item.length)).to.equal(2);
    });
    it('returns an index based on a iteratee function using context', () => {
        const contextTest = function (item) {
            return this.test(item);
        };
        const context = {test: item => item.length};
        expect(_.sortedIndex(['', 'b', 'cc'], 'b', contextTest, context)).to.equal(1);
    });
});

describe('#flatten', () => {
    it('it is a function', () => {
        expect(_.flatten).to.be.a('function');
    });
    it('returns an empty array when not given a string or array', () => {
        expect(_.flatten(5)).to.eql([]);
        expect(_.flatten(false)).to.eql([]);
        expect(_.flatten()).to.eql([]);
        expect(_.flatten({a:[1,2,3]})).to.eql([]);
    });
    it('returns an array when given a string', () => {
        expect(_.flatten('abc')).to.eql(['a','b','c']);
    });
    it('returns an array that is not nested when given an array', () => {
        expect(_.flatten([1, [2], [3, [[4]]]])).to.eql([1,2,3,4]);
        expect(_.flatten([{a:1}, 'abc', ['a', [{b:2}]]])).to.eql([{a:1}, 'abc', 'a', {b: 2}]);
    });
    it('returns an array flattened to one level if given true for shallow argument', () => {
        expect(_.flatten([1, [2], [3, [[4]]]], true)).to.eql( [1, 2, 3, [[4]]]);
        expect(_.flatten([1,2,3,[4,[5,[6]]]],true)).to.eql([1,2,3,4,[5,[6]]]);
    });
});

describe('#intersection', () => {
    it('it is a function', () => {
        expect(_.intersection).to.be.a('function');
    });
    it('returns an array when given a string', () => {
        expect(_.intersection('a')).to.eql(['a']);
        expect(_.intersection('ab')).to.eql(['a', 'b']);
        expect(_.intersection('abc')).to.eql(['a', 'b', 'c']);
    });
    it('returns an array when given a list of strings of length 1', () => {
        expect(_.intersection('a', 'b')).to.eql(['a', 'b']);
    });
    it('returns an array of items that occur in every list', () => {
        expect(_.intersection(['a','b'], ['a'])).to.eql(['a']);
        expect(_.intersection(['a','b'], ['a', 'b'])).to.eql(['a', 'b']);
        expect(_.intersection(['a','b'], ['a'])).to.eql(['a']);
        expect(_.intersection(['a','b'], ['b'])).to.eql(['b']);
    });
    it('returns an array of items common to all lists when given a list of strings and arrays', () => {
        expect(_.intersection('ab', 'ab')).to.eql(['a', 'b']);
        expect(_.intersection('ab', 'b')).to.eql(['b']);
        expect(_.intersection('ab', 'a')).to.eql(['a']);
        const letters = ['a', 'b', 'c'];
        expect(_.intersection(letters, ['c'])).to.eql(['c']);
        expect(_.intersection(letters, ['c', 'b'])).to.eql(['b', 'c']);
        expect(_.intersection(letters, 'bc')).to.eql(['b', 'c']);
        expect(_.intersection(letters, 'abc')).to.eql(letters);
        expect(_.intersection([1,2,3,4], [1,2,3])).to.eql([1,2,3]);
    });
});

describe('#difference', () => {
    it('it is a function', () => {
        expect(_.difference).to.be.a('function');
    });
    it('returns an empty array when not given an object or string', () => {
        expect(_.difference(1)).to.eql([]);
        expect(_.difference(null)).to.eql([]);
        expect(_.difference(undefined)).to.eql([]);
        expect(_.difference(true)).to.eql([]);
    });
    it('returns an array of elements if given an object or string', () => {
        expect(_.difference('a')).to.eql(['a']);
        expect(_.difference('ab')).to.eql(['a', 'b']);
        expect(_.difference({a:'a', b:'b'})).to.eql(['a', 'b']);
    });
    it('returns an array of elements from the list that are not contained in the other lists', () => {
        expect(_.difference({a:'a', b: 'b'}, ['a', 'b'])).to.eql([]);
        expect(_.difference('abc', ['a', 'c'])).to.eql(['b']);
        expect(_.difference(['a','b', 'c'], ['a', 'c'])).to.eql(['b']);
        expect(_.difference(['a','b', 'c'], 'a', 'c')).to.eql(['b']);
        expect(_.difference([1,2,3,4,5,6], [2,4,6])).to.eql([1,3,5]);
    });
});

describe.only('#memoize', () => {
    it('it is a function', () => {
        expect(_.memoize).to.be.a('function');
    });
    it('returns a function', () => {
        expect(_.memoize()).to.be.a('function');
    });
    it('returns a function that behaves the same way as the function passed', () => {
        const hello = () => 'hello';
        const memHello = _.memoize(hello);
        expect(memHello()).to.equal('hello');
        const memSum = _.memoize(sum);
        expect(memSum(1,2)).to.equal(3);
    });
    it('caches the result of previously calculated functions', () => {
        const memSum = _.memoize(sum);
        memSum(1,2);
        expect(memSum.cache).to.eql({
            '[1,2]': 3
        });
        memSum(2,3);
        expect(memSum.cache).to.eql({
            '[1,2]':3,
            '[2,3]':5
        });
    });
    it('calls the passed function only once if given the same arguments', () => {
        const spy = sinon.spy(sum);
        const memSumSpy = _.memoize(spy);
        memSumSpy(1,2);
        memSumSpy(1,2);
        expect(spy.callCount).to.equal(1);
        expect(memSumSpy.cache).to.eql({
            '[1,2]': 3
        });
    });
});