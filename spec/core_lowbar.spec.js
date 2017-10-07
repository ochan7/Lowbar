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

describe.only('#values', () => {
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