import express from 'express'
import cfsign from 'aws-cloudfront-sign'

const app = express()
const port = 3000

const createUrl = () => {
  const options = {
    keypairId: process.env.CF_ACCESS_KEY_ID,
    privateKeyString: new Buffer(process.env.CF_PRIVATE_KEY, 'base64').toString('utf8'),
    expireTime: new Date().getTime() + 30000
  }
  const url = `${process.env.CF_DISTRIBUTION_BASE_URL}/oberheim.mp3`
  return cfsign.getSignedUrl(url, options)
}

app.get('/', (req, res) => res.send(createUrl()))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
