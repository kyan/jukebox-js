import EventLogger from '../../src/utils/event-logger'
import Event from '../../src/models/event'
import logger from '../../src/config/logger'
jest.mock('../../src/models/event')
jest.mock('../../src/config/logger')

describe('EventLogger', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('logs output but does not create an Event', () => {
    jest.spyOn(Event, 'create')

    EventLogger.info('mopidy::mixer.setVolume', { data: { name: 'Duncan' } })
    expect(Event.create).not.toHaveBeenCalled()
    expect(logger.info).toHaveBeenCalledWith('mopidy::mixer.setVolume', {
      data: { name: 'Duncan' }
    })
  })

  it('logs output and creates an Event', () => {
    jest.spyOn(Event, 'create')

    EventLogger.info(
      'mopidy::mixer.setVolume',
      { data: 'data', user: { _id: '12345' }, key: 'key123' },
      true
    )
    expect(Event.create).toHaveBeenCalledWith({
      key: 'key123',
      payload: {
        data: 'data',
        key: 'key123',
        response: undefined,
        user: {
          _id: '12345'
        }
      },
      user: '12345'
    })
    expect(logger.info).toHaveBeenCalledWith('mopidy::mixer.setVolume', {
      key: 'key123',
      user: { _id: '12345' },
      data: 'data'
    })
  })
})
