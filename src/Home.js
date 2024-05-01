import { useEffect, useState } from 'react';
import Cake from './page_art/cake/cake';
import './App.css'
import CuteCard from './Components/CuteCard/CuteCard';
import Summary from './Summary';

function debounce(fn, ms) {
  let timer;
  return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
      }, ms);
  };
}

function Home() {
    const [fade, setFade] = useState(true);
    const [linkSize, setLinkSize] = useState(100);

    useEffect(() => {

      let timeoutId = setTimeout(() => {
        setFade(false);
      }, 0);

      const checkMediaSize = () => {
        if (window.innerWidth <= 768) {
          setLinkSize(50);
        } else {
          setLinkSize(100);
        }
      }

      // Only check the resizing every 100ms
    const debouncedCheckMediaSize = debounce(checkMediaSize, 100);

    debouncedCheckMediaSize();
    window.addEventListener('resize', debouncedCheckMediaSize);

    return () => {
      window.removeEventListener('resize', debouncedCheckMediaSize);
    }
    }, [])

    return (
      <div className="weddingBody">
          {/* <Cake doTransition = {true}
            disappearing = {true}
            // size = {linkSize ? linkSize * 4 : 400}></Cake>
            size = {linkSize * 4}></Cake> */}
          {/* <h1 className={`logisticsText ${fade ? "" : "fading"}`}>Katrina and Ian's Wedding</h1> */}
          {!fade &&
            <CuteCard></CuteCard>
          }
          <Summary></Summary>

      </div>
    );
  } export default Home;