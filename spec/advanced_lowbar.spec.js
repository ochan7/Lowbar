const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');
const _ = require(path.join(__dirname,'..','./advanced_lowbar.js'));
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
describe.only('#zip', () => {
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
    it('it returns an array when given a list of strings as arguments', () => {
        expect(_.zip('a','b')).to.eql(['a', 'b']);
    });
    it('it returns an array when given a list of arrays', () => {
        expect(_.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false])).to.eql([['moe', 30, true], ['larry', 40, false], ['curly', 50, false]]);
    });
});