import { expect } from 'chai';

it('should be add the number correctly', function () {
    const num1 = 2;
    const num2 = 3;
    expect(num1 + num2).to.equal(5);
});

it('Result should not be 6', function () {
    const num1 = 2;
    const num2 = 3;
    expect(num1 + num2).not.to.equal(6);
});