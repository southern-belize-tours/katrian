import { useEffect, useState } from 'react';
import './question.css';

const defaultSize = 400;

export default function Question (props) {
    const [size, setSize] = useState(defaultSize);

    /**
     * Determines the size on initialization
     */
    useEffect(() => {
        if (props && props.size) {
            setSize(props.size);
        }
    })

    return (
    <div className="questionContainer"
        style={{height: `${size}px`, width: `${size}px`}}>
        <div className={`bigCircle ${props.loading ? "spinning" : ""}`}
            style={{borderWidth: `${size/15}px`}}>
            <div className="innerCircle"></div>
        </div>
        {/* <div className="leftProng" style={{width: `${size/100}px`}}></div> */}
        <div className="centerProng" style={{width: `${size/50}px`}}></div>
        {/* <div className="rightProng" style={{width: `${size/100}px`}}></div> */}
        <div className="questionDiamond">
            <div className="questionDiamondTop"></div>
            <div className="questionDiamondBottom"></div>
        </div>
    </div>
    )
};