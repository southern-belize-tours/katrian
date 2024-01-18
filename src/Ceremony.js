import cuvierClub3 from './images/Cuvier/CuvierClub3.jpg';

import { CalendarMonth, DirectionsWalk, LocationOn } from "@mui/icons-material";

export default function Ceremony (props) {

    return (
    <div className="weddingBody">
        <h1>Ceremony</h1>
        <img src={cuvierClub3}></img>
        <div className="padded-sides flexed col">
            <div className="flexed centered">
                <CalendarMonth color="primary"></CalendarMonth>
                <div>
                    The ceremony will take place Friday August 22nd at _______(4:30pm?).
                </div>
            </div>
            <div className="flexed centered">
                <LocationOn color="primary"></LocationOn>
                <div>The ceremony will be held at the <a className="secondary" target="_blank" href = "">Wedding Bowl</a>, which is a short walk from the <a className="secondary" target="_blank" href="https://goo.gl/maps/kPhxfjfKUyS6Hq2p6">Cuvier Club</a>, near downtown La Jolla.</div>
            </div>
            <div className="flexed centered">
                <DirectionsWalk color="primary"></DirectionsWalk>
                <div>The walk will be about 5 minutes from the initial <a className="secondary" target="_blank" href="https://goo.gl/maps/kPhxfjfKUyS6Hq2p6">Cuvier Club</a> venue. Some of the terrain may be include stairs and uneven grass. Please plan your shoe choices accordingly.</div>
            </div>
        </div>
    </div>
    )
}