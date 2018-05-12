import React, { Component } from 'react';
//import logo from './logo.svg';
import './Playlist.css';
import TrackList from '../TrackList/TrackList'


class Playlist extends React.Component {
  //Step 60: Add a constructor to the playlist component.  Call super props
  //Step 60: Bind current value of this to .handleNameChange()
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  handleNameChange = () => {
    //step 59: Wtf is going on?
    let onNameChange = 'switchName';
  }
  render() {
    return (
      <div className="Playlist">
        <input
            defaultValue ={'New Playlist'}
            //step 59: Wtf is going on?
            onChange = {this.switchName}
            //Step 61: pass handleNameChange to onChange method
            onChange = {this.handleNameChange}
            />
        {/*}//Step 51: Pass onRemove from the Playlist component to the Tracklist component, Pass isRemoval with a value of true to Tracklist
        Step 65: Add onClick property with a value set to this.props.onSave*/}
          <TrackList tracks = {this.props.playlistTracks} onRemove = {this.props.onRemove} isRemoval = 'true'/>
          <a className="Playlist-save" onClick = {this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
