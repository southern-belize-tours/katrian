import React, { useEffect, useState } from 'react';

import './cake.css';

function Cake (props) {

    // Size state component can be set from the props, along with hour and minute
    const [size, setSize] = useState(props && props.size ? props.size : 0);
    const [transition, setTransition] = useState(props.doTransition);
    const [disappearing, setDisappearing] = useState(false);

    // Compute size and on init based on optional props
    useEffect(() => {

        let timeoutId, disappearTimeoutId, minimizeTimeoutId = null;

        // // Determine if the cake will make a transition and set a timeout function if false
        if (props.doTransition === true) {
            // setTransition(true);
            timeoutId = setTimeout(() => {
                setTransition(false);
            }, 0);
        }

        if (props.disappearing && props.disappearing === true) {
            disappearTimeoutId = setTimeout(() => {
                setDisappearing(true);
            }, 3000);
            minimizeTimeoutId = setTimeout(() => {
                setSize(0);
            }, 3300)
        }

        return () => {
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
            }
            if (disappearTimeoutId !== null) {
                clearTimeout(disappearTimeoutId);
            }
            if (minimizeTimeoutId !== null) {
                clearTimeout(minimizeTimeoutId);
            }
        }

    }, [props.disappearing, props.doTransition]);

    useEffect(() => {
        if (!(props == null || props.size == null || props.size <= 0)) {
            setSize(props.size);
        }
    }, [props, props.size])

    return (
        // !disappearing &&
        <div className={`cakeContainer ${size <= 100 ? "small " : ""} ${disappearing ? "fadeOut" : ""}`}
            style={{width: `${size}px`, height: `${size}px`}}>
            <div className={`cakeRings ${transition === true ? "compressed" : ""}`}>
                <div className={`firstRing ${transition === true ? "compressed" : ""}`}
                    style={{borderWidth: `${size/35}px`, transitionDelay: `${props.doTransition ? "1s" : "0s"}`, transitionDuration: `${props.doTransition ? ".5s" : "0s"}`}}></div>
                <div className={`secondRing ${transition === true ? "compressed" : ""}`}
                    style={{borderWidth: `${size/35}px`, transitionDelay: `${props.doTransition ? "1s" : "0s"}`, transitionDuration: `${props.doTransition ? ".5s" : "0s"}`}}></div>
            </div>
            <div className={`firstLayer ${transition === true ? "" : "tall"}`}></div>
            <div className={`secondLayer ${transition === true? "" : "tall"}`}></div>
            <div className="thirdLayer"></div>
        </div>
        
    )
} export default Cake;