// Core components and libraries
import React, { useEffect, useState } from 'react';

// Styles and Images
import './gift.css';

function Gift (props) {

    // Set default size to 500px x 500px
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
    }, []);

    return (
        <div>
            <div className={`giftContainer ${size <= 100 ? "small" : ""}`}
                style={{height: `${size}px`, width: `${size}px`}}>
                <div className="giftTop">
                    <div className="leftBow"></div>
                    <div className="rightBow"></div>
                    <div className="topBox"></div>
                </div>
                <div className="giftBottom">
                    <div className={`topLeft ${transition == true ? "" : "moved"}`}></div>
                    <div className={`topRight ${transition == true ? "" : "moved"}`}></div>
                    <div className={`bottomLeft ${transition == true ? "" : "moved"}`}></div>
                    <div className={`bottomRight ${transition == true ? "" : "moved"}`}></div>
                </div>
            </div>
        </div>
    )

} export default Gift;