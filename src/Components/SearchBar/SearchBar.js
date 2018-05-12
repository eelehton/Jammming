import React, { Component } from 'react';
//import logo from './logo.svg';
import './SearchBar.css';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    //step 70: bind current value of this to search
    this.search = this.search.bind(this);
    //step 72: bind current value of this.handleTermChange to this.
    this.handleTermChange = this.handleTermChange.bind(this);
  }
  search = () => {
    //Step 69: Create a method called search that passes the state of the term to this.props.onSearch
    this.state.term = this.props.onSearch;
  }
  //Step 71: Creates a method called handleTermChange that accepts an event argument and sets the state of the search bars term to the vent targets value
  handleTermChange = (event) => {
    this.state.term = this.props.event;
  }
  //step 73 add onChange to input with equal to this.handleTermChange
  render() {
    return (
      <div className="SearchBar">
        <input
        onChange = {this.handleTermChange}
        placeholder="Enter A Song, Album, or Artist" />
        <a>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
