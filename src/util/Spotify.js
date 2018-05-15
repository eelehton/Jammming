
//my clientid access
const clientId = '6cb049693d3e491197aa6f297c86cbaf';
//redirecting to my personal server to see the result
const redirectUri = 'http://localhost:3000/';

let accessToken = '';

const Spotify = {
  getAccessToken: () => {
    //the token is already saved and it hasn't expired yet
    if (accessToken) {
      return accessToken;
    }
    //no access token or it expired, so check URL
    if (window.location.hash) {
      const accessToken = window.location.href.match(/access_token=([^&]*)/);
    }
    //if access token in URL
    if (accessToken) {
      //set expiration
      const expiresIn = window.location.href.match(/expires_in=([^&]*)/)
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      //tell user to login
      window.location(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`)
    }
  },

  //Step 85: Add a method search that accepts a parameter for user's search term
  search: (userSearch) => {
    //returns a promise that will eventually resolve to the list of tracks from search
    return fetch(`https://api.spotify.com/v1/search?type=track&limit=20&q=${userSearch}`, {
      //Adds authorization header to the request for the access token
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
          return response.json();
        }).then(jsonResponse => {
        if (jsonResponse.tracks) {
          return jsonResponse.tracks.items.map(track => ({
              id: track.id,
              title: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri,
          }));
        } else {
          return [];
        }
      });
    }
}



export default Spotify;
  /*  savePlaylist(playlistName, trackURIs) {
      this.getAccessToken();
    }*/
