import * as React from 'react';
import cake from './images/cake.jpg';

function Home() {
    return (
      <div className="weddingBody">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <img src={cake} alt="cake" className="cakeImg"/>
          <p>
            Katrina Strawick and Ian Feekes are planning an amazing wedding. We promise.
          </p>
        </header>
      </div>
    );
  } export default Home;