import MopidyConst from 'constants/mopidy'
import VoteConstant from 'constants/votes'
import MessageType from 'constants/message'
import EventLogger from 'utils/event-logger'
import Broadcaster from 'utils/broadcaster'
import { updateTrackVote } from 'services/mongodb/models/track'
import User from 'services/mongodb/models/user'
import { request } from 'gaxios'

const base64SpotifyHeader = new Buffer(process.env.SPOTIFY_ID + ':' + process.env.SPOTIFY_SECRET).toString('base64');

const userHasVotedOnTrackBefore = () => false;

const postTrackToPlaylist = (trackUri, playlistId, access_token) => {
  return new Promise((resolve, reject) => {
    if (userHasVotedOnTrackBefore(trackUri)) { return resolve('Nothing to see here') }

    request({
      url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      method: 'POST',
      headers: { 'Authorization': `Bearer ${access_token}`},
      data: {
        uris: [trackUri]
      }
    }).then(response => {
    })
    .catch(err => (reject(err)))
  })
}

const refreshAccessToken = refreshToken => {
  return new Promise((resolve, reject) => {
    request({
      url: 'https://accounts.spotify.com/api/token',
      method: 'POST',
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
      headers: {
        'Authorization': `Basic ${base64SpotifyHeader}`,
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then(response => resolve(response))
    .catch(err => (reject(err)))
  })
}

const getSpotifyUserId = (accessToken, user) => {
  return new Promise((resolve, reject) => {
    if (user.spotifyUserId) { return resolve(user.spotifyUserId) }
    request({
      url: 'https://api.spotify.com/v1/me',
      method: 'GET',
      headers: { 'Authorization': `Bearer ${accessToken}`}
    }).then(response => {
      console.log('88888', response)
      const mySpotifyUserId = response.data.id
      user.spotifyUserId = mySpotifyUserId
      resolve(mySpotifyUserId)
    })
    .catch(err => (reject(err)))
  })
}

const findOrCreateUpvotesPlaylist = (spotifyUserId, accessToken, user) => {
  return new Promise((resolve, reject) => {
    if (user.spotifyPlaylistId) { return resolve(user.spotifyPlaylistId) }
    request({
      url: `https://api.spotify.com/v1/users/${spotifyUserId}/playlists`,
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken}`},
      data: { name: 'New JB Upvotes' }
    }).then(response => {
      resolve(response.data.id)
    })
    .catch(err => (reject(err)))
  })
}

const updateMySpotify = (user, trackUri) => {
  User.findOne({ _id: user._id }, (err, user) => {
    if (!user.spotifyRefreshToken) { return }
    refreshAccessToken(user.spotifyRefreshToken).then(response => {
      const { data } = response;
      const { access_token, refresh_token } = data;
      if (refresh_token) { user.spotifyRefreshToken = refresh_token }
      getSpotifyUserId(access_token, user).then(mySpotifyUserId => {
        findOrCreateUpvotesPlaylist(mySpotifyUserId, access_token, user).then(playlistId => {
          console.log('4444', playlistId)
          postTrackToPlaylist(trackUri, playlistId, access_token)
          user.spotifyPlaylistId = playlistId
          user.save().then(user => { console.log('5555', user) })
        })
      })
    })
  })
}

const VoteHandler = (payload, socket, socketio) => {
  const { user, data } = payload
  EventLogger.info('CAST_VOTE', payload, true)

  const broadcastTo = (headers, message) => {
    Broadcaster.toClient(socket, headers, message, MessageType.VOTE)
  }

  updateTrackVote(data.uri, user, data.vote).then((track) => {
    Broadcaster.toAll(socketio, VoteConstant.VOTE_CASTED, track, MessageType.VOTE)
    updateMySpotify(user, track.uri)
  }).catch((err) => {
    payload.key = MopidyConst.VALIDATION_ERROR
    broadcastTo(payload, err.message)
  })
}

export default VoteHandler
