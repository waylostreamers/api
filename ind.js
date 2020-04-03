
import express from 'express'
import cfsign from 'aws-cloudfront-sign'

const app = express()
const port = 3000



var signingParams = {
    keypairId: process.env.PUBLIC_KEY,
    privateKeyString: process.env.PRIVATE_KEY,
    // Optional - this can be used as an alternative to privateKeyString
    privateKeyPath: './pk-APKAJKY4M3DMS6GO4G7Q.pem',
    expireTime: new Date().getTime() + 30000
}

// Generating a signed URL
var signedUrl = cfsign.getSignedUrl(
    `${process.env.CF_DISTRIBUTION_BASE_URL}/oberheim.mp3`,
    signingParams
);

app.get('/', (req, res) => res.send(signedUrl))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
