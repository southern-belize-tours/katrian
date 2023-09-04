import React, { useEffect, useState } from 'react';
import './clock.css';

/**
 * Creates a style for translating and rotating lines within a circle to always be at the center
 * 
 * @param {Size in pixels of the css element} size 
 * @param {Angle of translation for the css element} angle 
 * @returns 
 */
const computeTransformStyle = (size, angle) => {
    const angleInRadians = (angle * Math.PI) / 180;
    const cosineValue = Math.cos(angleInRadians);
    const sinValue = Math.sin(angleInRadians);
    const translate_x_value = size * cosineValue * .5;
    const translate_y_value = size * sinValue * -.5;

    const translateStyle = {
        transform: `translateX(${translate_y_value}px) translateY(${translate_x_value}px) rotate(${angle}deg)`
    }
    return translateStyle;
}

/**
 * Clock icon component
 * 
 * @param {Could contain a size in pixels, along with a minute and hour value} props 
 * @returns 
 */
function Clock (props) {

    // Size state component can be set from the props, along with hour and minute
    const [size, setSize] = useState(300);
    const [hour, setHour] = useState(12);
    const [minute, setMinute] = useState(0);

    // Compute size and time on init based on optional props
    useEffect(() => {
        if (!(props == null || props.size == null || props.size <= 0)) {
            setSize(props.size);
        }
        if (!(props == null || props.hour == null || props.hour <= 0)) {
            setHour(props.hour);
        }
        if (!(props == null || props.minute == null || props.minute <= 0)) {
            setMinute(props.minute);
        }        
    });

    // Compute how much to move the small hand based on the current angle
    const smallHandSize = size * .87 * .20;
    const smallHandAngle = 25;
    const transform_small_hand_style = computeTransformStyle(smallHandSize, smallHandAngle)

    // Compute how much to move the large hand based on the current angle
    const bigHandSize = size * .87 * .4;
    const bigHandAngle = 15;
    const transform_big_hand_style = computeTransformStyle(bigHandSize, bigHandAngle);

    return (<div>
        <div className={`clockContainer ${size <= 100 ? "small " : ""}`}
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