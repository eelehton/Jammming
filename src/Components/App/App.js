//Spotify API User Key: 6cb049693d3e491197aa6f297c86cbaf
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    //setting searchResults to an array of objects each containing name, artist, album and id properties
  //this.state is a local call
  //hardcoding the Results
     this.state = {};
     this.state.searchResults = [{
         name: "Bad",
         artist: "U2",
         album: "Joshua Tree",
         id: 0,
       },
       {
         name: "Daydream Believer",
         artist: "The Monkees",
         album: "The Birds, the Bees & The Monkees",
         id: 1,
        }
     ];
    this.state.playlistName = "Brian's Afternoon";
    this.state.playlistTracks = [];
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    //step 58: bind this to updatePlaylistName
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    //step 68: bind this to search.
    this.search = this.search.bind(this);
   }

//this created a method
addTrack = (track) => {
    console.log('addTrack', track);
    let isNew = true;
    for (var i = 0; i < this.state.playlistTracks.length; i++) {
      let playlistTrack = this.state.playlistTracks[i];
      if (playlistTrack.id === track.id) {
        isNew = false;
        break;
      }
    }
      console.log('addTrack', isNew);

      //checks condition and if it's true, run the set state.
    if (isNew === true) {
      this.setState(prevState => {
        //creates a new playlistTracks array by taking all the elements of the playlistTracks from the previous state and adds track to the end of it.
        //makes a copy of PlayListTracks from state and saves a local copy in playlistTracks
        const playlistTracks = prevState.playlistTracks.map(t => t);
        //Added track onto the copy created above.
        playlistTracks.push(track);

        //Seeing the output so I understand what is going on in playlistTracks (delete me later)
          console.log('addTrack', playlistTracks);

        //setState always requires that you return the state
        //returns my copy which is now my new state.
        return {
          playlistTracks
        };
      }, () => {
        console.log('addTrack', this.state.playlistTracks);
      });
    }
  }


  removeTrack = (track) => {
    console.log('removeTrack', track);

    // create a copy of this.state.playlistTracks
    let playlistTracks = this.state.playlistTracks;
    // loops over the array in reverse (to catch any live updates)
    for (var i = playlistTracks.length - 1; i >= 0; --i) {
      //compare track to remove to track in the list
      if (playlistTracks[i].id === track.id) {
        playlistTracks.splice(i,1);
        break;
      }
    }
    //Object form of setState which automatically returns the object.
    this.setState( {playlistTracks});
    }

//Step 57: Create a method called updatePlaylistName and give it an argument called name.
//Step 57: Set the state of the playlist name to the input argument.
    updatePlaylistName = (name) => {
        this.state.playlistName = {name};
    }

    savePlaylist = () => {
      //Step 63: (likely wrong)generates an array of uri values called track URIs from the playlistTracks.
      //playlistTracks: ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"]
      //Didn't get how to add a playlistTracks property to the array.
      trackURIs: [];
      //Step 64 bind current value of this to savePlaylist
      this.savePlaylist = this.savePlaylist.bind(this);
    }
    //Step 67: Create a method called search that accepts a search term and logs the term tot he console
    search = (searchTerm) => {
      console.log(searchTerm)
    }
//render needs to be part of my component
//Step 58: Pass updatePlayListname to the playlist component as an attribute named onNameChange
//  this passes the value from this.state.searchResults into the SearchResults component with the Prop name searchResults;
//{/*Step 68: pass search to the searchbar component as an onSearch attribute*/}
  render() {
    return (
      <div>
       <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar
              onSearch = {this.search}/>
        <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd = {this.addTrack}/>
            <Playlist
              name = {this.state.playlistName}
              playlistTracks = {this.state.playlistTracks}
              onRemove = {this.removeTrack}
              onNameChange = {this.updatePlaylistName}
              onSave = {this.savePlaylist}
               />
        </div>
        </div>
       </div>
    );
  }
}

export default App;
