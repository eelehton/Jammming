import React, { Component } from 'react';
//import logo from './logo.svg';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList'


class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        {/*this.props is an external call*/}
        <TrackList tracks = {this.props.searchResults} onAdd = {this.props.onAdd} onRemoval = {false}/>
      </div>
    );
  }
}

export default SearchResults;
