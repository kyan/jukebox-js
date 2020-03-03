import React, { useContext } from 'react'
import { Button, Image, Icon } from 'semantic-ui-react'
import GoogleAuthContext from 'contexts/google'
import './index.css'

export const Settings = () => {
  const { googleUser, signIn, signOut } = useContext(GoogleAuthContext)

  let avatar = (
    <Button
      icon='power off'
      floated='right'
      onClick={() => signIn()}
      className='jb-settings-toggle'
      title='Login using Google'
    />
  )
  if (googleUser && googleUser.profileObj) {
    avatar = (
      <Image
        rounded
        size='mini'
        floated='right'
        title={googleUser.profileObj.name}
        src={googleUser.profileObj.imageUrl}
        onClick={() => signOut()}
      />
    )
  }

  const spotifyAuthentication = googleUser && (
    <a href={`https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_SPOTIFY_REDIRECT_URI}&scope=playlist-modify-public%20user-read-email&state=34fFs29kd09`}>
      <Button
        animated='vertical'
        floated='right'
      >
        <Button.Content hidden>Spotify</Button.Content>
        <Button.Content visible>
          <Icon name='spotify' />
        </Button.Content>
      </Button>
    </a>
  )

  return (
    <React.Fragment>
      {avatar}
      {spotifyAuthentication}
    </React.Fragment>
  )
}

export default Settings
