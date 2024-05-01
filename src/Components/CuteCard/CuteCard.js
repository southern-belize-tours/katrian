import './CuteCard.css';
import keukenkofPhoto from './Photos/keukenhof.jpg';
import chamonixPhoto from './Photos/chamonix.jpg';
// import neuschwansteinPhoto from './Photos/neuschwanstein.jpg';
import matterhornPhoto from './Photos/matterhorn.jpg';
import tulipPhoto from './Photos/tulip.jpg';
import eiffelPhoto from './Photos/eiffel.jpg';
import toberPhoto from './Photos/toberfest1.jpg';

import { useEffect, useState } from 'react';

export default function CuteCard (props) {
    const [transition, setTransition] = useState(true);

    useEffect( () => {
        setTimeout(() => {setTransition(false)}, 100);
    }, [])

    return (
        <div className = {`cuteCardContainer ${transition ? "transition" : ""}`}>
            <div className="cuteCardLeftBar">
                <div className="cuteCardImage" 
                    style={{backgroundImage: `url(${eiffelPhoto}`}}>
                </div>
            </div>
            <div className="cuteCardMid">
                <div className="cuteCardSegment top">
                    <div className="cuteCardImage"
                        style={{backgroundImage: `url(${matterhornPhoto})`}}>
                    </div>
                    <div className="cuteCardImage"
                        style={{backgroundImage: `url(${toberPhoto})`}}>
                    </div>
                </div>
                <h1 className="cuteCardTitleText">Katrina & Ian</h1>
                <h2 className="cuteCardDateText">08/22/2025</h2>
                <div className="cuteCardSegment bottom">
                    <div className="cuteCardImage"
                        style={{backgroundImage: `url(${keukenkofPhoto})`}}>
                    </div>
                    <div className="cuteCardImage"
                        style={{backgroundImage: `url(${chamonixPhoto})`}}>
                    </div>
                </div>
            </div>
            <div className="cuteCardRightBar">
                <div className="cuteCardImage" 
                    style={{backgroundImage: `url(${tulipPhoto}`}}>
                </div>
            </div>
        </div>
    );
}