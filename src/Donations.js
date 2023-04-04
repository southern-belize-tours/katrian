// https://www.paypal.com/donate/?hosted_button_id=V3GYH73CW9HN6

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
                If you would like to expedite our wedding date or fortify the decoration quality, we gladly accept donations on our <a target="_blank" href="https://www.paypal.com/donate/?hosted_button_id=V3GYH73CW9HN6">paypal link</a>.
              </p>
          </div>
        </header>
      </div>
    );
  } export default TimeAndDate;