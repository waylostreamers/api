
import express from 'express'
import cfsign from 'aws-cloudfront-sign'

const app = express()
const port = 3000

import {cfbu} from './keys.js';
import {pkpath} from './keys.js';



var signingParams = {
    keypairId: process.env.PUBLIC_KEY,
    privateKeyString: process.env.PRIVATE_KEY,
    // Optional - this can be used as an alternative to privateKeyString
    privateKeyPath: pkpath,
    expireTime: new Date().getTime() + 30000
}

// Generating a signed URL
var signedUrl = cfsign.getSignedUrl(
    cfbu,
    signingParams
);

app.get('/', (req, res) => res.send(signedUrl))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
