import { Dining, DirectionsWalk, EggAlt, Info, LightMode, Liquor, LocationOn, Menu, Nightlife, Note, QuestionMark, Schedule } from "@mui/icons-material";
import { useEffect, useState } from "react";

export default function Brunch (props) {
    const [fade, setFade] = useState(true);

    useEffect(() => {
        let fadeTimeoutId = null;
        fadeTimeoutId = setTimeout(() => {
            setFade(false);
        }, 0);

    }, [])

    return (
    <div className="weddingBody">
        <h1 className={`logisticsText ${fade ? "" : "fading"}`}>"San Diego Chill Day," Saturday, August 23rd, 2025</h1>
        <div className={`padded-sides flexed col logisticsText ${fade ? "" : "fading"}`}>
            <div className="flexed centered">
                <div className="flexed col">
                    <div className="flexed centered">
                        <EggAlt color="primary" fontSize="2rem"></EggAlt> Brunch ~ 10am
                    </div>
                    {/* <div className="flexed centered">
                        We will host a brunch on Saturday, August 23rd, 2025
                    </div> */}
                    <div className="padded-left logisticsItem">
                        <LocationOn color="primary"></LocationOn> <a href="https://www.covehouselajolla.com/" target="_blank" rel="noreferrer" className="secondary">La Jolla Covehouse</a>, 8030 Girard Ave, La Jolla, CA 92037
                    </div>
                    <div className="padded-left logisticsItem">
                        <DirectionsWalk color="primary"></DirectionsWalk> This is an 8 minute walk from the venue. The best walk is along the La Jolla coast where you can see the seals with their pups at Seal Rock.
                    </div>
                    <div className="padded-left logisticsItem">
                        <Dining color="primary"></Dining> There will be a continental breakfast with assorted pastries, yogurt parfaits, seasonal fruit, scrambled eggs, breakfast potatoes, bacon, and a coffee and tea station
                    </div>
                    <div className="padded-left logisticsItem">
                        <Nightlife color="primary"></Nightlife> There will also be bottomless mimosas, Bloody Marys, beer, and wine to celebrate.
                    </div>
                    <div classname="flexed centered">
                        <Liquor color="primary" fontSize="2rem"></Liquor> Casual Happy Hour ~ 5pm
                    </div>
                    <div className="padded-left logisticsItem">
                        <LocationOn color="primary"></LocationOn> <a href="" target="_blank" rel="noreferrer" className="secondary">tbd</a>, (address here)
                    </div>
                    <div className="padded-left logisticsItem">
                        <Info color="primary"></Info> This is not a funded event, but everyone is invited
                    </div>
                    <div className="flexed centered">
                        <div><QuestionMark fontSize="2rem" color="primary"></QuestionMark> Looking for things to do during the day? Look at our <a href="/FAQ#San-Diego-Activities" className="secondary">San Diego Activities</a> section of the FAQ page.</div>
                    </div>
                    {/* <div className="padded-left logisticsItem">
                        <QuestionMark color="primary"></QuestionMark> Looking for things to do during the day? Look at our <a href="/FAQ#San-Diego-Activities" className="secondary">San Diego Activities</a> section of the FAQ page. */}
                    {/* </div> */}
                </div>
            </div>
        </div>
        {/* <p>For any additional information, please feel free to take a look at the <a className="secondary" href="/FAQ">FAQ Page</a> and pop the question to us!</p> */}
    </div>
    )
};