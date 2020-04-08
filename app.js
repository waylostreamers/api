const express = require('express')
const cfsign = require('aws-cloudfront-sign')

const app = express()

let privateKey = {}
if (process.env.CF_PRIVATE_KEY) {
  privateKey['privateKeyString'] = new Buffer(process.env.CF_PRIVATE_KEY, 'base64').toString('utf8')
} else {
  privateKey['privateKeyPath'] = process.env.CF_PRIVATE_KEY_PATH
}

const metadata = {
  tracks: [
    {
      id: 'waylo:track:0',
      title: 'Oberheim',
      path: 'oberheim.mp3',
      artist: 'Sean Wayland'
    },
    {
      id: 'waylo:track:1',
      title: 'Club Sandwich',
      path: 'club_sandwich.mp3',
      artist: 'Sean Wayland'
    }
  ]
}

const createUrl = path => {
  const options = {
    keypairId: process.env.CF_ACCESS_KEY_ID,
    expireTime: new Date().getTime() + 30000,
    ...privateKey
  }
  const url = `${process.env.CF_DISTRIBUTION_BASE_URL}/${path}`
  return cfsign.getSignedUrl(url, options)
}

const getTrack = id => {
  const track = metadata.tracks.find(trk => trk.id === id)
  if (track) {
    return {
      id: track.id,
      title: track.title,
      artist: track.artist,
      url: createUrl(track.path)
    }
  } else {
    return { error: 'Track not found' }
  }
}

app.get('/tracks', (req, res) => res.send(JSON.stringify({ tracks: metadata.tracks.map(({ id, title, artist }) => ({ id, title, artist })) })))

app.get('/track', (req, res) => res.send(JSON.stringify(getTrack(req.query.track_id))))

app.get('/', (req, res) => res.send(JSON.stringify({ message: 'Welcome to Waylostreams' })))

module.exports = app
