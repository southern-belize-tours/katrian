// import clock from './images/clock.png'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddBoxIcon from '@mui/icons-material/AddBox';
// import { Add } from '@mui/icons-material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import Clock from './page_art/clock/clock.js'

function Summary (props) {

    return(
        <div>
            <div className="flexed col centered">
                {/* <img src={clock} alt="clock" className="cakeImg"/> */}
                <Clock size={400}></Clock>
                <div className="padded-sides flexed col">
                    <div className="flexed centered">
                        <LocationOnIcon color="primary"/>
                        <div>
                            The wedding will be happening at the <a className="secondary" target="_blank" href="https://goo.gl/maps/kPhxfjfKUyS6Hq2p6">Cuvier Club</a> in downtown La Jolla.
                        </div>
                    </div>
                    <div className="flexed centered">
                        <CalendarMonthIcon color="primary"></CalendarMonthIcon>
                        <div>
                            The anticipated date is Friday, August 23rd, 2025.
                        </div>
                    </div>
                    <div className="flexed centered">
                        <CelebrationIcon color="primary"></CelebrationIcon>
                        <div>
                            Additionally we are planning weekend activities, such as a Thursday evening rehearsal dinner and a Saturday Brunch and Beach Day. More to come later!
                        </div>
                    </div>
                    <div className="flexed centered">
                        <AddBoxIcon className="swissFlag"></AddBoxIcon>
                        <div>
                            Our engagement duration is long because we are living in Switzerland.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

} export default Summary;