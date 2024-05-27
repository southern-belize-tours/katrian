import { useEffect, useState } from 'react';
import './App.css'
import CuteCard from './Components/CuteCard/CuteCard';
import Summary from './Summary';

function Home() {
    const [fade, setFade] = useState(true);

    useEffect(() => {

      let timeoutId = setTimeout(() => {
        setFade(false);
      }, 0);

    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    }

    }, [])

    return (
      <div className="weddingBody">
          {!fade &&
            <CuteCard></CuteCard>
          }
          <Summary></Summary>
      </div>
    );
  } export default Home;