'use strict'

// A masking number is the UPRN plus a fixed number, written in base 31,
// with the vowels swapped for consonants (a>z, e>y, i>x, o>w, u>v) so it can't spell words.
const INITIALISATION_VECTOR = 112134617170n
const RADIX = 31n
const ALPHABET = '0123456789ZBCDYFGHXJKLMNWPQRSTV'
const MAX_UPRN = 999999999999n // UPRNs are at most 12 digits
const VALID_MASK = /^[0-9B-DF-HJ-NP-TV-Z]{1,9}$/ // 0-9 and consonants only: no A, E, I, O or U

function toUprn (uprn) {
  if (uprn === null || uprn === undefined) return null
  const s = String(uprn).trim()
  if (!/^\d{1,12}$/.test(s)) return null
  const n = BigInt(s)
  return n > 0n ? n : null
}

/**
 * UPRN (number or string) -> masking number, e.g. 100070567650 -> '7M36CJNX'.
 * Returns null for anything that isn't a valid UPRN (missing, 0, negative, not a whole number, more than 12 digits).
 */
function encodeUPRN (uprn) {
  const n = toUprn(uprn)
  if (n === null) return null

  let v = n + INITIALISATION_VECTOR
  let mask = ''
  while (v > 0n) {
    mask = ALPHABET[Number(v % RADIX)] + mask
    v = v / RADIX
  }
  return mask
}

/**
 * Tidies a masking number as people type it: upper case, no spaces or hyphens,
 * and O / I read as 0 / 1 (O and I never appear in a masking number).
 */
function normaliseMask (mask) {
  if (mask === null || mask === undefined) return ''
  return String(mask)
    .toUpperCase()
    .replace(/[\s-]/g, '')
    .replace(/O/g, '0')
    .replace(/I/g, '1')
}

/**
 * Masking number -> UPRN as a string, e.g. '7M36 CJNX' -> '100070567650'.
 * Returns null if it isn't a valid masking number.
 */
function decodeMask (mask) {
  const m = normaliseMask(mask)
  if (!VALID_MASK.test(m)) return null

  let acc = 0n
  for (const ch of m) acc = acc * RADIX + BigInt(ALPHABET.indexOf(ch))

  const uprn = acc - INITIALISATION_VECTOR
  return uprn > 0n && uprn <= MAX_UPRN ? uprn.toString() : null
}

function isMaskingNumber (text) {
  return decodeMask(text) !== null
}

module.exports = {
  encodeUPRN,
  decodeMask,
  isMaskingNumber
}
