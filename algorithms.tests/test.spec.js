let assert = chai.assert;

// Tests for lessePower

describe('lesserPower', () => {
  it('should return an integer', () => {
    assert.isFinite(lesserPower(2));
  });

  it('if input is not an integer should return NaN', () => {
    assert.isNaN(lesserPower('string'));
  });

  it('should return the smallest power of 2', () => {
    assert.equal(lesserPower(2), 2);
  });

  describe('should return the smallest power of integer greater than n', () => {
    const makeTest = x => {
      const power = lesserPower(x);

      it(`2 to the power of ${power} = ${Math.pow(
        2,
        power
      )} is greater than ${x}`, () => {
        assert.isAbove(Math.pow(2, lesserPower(x)), x);
      });
    };

    for (let i = 5; i <= 100; i *= 3) {
      makeTest(i);
    }
  });
});

// Tests for sumOfSquaresOfIntegers

describe('firstSumOfSquares', () => {
  it('should return an array', () => {
    assert.isArray(firstSumOfSquares());
  });

  it('should return an empty array', () => {
    assert.isEmpty(firstSumOfSquares(7));
  });

  it('should return an array of length 3', () => {
    assert.lengthOf(firstSumOfSquares(3), 3);
  });

  it('should return an array [1, 1, 2]', () => {
    assert.sameOrderedMembers(firstSumOfSquares(6), [1, 1, 2]);
  });

  it('sum of squares is equal to 6', () => {
    assert.equal(
      firstSumOfSquares(6).reduce((acc, curr) => acc + Math.pow(curr, 2), 0),
      6
    );
  });
});

// Tests for sumOfSquaresOfIntegersAll

describe('sumOfSquaresAll', () => {
  it('should return an array', () => {
    assert.isArray(sumOfSquaresAll());
  });

  it('should return an empty array', () => {
    assert.isEmpty(sumOfSquaresAll());
  });

  it('should return an array of length 3', () => {
    assert.lengthOf(sumOfSquaresAll(6), 3);
  });
});
