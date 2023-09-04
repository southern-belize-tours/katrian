import * as React from 'react';
import cake from './images/cake.png';
import Cake from './page_art/cake/cake';

function Home() {
    return (
      <div className="weddingBody">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/* <img src={cake} alt="cake" className="cakeImg"/> */}
          <h1>Ian and Katrina's Wedding</h1>
          <Cake doTransition={true} size={400}></Cake>
          <p>
            {/* Katrina and Ian will have an amazing wedding. */}
          </p>
      </div>
    );
  } export default Home;