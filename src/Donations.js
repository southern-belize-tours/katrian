import { useEffect, useState } from 'react';
import Gift from './page_art/gift/gift';

function TimeAndDate(props) {
  const [fade, setFade] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setInitialized(true);

    setTimeout(() => {
      setFade(false)
    }, 500)
  }, []);

  return (
    <div className="weddingBody">
      {fade &&
        <Gift size={props.size ? props.size : 400}
          opaque={initialized}
          doTransition={true}></Gift>
      }
      <h1 className={`logisticsText ${fade ? "" : "fading"}`}>Registry</h1>
      <div className={`logisticsText ${fade ? "" : "fading"}`}>
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