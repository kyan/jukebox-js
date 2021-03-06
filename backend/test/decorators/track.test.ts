import DecorateTrack from '../../src/decorators/track'
import fs from 'fs'

describe('DecorateTrack', () => {
  const payload = JSON.parse(
    fs.readFileSync('./test/__mockData__/tracklist.json', 'utf8')
  )

  describe('when passed a Mopidy payload', () => {
    it('transforms the track', () => {
      const albumTrack = payload[0]
      albumTrack.addedBy = 'duncan'
      albumTrack.metrics = 'metrics'
      albumTrack.image = 'http://path/to/image'

      expect(DecorateTrack(albumTrack)).toEqual({
        addedBy: 'duncan',
        metrics: 'metrics',
        album: {
          name: 'London 0 Hull 4',
          uri: 'spotify:album:13gokJcmO1Dbc9cbHM93jO',
          year: '1986'
        },
        artist: {
          name: 'The Housemartins',
          uri: 'spotify:artist:77D38RDgCtlYNLpayStftL'
        },
        image: 'http://path/to/image',
        length: 145000,
        name: 'Happy Hour',
        uri: 'spotify:track:6IZWJhXyk1Z0rtWNxIi4o7',
        year: '1986'
      })
    })

    it('can handle no album', () => {
      const albumTrack = payload[0]
      albumTrack.album = undefined

      expect(DecorateTrack(albumTrack)).toEqual({
        addedBy: 'duncan',
        metrics: 'metrics',
        artist: {
          name: 'The Housemartins',
          uri: 'spotify:artist:77D38RDgCtlYNLpayStftL'
        },
        image: 'http://path/to/image',
        length: 145000,
        name: 'Happy Hour',
        uri: 'spotify:track:6IZWJhXyk1Z0rtWNxIi4o7',
        year: '1986'
      })
    })
  })

  describe('when passed a Spotify payload', () => {
    afterEach(() => {
      jest.clearAllMocks()
      process.env.EXPLICIT_CONTENT = 'true'
    })

    it('transforms the track', () => {
      process.env.EXPLICIT_CONTENT = 'false'
      const payload = JSON.parse(
        fs.readFileSync('./test/__mockData__/searchResults.json', 'utf8')
      ).tracks.items
      const track = payload[1]

      expect(DecorateTrack(track)).toEqual({
        album: {
          name: 'Ken Dodd - His Greatest Hits',
          uri: 'spotify:album:59TyQORxcvy9RWj7gkZMvB',
          year: undefined
        },
        artist: {
          name: 'Ken Dodd',
          uri: 'spotify:artist:76o4kCpWMmBGl8jIYfRHTk'
        },
        image: 'https://i.scdn.co/image/ab67616d0000b27368b6e0998ac2c1726839bdcd',
        length: 120066,
        name: 'Happiness',
        uri: 'spotify:track:6idaUJ1KK1mWyxQziMefhU',
        explicit: true
      })
    })
  })

  describe('when passed no track', () => {
    it('returns an empty track', () => {
      expect(() => {
        DecorateTrack(null)
      }).toThrow('DecorateTrack passed no data!')
    })
  })
})
