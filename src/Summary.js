// import clock from './images/clock.png'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddBoxIcon from '@mui/icons-material/AddBox';
// import { Add } from '@mui/icons-material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import Clock from './page_art/clock/clock.js'
import { useEffect, useState } from 'react';
import { Dining, Diversity1, Diversity2, EggAlt, Restaurant } from '@mui/icons-material';

function Summary (props) {
    const [fade, setFade] = useState(false);
    const [clock, setClock] = useState(true);
    const [textFade, setTextFade] = useState(true);


    useEffect(() => {

        let timeoutId, clockTimeoutId = null;

        setFade(false);
        timeoutId = setTimeout(() => {
            setFade(true);
        }, 1000);

        clockTimeoutId = setTimeout(() => {
            setClock(false);
            setTextFade(false);
        }, 2000);

        if (timeoutId !== null) {
            return () => clearTimeout(timeoutId);
        }
        if (clockTimeoutId !== null) {
            return () => clearTimeout(clockTimeoutId);
        }
    }, [])

    return(
        <div>
            <div className="flexed col centered">
                {/* <img src={clock} alt="clock" className="cakeImg"/> */}
                {clock ? <Clock animate={true} size={props.size} fade={fade}></Clock> : <></>}
                {/* <h1 className={`logisticsText ${textFade ? "" : "fading"}`}>Time and Place Summary</h1> */}
                <h1 className={`logisticsText ${textFade ? "" : "fading"}`}>Join us for a weekend of celebration and love</h1>
                <div className={`padded-sides flexed col logisticsText ${textFade ? "" : "fading"}`}>
                    <div className = "flexed centered">
                        <Restaurant fontSize="2rem" color="primary"></Restaurant>
                        <div>
                            <div>
                                Thursday, August 21st, 2024
                            </div>
                            <div><a href="/rehearsal" className="secondary">Rehearsal</a></div>
                        </div>
                    </div>
                    <div className = "flexed centered">
                        <Diversity1 fontSize="2rem" color="primary"></Diversity1>
                        <div>
                            <div>
                                Friday, August 22nd, 2024
                            </div>
                            <div>
                                <a href="/ceremony" className="secondary">Wedding</a>
                            </div>
                        </div>
                       
                    </div>
                    <div className = "flexed centered">
                        <EggAlt fontSize="2rem" color="primary"></EggAlt>
                        <div>
                            <div>
                                Saturday, August 23rd
                            </div>
                            <div>
                                <a href="/brunch" className="secondary">Brunch and Chill Day</a>
                            </div>
                        </div>
                        
                    </div>

                    {/* <div className="flexed centered">
                        <LocationOnIcon color="primary"/>
                        <div>
                            The wedding will be happening at the <a className="secondary"
                                target="_blank"
                                rel="noreferrer"
                                href="https://goo.gl/maps/kPhxfjfKUyS6Hq2p6">
                                Cuvier Club
                            </a> in downtown La Jolla.
                        </div>
                    </div>
                    <div className="flexed centered">
                        <CalendarMonthIcon color="primary"></CalendarMonthIcon>
                        <div>
                            The date is Friday, August 22nd, 2025.
                        </div>
                    </div>
                    <div className="flexed centered">
                        <CelebrationIcon color="primary"></CelebrationIcon>
                        <div>
                            Additionally we are planning weekend activities, such as a <a className="secondary" href = "/rehearsal">Thursday evening rehearsal dinner</a> and a <a className="secondary" href = "/brunch">Saturday Brunch and Beach Day</a>. More to come later!
                        </div>
                    </div>
                    <div className="flexed centered">
                        <AddBoxIcon className="swissFlag"></AddBoxIcon>
                        <div>
                            Our engagement duration is long because we are living in Switzerland.
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );

} export default Summary;