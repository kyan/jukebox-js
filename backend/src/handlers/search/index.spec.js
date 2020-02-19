import Spotify from 'services/spotify'
import Broadcaster from 'utils/broadcaster'
import Decorator from 'decorators/search'
import SearchHandler from './index'
jest.mock('utils/event-logger')
jest.mock('services/spotify')
jest.mock('utils/broadcaster')
jest.mock('decorators/search')

describe('SearchHandler', () => {
  const ws = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should handle a valid search', done => {
    expect.assertions(2)
    const payload = {
      key: 'searchGetTracks',
      data: 'search'
    }
    Spotify.search.mockResolvedValue('tracks')
    Decorator.parse.mockResolvedValue('unifiedMessage')

    SearchHandler(payload, ws)

    setTimeout(() => {
      try {
        expect(Spotify.search).toHaveBeenCalledWith('search')
        expect(Broadcaster.toClient).toHaveBeenCalledWith(
          ws,
          { data: 'search', key: 'searchGetTracks' },
          'unifiedMessage',
          'search'
        )
        done()
      } catch (err) {
        done.fail(err)
      }
    })
  })

  it('should handle an invalid search', done => {
    expect.assertions(2)
    const payload = {
      key: 'searchGetTracks',
      data: 'search'
    }
    Spotify.search.mockRejectedValue(new Error('booom'))
    Decorator.parse.mockResolvedValue('unifiedMessage')

    SearchHandler(payload, ws)

    setTimeout(() => {
      try {
        expect(Spotify.search).toHaveBeenCalledWith('search')
        expect(Broadcaster.toClient).toHaveBeenCalledWith(
          ws,
          { data: 'search', key: 'validationError' },
          'unifiedMessage',
          'search'
        )
        done()
      } catch (err) {
        done.fail(err)
      }
    })
  })
})