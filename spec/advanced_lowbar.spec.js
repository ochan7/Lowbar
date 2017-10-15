const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');
const _ = require(path.join(__dirname,'..','./advanced_lowbar.js'));

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