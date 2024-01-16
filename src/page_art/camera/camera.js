// React libraries
import React, { useEffect, useState } from 'react';

// Styles and Images
import './camera.css';

// By default the component will be 500px x 500px
const defaultSize = 500;

function Camera (props) {

    const [size, setSize] = useState(defaultSize);
    const [transition, setTransition] = useState(false);
    const [spin, setSpin] = useState(false);

    let timeoutId, secondTimeoutId, thirdTimeoutId = null;

    // Set the size on init
    useEffect(() => {
        if(props !== null && props.size !== null && props.size > 0) {
            setSize(props.size);
        }
        // Determine if the cake will make a transition and set a timeout function if false
        if (props !== null && props.doTransition !==null && props.doTransition == true) {
            setTransition(false);
            timeoutId = setTimeout(() => {
                setTransition(true);
            }, 400);
            secondTimeoutId = setTimeout(() => {
                setTransition(false);
                setSpin(true);
            }, 800);
            thirdTimeoutId = setTimeout(() => {
                setSpin(false);
            }, 1100)
        }

        // Clear out any timeouts from setting up the transition
        return () => {
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
            }
            if (secondTimeoutId !== null) {
                clearTimeout(secondTimeoutId);
            }
            if (thirdTimeoutId !== null) {
                clearTimeout(thirdTimeoutId);
            }
        }
    });

    return(
        <div className="cameraContainer"
            style={{width: `${size}px`, height: `${size}px`}}>
            <div className="cameraTop"></div>
            <div className={`cameraSquare ${size <= 100 ? "small " : ""}`}>
                <div className="cameraTopGap"></div>
                <div
                    className={`ringContainer ${transition === true ? "expanded " : spin === true ? "spin " : ""} ${size <= 100 ? "small " : ""}`}>
                    <div className="diamondContainer">
                        <div className="diamondTop"></div>
                        <div className="diamondBottom"></div>
                    </div>
                    {/* <div className="ringTop"></div> */}
                    <div className={`ringCircle ${size <= 100 ? "small " : ""}`}></div>
                </div>
            </div>
        </div>
    );
} export default Camera;