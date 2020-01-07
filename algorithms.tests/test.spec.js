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

  it('sum of squares is equal to 6', () => {
    assert.equal(
      firstSumOfSquares(6).reduce((acc, curr) => acc + Math.pow(curr, 2), 0),
      6
    );
  });

  describe('for input n should return an array with result', () => {
    const inputs = [3, 6, 9, 11, 12, 14];
    const results = [
      [1, 1, 1],
      [1, 1, 2],
      [1, 2, 2],
      [1, 1, 3],
      [2, 2, 2],
      [1, 2, 3]
    ];

    const makeTest = x => {
      it(`if input is ${inputs[x]} should return an array ${JSON.stringify(
        results[x]
      )}`, () => {
        assert.sameOrderedMembers(firstSumOfSquares(inputs[x]), results[x]);
      });
    };

    for (let i = 0; i < inputs.length; i++) {
      makeTest(i);
    }
  });

  describe('for input n should return an empty array', () => {
    const inputs = [1, 2, 4, 5, 7, 8, 10];

    const makeTest = x => {
      it(`if input is ${inputs[x]} should return an empty array []`, () => {
        assert.isEmpty(firstSumOfSquares(inputs[x]));
      });
    };

    for (let i = 0; i < inputs.length; i++) {
      makeTest(i);
    }
  });

  describe('sum of squares in the array should be equal to n', () => {
    const arrays = [
      [1, 1, 1],
      [1, 1, 2],
      [1, 2, 2],
      [1, 1, 3],
      [2, 2, 2],
      [1, 2, 3]
    ];
    const results = [3, 6, 9, 11, 12, 14];

    const makeTest = x => {
      it(`sum of squares in ${JSON.stringify(arrays[x])} is equal to ${
        results[x]
      }`, () => {
        assert.equal(
          arrays[x].reduce((acc, curr) => acc + Math.pow(curr, 2), 0),
          results[x]
        );
      });
    };

    for (let i = 0; i < arrays.length; i++) {
      makeTest(i);
    }
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

  describe('for input n should return an array with result array/arrays', () => {
    const inputs = [3, 6, 9, 11, 12, 14];
    const results = [
      [[1, 1, 1]],
      [
        [1, 1, 2],
        [1, 2, 1],
        [2, 1, 1]
      ],
      [
        [1, 2, 2],
        [2, 1, 2],
        [2, 2, 1]
      ],
      [
        [1, 1, 3],
        [1, 3, 1],
        [3, 1, 1]
      ],
      [[2, 2, 2]],
      [
        [1, 2, 3],
        [1, 3, 2],
        [2, 1, 3],
        [2, 3, 1],
        [3, 1, 2],
        [3, 2, 1]
      ]
    ];

    const makeTest = x => {
      it(`if input is ${inputs[x]} should return an array ${JSON.stringify(
        results[x]
      )}`, () => {
        assert.sameDeepOrderedMembers(sumOfSquaresAll(inputs[x]), results[x]);
      });
    };

    for (let i = 0; i < inputs.length; i++) {
      makeTest(i);
    }
  });

  describe('for input n should return an empty array', () => {
    const inputs = [1, 2, 4, 5, 7, 8, 10];

    const makeTest = x => {
      it(`if input is ${inputs[x]} should return an empty array []`, () => {
        assert.isEmpty(sumOfSquaresAll(inputs[x]));
      });
    };

    for (let i = 0; i < inputs.length; i++) {
      makeTest(i);
    }
  });

  describe('sum of squares for each subarray in the array should be equal to n', () => {
    const arrays = [
      [[1, 1, 1]],
      [
        [1, 1, 2],
        [1, 2, 1],
        [2, 1, 1]
      ],
      [
        [1, 2, 2],
        [2, 1, 2],
        [2, 2, 1]
      ],
      [
        [1, 1, 3],
        [1, 3, 1],
        [3, 1, 1]
      ],
      [[2, 2, 2]],
      [
        [1, 2, 3],
        [1, 3, 2],
        [2, 1, 3],
        [2, 3, 1],
        [3, 1, 2],
        [3, 2, 1]
      ]
    ];

    const results = [3, 6, 9, 11, 12, 14];

    const makeTest = x => {
      it(`sum of squares for each subarray in ${JSON.stringify(
        arrays[x]
      )} is equal to ${results[x]}`, () => {
        assert.isTrue(
          arrays[x].every(
            subarr =>
              subarr.reduce((acc, curr) => acc + Math.pow(curr, 2), 0) ===
              results[x]
          )
        );
      });
    };

    for (let i = 0; i < arrays.length; i++) {
      makeTest(i);
    }
  });
});
