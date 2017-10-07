const path = require('path');
const expect = require('chai').expect;
const _  = require(path.join(__dirname, '..', './core_lowbar.js'));

describe('_', () => {
    'use strict';
    it('is an object', () => {
        expect(_).to.be.an('object');
    });
});

describe.only('#identity', () => {
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