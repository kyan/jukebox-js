import EventLogger from 'utils/event-logger'
import { request } from 'gaxios'
import http from 'http'
import User from 'services/mongodb/models/user'

const SpotifyAuth = code => {
  return new Promise((resolve, reject) => {
    let data = process.env.SPOTIFY_ID + ':' + process.env.SPOTIFY_SECRET;
    let buff = new Buffer(data);
    let base64data = buff.toString('base64');

    const gaxiosOptions = {
      url: 'https://accounts.spotify.com/api/token',
      method: 'POST',
      body: `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3001/`,
      headers: {
        'Authorization': `Basic ${base64data}`,
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }
    request(gaxiosOptions)
      .then(response => resolve(response.data))
      .catch(err => console.log('HERE IS THE ERROR', err))
  })
}

const SpotifyHandler = (payload, socket, socketio) => {
  const { user, data } = payload
  const { spotifyToken } = data
  console.log('555', user)
  console.log('666', data)
  // EventLogger.info('CAST_VOTE', payload, true)
  SpotifyAuth(spotifyToken).then(data => {
    const { access_token, refresh_token } = data;

    User.findOneAndUpdate({ _id: user._id }, { spotifyRefreshToken: refresh_token}, {
      new: true
    }).then(user => {
      console.log('!!!!!', user)
    });
  })
}

export default SpotifyHandler
