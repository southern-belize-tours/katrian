import { CalendarMonth, Dining, LocationOn, MenuBook, MusicNote, Nightlife } from "@mui/icons-material";
import cuvierClub4 from './images/Cuvier/CuvierClub4.avif';
import cuvierClubOutside from './images/Cuvier/cuvier_club_outside.webp';



export default function Reception (props) {

    return (
    <div className="weddingBody">
        <h1>Reception</h1>
        <div className="receptionImageContainer">
            <img src={cuvierClubOutside}></img>
            <img src={cuvierClub4}></img>
        </div>
        <div className="padded-sides flexed col">
            <div className="flexed centered">
                <CalendarMonth color="primary"></CalendarMonth>
                <div>
                    Reception will be held immediately following the ceremony
                </div>
            </div>
            <div className="flexed centered">
                <LocationOn color="primary"></LocationOn>
                <div>
                    It will take place at the <a className="secondary" target="_blank" href="https://goo.gl/maps/kPhxfjfKUyS6Hq2p6">Cuvier Club</a>
                </div>
            </div>
            <div className="flexed centered">
                <Nightlife color="primary"></Nightlife>
                <div>
                    Cocktail hour will be from ____ to ____, held in the outdoor area of the Cuvier Club (given weather permits). Starting at this point it is an open bar!
                </div>
            </div>
            <div className="flexed centered">
                <Dining color="primary"></Dining>
                <div>
                    Following cocktail hour will be a dinner from ____ to ____, held in the indoor area of the Cuvier Club.
                </div>
            </div>
            <div className="flexed centered">
                <MenuBook color="primary"></MenuBook>
                <div>
                    The menu is _______[linked]. Vegetarian options will be available upon request.
                </div>
            </div>
            <div className="flexed centered">
                <MusicNote color="primary"></MusicNote>
                <div>
                    After dinner through 11:00pm dancing will be held.
                </div>
            </div>
        </div>

    </div>
    );
}