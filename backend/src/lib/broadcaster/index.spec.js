import Broadcaster from './index'

describe('Broadcaster', () => {
  const mockBroadcaster = jest.fn()
  const broadcaster = new Broadcaster(mockBroadcaster)

  beforeEach(() => {
    spyOn(console, 'log')
  })

  describe('#to', () => {
    it('handles the call', () => {
      const sendMock = jest.fn()
      const clientMock = { send: sendMock }
      const key = 'playback.next'
      const message = 'hello mum'

      broadcaster.to(clientMock, key, message)
      expect(console.log).toBeCalled()
      expect(sendMock.mock.calls.length).toEqual(1)
      expect(sendMock.mock.calls[0][0])
        .toEqual('{"key":"playback.next","data":"hello mum"}')
    })
  })

  describe('#everyone', () => {
    it('handles the call', () => {
      const key = 'playback.next'
      const message = 'hello mum'

      broadcaster.everyone(key, message)
      expect(console.log).toBeCalled()
      expect(mockBroadcaster.mock.calls.length).toEqual(1)
      expect(mockBroadcaster.mock.calls[0][0])
        .toEqual('{"key":"playback.next","data":"hello mum"}')
    })
  })

  describe('#eventList', () => {
    it('handles the call', () => {
      expect(broadcaster.eventList).toEqual(
        [
          'event:trackPlaybackStarted',
          'event:playbackStateChanged',
          'event:trackPlaybackResumed',
          'event:tracklistChanged',
          'event:volumeChanged'
        ]
      )
    })
  })
})
