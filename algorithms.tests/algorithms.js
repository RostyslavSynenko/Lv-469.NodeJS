/*108
 Дано натуральное число n. Получить наименьшее число вида 2^r, превосходящее n.
*/

const lesserPower = n => {
  if (isNaN(n)) {
    return NaN;
  }

  let r = 2;

  while (Math.pow(2, r) <= n) {
    r++;
  }

  return r;
};

/*331 а) 
  Дано натуральное число n. Можно ли его представить в виде суммы трех квадратов натуральных чисел? Если можно то
  а) указать тройку x,y,z таких натуральных чисел, что n = x^2 + y^2 + z^2
*/

const firstSumOfSquares = n => {
  let sum;

  for (let x = 1; x < n; x++) {
    for (let y = 1; y < n; y++) {
      for (let z = 1; z < n; z++) {
        sum = Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2);

        if (sum === n) {
          return [x, y, z];
        }
      }
    }
  }

  return [];
};

/*331 б)
  б) указать все тройки x,y,z таких натуральных чисел, что n = x^2 + y^2 + z^2
*/
const sumOfSquaresAll = n => {
  let sum;
  let arr = [];

  for (let x = 1; x < n; x++) {
    for (let y = 1; y < n; y++) {
      for (let z = 1; z < n; z++) {
        sum = Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2);

        if (sum === n) {
          arr.push([x, y, z]);
        }
      }
    }
  }

  return arr;
};
