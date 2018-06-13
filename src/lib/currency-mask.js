/**
 * Copied from
 * https://github.com/jsillitoe/react-currency-input/blob/master@%7B2018-06-13%7D/src/mask.js
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Cedric Dugas
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

export default function mask(value, precision = 2, decimalSeparator = '.', thousandSeparator = ',', allowNegative = false, prefix = '', suffix = ''){
    // provide some default values and arg validation.
    if (precision < 0) { precision = 0; } // precision cannot be negative
    if (precision > 20) { precision = 20; } // precision cannot be greater than 20

    if (value === null || value===undefined) {
          return {
              value: 0,
              maskedValue: ''
          };
     }

    value = String(value); //if the given value is a Number, let's convert into String to manipulate that

    if (value.length == 0) {
        return {
            value: 0,
            maskedValue: ''
        };
    }


    // extract digits. if no digits, fill in a zero.
    let digits = value.match(/\d/g) || ['0'];

    let numberIsNegative = false;
    if (allowNegative) {
        let negativeSignCount = (value.match(/-/g) || []).length;
        // number will be negative if we have an odd number of "-"
        // ideally, we should only ever have 0, 1 or 2 (positive number, making a number negative
        // and making a negative number positive, respectively)
        numberIsNegative = negativeSignCount % 2 === 1;

        // if every digit in the array is '0', then the number should never be negative
        let allDigitsAreZero = true;
        for (let idx=0; idx < digits.length; idx += 1) {
            if(digits[idx] !== '0') {
                allDigitsAreZero = false;
                break;
            }
        }
        if (allDigitsAreZero) {
            numberIsNegative = false;
        }
    }

    // zero-pad a input
    while (digits.length <= precision) { digits.unshift('0'); }

    if (precision > 0) {
        // add the decimal separator
        digits.splice(digits.length - precision, 0, ".");
    }

    // clean up extraneous digits like leading zeros.
    digits = Number(digits.join('')).toFixed(precision).split('');
    let raw = Number(digits.join(''));

    let decimalpos = digits.length - precision - 1;  // -1 needed to position the decimal separator before the digits.
    if (precision > 0) {
        // set the final decimal separator
        digits[decimalpos] = decimalSeparator;
    } else {
        // when precision is 0, there is no decimal separator.
        decimalpos = digits.length;
    }

    // add in any thousand separators
    for (let x=decimalpos - 3; x > 0; x = x - 3) {
        digits.splice(x, 0, thousandSeparator);
    }

    // if we have a prefix or suffix, add them in.
    if (prefix.length > 0) { digits.unshift(prefix); }
    if (suffix.length > 0) { digits.push(suffix); }

    // if the number is negative, insert a "-" to
    // the front of the array and negate the raw value
    if (allowNegative && numberIsNegative) {
        digits.unshift('-');
        raw = -raw;
    }

    return {
        value: raw,
        maskedValue: digits.join('').trim()
    };
}
