/**
 * Takes a number an returns a string with leading zeros.
 * @param {Number} num
 * @param {Number} size
 * @param {Number} precicison (only relevant for floating points)
 */
export default function numpad (num, size, precision = 0) {
  let s = num.toFixed(precision)
  const targetSize = precision > 0 ? size + precision + 1 : size

  while (s.length < targetSize) {
    s = '0' + s
  }

  return s
}
