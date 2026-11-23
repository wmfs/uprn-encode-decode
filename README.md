# uprn-encode-decode
Encodes UPRNs into masking numbers, and decodes masking numbers back into UPRNs.

```js
const { encodeUPRN, decodeMask, isMaskingNumber } = require('@wmfs/uprn-encode-decode')

encodeUPRN(100070567650) // '7M36CJNX'
decodeMask('7m36 cjnx') // '100070567650'
isMaskingNumber('7M36CJNX') // true
```

- **`encodeUPRN(uprn)`** returns `null` for anything that isn't a valid UPRN: missing, 0, negative, not a whole number, or more than 12 digits.
- **`decodeMask(mask)`** accepts lower case, spaces and hyphens, and reads a letter O or I as 0 or 1, because they never appear in a masking number. It returns `null` if the text isn't a valid masking number.
- **`isMaskingNumber(text)`** is `true` when `decodeMask` would return a UPRN.

## Shared test cases
`lib/test-cases.json` is also run against the `wmfs.uprn_to_mask` and `wmfs.mask_to_uprn` SQL functions in gazetteer-blueprint, so the two implementations can't drift apart. Add new cases there.
