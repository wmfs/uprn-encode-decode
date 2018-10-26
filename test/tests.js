/* eslint-env mocha */
'use strict'

const chai = require('chai')
const expect = chai.expect
const process = require('process')
const encode = require('../lib/uprnEncodeDecode.js').encodeUPRN

describe('Tests the UPRN encoder', function () {
  this.timeout(process.env.TIMEOUT || 5000)

  const properties = [
    {
      uprn: '100070587119',
      mask: '7M36D90J'
    },
    {
      uprn: '100120581570',
      mask: '7M4THYBQ'
    },
    {
      uprn: '100031621765',
      mask: '7M1Q7ZZM'
    },
    {
      uprn: '100070438189',
      mask: '7M36891D'
    },
    {
      uprn: '100070661270',
      mask: '7M36FW5X'
    },
    {
      uprn: '100070377892',
      mask: '7M36689B'
    },
    {
      uprn: '100070529272',
      mask: '7M36BZPX'
    },
    {
      uprn: '100032225798',
      mask: '7M1QRXRK'
    },
    {
      uprn: '100031626162',
      mask: '7M1Q7YSH'
    },
    {
      uprn: '100032225166',
      mask: '7M1QRX78'
    },
    {
      uprn: '100071397718',
      mask: '7M379FFV'
    },
    {
      uprn: '10024333046',
      mask: '4DJT71Y9'
    },
    {
      uprn: '10090434308',
      mask: '4DM7WR92'
    },
    {
      uprn: '100071065698',
      mask: '7M36TB0K'
    },
    {
      uprn: '100071279199',
      mask: '7M375G5W'
    },
    {
      uprn: '100071411459',
      mask: '7M379TP7'
    },
    {
      uprn: '100032229821',
      mask: '7M1QRN2D'
    },
    {
      uprn: '100070997155',
      mask: '7M36R1LX'
    },
    {
      uprn: '10003691644',
      mask: '4DJ6R5BJ'
    },
    {
      uprn: '100031688993',
      mask: '7M1Q9X9B'
    }
  ]

  for(let i = 0; i < properties.length; i++) {
    it(`should encode uprn ${properties[i].uprn} into mask ${properties[i].mask}`, async () => {
      expect(encode(properties[i].uprn)).to.eql(properties[i].mask)
    })
  }
})


