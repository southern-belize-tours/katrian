// Core libraries
import React, { useEffect, useState } from 'react';

// Images and Styles
import './music.css';

function Music (props) {

    // Set default state size to 500px
    const [size, setSize] = useState(500);

    // Compute size and time on init based on optional props
    useEffect(() => {
        if (!(props == null || props.size == null || props.size <= 0)) {
            setSize(props.size);
        }        
    });

    return(
        <>
            <div className = "musicContainer"
                style={{width: `${size}px`, height: `${size}px`}}>
                <div className = "musicNoteCircle">
                    {props && props.loading &&
                        <div className="musicNoteLoader" style={{borderWidth: `${size/20}px`}}></div>
                    }
                    <div className="firstLine"></div>
                    <div className="secondLine"></div>
                    <div className="thirdLine"></div>
                </div>
                <div className = "musicNoteStick"></div>
            </div>
        </>
    )
} export default Music;