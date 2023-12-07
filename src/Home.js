import * as React from 'react';
import cake from './images/cake.png';
import Cake from './page_art/cake/cake';

import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function Home() {

  const location = useLocation();
  const pathname = location.pathname;
  const search = location.search;
  const hash = location.hash;

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