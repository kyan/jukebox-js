import { Socket } from 'socket.io'
import { OAuth2Client } from 'google-auth-library'
import Broadcaster from '../utils/broadcaster'
import AuthConsts from '../constants/auth'
import MopidyConsts from '../constants/mopidy'
import logger from '../config/logger'
import User, { JBUser } from '../models/user'
import Payload from '../utils/payload'

const isAuthorisedRequest = (key: string): boolean => {
  return (MopidyConsts.AUTHORISED_KEYS as ReadonlyArray<string>).includes(key)
}

const persistUser = (user: JBUser) => {
  const query = { _id: user._id }
  const update = user
  const options = { upsert: true, new: true, setDefaultsOnInsert: true }
  return User.findOneAndUpdate(query, update, options)
}

const AuthenticateHandler = (payload: Payload, socket: Socket): Promise<Payload> => {
  if (!isAuthorisedRequest(payload.key)) {
    delete payload.jwt
    return Promise.resolve(payload)
  }

  return new Promise((resolve) => {
    const token = payload.jwt
    const client = new OAuth2Client(process.env.CLIENT_ID)

    const broadcastTo = (headers: any, message: any): void => {
      Broadcaster.toClient({ socket, headers, message })
    }

    client
      .verifyIdToken({ idToken: token, audience: process.env.CLIENT_ID })
      .then((ticket) => {
        const data = ticket.getPayload()
        const responsePayload: Payload = {
          data: payload.data,
          key: payload.key,
          user: {
            _id: data['sub'],
            fullname: data['name'],
            picture: data['picture']
          }
        }

        if (
          process.env.GOOGLE_AUTH_DOMAIN &&
          data['hd'] === process.env.GOOGLE_AUTH_DOMAIN
        ) {
          return persistUser(responsePayload.user)
            .then(() => resolve(responsePayload))
            .catch((err: any) =>
              logger.error('Error checking user', { error: err.message })
            )
        }

        payload.key = AuthConsts.AUTHENTICATION_TOKEN_INVALID
        broadcastTo(payload, { error: `Invalid domain: ${data['hd']}` })
      })
      .catch((err) => {
        broadcastTo(payload, { error: err.message })
      })
  })
}

export default AuthenticateHandler
