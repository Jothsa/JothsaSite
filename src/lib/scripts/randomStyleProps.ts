/**
 *
 * @param palette an array of colors to choose from
 * @param numColors num of random color vars to set `--random-color-${i}`
 * @param min - inclusive
 * @param max - exclusive
 * @param numRandomNumbers - number of random color vars to set
 * @param precision - precision of random color vars
 * @param int - should the random colors be whole integers
 */
export function setRandomProps(
  palette?: string[],
  numColors?: number,
  min?: number,
  max?: number,
  numRandomNumbers?: number,
  precision = 5,
  int = false,
) {
  if (palette && numColors && palette?.length <= numColors) {
    setRandomColors(palette, numColors);
  }
  if (min && max && numRandomNumbers) {
    setRandomNumbers(min, max, numRandomNumbers, precision, int);
  }
}

export function setRandomColors(palette: string[], numColors: number) {
  const randomColors: string[] = [];
  // palette without used colors
  let uniquePalette = palette;
  for (let i = 0; i < numColors; i++) {
    const colorIndex = Math.floor(Math.random() * uniquePalette.length);
    randomColors[i] = uniquePalette[colorIndex];
    uniquePalette = uniquePalette.filter((val) => {
      return !randomColors.includes(val);
    });
  }
  if (window?.CSS?.registerProperty) {
    randomColors.forEach((color, i) => {
      window.CSS.registerProperty({
        name: `--random-color-${i + 1}`,
        syntax: `<color>`,
        inherits: true,
        initialValue: `${color}`,
      });
    });
  }
}

/**
 *
 * @param min - inclusive
 * @param max - exclusive
 * @param numRandomNumbers - how many random number properties to set
 * @param precision - number of decimal places if not int
 * @param int - should the number be a whole integer
 */
export function setRandomNumbers(
  min: number,
  max: number,
  numRandomNumbers: number,
  precision = 5,
  int = false,
) {
  if (window?.CSS?.registerProperty) {
    for (let i = 1; i <= numRandomNumbers; i++) {
      let randomNum: number;
      let randomNumStr: string;
      let syntax = `<number>`;
      if (precision > 100 || precision < 1) {
        precision = 5;
      }
      if (int) {
        syntax = `<string>`;
        min = Math.ceil(min);
        max = Math.floor(max);
        randomNum = Math.floor(Math.random() * (max - min) + min);
        randomNumStr = randomNum.toString();
      } else {
        randomNum = Math.random() * (max - min) + min;
        randomNumStr = randomNum.toPrecision(precision);
      }
      window.CSS.registerProperty({
        name: `--random-number-${i}`,
        syntax: syntax,
        inherits: true,
        initialValue: randomNumStr,
      });
    }
  }
}
