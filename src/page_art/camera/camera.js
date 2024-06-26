// React libraries
import React, { useEffect, useState } from 'react';

// Styles and Images
import './camera.css';

function Camera (props) {

    const [size, setSize] = useState(props.size);
    const [transition, setTransition] = useState(false);
    const [spin, setSpin] = useState(false);


    useEffect(() => {
        let timeoutId, secondTimeoutId, thirdTimeoutId = null;

        // Determine if the cake will make a transition and set a timeout function if false
        if (props !== null && props.doTransition !==null && props.doTransition) {
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
        // eslint-disable-next-line
    }, []);

    // Set the size on init and resizing
    useEffect(() => {
        if(props !== null && props.size !== null && props.size > 0) {
            setSize(props.size);
        }
    }, [props, props.size])

    return(
        <div className={`cameraContainer ${props.opaque ? "opaque" : ""}`}
            style={{width: `${size}px`, height: `${size}px`}}>
            <div className="cameraTop"></div>
            <div className={`cameraSquare ${size <= 100 ? "small " : ""}`} style={{borderWidth: `${size/15}px`}}>
                <div className="cameraTopGap"></div>
                <div
                    className={`ringContainer ${transition === true ? "expanded " : spin === true ? "spin " : ""} ${size <= 100 ? "small " : ""} ${props.loading ? "loading" : ""}`}>
                    <div className="diamondContainer">
                        <div className="diamondTop"></div>
                        <div className="diamondBottom"></div>
                    </div>
                    {/* <div className="ringTop"></div> */}
                    <div className={`ringCircle ${size <= 100 ? "small " : ""}`}
                        style={{borderWidth: `${size/25}px`}}></div>
                </div>
            </div>
        </div>
    );
} export default Camera;