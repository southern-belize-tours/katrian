import './question.css';

export default function Question (props) {

    return (
    <div className="questionContainer"
        style={{height: `${props.size}px`, width: `${props.size}px`}}>
        <div className={`bigCircle ${props.loading ? "spinning" : ""}`}
            style={{borderWidth: `${props.size/15}px`}}>
            <div className="innerCircle"></div>
        </div>
        <div className={`centerProng ${props.loading ? "spinning" : ""}`} style={{width: `${props.size/50}px`}}></div>
        <div className="questionDiamond">
            <div className="questionDiamondTop"></div>
            <div className="questionDiamondBottom"></div>
        </div>
    </div>
    )
};