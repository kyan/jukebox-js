import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.String,
  fullname: mongoose.Schema.Types.String,
  picture: mongoose.Schema.Types.String,
  spotifyRefreshToken: mongoose.Schema.Types.String,
  spotifyUserId: mongoose.Schema.Types.String,
  spotifyPlaylistId: mongoose.Schema.Types.String
}, { _id: false })
const User = mongoose.model('User', userSchema)

export default User
