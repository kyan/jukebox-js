import EventLogger from 'utils/event-logger'
import mockingoose from 'mockingoose'
import ImageCache from './index'
jest.mock('utils/event-logger')

describe('ImageCache', () => {
  beforeEach(() => {
    mockingoose.resetAll()
    jest.clearAllMocks()
  })

  describe('findAll', () => {
    it('finds some images and returns them', done => {
      const _doc = {
        _id: 'spotify123',
        url: 'path/to/image'
      }
      expect.assertions(2)
      mockingoose.Image.toReturn([_doc], 'find')

      ImageCache.findAll([_doc._id])
        .then((result) => {
          expect(result).toMatchObject([_doc])
          expect(EventLogger.info).toHaveBeenCalledWith('FOUND CACHED IMAGES', { data: ['spotify123'] })
          done()
        })
    })

    it('finds no images and returns them', done => {
      const _doc = {
        _id: 'spotify123',
        url: 'path/to/image'
      }
      expect.assertions(2)
      mockingoose.Image.toReturn([], 'find')

      ImageCache.findAll([_doc._id])
        .then((result) => {
          expect(result).toMatchObject([])
          expect(EventLogger.info).not.toHaveBeenCalled()
          done()
        })
    })

    it('handles errors', done => {
      expect.assertions(1)

      ImageCache.findAll('xxx')
        .catch((error) => {
          expect(error.message).toEqual("Cannot read property 'length' of undefined")
          done()
        })
    })
  })

  describe('addAll', () => {
    it('exits early if no data', async () => {
      const result = await ImageCache.addAll(null)
      expect(result).toEqual(null)
    })

    it('handles resolving an image ', done => {
      expect.assertions(1)
      mockingoose.Image.toReturn({ url: 'path' }, 'findOneAndUpdate')

      ImageCache.addAll({ 'spotify123': 'path/to/image' })
        .then((result) => {
          expect(result).toMatchObject([{ url: 'path' }])
          done()
        })
    })

    it('handles errors', done => {
      expect.assertions(1)

      ImageCache.addAll({ 'xxx': null })
        .catch((error) => {
          expect(error.message).toEqual('storeImages: Bad data')
          done()
        })
    })
  })
})