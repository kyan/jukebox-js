import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Divider, Grid, Button, Header } from 'semantic-ui-react'
import * as actions from '../../actions'
import CurrentTrack from '../../components/current-track'
import TrackList from '../../components/tracklist'
import { findImageInCache, findTracklistImagesInCache } from '../../utils/images'
import { timerToPercentage } from '../../utils/track'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.dispatch = this.props.dispatch
  }

  componentDidMount() {
    this.dispatch(actions.wsConnect())
  }

  componentWillUnmount = () => {
    this.dispatch(actions.wsDisconnect())
  }

  startPlaying = () => {
    this.dispatch(actions.startPlaying())
  }

  pausePlaying = () => {
    this.dispatch(actions.pausePlaying())
  }

  playButton() {
    return (
      <Button
        content='Play'
        icon='play'
        labelPosition='left'
        onClick={this.startPlaying}
      />
    )
  }

  pauseButton() {
    return (
      <Button
        content='Pause'
        icon='pause'
        labelPosition='left'
        onClick={this.pausePlaying}
      />
    )
  }

  render() {
    return (
      <div>
        <Button.Group>
          {this.playButton()}
          {this.pauseButton()}
        </Button.Group>
        <Divider />
        <Grid columns={2}>
          <Grid.Column>
            <Header size='small'>Currently Playing</Header>
            <CurrentTrack
              image={this.props.currentTrackImage}
              track={this.props.currentTrack}
              progress={this.props.currentPosition}
            />
          </Grid.Column>
          <Grid.Column>
            <Header size='small'>Tracklist</Header>
            <TrackList
              images={this.props.tracklistImages}
              tracks={this.props.tracklist}
              currentTrack={this.props.currentTrack}
            />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const currentTrackImg = state.track ? findImageInCache(state.track.album.uri, state.assets) : null;
  const currentTrackImgs = findTracklistImagesInCache(state)

  return {
    currentTrack: state.track,
    currentTrackImage: currentTrackImg,
    tracklist: state.tracklist,
    tracklistImages: currentTrackImgs,
    currentPosition: timerToPercentage(state.timer)
  }
}

export default connect(
  mapStateToProps
)(Dashboard)
