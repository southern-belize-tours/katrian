import React, { useEffect, useState } from 'react';

import './cake.css';

function Cake (props) {

    // Size state component can be set from the props, along with hour and minute
    const [size, setSize] = useState(500);
    const [transition, setTransition] = useState(false);

    // Compute size and on init based on optional props
    useEffect(() => {
        let timeoutId = null;

        if (!(props == null || props.size == null || props.size <= 0)) {
            setSize(props.size);
        }
        // Determine if the cake will make a transition and set a timeout function if false
        if (props !== null && props.doTransition !==null && props.doTransition == true) {
            setTransition(true);
            timeoutId = setTimeout(() => {
                setTransition(false);
            }, 1000);
        }

        if (timeoutId !== null) {
            return () => clearTimeout(timeoutId);
        }
    });

    return (
        <div className={`cakeContainer ${size <= 100 ? "small " : ""}`}
            style={{width: `${size}px`, height: `${size}px`}}>
            <div className={`cakeRings ${transition === true ? "compressed" : ""}`}>
                <div className={`firstRing ${transition === true ? "compressed" : ""}`}></div>
                <div className={`secondRing ${transition === true ? "compressed" : ""}`}></div>
            </div>
            <div className={`firstLayer ${transition === true ? "" : "tall"}`}></div>
            <div className={`secondLayer ${transition === true? "" : "tall"}`}></div>
            <div className="thirdLayer"></div>
        </div>
    )
} export default Cake;