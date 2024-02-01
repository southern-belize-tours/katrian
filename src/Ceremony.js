import { useEffect, useState } from 'react';
import cuvierClub3 from './images/Cuvier/CuvierClub3.jpg';
import cuvierClub4 from './images/Cuvier/CuvierClub4.avif';
import cuvierClubOutside from './images/Cuvier/cuvier_club_outside.webp';

import { AccessTime, CalendarMonth, Deck, Dining, DirectionsWalk, Diversity1, EditNote, Liquor, LocalParking, LocationOn, MenuBook, MusicNote, Nightlife, Park, QuestionMark, WbShade } from "@mui/icons-material";

export default function Ceremony (props) {
    const [fade, setFade] = useState(true);

    useEffect(() => {
        let fadeTimeoutId = null;
        fadeTimeoutId = setTimeout(() => {
            setFade(false);
        }, 0);

    }, [])

    return (
    <div className="weddingBody">
        <h1 className={`logisticsText ${fade ? "" : "fading"}`}>Wedding Ceremony & Reception, Friday, August 22nd, 2025</h1>
        {/* <img src={cuvierClub3} alt="Wedding Bowl ceremony area"></img> */}
        <div className={`padded-sides flexed col logisticsText ${fade ? "" : "fading"}`}>
            <div className="flexed centered">
                <div className="flexed col">
                    <div className="flexed centered">
                        <Diversity1 fontSize='2rem' color="primary"></Diversity1> Ceremony ~ 4pm</div>
                    <div className="padded-left logisticsItem">
                        <LocationOn color="primary"></LocationOn> <a className="secondary"
                    target="_blank"
                    rel="noreferrer"
                    href = "https://maps.app.goo.gl/ne7KjNjm2uK9h7Le7">Wedding Bowl</a>, 590 Coast S Blvd, La Jolla, CA 92037
                    </div>
                </div>
            </div>
            <div className="flexed centered">
                <div className="flexed col">
                    <div className="flexed centered"><Nightlife fontSize='2rem' color="primary"></Nightlife> Reception ~ 4:30pm </div>
                    <div className="padded-left logisticsItem">
                        <LocationOn color="primary"></LocationOn> <a className="secondary"
                        target="_blank"
                        rel="noreferrer"
                        href="https://goo.gl/maps/kPhxfjfKUyS6Hq2p6">Cuvier Club</a>, 7776 Eads Ave, La Jolla, CA 92037
                    </div>
                </div>
            </div>
            <div className="flexed centered">
                <div className="flexed col">
                    <div className="flexed centered"><EditNote fontSize='2rem' color="primary"></EditNote> Notes</div>
                    <div className="padded-left logisticsItem">
                        <DirectionsWalk color="primary"></DirectionsWalk> The walk between the ceremony and reception is about 5 minutes long, which includes some stairs and uneven grass. Please plan your shoe choices accordingly.
                    </div>
                    <div className='padded-left logisticsItem'>
                        <LocalParking color="primary"></LocalParking> La Jolla street parking is first-come-first-served and will be competitive. We recommend walking from hotel and parking early, if possible.
                    </div>
                    <div className="padded-left logisticsItem">
                        <Deck color="primary"></Deck> The cocktail hour (open bar) will be in a semi-covered outdoor area.
                    </div>
                    <div className='padded-left logisticsItem'>
                        <WbShade color="primary"></WbShade> The reception will be indoors.
                    </div>
                    <div className="padded-left logisticsItem">
                        <QuestionMark color="primary"></QuestionMark> Looking for things to do during the day? Look at our <a href="/FAQ#San-Diego-Activities" className="secondary">San Diego Activities</a> section of the FAQ page.
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}