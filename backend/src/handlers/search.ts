import Broadcaster from '../utils/broadcaster'
import MessageType from '../constants/message'
import Spotify from '../services/spotify'
import EventLogger from '../utils/event-logger'
import Decorator from '../decorators/search'
import { PayloadInterface } from '../utils/payload'

interface SearchHandlerInterface {
  socket: SocketIO.Socket
  payload: PayloadInterface
}

const SearchHandler = ({ socket, payload }: SearchHandlerInterface) => {
  const { data } = payload
  EventLogger.info('SEARCH', payload, true)

  const broadcastTo = (headers: PayloadInterface, tracks: SpotifyApi.SearchResponse) => {
    Decorator.parse(headers, tracks).then((unifiedMessage) => {
      Broadcaster.toClient({
        socket,
        headers,
        message: unifiedMessage,
        type: MessageType.SEARCH
      })
    })
  }

  Spotify.search(data).then((tracks) => {
    broadcastTo(payload, tracks)
  })
}

export default SearchHandler
