import { useEffect, useState } from 'react';
import './envelope.css';

export default function Envelope (props) {
    const [size, setSize] = useState(props.size);

    useEffect(() => {
        if (props && props.size) {
            setSize(props.size);
        }
    }, [props]);

    return (
        <div className="envelopeContainer"
            style={{height: `${size}px`, width: `${size}px`, }}>
            <div className="envelopeBox"
                style={{
                    borderRadius: `${size/8}px`,
                    borderWidth: `${size/20}px`}}>
                <div className="envelopeTopFold"
                    style={{
                        height: `${size/1.55}px`,
                        width: `${size/1.55 }px`,
                        borderRadius: `${size/8}px`,
                        borderWidth: `${size/20}px`
                    }}>
                </div>
                <div className="envelopeBottomFold"
                    style={{
                        height: `${size/1.55}px`,
                        width: `${size/1.55 }px`,
                        borderRadius: `${size/8}px`,
                        borderWidth: `${size/20}px`
                    }}>
                </div>
            </div>
            <div className="envelopeLetter"
                    style={{
                        borderRadius: `${size/8}px`,
                        borderWidth: `${size/20}px`}}>
                    <div className="envelopeText"
                        style = {{
                            fontSize: `${size/7}px`
                        }}>
                        RSVP
                    </div>
                </div>  
        </div>
    )
}