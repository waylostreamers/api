# Waylostreams API

This will run on AWS lambda and provide a gateway to access all data. Users will login with this and be able to search available metadata (albums, artists, track etc.) and receive signed Cloudfront URLs that allow them to stream the corresponding files.

### Setup

You will need:
- Cloudfront key pair (to get this, see [these instructions](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-trusted-signers.html#private-content-creating-cloudfront-key-pairs))
- Cloudfront distribution & S3 bucket (see [Restricting Access to Amazon S3 Content by Using an Origin Access Identity](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html))
- AWS account must be a trusted signer (see [Specifying the AWS Accounts That Can Create Signed URLs and Signed Cookies (Trusted Signers)](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-trusted-signers.html#private-content-adding-trusted-signers))


Once you have your cloudfront key pair and have been added as a trusted signer to the cloudfront distribution, create your `.env` by doing the following:
```
echo "CF_DISTRIBUTION_BASE_URL=http://d2rzj0e9o6ddz8.cloudfront.net" > .env
echo "CF_ACCESS_KEY_ID=<THE ACCESS KEY ID YOU GOT FROM AWS>" >> .env
```

You may either use a private key base64 encoded as a string or provide the path to the private key file. To use a base64 encoded string:
```
echo "CF_PRIVATE_KEY=$(base64 -i /path/to/private/keyfile.pem)" >> .env
```
To use the keyfile path, instead do:
```
echo "CF_PRIVATE_KEY_PATH=/path/to/private/keyfile.pem >> .env"
```
Providing `CF_PRIVATE_KEY` will override `CF_PRIVATE_KEY_FILE`, so do not define `CF_PRIVATE_KEY` if you wish to use the keyfile path.

### Install:
You need Node 12 installed with yarn or npm.
```
yarn install
```

### Run
```
export $(cat .env | xargs)
node index.js
```
Go to http://localhost:3000 in your browser or run `curl http://localhost:3000` to get the signed URL to download the mp3!



**Sean's UBUNTU 18.04 instructions for yarn and node installation <br/>**
from this page (https://gist.github.com/ankurk91/8f107ef490f40f74a1cf) <br/>
run this command in your terminal  : <br/>
```
$curl -o- https://gist.githubusercontent.com/ankurk91/8f107ef490f40f74a1cf/raw/install-node-js.sh | bash -s -- --version 12
```
<br/>
then check your node version is 12

```
$node --version
```
<br/>
Install express 

```
$ npm install express

```
<br/>

Install aws-cloudront-sign npm mranager : 
<br/>

```
$npm i aws-cloudfront-sign

```
<br/>
The react examples are outdated on the react site. <br>
npm create react app wont work. <br>
To create a react app use yarn instead  : <br>

```
$yarn create react-app my-app

```
Then run with 

```
$yarn start

```








