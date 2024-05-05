import { useEffect, useState } from 'react';
import Gift from './page_art/gift/gift';
import RegistryItem from './Components/Registry/RegistryItem';

import sealImage from './images/Gallery/seals.png';
import { Tooltip } from '@mui/material';

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
          {/* <RegistryItem photo={sealImage} title="A real life Seal" cost={500} description="A round one, the more it looks like a large marble the better"></RegistryItem> */}
          <div>
            We thank you for your thoughtful gifts and are genuinely grateful for anything you provide.
          </div>
          <div>
            <Tooltip title="Open Registry in New Tab"><a href="https://www.theknot.com/us/ian-feekes-and-katrina-strawick-aug-2025/registry" className="secondary" target="_blank" rel="noreferrer">Registry</a></Tooltip>
          </div>
          <div>
            Honeymoon Fund - <Tooltip title="Open Paypal Link in New Tab"><a target="_blank" rel="noreferrer" href="https://www.paypal.com/donate/?hosted_button_id=V3GYH73CW9HN6" className="secondary">Paypal</a></Tooltip>
          </div>
      </div>
    </div>
  );
} export default TimeAndDate;