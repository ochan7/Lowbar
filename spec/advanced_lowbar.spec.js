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

describe.only('#shuffle', () => {
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