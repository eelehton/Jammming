import React, { Component } from 'react';
//import logo from './logo.svg';
import './SearchBar.css';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    //step 72: bind current value of this.handleTermChange to this.
    this.handleTermChange = this.handleTermChange.bind(this);
  }
  search = () => {
    this.props.onSearch(this.state.term);
  }
  handleTermChange = (event) => {
    this.setState({term: event.target.value})
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
