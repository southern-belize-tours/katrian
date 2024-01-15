import { useEffect, useState } from 'react';
import './Cuvier.css';

const defaultSize = 400;

export default function Cuvier (props) {
    const [size, setSize] = useState(defaultSize);

    /**
     * Determines the size on initialization
     */
    useEffect(() => {
        if (props && props.size) {
            setSize(props.size);
        }

    }, []);

    return (
    <div className="cuvierContainer"
        style={{height: `${size}px`, width: `${size}px`}}>
        <div className="cuvierCircle left" style={{borderWidth: `${size/12}px`}}></div>
        <div className="cuvierCircle right" style={{borderWidth: `${size/12}px`}}></div>
    </div>
    )
}