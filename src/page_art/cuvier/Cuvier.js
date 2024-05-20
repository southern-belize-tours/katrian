import { useEffect, useState } from 'react';
import './Cuvier.css';

export default function Cuvier (props) {
    const [size, setSize] = useState(props.size);

    /**
     * Determines the size on initialization
     */
    useEffect(() => {
        if (props && props.size) {
            setSize(props.size);
        }
        // eslint-disable-next-line
    }, []);

    return (
    <div className={`cuvierContainer ${props.opaque ? "opaque" : ""}`}
        style={{height: `${size}px`, width: `${size}px`}}>
        <div className="cuvierCircle left" style={{borderWidth: `${size/12}px`}}></div>
        <div className="cuvierCircle right" style={{borderWidth: `${size/12}px`}}></div>
    </div>
    )
}