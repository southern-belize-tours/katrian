import { useEffect, useState } from 'react';
import Gift from './page_art/gift/gift';
import RegistryItem from './Components/Registry/RegistryItem';

import sealImage from './images/Gallery/seals.png';

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
      <div className={`logisticsText ${fade ? "" : "fading"} registryItems`}>
          <RegistryItem photo={sealImage} title="A real life Seal" cost={500} description="A round one, the more it looks like a large marble the better"></RegistryItem>
          <RegistryItem photo={sealImage} title="A real life Seal" cost={500} description="A round one, the more it looks like a large marble the better"></RegistryItem>
          <RegistryItem photo={sealImage} title="A real life Seal" cost={500} description="A round one, the more it looks like a large marble the better"></RegistryItem>
          <RegistryItem photo={sealImage} title="A real life Seal" cost={500} description="A round one, the more it looks like a large marble the better"></RegistryItem>
          <RegistryItem photo={sealImage} title="A real life Seal" cost={500} description="A round one, the more it looks like a large marble the better"></RegistryItem>
          <p>
            If you would like to fortify our honeymoon quality, we gladly and most-graciously accept donations on our <a target="_blank" rel="noreferrer" href="https://www.paypal.com/donate/?hosted_button_id=V3GYH73CW9HN6">paypal link</a>.
          </p>
      </div>
    </div>
  );
} export default TimeAndDate;