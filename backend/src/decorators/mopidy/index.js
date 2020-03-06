import Mopidy from 'constants/mopidy'
import DecorateTracklist from 'decorators/mopidy/tracklist'
import NowPlaying from 'utils/now-playing'
import Spotify from 'services/spotify'
import {
  addToTrackSeedList,
  clearState,
  removeFromSeeds,
  trimTracklist,
  updateCurrentTrack,
  updateTracklist,
  getSeedTracks
} from 'services/mongodb/models/setting'
import { addTracks, updateTrackPlaycount } from 'services/mongodb/models/track'

const clearSetTimeout = (timeout) => {
  clearTimeout(timeout)
  timeout = null
}

const recommendTracks = (recommendFunc, trackLength, mopidy) => {
  if (!recommendFunc) return

  getSeedTracks().then(uris => {
    const waitToRecommend = trackLength / 4 * 3
    clearSetTimeout(recommendTimer)
    recommendTimer = setTimeout(recommendFunc, waitToRecommend, uris, mopidy)
  })
}

let recommendTimer

const MopidyDecorator = {
  mopidyCoreMessage: (headers, data, mopidy) => {
    return new Promise((resolve) => {
      const { key } = headers

      switch (key) {
        case Mopidy.CORE_EVENTS.PLAYBACK_ENDED:
          return DecorateTracklist([data.tl_track.track])
            .then(data => {
              return addToTrackSeedList(data[0].track)
                .then(() => trimTracklist(mopidy))
                .then(() => resolve(data[0].track.uri))
            })
        case Mopidy.CORE_EVENTS.PLAYBACK_STARTED:
          return updateTrackPlaycount(data.tl_track.track.uri)
            .then(() => DecorateTracklist([data.tl_track.track]))
            .then(data => {
              const payload = data[0]
              NowPlaying.addTrack(payload.track)

              return updateCurrentTrack(payload.track.uri)
                .then(() => Spotify.canRecommend(mopidy))
                .then(recommend => {
                  recommendTracks(recommend, payload.track.length, mopidy)
                  return resolve(payload)
                })
            })
        case Mopidy.CORE_EVENTS.VOLUME_CHANGED:
          return resolve({ volume: data.volume })
        case Mopidy.CORE_EVENTS.PLAYBACK_STATE_CHANGED:
          return resolve(data.new_state)
        case Mopidy.CORE_EVENTS.PLAYBACK_RESUMED:
          return resolve(data.time_position)
        default:
          return resolve(`mopidySkippedTransform: ${key}`)
      }
    })
  },
  parse: (headers, data) => {
    return new Promise(resolve => {
      const { key, user } = headers

      switch (key) {
        case Mopidy.GET_CURRENT_TRACK:
          if (!data) return resolve()
          return DecorateTracklist([data])
            .then(TransformedData => {
              const trackInfo = TransformedData[0]
              return updateCurrentTrack(trackInfo.track.uri).then(() => resolve(trackInfo))
            })
        case Mopidy.GET_TRACKS:
          return DecorateTracklist(data).then(tracks => {
            return updateTracklist(tracks.map(data => data.track.uri))
              .then(() => resolve(tracks))
          })
        case Mopidy.TRACKLIST_REMOVE:
          return removeFromSeeds(data[0].track.uri)
            .then(() => DecorateTracklist([data[0].track]))
            .then((response) => resolve(response[0]))
        case Mopidy.TRACKLIST_ADD:
          const { data: track } = headers
          return addTracks([track.uris[0]], user)
            .then(() => DecorateTracklist([data[0].track]))
            .then((response) => {
              clearSetTimeout(recommendTimer)
              return resolve({
                message: `${response[0].track.name} by ${response[0].track.artist.name}`,
                toAll: true
              })
            })
        case Mopidy.PLAYBACK_NEXT:
        case Mopidy.PLAYBACK_PREVIOUS:
          clearSetTimeout(recommendTimer)
          return resolve()
        case Mopidy.TRACKLIST_CLEAR:
          return clearState().then(() => resolve(data))
        case Mopidy.MIXER_SET_VOLUME:
          return resolve({
            volume: headers.data[0],
            toAll: true
          })
        case Mopidy.MIXER_GET_VOLUME:
          return resolve({ volume: data })
        case Mopidy.PLAYBACK_GET_TIME_POSITION:
        case Mopidy.PLAYBACK_GET_STATE:
        case Mopidy.VALIDATION_ERROR:
          return resolve(data)
        default:
          return resolve(`skippedTransform: ${key}`)
      }
    })
  }
}

export default MopidyDecorator
