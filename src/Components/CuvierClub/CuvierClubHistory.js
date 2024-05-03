import { useEffect, useState } from 'react';
import cuvierClub3 from '../../images/Cuvier/CuvierClub3.jpg';
import cuvierClub4 from '../../images/Cuvier/CuvierClub4.avif'
import cuvierClub5 from '../../images/Cuvier/CuvierClub6.jpeg';
import cuvierClub6 from '../../images/Cuvier/CuvierClub7.jpeg';
import cuvierClub7 from '../../images/Cuvier/CuvierClub8.jpeg';
import cuvierClub8 from '../../images/Cuvier/cuvierClub8.jpg';
import Cuvier from '../../page_art/cuvier/Cuvier';

import './CuvierClub.css';
import { Tooltip } from '@mui/material';

const cuvierText = [

    <p className="galleryText">The Cuvier Club, located in La Jolla, California, boasts a rich and storied history dating back to the 1920s. Originally constructed as a community gathering space, the venue has evolved over time, serving as a popular USO Hall during World War II and now as a cherished wedding and event venue.</p>,
    <p className="galleryText">In the early 1920s, the Cuvier Club emerged as a social hub for La Jolla residents, offering a vibrant setting for dances, gatherings, and community events. The spacious hall, adorned with elegant architecture and hardwood floors, provided a welcoming atmosphere for residents to connect and celebrate.</p>,
    <div className="imageStack">
        <img src={cuvierClub8} alt="La Jolla 100 years ago"></img>
        <img src={cuvierClub6} alt="Cuvier club when it was initially built"></img>
    </div>,
    <p className="galleryText">During World War II, the Cuvier Club assumed a new role as a USO Hall, providing essential services and entertainment for servicemen stationed in the area. The venue served as a sanctuary for soldiers away from home, offering a place to relax, socialize, and enjoy performances and activities.</p>,
    <p className="galleryText">Following the war, the Cuvier Club continued to serwve as a community gathering place, hosting a variety of events and celebrations. However, in the early 2010s, the venue underwent a significant transformation, undergoing renovations to enhance its elegance and functionality. The original hardwood floors were preserved, while modern amenities and features were added to create a truly exceptional event space.</p>,
    <div className="imageStack">
        <img src={cuvierClub7} alt="Cuvier Club used as a USO Hall dance"></img>
        <img src={cuvierClub5} alt="Cuvier Club serving as the La Jolla Community Center"></img>
    </div>,
    <p className="galleryText">Today, the Cuvier Club stands as one of San Diego's premier wedding and event venues, consistently recognized for its exquisite ambiance and impeccable service. The venue's spacious grand hall, with its soaring ceilings, bistro string lights, and built-in stage, provides a captivating backdrop for weddings, receptions, and other special occasions.</p>,
    <div className="imageStack">
        <img src={cuvierClub4} alt="Cuvier Club reception area"></img>
    </div>,
    <p className="galleryText">With its rich history, elegant charm, and modern amenities, the Cuvier Club remains a beloved landmark in La Jolla, continuing to host memorable celebrations and creating lasting memories for couples and event organizers alike.</p>,
    <div className="imageStack">
        <img src={cuvierClub3} alt="Wedding Bowl ceremony area for the Cuvier Club"></img>
    </div>,
    <p className="galleryText">You can read more about the Cuvier Club on their <Tooltip title="Open Website"><a href = "https://www.cuvierclub.net/" rel="noreferrer" target="_blank" className="secondary">website.</a></Tooltip></p>
];

export default function CuvierClubHistory (props) {
    const [fade, setFade] = useState(true);
    const [initialized, setInitialized] = useState(false);

    /**
     * Starts a fade animation to make logo disappear and the text fade in when initialized
     */
    useEffect(() => {
        setInitialized(true);

        setTimeout(() => {
            setFade(false);
        }, 500);
    }, []);

    return (
    <div className="weddingBody">
        {fade &&
            <Cuvier size = {props.size}
                opaque={initialized}>
            </Cuvier>
        }
        <h1 className={`logisticsText ${fade ? "" : "fading"}`}>Cuvier Club History</h1>
        <div className={`logisticsText ${fade ? "" : "fading"}`}>
            {cuvierText.map(block =>
                <p>{block}</p>    
            )}
        </div>
    </div>
    );
}





