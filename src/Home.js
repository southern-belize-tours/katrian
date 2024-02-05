import { useEffect, useState } from 'react';
import Cake from './page_art/cake/cake';
import './App.css'

function Home(props) {
    const [fade, setFade] = useState(true);

    let timeoutId = setTimeout(() => {
      setFade(false);
    }, 500);

    useEffect(() => {
      let timeoutId = null;

      // timeoutId = setTimeout(() => {
      //   setFade(false);
      // }, 500);
      // setFade(false);
    }, [])

    return (
      <div className="weddingBody">
          <Cake doTransition={true} size={props.size ? props.size : 400}></Cake>
          <h1 className={`logisticsText ${fade ? "" : "fading"}`}>Katrina and Ian's Wedding</h1>
      </div>
    );
  } export default Home;