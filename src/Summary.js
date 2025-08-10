import Clock from './page_art/clock/clock.js'
import { useEffect, useState } from 'react';
import { AttachMoney, CheckOutlined, Checkroom, Close, Deck, Dining, DirectionsWalk, ExpandMore, LocalParking,
    LocationOn, Nightlife, QuestionMark, Thermostat, WbShade, WbSunny } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Tooltip } from '@mui/material';

function Summary (props) {
    const [fade, setFade] = useState(false);
    const [clock, setClock] = useState(true);
    const [textFade, setTextFade] = useState(true);
    const [weddingNotesExpanded, setWeddingNotesExpanded] = useState(false);
    const [brunchNotesExpanded, setBrunchNotesExpanded] = useState(false);
    // Used to detect which address text the user copied most-recently
    const [text, setText] = useState("");

    useEffect(() => {

        let timeoutId, clockTimeoutId = null;

        setFade(false);
        timeoutId = setTimeout(() => {
            setFade(true);
        }, 300);

        clockTimeoutId = setTimeout(() => {
            setClock(false);
            setTextFade(false);
        }, 800);

        if (timeoutId !== null) {
            return () => clearTimeout(timeoutId);
        }
        if (clockTimeoutId !== null) {
            return () => clearTimeout(clockTimeoutId);
        }
    }, [])

    const copyTextToClipBoard = (text) => {
        navigator.clipboard.writeText(text).then(function() {
            setText(text);
        }).catch(function(err) {
            console.error('Could not copy text: ', err);
        });
    }

    const AddToCalendar = () => {
        const eventTitle = 'Katrina & Ian Wedding';
        const eventLocation = '590 Coast S Blvd, La Jolla, CA 92037';
        const eventDescription = 'A day of love';
        const eventStartTime = '20250822T170000';
        const eventEndTime = '20250822T230000';
        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${eventStartTime}/${eventEndTime}&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}`;
        window.open(googleCalendarUrl, '_blank');
    };

    return(
        <div>
            <div className="flexed col centered">
                {/* <img src={clock} alt="clock" className="cakeImg"/> */}
                {clock ? <Clock animate={true} size={props.size} fade={fade}></Clock> : <></>}
                {/* <h1 className={`logisticsText ${textFade ? "" : "fading"}`}>Time and Place Summary</h1> */}
                {/* <h1 className={`logisticsText ${textFade ? "" : "fading"}`}>Join us for a weekend of celebration and love</h1> */}
                <div className={`flexed col logisticsText ${textFade ? "" : "fading"}`}>
                    {/* <div className = "flexed centered">
                        <Restaurant fontSize="2rem" color="primary"></Restaurant>
                        <div>
                            <div>
                                Thursday, August 21st, 2024
                            </div>
                            <div><a href="/rehearsal" className="secondary">Rehearsal</a></div>
                        </div>
                    </div> */}

                    <div className="summaryDay">
                    <div className = "flexed centered summaryItemHeading">
                        <div>
                            <div className="summaryItemTitle">
                                Welcome Day
                            </div>
                            <div className="summaryItemTime">
                                Thursday, August 21st, 2025
                            </div>
                        </div>
                    </div>
                    <div className="summaryItems">
                        <div className="summaryItemInfo">
                            <div className="summaryItemTime">
                                7:30pm - 9:00pm
                            </div>
                            <div className="summaryItemMore">
                                <div className="summaryItemName">
                                    Welcome Drinks
                                </div>
                                <div className="summaryItemLocation">
                                    <Tooltip title={`${text === "1005 Prospect St, La Jolla, CA 92037" ? "Location Copied Successfully!" : "Copy Location to Clipboard"}`}>
                                        {
                                        text === "1005 Prospect St, La Jolla, CA 92037" ?
                                        <CheckOutlined color="primary" onClick = {() => {copyTextToClipBoard("1005 Prospect St, La Jolla, CA 92037")}}></CheckOutlined>
                                        :
                                        <LocationOn color="primary"></LocationOn>
                                        }
                                    </Tooltip>
                                    <div>
                                        The Spot - <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/bgTAAidfHBraJNzQ9" target="_blank" rel="noreferrer" className="secondary">1005 Prospect St, La Jolla, CA 92037</a></Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

                    <div className="summaryDay">
                    <div className = "flexed centered summaryItemHeading">
                        <div>
                            <div className="summaryItemTitle">
                                Wedding Day
                            </div>
                            <Tooltip title={"Add to Google Calendar"}>
                                <div className="summaryItemTime"
                                    onClick = {AddToCalendar}>
                                    Friday, August 22nd, 2025
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="summaryItems">
                        <div className="summaryItemInfo">
                            <div className="summaryItemTime">
                                5:00pm
                            </div>
                            <div className="summaryItemMore">
                                <div className="summaryItemName">
                                    Ceremony
                                </div>
                                <div className="summaryItemLocation">
                                    <Tooltip title={`${text === "590 Coast S Blvd, La Jolla, CA 92037" ? "Location Copied Successfully!" : "Copy Location to Clipboard"}`}>
                                        {
                                        text === "590 Coast S Blvd, La Jolla, CA 92037" ?
                                        <CheckOutlined color="primary"></CheckOutlined>
                                        :
                                        <LocationOn color="primary" onClick = {() => {copyTextToClipBoard("590 Coast S Blvd, La Jolla, CA 92037")}}></LocationOn>
                                        }
                                    </Tooltip>
                                    <div>
                                        The Wedding Bowl - <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/Ha4L8fiTvzPPKuKn8" target="_blank" rel="noreferrer" className='secondary'>590 Coast S Blvd, La Jolla, CA 92037</a></Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="summaryItemInfo">
                            <div className="summaryItemTime">
                                5:30pm
                            </div>
                            <div className="summaryItemMore">
                                <div className="summaryItemName">
                                    Reception
                                </div>
                                <div className="summaryItemLocation">
                                <Tooltip title={`${text === "7776 Eads Ave, La Jolla, CA 92037" ? "Location Copied Successfully!" : "Copy Location to Clipboard"}`}>
                                        {
                                        text === "7776 Eads Ave, La Jolla, CA 92037" ?
                                        <CheckOutlined color="primary"></CheckOutlined>
                                        :
                                        <LocationOn color="primary" onClick = {() => copyTextToClipBoard("7776 Eads Ave, La Jolla, CA 92037")}></LocationOn>
                                        }
                                    </Tooltip>
                                    <div>
                                        Cuvier Club -  <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/fCQhffHZshgdnUam8" target="_blank" rel="noreferrer" className="secondary">7776 Eads Ave, La Jolla, CA 92037</a></Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Tooltip title={`${weddingNotesExpanded ? "" : "View Wedding Day Notes"}`}>
                        <Accordion id="Wedding-Notes"
                            expanded = {weddingNotesExpanded}>
                            <AccordionSummary onClick = {() => {setWeddingNotesExpanded(!weddingNotesExpanded)}}
                                className="logisticsAccordionSummary"
                                expandIcon={weddingNotesExpanded ? <Close fontSize="2rem" color="primary"></Close> : <ExpandMore fontSize="2rem" color="primary"></ExpandMore>}>
                                Wedding Notes
                            </AccordionSummary>
                            <AccordionDetails className="logisticsAccordion">
                                <div className="logisticsItem">
                                    <DirectionsWalk color="primary"></DirectionsWalk>
                                    <div>
                                        The walk between the ceremony and reception is about <Tooltip title="View Walk on Google Maps"><a href="https://maps.app.goo.gl/9Wikbfou6GdPAasf8" rel="noreferrer" className="secondary" target="_blank">5 minutes long</a></Tooltip>, which includes some stairs and uneven grass. If you need assistance, please let us know.
                                    </div>
                                </div>
                                <div className='logisticsItem'>
                                    <LocalParking color="primary"></LocalParking>
                                    <div>
                                    La Jolla street parking is first-come-first-served and will be competitive. We recommend walking from your hotel and parking early, if possible. Some streets that might have better chances of free public parking would include along <Tooltip title="View Location in Google Maps"><a href="https://maps.app.goo.gl/w9VbmkkWCK8F4wDF6" className="secondary" target="_blank" rel="noreferrer">Eads St. </a></Tooltip>, between Kline St. and Pearl St., and along <Tooltip title="View Location in Google Maps"><a href="https://maps.app.goo.gl/Ekfu9DLw9JkaFqS66" target="_blank" rel="noreferrer" className="secondary">Fay Ave.</a></Tooltip> between Kline St. and Pearl St.
                                    {/* 737 Pearl St, La Jolla, CA 92037, USA */}
                                    </div>
                                </div>
                                <div className="logisticsItem">
                                    <WbSunny color="primary"></WbSunny>
                                    <div>
                                        The ceremony will be fully outdoors at <Tooltip title="View an Image of the Wedding Bowl"><a href="https://theweddingbowl.com/wp-content/uploads/2014/11/wedding-bowl-DSCN4830Small-778399.jpg" target="_blank" rel="noreferrer" className="secondary">The Wedding Bowl</a></Tooltip>, which is on a grassy coastal cliff.
                                    </div>
                                </div>
                                <div className="logisticsItem">
                                    <Deck color="primary"></Deck>
                                    <div>
                                    The cocktail hour (open bar) will be in a <Tooltip title="View an Image of the Cocktail Hour Area"><a href="https://5387157.fs1.hubspotusercontent-na1.net/hub/5387157/hubfs/3.0%20Venue%20Images/Cuvier%20Club/Cuvier-Club-by-Wedgewood-Weddings-71.jpg?width=1200&name=Cuvier-Club-by-Wedgewood-Weddings-71.jpg" rel="noreferrer" target="blank" className="secondary">semi-covered outdoor area</a></Tooltip> immediately following the ceremony.
                                    </div>
                                </div>
                                <div className='logisticsItem'>
                                    <WbShade color="primary"></WbShade> The reception will be indoors.
                                </div>
                                <div className="logisticsItem">
                                    <Thermostat color="primary"></Thermostat>
                                    <div>
                                        The <Tooltip title="View La Jolla Weather Data for August"><a href="https://www.accuweather.com/en/us/la-jolla/92870/august-weather/2168187?year=2025" className="secondary" target="_blank" rel="noreferrer">average La Jolla weather</a></Tooltip> has daily high temperatures around 76 F. Weather rarely exceeds 84 F and rarely dips below 68 F at this time of year. August is quite dry and averages 3 days with rain each year.
                                    </div>
                                </div>
                                <div className="logisticsItem">
                                    <Checkroom color="primary"></Checkroom>
                                    <div>
                                        The attire for the wedding ceremony and reception is <a href="https://www.theknot.com/content/what-to-wear-semi-formal?srsltid=AfmBOoqoAnVQjGkWlebY8-KuR-CPpJzGnHb7bnJI-7MqKjQqsLfsU5kr" target='_blank' rel='noreferrer' className="secondary">formal</a>.
                                    </div>
                                </div>
                                <div className="logisticsItem">
                                    <QuestionMark color="primary"></QuestionMark> 
                                    <div>
                                        Looking for things to do during the day? Look at our <a href="/FAQ#San-Diego-Activities" className="secondary">San Diego Activities</a> section of the FAQ page.
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        </Tooltip>
                    </div>
                    </div>

                    <div className="summaryDay">
                    <div className = "flexed centered summaryItemHeading">
                        <div>
                            <div className="summaryItemTitle">
                                Brunch Day
                            </div>
                            <div className="summaryItemTime">
                                Saturday, August 23rd, 2025
                            </div>
                        </div>
                    </div>
                    <div className="summaryItems">
                        <div className="summaryItemInfo">
                            <div className="summaryItemTime">
                                10:00am
                            </div>
                            <div className="summaryItemMore">
                                <div className="summaryItemName">
                                    Brunch
                                </div>
                                <div className="summaryItemLocation">
                                    <Tooltip title={`${text === "8030 Girard Ave, La Jolla, La Jolla, CA, 92037" ? "Location Copied Successfully!" : "Copy Location to Clipboard"}`}>
                                        {
                                        text === "8030 Girard Ave, La Jolla, La Jolla, CA, 92037" ?
                                        <CheckOutlined color="primary" onClick = {() => {copyTextToClipBoard("8030 Girard Ave, La Jolla, La Jolla, CA, 92037")}}></CheckOutlined>
                                        :
                                        <LocationOn color="primary"></LocationOn>
                                        }
                                    </Tooltip>
                                    <div>
                                        La Jolla Covehouse - <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/7z2Feyod7zQVfgNr8" target="_blank" rel="noreferrer" className="secondary">8030 Girard Ave, La Jolla, La Jolla, CA, 92037</a></Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Tooltip title={`${brunchNotesExpanded ? "" : "View Brunch and Chill Day Notes"}`}>
                        <Accordion id="Wedding-Notes"
                            expanded = {brunchNotesExpanded}>
                            <AccordionSummary onClick = {() => {setBrunchNotesExpanded(!brunchNotesExpanded)}}
                                className="logisticsAccordionSummary"
                                expandIcon={brunchNotesExpanded ? <Close fontSize="2rem" color="primary"></Close> : <ExpandMore fontSize="2rem" color="primary"></ExpandMore>}>
                                Brunch & Chill Day Notes
                            </AccordionSummary>
                            <AccordionDetails className="logisticsAccordion">
                                <div className="logisticsItem">
                                    <DirectionsWalk color="primary"></DirectionsWalk> 
                                    <div>
                                        The brunch location, <Tooltip title="View La Jolla Covehouse Website"><a href="https://www.covehouselajolla.com/" target="_blank" rel="noreferrer" className="secondary">La Jolla Covehouse</a></Tooltip>, is an 8 minute walk from the venue. The best walk is along the La Jolla coast where you can see the seals with their pups at <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/jKGnhBnZoSLiSEpF8" target="_blank" rel="noreferrer" className="secondary">Seal Rock</a></Tooltip>.
                                    </div>
                                </div>
                                <div className="logisticsItem">
                                    <Dining color="primary"></Dining> Brunch will include a continental breakfast with assorted pastries, yogurt parfaits, seasonal fruit, scrambled eggs, breakfast potatoes, bacon, and a coffee and tea station.
                                </div>
                                <div className="logisticsItem">
                                    <Nightlife color="primary"></Nightlife> At brunch, there will also be bottomless mimosas, Bloody Marys, beer, and wine to celebrate.
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        </Tooltip>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );

} export default Summary;