/* eslint-env mocha */
'use strict'

const chai = require('chai')
const expect = chai.expect
const { encodeUPRN, decodeMask, isMaskingNumber } = require('../lib')
// The same cases are run against the SQL functions in gazetteer-blueprint, so the two can't drift apart
const cases = require('../lib/test-cases.json')

describe('UPRN encoder', function () {
  describe('known properties', () => {
    for (const { uprn, mask } of cases.valid) {
      it(`encodes ${uprn} as ${mask}`, () => {
        expect(encodeUPRN(uprn)).to.eql(mask)
      })

      it(`decodes ${mask} as ${uprn}`, () => {
        expect(decodeMask(mask)).to.eql(uprn)
      })
    }
  })

  describe('encoding', () => {
    for (const { input, expected, why } of cases.encode) {
      it(`${why}: ${JSON.stringify(input)} -> ${JSON.stringify(expected)}`, () => {
        expect(encodeUPRN(input)).to.eql(expected)
      })
    }

    it('undefined -> null', () => {
      expect(encodeUPRN(undefined)).to.eql(null)
    })
  })

  describe('decoding', () => {
    for (const { input, expected, why } of cases.decode) {
      it(`${why}: ${JSON.stringify(input)} -> ${JSON.stringify(expected)}`, () => {
        expect(decodeMask(input)).to.eql(expected)
      })
    }
  })

  describe('round trip', () => {
    it('every mask decodes back to its UPRN', () => {
      for (let i = 0; i < 20000; i++) {
        const uprn = String(1 + Math.floor(Math.random() * 999999999999))
        expect(decodeMask(encodeUPRN(uprn)), uprn).to.eql(uprn)
      }
    })
  })

  describe('isMaskingNumber', () => {
    for (const text of ['7M36CJNX', '7m36 cjnx', '7M36D9OJ']) {
      it(`${text} is a masking number`, () => {
        expect(isMaskingNumber(text)).to.eql(true)
      })
    }

    // short words and postcodes decode to less than 1, so they're never mistaken for a mask
    for (const text of ['smith', 'WS90TD', 'B66NU', '100070567650', 'FSC493/2024', '']) {
      it(`${text} is not a masking number`, () => {
        expect(isMaskingNumber(text)).to.eql(false)
      })
    }
  })
})
