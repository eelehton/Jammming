import React, { Component } from 'react';
//import logo from './logo.svg';
import './TrackList.css';
import Track from '../Track/Track';


class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
      {/*has to be contained in curly braces because it's JS*/}
        {this.props.tracks.map(track => {
          {/*Track is the component in Track.js, track - is the prop and {track is an attribute defining a prop called track}
          */}
          return <Track track={track} key = {track.id} onAdd = {this.props.onAdd} onRemove = {this.props.onRemove} isRemoval = {this.props.isRemoval}/>;
            })}
      </div>
    );
  }
}

export default TrackList;
