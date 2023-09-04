import * as React from 'react';
import music from './images/music.png';
import Music from './page_art/music/music';

function TimeAndDate() {
    return (
      <div className="weddingBody">
        <h1>Wedding Bangers</h1>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/* <img src={music} alt="music" className="cakeImg"/> */}
          <Music size = {400}></Music>
          <div className="padded-sides">
              <p>
                We hope to play music that will make it difficult to sit down.
                Please feel free to request collaborator access on our <a target="_blank" href="https://open.spotify.com/playlist/05qaofCfEVNM02kdE81AEy?si=447cd6af3d7b47f2">Spotify Playlist</a>.
              </p>
          </div>
      </div>
    );
  } export default TimeAndDate;