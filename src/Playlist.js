
import * as React from 'react';
import music from './images/music.jpg';

function TimeAndDate() {
    return (
      <div className="weddingBody">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <img src={music} alt="music" className="cakeImg"/>
          <div className="padded-sides">
              <p>
                We hope to play music that will make it difficult to sit down.
                Please feel free to request collaborator access on our <a target="_blank" href="https://open.spotify.com/playlist/05qaofCfEVNM02kdE81AEy?si=447cd6af3d7b47f2">Spotify Playlist</a>.
              </p>
          </div>
        </header>
      </div>
    );
  } export default TimeAndDate;