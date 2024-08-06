import { useEffect, useState } from 'react';
import Gift from './page_art/gift/gift';
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
            {/* We thank you for your thoughtful gifts and are genuinely grateful for anything you provide. */}
            We’re looking forward to celebrating with you on our big day. Having you attend our wedding is the greatest gift of all, however, if you’re looking for wedding gift ideas, we’ve registered here for the things that we would like/need in our home.
          </div>
          <div>
            <Tooltip title="Open Registry in New Tab"><a href="https://www.theknot.com/us/ian-feekes-and-katrina-strawick-aug-2025/registry" className="secondary" target="_blank" rel="noreferrer">Registry via The Knot</a></Tooltip>
          </div>
          <div className="padded-left">
            Or
          </div>
          <div>
            <div>
              Honeymoon Fund - <Tooltip title="Open Paypal Link in New Tab"><a target="_blank" rel="noreferrer" href="https://www.paypal.com/donate/?hosted_button_id=CJYU2R5BBK9P8" className="secondary">Paypal*</a></Tooltip>
            </div>
            <div className="disclaimer">
              * To avoid fees from registry sites on monetary donations, we have created a donation link through Ian’s business paypal account Placencia Action Tours.
            </div>
          </div>
      </div>
    </div>
  );
} export default TimeAndDate;