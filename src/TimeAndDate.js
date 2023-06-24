import * as React from 'react';
import clock from './images/clock.jpg'

function TimeAndDate() {
    return (
      <div className="weddingBody">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <img src={clock} alt="clock" className="cakeImg"/>
          <div className="padded-sides">
              <p>
                We are considering a wedding in Summer 2025, but are still figuring out the venue. Regarding venues we are looking at places near San Diego and Orange County.
              </p>
              <p>
              We dearly love our friends and family and will be sure to promptly notify everyone when a date and place is set in stone.
              </p>
              <p>
                Our engagement may go on for some time given our overseas plans, and the high cost of wedding ceremonies. We appreciate your patience.
              </p>
          </div>
        </header>
      </div>
    );
  } export default TimeAndDate;