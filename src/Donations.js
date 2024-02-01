// https://www.paypal.com/donate/?hosted_button_id=V3GYH73CW9HN6

import * as React from 'react';
// import cake from './images/cake.png';
import Gift from './page_art/gift/gift';

function TimeAndDate(props) {
    return (
      <div className="weddingBody">
        <h1>Registry</h1>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/* <img src={cake} d"cake" className="cakeImg"/> */}
          {/* <Cake size={400}
            doTransition={true}></Cake> */}
          <Gift size={props.size ? props.size : 400}
            doTransition={true}></Gift>
          <div className="padded-sides">
              <div>This is a dummy registry item 1</div>
              <div>This is a dummy registry item 2</div>
              <div>This is a dummy registry item 3</div>
              <div>This is a dummy registry item 4</div>
              <p>
                If you would like to fortify our honeymoon quality, we gladly and most-graciously accept donations on our <a target="_blank" rel="noreferrer" href="https://www.paypal.com/donate/?hosted_button_id=V3GYH73CW9HN6">paypal link</a>.
              </p>
          </div>
      </div>
    );
  } export default TimeAndDate;