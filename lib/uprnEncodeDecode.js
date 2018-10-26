'use strict'

const INITIALISATION_VECTOR = 112134617170
const ENCODE_RADIX = 31

const encodeUPRN = function (uprn) {
  let sum = +uprn + +INITIALISATION_VECTOR
  let encodedString = sum.toString(ENCODE_RADIX)
  return removeVowels(encodedString).toUpperCase()
}

const removeVowels = function (str) {
  for (let i = 0; i < str.length; i++) {
    switch (str.charAt(i)) {
      case 'a':
        str = replaceAt(str, i, 'z')
        break
      case 'e':
        str = replaceAt(str, i, 'y')
        break
      case 'i':
        str = replaceAt(str, i, 'x')
        break
      case 'o':
        str = replaceAt(str, i, 'w')
        break
      case 'u':
        str = replaceAt(str, i, 'v')
    }
  }
  return str
}

const replaceAt = function (str, index, replacement) {
  return str.substr(0, index) + replacement + str.substr(index + replacement.length)
}
const decodeMask = function (mask) {
  let encodedString = replaceVowels(mask.toLowerCase())
  let sum = parseInt(encodedString, ENCODE_RADIX)
  console.log(sum - INITIALISATION_VECTOR)
  return (sum - INITIALISATION_VECTOR).toString()
}

const replaceVowels = function (str) {
  for (let i = 0; i < str.length; i++) {
    switch (str.charAt(i)) {
      case 'z':
        str = replaceAt(str, i, 'a')
        break
      case 'y':
        str = replaceAt(str, i, 'e')
        break
      case 'x':
        str = replaceAt(str, i, 'i')
        break
      case 'w':
        str = replaceAt(str, i, 'o')
        break
      case 'v':
        str = replaceAt(str, i, 'u')
    }
  }
  return str
}

module.exports = {
  encodeUPRN,
  decodeMask
}
