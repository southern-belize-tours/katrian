import { DirectionsWalk, LocationOn, QuestionMark, Restaurant } from "@mui/icons-material";
import { useEffect, useState } from "react";

export default function Rehearsal (props) {

    const [fade, setFade] = useState(true);

    useEffect(() => {
        let fadeTimeoutId = null;
        fadeTimeoutId = setTimeout(() => {
            setFade(false);
        }, 0);

    }, [])
    
    return(
    <div className="weddingBody">
        <h1 className={`logisticsText ${fade ? "" : "fading"}`}>Wedding Rehearsal, Thursday, August 21st, 2025 (Invite Only)</h1>
        <div className={`padded-sides flexed col logisticsText ${fade ? "" : "fading"}`}>
            <div className="flexed centered">
                <div className="flexed col">
                    <div className="flexed centered">
                        <Restaurant color="primary" fontSize="2rem"></Restaurant> Rehearsal Dinner ~ [time]
                    </div>
                    <div className="padded-left logisticsItem">
                        <LocationOn color="primary"></LocationOn> <a href="https://cottagelajolla.com/" target="_blank" rel="noreferrer" className="secondary">The Cottage</a>, 7702 Fay Ave, La Jolla CA 92037
                    </div>
                    <div className="padded-left logisticsItem">
                        <DirectionsWalk color="primary"></DirectionsWalk> This is a 4 minute walk from the venue.
                    </div>
                    {/* <div className="padded-left logisticsItem">
                        
                    </div> */}
                    <div className="padded-left logisticsItem">
                        <QuestionMark color="primary"></QuestionMark> Looking for things to do during the day? Look at our <a href="/FAQ#San-Diego-Activities" className="secondary">San Diego Activities</a> section of the FAQ page.
                    </div>
                </div>
            </div>
        </div>
        {/* <p>TBD</p> */}
    </div>
    )
}