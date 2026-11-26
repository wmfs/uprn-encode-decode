/* eslint-env mocha */
'use strict'

const chai = require('chai')
const expect = chai.expect
const process = require('process')
const { encodeUPRN, decodeMask } = require('../lib')

describe('Tests the UPRN encoder', function () {
  this.timeout(process.env.TIMEOUT || 5000)

  const properties = [
    {
      uprn: '92474384733',
      mask: '7DGR550V'
    },
    {
      uprn: '96174563388',
      mask: '7HM3NN0N'
    },
    {
      uprn: '98382749801',
      mask: '7K67PZKG'
    },
    {
      uprn: '91470135144',
      mask: '7CCWNZ7T'
    },
    {
      uprn: '96758256084',
      mask: '7XBFWKHC'
    },
    {
      uprn: '91088460575',
      mask: '7BVYYX92'
    },
    {
      uprn: '90539024387',
      mask: '7BB8GHF2'
    },
    {
      uprn: '98469101408',
      mask: '7K989SK7'
    },
    {
      uprn: '90821972019',
      mask: '7BL4S9S1'
    },
    {
      uprn: '97639984363',
      mask: '7JB9GWW3'
    },
    {
      uprn: '96795725891',
      mask: '7XCPBCVQ'
    },
    {
      uprn: '98628334283',
      mask: '7KYPMSJX'
    },
    {
      uprn: '94768674605',
      mask: '7G40Y0DL'
    },
    {
      uprn: '94631097078',
      mask: '7FV6YSJT'
    },
    {
      uprn: '91170428066',
      mask: '7C2Z707L'
    },
    {
      uprn: '93457568450',
      mask: '7YK6NR0N'
    },
    {
      uprn: '92529841195',
      mask: '7DXP6L23'
    },
    {
      uprn: '91991200146',
      mask: '7CVVV0FC'
    },
    {
      uprn: '99305929206',
      mask: '7L7FDR6Z'
    },
    {
      uprn: '99968965448',
      mask: '7LVKC486'
    }
  ]

  for (const { uprn, mask } of properties) {
    it(`should encode uprn ${uprn} into mask ${mask}`, () => {
      expect(encodeUPRN(uprn)).to.eql(mask)
    })

    it(`should decode mask ${mask} into uprn ${uprn}`, () => {
      expect(decodeMask(mask)).to.eql(uprn)
    })
  }
})
