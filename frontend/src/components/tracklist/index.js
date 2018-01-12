import React from 'react'
import PropTypes from 'prop-types'
import { List, Image } from 'semantic-ui-react'
import classnames from 'classnames'
import { millisToMinutesAndSeconds } from '../../utils/time';
import './index.css';

const listItems = (tracks, images, currentTrack) => {
  return tracks.map((track, index) => {
    return(
      <List.Item
        key={ `${index}-${track.uri}` }
        className={classnames({'track-selected': (currentTrack.uri === track.uri)})}
      >
        <Image avatar src={ images[track.album.uri] } />
        <List.Content>
          <List.Header as='a'>{track.name} <small>({millisToMinutesAndSeconds(track.length)})</small></List.Header>
          <List.Description>{track.artist.name}</List.Description>
        </List.Content>
      </List.Item>
    )
  })
}

const Tracklist = ({ tracks, images, currentTrack }) => {
  if (!tracks) { return null; }

  return (
    <List ordered divided>
      {listItems(tracks, images, currentTrack)}
    </List>
  )
}

Tracklist.propTypes = {
  tracks: PropTypes.array,
  images: PropTypes.object,
  currentTrack: PropTypes.object
}

export default Tracklist;
