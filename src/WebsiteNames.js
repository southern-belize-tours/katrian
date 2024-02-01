import * as React from 'react';
import cake from './images/cake.png';

function WebsiteNames() {
    return (
      <div className="weddingBody">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <img src={cake} alt="wedding cake" className="cakeImg"/>
          <div className="padded-sides">
              <p>
                Please notify us at ianfeekes@gmail.com if you come up with fun website names we can use for a formal wedding site when the time comes.
              </p>
              <p>
                Our current ideas of available domains include:
                <ul>
                    <li>Katrian.com</li>
                    <li>CPAsBigDay.com</li>
                    <li>GiveAwayTheCPA.com</li>
                    <li>KatandFeekesWeddingBoutique.com</li>
                    <li>KatrianUnion.com</li>
                    <li>ParsleyParentsBigMarriage.com</li>
                </ul>
              </p>
          </div>
        </header>
      </div>
    );
  } export default WebsiteNames;