// Images and Styles
import './music.css';

function Music (props) {

    return(
    <div className = "musicContainer"
        style={{width: `${props.size}px`, height: `${props.size}px`}}>
        <div className = "musicNoteCircle">
            {props && props.loading &&
                <div className="musicNoteLoader"
                    style={{borderWidth: `${props.size/20}px`}}>
                </div>
            }
            <div className="firstLine"></div>
            <div className="secondLine"></div>
            <div className="thirdLine"></div>
        </div>
        <div className = "musicNoteStick"></div>
    </div>
    )
} export default Music;