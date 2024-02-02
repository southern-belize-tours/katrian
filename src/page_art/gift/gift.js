// Core components and libraries
import React, { useEffect, useState } from 'react';

// Styles and Images
import './gift.css';

function Gift (props) {

    const [transition, setTransition] = useState(false);

    useEffect(() => {
        let timeoutId = null;

        // Determine if the cake will make a transition and set a timeout function if false
        if (props !== null && props.doTransition !==null && props.doTransition) {
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
            <div className={`giftContainer ${props.size <= 100 ? "small" : ""} ${props.opaque ? "opaque" : ""}`}
                style={{height: `${props.size}px`, width: `${props.size}px`}}>
                <div className="giftTop">
                    <div className="leftBow" style={{borderWidth: `${props.size/20}px`}}></div>
                    <div className="rightBow" style={{borderWidth: `${props.size/20}px`}}></div>
                    <div className="topBox" style={{borderWidth: `${props.size/20}px`}}></div>
                </div>
                <div className="giftBottom" style={{borderWidth: `${props.size/20}px`, marginTop: `-${props.size/20}px`}}>
                    <div className={`topLeft ${transition ? "" : "moved"}`}></div>
                    <div className={`topRight ${transition ? "" : "moved"}`}></div>
                    <div className={`bottomLeft ${transition ? "" : "moved"}`}></div>
                    <div className={`bottomRight ${transition ? "" : "moved"}`}></div>
                </div>
            </div>
        </div>
    )

} export default Gift;