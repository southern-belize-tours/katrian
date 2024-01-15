import * as React from 'react';
import Cake from './page_art/cake/cake';

function Home() {

    return (
      <div className="weddingBody">
          <h1>Ian and Katrina's Wedding</h1>
          <Cake doTransition={true} size={400}></Cake>
      </div>
    );
  } export default Home;