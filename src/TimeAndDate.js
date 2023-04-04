import * as React from 'react';
import cake from './images/cake.jpg';

function TimeAndDate() {
    return (
      <div className="weddingBody">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <img src={cake} alt="cake" className="cakeImg"/>
          <div className="padded-sides">
              <p>
                We are not sure when or where a wedding will be happening. We dearly love our friends and family and will be sure to promptly notify everyone when a date and place is set in stone.
              </p>
              <p>
                Our engagement may go on for some time given our overseas plans, and the high cost of wedding ceremonies. We appreciate your patience.
              </p>
          </div>
        </header>
      </div>
    );
  } export default TimeAndDate;