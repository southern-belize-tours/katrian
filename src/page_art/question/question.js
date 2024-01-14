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

    }, [])

    return (
    <div className="questionContainer"
        style={{height: `${size}px`, width: `${size}px`}}>
        <div className={`bigCircle ${props.loading ? "spinning" : ""}`}
            style={{borderWidth: `${size/25}px`}}>
            <div className="innerCircle"></div>
        </div>
        <div className="questionDiamond">
            <div className="questionDiamondTop"></div>
            <div className="questionDiamondBottom"></div>
        </div>
    </div>
    )
};