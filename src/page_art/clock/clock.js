import React, { useEffect, useState } from 'react';
import './clock.css';

/**
 * Clock icon component
 * 
 * @param {Could contain a size in pixels, along with a minute and hour value} props 
 * @returns 
 */
function Clock (props) {

    // Size state component can be set from the props, along with hour and minute
    const [size, setSize] = useState(props.size);
    const [animationDuration, setAnimationDuration] = useState(2);

    // Compute size and time on init based on optional props
    useEffect(() => {
        if (!(props == null || props.size == null || props.size <= 0)) {
            setSize(props.size);
        }
        if (!props.animate) {
            setAnimationDuration(0);
        }
    }, [props]);

    const transform_small_hand_style =  {
        // ...computeTransformStyle(smallHandSize, smallHandAngle),
        animation: `rotate ${animationDuration}s linear 1`
    };


    // Compute how much to move the large hand based on the current angle
    const transform_big_hand_style = {
        // ...computeTransformStyle(bigHandSize, bigHandAngle),
        animation: `rotate ${animationDuration/1.4}s linear 1`
    }

    return (<div>
        <div className={`clockContainer ${size <= 100 ? "small " : ""} ${props.fade ? "fading" : ""}`}
            style={{width: `${size}px`, height: `${size}px`}}>
            <div className="clockDiamondTop"></div>
            <div className="clockDiamondBottom"></div>
            <div className="clockOuterRing">
                <div></div>
                <div className="clockSmallHand" style={transform_small_hand_style}></div>
                <div className="clockBigHand" style={transform_big_hand_style}></div>
            </div>
        </div>
    </div>)
} export default Clock;