import { AirportShuttle, Balcony, Bed, CalendarMonth, Call, Close, Coffee, DirectionsWalk, DoDisturb,
    ExpandMore, Flight, Info, InfoOutlined, LocalOffer, LocalParking, LocalTaxi, LocationOn, PhotoAlbum,
    PriorityHighOutlined, Schedule, Star, TapAndPlay } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";

export default function HotelAndTransport (props) {
    const [fade, setFade] = useState(true);
    const [innBySeaExpanded, setInnBySeaExpanded] = useState(false);
    const [scrippsExpanded, setScrippsExpanded] = useState(false);
    const [hotelsExpanded, setHotelsExpanded] = useState(false);
    const [transportExpanded, setTransportExpanded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setFade(false);
        }, 0);
    }, [])

    return (
    <div className="weddingBody">
        <h1 className={`logisticsText ${fade ? "" : "fading"}`}>Travel</h1>
        <div className={`flexed col logisticsText ${fade ? "" : "fading"}`}>
            <div className="flexed centered">
                <div className="flexed col">
                    <div className="flexed logisticsItem centered">
                        <div>
                            <PriorityHighOutlined color="secondary" style={{fontSize: "1.1rem"}}></PriorityHighOutlined>
                        {/* <PriorityHigh fontSize="4rem" */}
                            {/* // style={{fontSize: "3rem"}} */}
                            {/* color="secondary"> */}
                        {/* </PriorityHigh>  */}
                        {/* <div> */}
                            Late August will be a very busy month and rooms will book out early - we highly recommend booking in advance if at all possible
                        {/* </div> */}
                        </div>

                    </div>
                    <Tooltip title={`${innBySeaExpanded ? "" :  "View Inn By the Sea Details"}`}>
                    <Accordion expanded={innBySeaExpanded}>
                        <AccordionSummary onClick = {() => {setInnBySeaExpanded(!innBySeaExpanded)}}
                            className="transitAccordion"
                            expandIcon={innBySeaExpanded ? <Close fontSize="2rem" color="primary"></Close> : <ExpandMore fontSize="2rem" color="primary"></ExpandMore>}>
                            <div className="flexed col">
                        <div className="flexed centered logisticsAccordionSummary">
                            Inn by The Sea at La Jolla
                        </div>
                        <div className="logisticsItem">
                            <LocationOn color="primary"></LocationOn> 7830 Fay Avenue, La Jolla, CA 92037
                        </div>
                        <div className="logisticsItem">
                            <LocalOffer color="primary"></LocalOffer> $199.00/night + tax for Standard Room, $289.00/night + tax for Ocean View Room
                        </div>
                        <div className="logisticsItem">
                            <Call color="primary"></Call>
                            <div>
                                {/* @TODO Figure out how to make this "call x" action */}
                                To book, call the hotel directly at <span className="secondary">1-800-526-4545</span> and ask for the rate for "Strawick - Feekes Wedding"
                            </div>
                        </div>
                        </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="logisticsItem">
                                <DirectionsWalk color="primary"></DirectionsWalk> 1 minute walk to reception venue, 6 minute walk to ceremony site
                            </div>
                            <div className="logisticsItem">
                                <PhotoAlbum color="primary"></PhotoAlbum> <a href="https://www.innbytheseaatlajolla.com/gallery" target="_blank" rel="noreferrer" className="secondary">Official Website Gallery</a>
                            </div>
                            <div className="logisticsItem">
                                <Bed color="primary"></Bed> Choice of a Single King Bed, or Two Queen Beds
                            </div>
                            <div className="logisticsItem">
                                <Balcony color="primary"></Balcony> Balconies/Patios are included with all rooms
                            </div>
                            <div className="logisticsItem">
                                <DoDisturb color="primary"></DoDisturb> 24 hour cancellation policy prior to arrival
                            </div>
                            <div className="logisticsItem">
                                <CalendarMonth color="primary"></CalendarMonth> The hotel can be booked for any/all days August 21st and August 23rd (and a day before or afterwards) at the discounted rate if you are planning on staying just a night, or for the entire weekend.
                            </div>
                            <div className="logisticsItem">
                                <Coffee color="primary"></Coffee> Complimentary Coffee, Tea, Hot Chocolate Daily
                            </div>
                            <div className="logisticsItem">
                                <LocalParking color="primary"></LocalParking> Discounted $10/day parking fee
                            </div>
                            <div className="logisticsItem">
                                <Schedule color="primary"></Schedule> Check-in is 4pm. Check-out is Noon.
                            </div>
                            <div className="logisticsItem">
                                <Info color="primary"></Info> The hotel is in the heart of La Jolla Village and 2 blocks from the ocean. It is walking distance to over 100 restaurants, museums, and shops. There is free wifi throughout the hotel. There is no resort fee. The hotel comes with a heated outdoor swimming pool. Rooms all come with coffee makers, ironing boards and refrigerators. There is no smoking and no pets allowed in the hotel.
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    </Tooltip>
                    <Tooltip title={`${scrippsExpanded ? "" :  "View Scripps Inn Details"}`}>
                    <Accordion expanded={scrippsExpanded}>
                        <AccordionSummary onClick = {() => {setScrippsExpanded(!scrippsExpanded)}}
                            className="transitAccordion"
                            expandIcon={scrippsExpanded ? <Close fontSize="2rem" color="primary"></Close> : <ExpandMore fontSize="2rem" color="primary"></ExpandMore>}>
                        <div className="flexed col">
                            <div className="flexed centered logisticsAccordionSummary">
                                Scripps Inn La Jolla Cove
                            </div>
                            <div className="logisticsItem">
                                <LocationOn color="primary"></LocationOn> 555 Coast S Blvd, La Jolla, CA 92037
                            </div>
                            <div className="logisticsItem">
                                <LocalOffer color="primary"></LocalOffer>
                                <div>
                                    10% discount by booking on their <a href="https://scrippsinn.com" className="secondary" target="_blank" rel="noreferrer">hotel website</a> (rather than on booking.com)
                                </div>
                            </div>
                            <div className="logisticsItem">
                                <Star color="primary"></Star> This is the luxury hotel option. The rooms all have ocean views
                            </div>
                        </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="logisticsItem">
                                <DirectionsWalk color="primary"></DirectionsWalk> 5 minute walk to reception venue, 1 minute walk to ceremony site
                            </div>
                            <div className="logisticsItem">
                                <PhotoAlbum color="primary"></PhotoAlbum> <a href="https://www.scrippsinn.com/gallery"  target="_blank" rel="noreferrer" className="secondary">Official Website Gallery</a>
                            </div>
                            <div className="logisticsItem">
                                <Bed color="primary"></Bed> Choice of a Single King Bed, or Two Queen Beds
                            </div>
                            <div className="logisticsItem">
                                <CalendarMonth color="primary"></CalendarMonth> The hotel does not have any specific blocks for our wedding, and can be booked for any available dates
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    </Tooltip>
                    <Tooltip title={`${hotelsExpanded ? "" : "View List of Other Proximate Hotels"}`}>
                        <Accordion expanded={hotelsExpanded}>
                            <AccordionSummary onClick = {() => {setHotelsExpanded(!hotelsExpanded)}}
                                className="transitAccordion"
                                expandIcon = {hotelsExpanded ? <Close fontSize="2rem" color="primary"></Close> : <ExpandMore fontSize="2rem" color="primary"></ExpandMore>}>
                                <div className="flexed col">
                                    <div className="flexed centered logisticsAccordionSummary">
                                        Other Walking-Distance Hotels in La Jolla
                                    </div>
                                    <div className="logisticsItem">
                                        <InfoOutlined color="primary"></InfoOutlined> These hotels do not have blocks or special discounts for our wedding
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="logisticsItem">
                                    <a href="https://direct-book.com/properties/RedwoodHollowDirect"
                                        target="_blank"
                                        rel = "noreferrer"
                                        className="secondary">
                                        Redwood Hollow Cottages
                                    </a>
                                </div>
                                <div className="logisticsItem">
                                    <a href="https://stayorli.com/"
                                        target="_blank"
                                        rel = "noreferrer"
                                        className="secondary">
                                        Orli La Jolla
                                    </a>
                                </div>
                                <div className="logisticsItem">
                                    <a href="https://pantai.com/"
                                        target="_blank"
                                        rel = "noreferrer"
                                        className="secondary">
                                        Pantai Inn
                                    </a>
                                </div>
                                <div className="logisticsItem">
                                    <a href="https://cormorantlajolla.com/"
                                        target="_blank"
                                        rel = "noreferrer"
                                        className="secondary">
                                        Cormorante Boutique Hotel, La Jolla
                                    </a>
                                </div>
                                <div className="logisticsItem">
                                    <a href="https://www.lavalencia.com/"
                                        target="_blank"
                                        rel = "noreferrer"
                                        className="secondary">
                                        La Valencia Hotel
                                    </a>
                                </div>
                                <div className="logisticsItem">
                                    <a href="https://www.lajollacove.com/"
                                        target="_blank"
                                        rel = "noreferrer"
                                        className="secondary">
                                        La Jolla Cove Hotel & Suites
                                    </a>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </Tooltip>
                    <Tooltip title={`${transportExpanded ? "" : "View Full List of Transportation Options"}`}>
                        <Accordion expanded={transportExpanded}>
                            <AccordionSummary onClick = {() => {setTransportExpanded(!transportExpanded)}}
                                expandIcon = {transportExpanded ? <Close fontSize="2rem" color="primary"></Close> : <ExpandMore fontSize="2rem" color="primary"></ExpandMore>}>
                                <div className="flexed centered logisticsAccordionSummary">
                                    Transportation Options
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                            <div className="logisticsItem">
                                <div className="logisticsItem">
                                    <Flight color="primary"></Flight>
                                    <div>
                                        The San Diego Airport is the closest airport to the venue, <Tooltip title="Open Directions in Google Maps"><a className="secondary" href="https://maps.app.goo.gl/35q6LvbzikCYUALi9" target="_blank" rel="noreferrer">between 20 and 40 minutes away depending on traffic</a></Tooltip>. The John Wayne Airport in Orange County is another option with a slightly longer commute <Tooltip title="Open Directions in Google Maps"><a href="https://maps.app.goo.gl/byS6QN9HbAXW8ATK9" className="secondary" target="_blank" rel="noreferrer">(~75-120 minutes)</a></Tooltip> that skips LA traffic.
                                    </div>
                                </div>
                                </div>
                                <div className="logisticsItem">
                                    <TapAndPlay color="primary"></TapAndPlay> Uber and Lyft ridesharing applications are prominent in San Diego, with Uber being generally more available
                                </div>
                                <div className="logisticsItem">
                                    <AirportShuttle color="primary"></AirportShuttle> 
                                    <div>
                                        For private shuttles, we recommend "Martina's Transportation". Their website is <a className="secondary" href="https://martinastransportation.com" target="_blank" rel="noreferrer">www.martinastransportation.com</a>. Their email is info@marinastransportation.com and their cell is 858-401-0877
                                    </div>
                                </div><div className="logisticsItem flexed">
                                    <LocalTaxi color="primary"></LocalTaxi> 
                                    <div>
                                        <div>La Jolla Ride (Monty's) 858-405-0877</div>
                                        <div>Yellow Cab 1-619-234-6161</div>
                                        <div>Orange Cab 1-619-223-5555</div>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </Tooltip>
                </div>
            </div>
            <div className="flexed logisticsItem">
                <div>
                    For any additional information, please feel free to take a look at the <a className="secondary" href="/FAQ">FAQ Page</a> and pop the question to us!
                </div>
            </div>
        </div>
    </div>
    );
}