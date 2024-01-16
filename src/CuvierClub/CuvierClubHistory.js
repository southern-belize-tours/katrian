import cuvierClub1 from '../images/Cuvier/cuvierClub1.webp';
import cuvierClub2 from '../images/Cuvier/CuvierClub2.webp';
import cuvierClub3 from '../images/Cuvier/CuvierClub3.jpg';
import cuvierClub4 from '../images/Cuvier/CuvierClub4.avif';
import cuvierClub5 from '../images/Cuvier/CuvierClub6.jpeg';
import cuvierClub6 from '../images/Cuvier/CuvierClub7.jpeg';
import cuvierClub7 from '../images/Cuvier/CuvierClub8.jpeg';
import cuvierClub8 from '../images/Cuvier/cuvierClub8.jpg';
import Cuvier from '../page_art/cuvier/Cuvier';

import './CuvierClub.css';

const cuvierText = [

    <p>The Cuvier Club, located in La Jolla, California, boasts a rich and storied history dating back to the 1920s. Originally constructed as a community gathering space, the venue has evolved over time, serving as a popular USO Hall during World War II and now as a cherished wedding and event venue.</p>,
    <p>In the early 1920s, the Cuvier Club emerged as a social hub for La Jolla residents, offering a vibrant setting for dances, gatherings, and community events. The spacious hall, adorned with elegant architecture and hardwood floors, provided a welcoming atmosphere for residents to connect and celebrate.</p>,
    <div className="imageStack">
        <img src={cuvierClub8}></img>
        <img src={cuvierClub6}></img>
    </div>,
    <p>During World War II, the Cuvier Club assumed a new role as a USO Hall, providing essential services and entertainment for servicemen stationed in the area. The venue served as a sanctuary for soldiers away from home, offering a place to relax, socialize, and enjoy performances and activities.</p>,
    <p>Following the war, the Cuvier Club continued to serve as a community gathering place, hosting a variety of events and celebrations. However, in the early 2010s, the venue underwent a significant transformation, undergoing renovations to enhance its elegance and functionality. The original hardwood floors were preserved, while modern amenities and features were added to create a truly exceptional event space.</p>,
    <div className="imageStack">
        <img src={cuvierClub7}></img>
        <img src={cuvierClub5}></img>
    </div>,
    <p>Today, the Cuvier Club stands as one of San Diego's premier wedding and event venues, consistently recognized for its exquisite ambiance and impeccable service. The venue's spacious grand hall, with its soaring ceilings, bistro string lights, and built-in stage, provides a captivating backdrop for weddings, receptions, and other special occasions.</p>,
    <div className="imageStack">
        <img src={cuvierClub4}></img>
    </div>,
    <p>With its rich history, elegant charm, and modern amenities, the Cuvier Club remains a beloved landmark in La Jolla, continuing to host memorable celebrations and creating lasting memories for couples and event organizers alike.</p>,
    <div className="imageStack">
        <img src={cuvierClub3}></img>
    </div>,
];

export default function CuvierClubHistory (props) {
    return (
    <div className="weddingBody">
        <h1>Cuvier Club History</h1>
        <Cuvier size = {props.size}></Cuvier>
        <div className="cuvierClubHistory">
            {cuvierText.map(block =>
                <p>{block}</p>    
            )}
        </div>
    </div>
    );
}





