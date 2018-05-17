
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
      const accessTokenSet = window.location.href.match(/access_token=([^&]*)/);
      const expiresInSet = window.location.href.match(/expires_in=([^&]*)/);
    //if access token in URL
    if (accessTokenSet && expiresInSet) {
      accessToken = accessTokenSet[1];
      const expiresIn = Number(expiresInSet[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      //tell user to login
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    }
  },

  //Step 85: Add a method search that accepts a parameter for user's search term
  search: (userSearch) => {
    const accessToken = Spotify.getAccessToken();
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
    },

    savePlayList: (name, trackURIs) => {
		if (!name || !trackURIs.length) {
			return;
		}
		//Step 91: Create 3 variables, one for access token set to users token
		//a header set to object with authorization parameter with user's token from Spotify's implicit grnat flow
		//an empty variable for user ID.
		const accessToken = Spotify.getAccessToken();
		const headers = {
			Authorization: `Bearer ${accessToken}`
		};
		let userId = '';

		return fetch('https://api.spotify.com/v1/me', { headers: headers })
			.then(response => response.json())
			.then(jsonResponse => {
				userId = jsonResponse.id;
				return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
					//pass a second argument that contains an object with parameters for headers, method & body
					headers: headers,
					method: 'POST',
					body: JSON.stringify({ name: name })
				});
			})
			.then(response => response.json())
			.then(jsonResponse => {
				const playlistId = jsonResponse.id;

				return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
					headers: headers,
					method: 'POST',
					body: JSON.stringify({ uris: trackURIs })
				});
			});
	}
}





export default Spotify;
  /*  savePlaylist(playlistName, trackURIs) {
      this.getAccessToken();
    }*/
