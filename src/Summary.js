// import clock from './images/clock.png'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddBoxIcon from '@mui/icons-material/AddBox';
// import { Add } from '@mui/icons-material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import Clock from './page_art/clock/clock.js'
import { useEffect, useState } from 'react';
import { AttachMoney, Check, CheckOutlined, Close, Deck, Dining, DirectionsWalk, Diversity1, Diversity2, EggAlt, ExpandMore, LocalParking, LocationOn, Nightlife, QuestionMark, Restaurant, Thermostat, WbShade, WbSunny } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Tooltip } from '@mui/material';

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

    return(
        <div>
            <div className="flexed col centered">
                {/* <img src={clock} alt="clock" className="cakeImg"/> */}
                {clock ? <Clock animate={true} size={props.size} fade={fade}></Clock> : <></>}
                {/* <h1 className={`logisticsText ${textFade ? "" : "fading"}`}>Time and Place Summary</h1> */}
                {/* <h1 className={`logisticsText ${textFade ? "" : "fading"}`}>Join us for a weekend of celebration and love</h1> */}
                <div className={`padded-sides flexed col logisticsText ${textFade ? "" : "fading"}`}>
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
                        {/* <Diversity1 fontSize="2rem" color="primary"></Diversity1> */}
                        <div>
                            <div className="summaryItemTitle">
                                Wedding Day
                            </div>
                            <div className="summaryItemTime">
                                Friday, August 22nd, 2025
                            </div>
                        </div>
                    </div>
                    <div className="summaryItems">
                        <div className="summaryItemInfo">
                            <div className="summaryItemTime">
                                4:00pm
                            </div>
                            <div className="summaryItemMore">
                                <div className="summaryItemName">
                                    Ceremony
                                </div>
                                <div className="summaryItemLocation">
                                    <Tooltip title={`${text == "590 Coast S Blvd, La Jolla, CA 92037" ? "Location Copied Successfully!" : "Copy Location to Clipboard"}`}>
                                        <IconButton onClick = {() => {copyTextToClipBoard("590 Coast S Blvd, La Jolla, CA 92037")}}>
                                        {
                                        text == "590 Coast S Blvd, La Jolla, CA 92037" ?
                                        <CheckOutlined color="primary"></CheckOutlined>
                                        :
                                        <LocationOn color="primary"></LocationOn>
                                        }
                                    </IconButton>
                                    </Tooltip>
                                    <div>
                                        The Wedding Bowl - <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/Ha4L8fiTvzPPKuKn8" target="_blank" rel="noreferrer" className='secondary'>590 Coast S Blvd, La Jolla, CA 92037</a></Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="summaryItemInfo">
                            <div className="summaryItemTime">
                                4:30pm
                            </div>
                            <div className="summaryItemMore">
                                <div className="summaryItemName">
                                    Reception
                                </div>
                                <div className="summaryItemLocation">
                                <Tooltip title={`${text == "7776 Eads Ave, La Jolla, CA 92037" ? "Location Copied Successfully!" : "Copy Location to Clipboard"}`}>
                                    <IconButton onClick = {() => {copyTextToClipBoard("7776 Eads Ave, La Jolla, CA 92037")}}>
                                        {
                                        text == "7776 Eads Ave, La Jolla, CA 92037" ?
                                        <CheckOutlined color="primary"></CheckOutlined>
                                        :
                                        <LocationOn color="primary"></LocationOn>
                                        }
                                    </IconButton>
                                    </Tooltip>
                                    {/* <LocationOn color="primary"></LocationOn>  */}
                                    <div>
                                        Cuvier Club -  <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/fCQhffHZshgdnUam8" target="_blank" rel="noreferrer" className="secondary">7776 Eads Ave, La Jolla, CA 92037</a></Tooltip>
                                    </div>
                                </div>
                                {/* <div className="summaryItemLocation">
                                    Immediately Following Ceremony
                                </div> */}
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
                                        The walk between the ceremony and reception is about <Tooltip title="View Walk on Google Maps"><a href="https://maps.app.goo.gl/9Wikbfou6GdPAasf8" rel="noreferrer" className="secondary" target="_blank">5 minutes long</a></Tooltip>, which includes some stairs and uneven grass. Please plan your shoe choices accordingly.
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
                                        The <Tooltip title="View La Jolla Weather Data for August"><a href="https://www.accuweather.com/en/us/la-jolla/92870/august-weather/2168187?year=2025" className="secondary" target="_blank" rel="noreferrer">average La Jolla weather</a></Tooltip> has daily high temperatures around 76 F. Weather rarely exceeds 84 F and rarely dips below 68 F at this time of year. Augusts is quite dry and averages 3 days with rain each year.
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
                        {/* <Diversity1 fontSize="2rem" color="primary"></Diversity1> */}
                        <div>
                            <div className="summaryItemTitle">
                                Brunch and Chill Day
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
                                    <Tooltip title={`${text == "8030 Girard Ave, La Jolla, La Jolla, CA, 92037" ? "Location Copied Successfully!" : "Copy Location to Clipboard"}`}>
                                        <IconButton onClick = {() => {copyTextToClipBoard("8030 Girard Ave, La Jolla, La Jolla, CA, 92037")}}>
                                        {
                                        text == "8030 Girard Ave, La Jolla, La Jolla, CA, 92037" ?
                                        <CheckOutlined color="primary"></CheckOutlined>
                                        :
                                        <LocationOn color="primary"></LocationOn>
                                        }
                                    </IconButton>
                                    </Tooltip>
                                    {/* <LocationOn color="primary"></LocationOn> */}
                                    <div>
                                        La Jolla Covehouse - <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/7z2Feyod7zQVfgNr8" target="_blank" rel="noreferrer" className="secondary">8030 Girard Ave, La Jolla, La Jolla, CA, 92037</a></Tooltip>
                                    </div>
                                </div>
                                {/* <div className="summaryItemLocation">
                                    Sponsored Event
                                </div> */}
                            </div>
                        </div>
                        <div className="summaryItemInfo">
                            <div className="summaryItemTime">
                                5:00pm
                            </div>
                            <div className="summaryItemMore">
                                <div className="summaryItemName">
                                    Casual Happy Hour
                                </div>
                                <div className="summaryItemLocation">
                                <LocationOn color="primary"></LocationOn>
                                <div>
                                    TBD
                                </div>
                            </div>
                                {/* <div className="summaryItemLocation">
                                    This is not a Sponsored Event, but everyone is invited
                                </div> */}
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
                                <div className="logisticsItem">
                                    <AttachMoney color="primary"></AttachMoney> Brunch will be sponsored. The happy hour will not be sponsored.
                                </div>

                                {/* <div className="logisticsItem">
                                    <DirectionsWalk color="primary"></DirectionsWalk> The walk between the ceremony and reception is about 5 minutes long, which includes some stairs and uneven grass. Please plan your shoe choices accordingly.
                                </div>
                                <div className='logisticsItem'>
                                    <LocalParking color="primary"></LocalParking> La Jolla street parking is first-come-first-served and will be competitive. We recommend walking from hotel and parking early, if possible.
                                </div>
                                <div className="logisticsItem">
                                    <WbSunny color="primary"></WbSunny> The ceremony will be fully outdoors on a grassy coastal cliff.
                                </div>
                                <div className="logisticsItem">
                                    <Deck color="primary"></Deck> The cocktail hour (open bar) will be in a semi-covered outdoor area immediately following the ceremony.
                                </div>
                                <div className='logisticsItem'>
                                    <WbShade color="primary"></WbShade> The reception will be indoors.
                                </div>
                                <div className="logisticsItem">
                                    <Thermostat color="primary"></Thermostat> The average La Jolla weather has daily high temperatures around 76 F. Weather rarely exceeds 84 F and rarely dips below 68 F at this time of year. Augusts is quite dry and averages 3 days with rain each year.
                                </div>
                                <div className="logisticsItem">
                                    <QuestionMark color="primary"></QuestionMark> Looking for things to do during the day? Look at our<a href="/FAQ#San-Diego-Activities" className="secondary">San Diego Activities</a> section of the FAQ page.
                                </div> */}
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