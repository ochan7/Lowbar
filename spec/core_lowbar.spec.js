const path = require('path');
const expect = require('chai').expect;
const _  = require(path.join(__dirname, '..', './core_lowbar.js'));

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
describe.only('#first', () => {
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
