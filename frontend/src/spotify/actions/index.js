import Spotify from 'spotify/constants'

export const addToken = spotifyToken => {
  return {
    type: Spotify.SPOTIFY,
    key: Spotify.ADD_TOKEN,
    params: { spotifyToken }
  }
}
