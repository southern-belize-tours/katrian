import { LocationOn } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

import './RSVP.css';


export default function RSVPEvent (props) {

    const AddToCalendar = () => {
        const eventTitle = 'Katrina & Ian Wedding';
        const eventLocation = '590 Coast S Blvd, La Jolla, CA 92037';
        const eventDescription = 'A day of love';
        const eventStartTime = '20250822T170000';
        const eventEndTime = '20250822T230000';
    
        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${eventStartTime}/${eventEndTime}&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}`;
    
        window.open(googleCalendarUrl, '_blank');
    };

    return (
        <div className="summaryDay">
            <div className = "flexed centered summaryItemHeading">
                <div>
                    <div className="summaryItemTitle">
                        {props.title}
                    </div>
                    <Tooltip title={"Add to Google Calendar"}>
                        <div className="summaryItemTime"
                            onClick = {AddToCalendar}>
                            {props.dateTimeString}
                        </div>
                    </Tooltip> 
                </div>
            </div>
            <div className = "summaryItemLocation RSVPItemDescription">
                {props.description}
            </div>
            {props.items && props.items.map(item =>
            item && 
            <div className="summaryItemInfo">
                <div className="summaryItemTime">
                    {item.startString} {item.endString && item.endString.length > 0 && "-"} {item.endString}
                </div>
                <div className="summaryItemMore">
                    <div className="summaryItemName">
                        {item.name}
                    </div>
                    <div className="summaryItemLocation">
                        <Tooltip title="Copy Address to Clipboard">
                            <LocationOn color="primary"></LocationOn>
                        </Tooltip>
                        <div className="summaryItemLocationContent">
                            {item.location} - <Tooltip title="Open Location in Google Maps"><a href = {item.link} target="_blank" rel="noreferrer" className="secondary">{item.address}</a></Tooltip>
                        </div>
                    </div>
                </div>
            </div>
            )}



        </div>
    )
}