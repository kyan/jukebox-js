import Mopidy from 'constants/mopidy'
import Auth from 'constants/auth'
import Settings from 'constants/settings'
import TransformTrack from './transformers/mopidy/track'
import TransformTracklist from './transformers/mopidy/tracklist'
import NowPlaying from 'handlers/now-playing'
import settings from 'utils/local-storage'
import Spotify from 'services/spotify'

const clearSetTimeout = (timeout) => {
  clearTimeout(timeout)
  timeout = null
}

let recommendTimer

export default function (key, data, mopidy) {
  switch (key) {
    case Mopidy.EVENTS.PLAYBACK_STARTED:
      const payload = TransformTrack(data.tl_track.track)
      const { track } = payload

      settings.addToUniqueArray(Settings.TRACKLIST_LAST_PLAYED, track.uri, 10)
      settings.setItem(Settings.TRACK_CURRENT, track.uri)
      NowPlaying.addTrack(track)
      Spotify.canRecommend(mopidy, (recommend) => {
        const waitToRecommend = track.length / 4 * 3
        const lastTracksPlayed = settings.getItem(Settings.TRACKLIST_LAST_PLAYED) || []

        clearSetTimeout(recommendTimer)
        recommendTimer = setTimeout(recommend, waitToRecommend, lastTracksPlayed, mopidy)
      })
      return payload
    case Mopidy.EVENTS.VOLUME_CHANGED:
      return data.volume
    case Mopidy.EVENTS.PLAYBACK_STATE_CHANGED:
      return data.new_state
    case Mopidy.GET_CURRENT_TRACK:
      if (!data) return null
      const trackInfo = TransformTrack(data)
      settings.setItem(Settings.TRACK_CURRENT, trackInfo.track.uri)
      return trackInfo
    case Mopidy.GET_TRACKS:
      const tracks = TransformTracklist(data)
      settings.setItem(Settings.TRACKLIST_CURRENT, tracks.map(data => data.track.uri))
      return tracks
    case Mopidy.TRACKLIST_REMOVE:
      settings.removeFromArray(Settings.TRACKLIST_LAST_PLAYED, data[0].track.uri)
      return data
    case Mopidy.EVENTS.TRACKLIST_CHANGED:
    case Mopidy.TRACKLIST_ADD:
    case Mopidy.PLAYBACK_NEXT:
    case Mopidy.PLAYBACK_PREVIOUS:
      clearSetTimeout(recommendTimer)
      return data
    case Mopidy.TRACKLIST_CLEAR:
    case Auth.AUTHENTICATION_TOKEN_INVALID:
    case Mopidy.CONNECTION_ERROR:
    case Mopidy.LIBRARY_GET_IMAGES:
    case Mopidy.MIXER_GET_VOLUME:
    case Mopidy.MIXER_SET_VOLUME:
    case Mopidy.PLAYBACK_GET_TIME_POSITION:
    case Mopidy.PLAYBACK_GET_STATE:
      return data
    default:
      return `BACKEND RESPONSE NOT HANDLED: ${key}`
  }
};