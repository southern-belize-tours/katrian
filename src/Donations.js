// https://www.paypal.com/donate/?hosted_button_id=V3GYH73CW9HN6

import * as React from 'react';
// import cake from './images/cake.png';
import Cake from './page_art/cake/cake';
import Gift from './page_art/gift/gift';

function TimeAndDate() {
    return (
      <div className="weddingBody">
        <h1>Donations</h1>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/* <img src={cake} alt="cake" className="cakeImg"/> */}
          {/* <Cake size={400}
            doTransition={true}></Cake> */}
          <Gift size={400}
            doTransition={true}></Gift>
          <div className="padded-sides">
              <p>
                If you would like to fortify the drink or decoration quality, we gladly accept donations on our <a target="_blank" href="https://www.paypal.com/donate/?hosted_button_id=V3GYH73CW9HN6">paypal link</a>.
              </p>
          </div>
      </div>
    );
  } export default TimeAndDate;