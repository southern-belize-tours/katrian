import { useEffect, useState } from "react";

import './RSVP.css';
import { Button, ButtonGroup, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, useMediaQuery } from "@mui/material";
import { Apple, BreakfastDiningOutlined, CalendarMonth, CancelOutlined, Check, Google, GroupAdd, PersonAdd, PsychologyAlt, Search, Undo, } from "@mui/icons-material";
import { useGroupService } from "../../Services/GroupService/GroupServiceContext";
import { useGuestService } from "../../Services/GuestService/GuestServiceContext";
import { toast, ToastContainer} from 'react-toastify';
import { ClipLoader } from "react-spinners";
import GroupEmailForm from "./GroupEmailForm";
import AllergyForm from "./AllergyForm";

import RSVPEvent from "./RSVPEvent.js";

const toastConfig = {
    autoClose: 2000
};

export default function RSVP (props) {
    const isSmallScreen = useMediaQuery('(max-width:558px)');

    const groupService = useGroupService();
    const guestService = useGuestService();

    const [groups, setGroups] = useState([]);
    const [selecting, setSelecting] = useState(false);
    const [fade, setFade] = useState(true);
    const [people_selected, set_people_selected] = useState([]);
    const [group, setGroup] = useState(null);
    const [, setAllPeople] = useState(null);
    const [search, setSearch] = useState("");
    const [text, setText] = useState("");
    const [matchedGroups, setMatchedGroups] = useState([]);
    const [peopleConfirmed, setPeopleConfirmed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [statusConfirmed, setStatusConfirmed] = useState(false);
    const [emailConfirmed, setEmailConfirmed] = useState(false);
    const [allergiesConfirmed, setAllergiesConfirmed] = useState(false);

    useEffect(() => {
        let isSubscribed = true;
        let isSubscribedGuest = true;
        setLoading(true);

        const getGroups = async () => {
            try {
                const groupData = await groupService.getGroups();
                if (isSubscribed) {
                    setGroups(groupData);
                }
            } catch (e) {
                console.log("RSVP Component: Error retrieving groups", e);
                toast.error("Failure to Retrieve Groups.", toastConfig)
            }
        }

        const getGuests = async () => {
            try {
                const guestData = await guestService.getGuests();
                if (isSubscribedGuest) {
                    setAllPeople(guestData);
                    const newGroups = await createGroupToGuestArray();
                    setGroups(newGroups);
                }
            } catch (e) {
                console.log("Group Component: Error retrieving guests", e);
                toast.error("Failure to Retrieve Guests.", toastConfig)
            } finally {
                if (isSubscribedGuest) {
                    setLoading(false);
                }
            }
        }

        // Set text fading animation
        setTimeout(() => {
            setFade(false);
        }, 0);

        getGroups();
        getGuests();
        
        return () => {
            isSubscribed = false;
            isSubscribedGuest = false;
            setLoading(false);
        }
        // eslint-disable-next-line
    }, [groupService, guestService])

    const createGroupToGuestArray = async () => {
        const guestData = await guestService.getGuests();
        const newGroups = await groupService.getGroups();
        for (let i = 0; i < newGroups.length; ++i) {
            const newGuests = [];
            for (let j = 0; j < newGroups[i].Guest_ids.length; ++j) {
                const currId = newGroups[i].Guest_ids[j];
                const guest = guestData.find(g => g.id === currId);
                newGuests.push({...guest});
            }
            newGroups[i].guests = newGuests;
        }
        return newGroups;
    }

    const copyTextToClipBoard = (text) => {
        navigator.clipboard.writeText(text).then(function() {
            setText(text);
        }).catch(function(err) {
            console.error('Could not copy text: ', err);
        });
    }

    const setAttending = async (person, val) => {
        if (person.attending_ceremony === val) {
            return;
        }
        setLoading(true);
        let newPeople = [...people_selected];
        for (let i = 0; i < newPeople.length; ++i ) {
            if (newPeople[i].first === person.first && newPeople[i].last === person.last) {
                newPeople[i].attending_ceremony = val;
                // If they aren't going to the ceremony they don't get to go to rehearsal or brunch
                if (val === 0) {
                    newPeople[i].attending_brunch = false;
                    newPeople[i].attending_rehearsal = false;
                    newPeople[i].attending_happy_hour = false;
                }
                const guestData = {
                    "id": newPeople[i].id,
                    "first": newPeople[i].first,
                    "last": newPeople[i].last,
                    "attending_ceremony": newPeople[i].attending_ceremony,
                    "attending_rehearsal": newPeople[i].attending_rehearsal,
                    "attending_brunch": newPeople[i].attending_brunch,
                    "attending_happy_hour": newPeople[i].attending_happy_hour,
                };
                const updatedGuest = await guestService.updateGuest(guestData);
                if (updatedGuest !== null) {
                    toast.success(`Updated ${newPeople[i].first} ${newPeople[i].last} to ${val === 1 ? "" : val === 0 ? "Not" : "Undecided Regarding"} Attending the Ceremony.`, toastConfig);
                } else {
                    toast.error(`Failure to Update ${newPeople[i].first} ${newPeople[i].last}.`, toastConfig);
                }
                break;
            }
        }
        set_people_selected(newPeople);
        setLoading(false);
    }

    const setAttendingBrunch = async (person, val) => {
        setLoading(true);
        let newPeople = [...people_selected];
        for (let i = 0; i < newPeople.length; ++i ) {
            if (newPeople[i].first === person.first && newPeople[i].last === person.last) {
                newPeople[i].attending_brunch = val;

                // They'd better be coming to the ceremony if they are going to brunch/rehearsal
                if (val === true) {
                    newPeople[i].attending_ceremony = 1;
                }
                const guestData = {
                    "id": newPeople[i].id,
                    "first": newPeople[i].first,
                    "last": newPeople[i].last,
                    "attending_ceremony": newPeople[i].attending_ceremony,
                    "attending_rehearsal": newPeople[i].attending_rehearsal,
                    "attending_brunch": newPeople[i].attending_brunch,
                    "attending_happy_hour": newPeople[i].attending_happy_hour,
                };
                const updatedGuest = await guestService.updateGuest(guestData);
                if (updatedGuest !== null) {
                    toast.success(`Updated ${newPeople[i].first} ${newPeople[i].last} to ${val === true ? "" : val === false ? "Not" : "Undecided Regarding"} Attending the Brunch.`, toastConfig);
                } else {
                    toast.error(`Failure to Update ${newPeople[i].first} ${newPeople[i].last}.`, toastConfig);
                }
                break;
            }
        }
        set_people_selected(newPeople);
        setLoading(false);
    }

    const setAttendingRehearsal = async (person, val) => {
        setLoading(true);
        let newPeople = [...people_selected];
        for (let i = 0; i < newPeople.length; ++i ) {
            if (newPeople[i].first === person.first && newPeople[i].last === person.last) {
                newPeople[i].attending_rehearsal = val;
                // They'd better be coming to the ceremony if they are going to brunch/rehearsal
                if (val === true) {
                    newPeople[i].attending_ceremony = 1;
                }
                const guestData = {
                    "id": newPeople[i].id,
                    "first": newPeople[i].first,
                    "last": newPeople[i].last,
                    "attending_ceremony": newPeople[i].attending_ceremony,
                    "attending_rehearsal": newPeople[i].attending_rehearsal,
                    "attending_brunch": newPeople[i].attending_brunch,
                    "attending_happy_hour": newPeople[i].attending_happy_hour,
                };
                const updatedGuest = await guestService.updateGuest(guestData);
                if (updatedGuest !== null) {
                    toast.success(`Updated ${newPeople[i].first} ${newPeople[i].last} to ${val === true ? "" : val === false ? "Not" : "Undecided Regarding"} Attending the Rehearsal.`, toastConfig);
                } else {
                    toast.error(`Failure to Update ${newPeople[i].first} ${newPeople[i].last}.`, toastConfig);
                }
                break;
            }
        }
        set_people_selected(newPeople);
        setLoading(false);
    }

    const removeSelected = (person) => {
        let newPeople = [];
        for (let i = 0; i < people_selected.length; ++i) {
            if (people_selected[i].first === person.first && people_selected[i].last === person.last) {
                continue;
            }
            newPeople.push({...people_selected[i]});
        }
        set_people_selected(newPeople);
    }
    
    const saveEmail = async (email) => {
        setLoading(true);
        let groupData = {
            "id": group.id,
            "title": group.title,
            "invited_rehearsal": group.invitedRehearsal,
            "address": group.address,
            "city": group.city,
            "state": group.state,
            "zip": group.zip,
            "email": email,
            "phone": group.phone,
            "invited_happy_hour": group.invitedHappyHour,
            "Guest_ids": group.guestIds
        };
        let newGroup = await groupService.updateGroup(groupData);
        newGroup = {...newGroup.data.updateGroup};
        // Update the state variables to reflect the new service's values from backend
        if (newGroup !== null) {
            // setGroups(groupService.getGroups);
            newGroup.guests = group.guests;
            setGroup(newGroup);
            let newGroups = [...groups];
            for (let i = 0; i < newGroups.length; ++i) {
                if (newGroups[i].id === newGroup.id) {
                    newGroups[i] = {...newGroup};
                    newGroups[i].email = email;
                    break;
                }
            }
            setGroups(newGroups);
            setEmailConfirmed(true);
            toast.success("Email Updated Successfully", toastConfig);
        } else {
            toast.error("Failure to Update Email", toastConfig);
        }
        setLoading(false);
    }

    /**
     * Callback from AllergyForm component save
     * 
     * @param {*} guestArray Array of json guest objects with possibly-updated 'notes' keys
     */
    const saveAllergies = async (guestArray) => {
        setLoading(true);
        let updatedGuests = [];
        for (let i = 0; i < guestArray.length; ++i) {
            // Give an empty string if notes doesn't exist
            if (!('notes' in guestArray[i])) {
                guestArray[i].notes = '';
            }
            let updatedGuest = {
                "id": guestArray[i].id,
                "first": guestArray[i].first,
                "last": guestArray[i].last,
                "attending_ceremony": guestArray[i].attending_ceremony,
                "attending_happy_hour": guestArray[i].attending_happy_hour,
                "attending_brunch": guestArray[i].attending_brunch,
                "attending_rehearsal": guestArray[i].attending_rehearsal,
                "notes": guestArray[i].notes,
            }
            const savedGuest = await guestService.updateGuest(updatedGuest);
            updatedGuests.push({...savedGuest.data.updateGuest});
        }
        set_people_selected([...updatedGuests]);
        let updatedGroup = {...group};
        updatedGroup.guests = updatedGuests;
        setGroup(updatedGroup);
        toast.success("Successfully Updated Allergies");
        setAllergiesConfirmed(true);
        setLoading(false);
    };

    const AddToCalendar = () => {
        const eventTitle = 'Katrina & Ian Wedding';
        const eventLocation = '590 Coast S Blvd, La Jolla, CA 92037';
        const eventDescription = 'A day of love';
        const eventStartTime = '20250822T170000';
        const eventEndTime = '20250822T230000';
    
        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${eventStartTime}/${eventEndTime}&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}`;
    
        window.open(googleCalendarUrl, '_blank');
    };

    const AddToAppleCalendar = () => {
        const eventTitle = 'Katrina & Ian Wedding';
        const eventLocation = '590 Coast S Blvd, La Jolla, CA 92037';
        const eventDescription = 'A day of Love';
        const eventStartTime = '20250822T170000';
        const eventEndTime = '20250822T230000';
      
        // Ensure the .ics data is correctly formatted with \r\n
        const icsData = [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'BEGIN:VEVENT',
          `SUMMARY:${eventTitle}`,
          `DESCRIPTION:${eventDescription}`,
          `LOCATION:${eventLocation}`,
          `DTSTART:${eventStartTime}`,
          `DTEND:${eventEndTime}`,
          'END:VEVENT',
          'END:VCALENDAR'
        ].join('\r\n');
      
        const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
      
        const link = document.createElement('a');
        link.href = url;
        link.download = 'katrian-wedding-event.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      let events = [
        {
            dateTimeString: "Thursday, August 21st, 2025",
            description: "We’re excited to kick things off with a relaxed evening together before the wedding! Please join us if you're in town early. No pressure if you can't make it—unless you're in the bridal party, attendance isn’t required.",
            title: group && group.invited_rehearsal === true ? "Rehearsal Dinner + Welcome Drinks" : "Welcome Drinks",
            items: [
                group && group.invited_rehearsal === true && 
                {
                    startString: "5:00pm",
                    endString: "7:00pm",
                    name: "Dinner",
                    location: "The Cottage",
                    address: "7776 Eads Ave, La Jolla, CA 92037",
                    link: "https://maps.app.goo.gl/E29Ryk1exf6abfyz9",
                },
                {
                    startString: "7:30pm",
                    endString: "9:00pm",
                    name: "Welcome Drinks",
                    location: "The Spot",
                    address: "1005 Prospect St, La Jolla, CA 92037",
                    link: "https://maps.app.goo.gl/YZWZrzdVAZdyqyc99",
                }

            ]
        },
        {
            dateTimeString: "Friday, August 22nd, 2025",
            description: "",
            title: "Wedding Day",
            items: [
                {
                    startString: "5:00pm",
                    endString: "",
                    name: "Ceremony",
                    location: "The Wedding Bowl",
                    address: "590 Coast S Blvd, La Jolla, CA 92037",
                    link: "https://maps.app.goo.gl/d9jJB9crHKFxiqWq8"
                },
                {
                    startString: "Followed by",
                    endString: "",
                    name: "Reception",
                    location: "The Cuvier Club",
                    address: "7776 Eads Ave, La Jolla, CA 92037",
                    link: "https://maps.app.goo.gl/tGzFWXLR1QyyvwhV8"
                }
            ]
        },
        {
            dateTimeString: "Saturday, August 23rd, 2025",
            description: "If you will still be around on Saturday, please join us for a hosted brunch featuring bottomless mimosas, eggs, bacon, and more. Please consider this an optional event—we understand if you have other plans.",
            title: "Post-Wedding Brunch",
            items: [
                {
                    startString: "10:00am",
                    endString: "12:30pm",
                    name: "Brunch",
                    location: "Cove House",
                    address: "8030 Girard Ave, La Jolla, CA 92037",
                    link: "https://maps.app.goo.gl/xAfXt2enRnewwZ6i7"
                }
            ]
        }
    ]

    let peopleSelectedRsvped = true;
    for (let i = 0; people_selected && people_selected.length && i < people_selected.length; ++i) {
        if (people_selected[i].attending_ceremony === -1) {
            peopleSelectedRsvped = false;
            break;
        }
    }

    return (
        
        <div className="weddingBody">
            <ToastContainer></ToastContainer>
            <h1 className={`logisticsText ${fade ? "" : "fading"}`}>
                RSVP {group !== null && statusConfirmed === false &&
                    <Tooltip title="Return to Group Search">
                        <IconButton variant="outlined"
                            onClick = {() => {
                                setPeopleConfirmed(false);
                                setSearch("");
                                set_people_selected([]);
                                setMatchedGroups([]);
                                setGroup(null);
                                setSelecting(false);
                                setEmailConfirmed(false);
                                setStatusConfirmed(false);
                            }}
                            color="primary">
                            <Undo color="primary"></Undo>
                        </IconButton>
                    </Tooltip>
                }
            </h1>
            {group === null ?
            <div className={`flexed col logisticsText ${fade ? "" : "fading"}`}>
                <div className="flexed logisticsItem centered">
                    {/* <div>
                        We can't wait to celebrate -- please find your group and RSVP for any events by <span style={{fontWeight: 600}}>July 25, 2025</span> so we can prepare accordingly!
                    </div> */}
                    <div>
                        We still can't wait to celebrate with you! It's a bit late to change things given we've made all our final meetings with coordinators, purchased tickets, and communicated headcounts - <span style={{fontWeight: 600}}>please get in contact with the bride or groom to communicate your last-minute-changes.</span>
                    </div>
                </div>
                <div className="flexed logisticsItem centered RSVPSearchInput">
                    Search for your party by names to RSVP.
                </div>
                <div className="searchFieldContainer">
                    <Tooltip title={`${loading ? "loading groups, please wait" : ""}`}>
                    <TextField id="wedding-group-search"
                        className="weddingGroupSearchField"
                        placeholder="Doe"
                        value = {search}
                        disabled = {loading}
                        label = "Last Name"
                        style = {{flex: "1 1 auto"}}
                        onChange = {(e) => {
                            setSearch(e.target.value)
                            if (e.target.value.length === 0) {
                                setMatchedGroups([]);
                            } else {
                                let newMatchedGroups = [];
                                groups.forEach(group => {
                                    let groupContainsSearch = false;
                                    for (let i = 0; i < group.guests.length; ++i) {
                                        if (!group.guests[i].first || !group.guests[i].last) {
                                            continue;
                                        }
                                        if (group.guests[i].first.toLowerCase().includes(e.target.value.toLowerCase()) ||
                                            group.guests[i].last.toLowerCase().includes(e.target.value.toLowerCase()) ||
                                            (group.guests[i].first.toLowerCase() + " " + group.guests[i].last.toLowerCase()).includes(e.target.value.toLowerCase())) {
                                                groupContainsSearch = true;
                                                break;
                                            }
                                    
                                    }
                                    if (groupContainsSearch) {
                                        newMatchedGroups.push({...group});
                                    }
                                })
                                setMatchedGroups(newMatchedGroups)
                                // setMatchedGroups(allPeople.filter(person => person.first.toLowerCase().includes(search.toLowerCase()) || person.last.toLowerCase().includes(search.toLowerCase())));
                            }
                        }}>
                    </TextField>
                    </Tooltip>
                    {loading ?
                    <ClipLoader className="iconLoader searchFieldIcon"></ClipLoader>
                    :
                    <Search color="primary"
                        className="searchFieldIcon">
                    </Search>
                    }
                    
                </div>
                <div className="flexed col">
                    {matchedGroups.map(group =>
                    <Tooltip title="Select this Group">
                    <div className="matchedGroup padded"
                        onClick={() => {
                            setGroup(group)
                            // If there is only one guest we can skip the selection step
                            if (group.guests.length < 2) {
                                set_people_selected([...group.guests]);
                                setPeopleConfirmed(true);
                            }
                        }}>
                        {group.guests.map(person => 
                            <div>
                                <div>
                                    {person.first} {person.last}
                                </div>
                            </div>
                        )}
                        <Button color="primary"
                            variant="outlined">
                            Select this Group
                        </Button>
                    </div>
                    </Tooltip>
                    )}
                    {matchedGroups.length === 0 && search.length > 0 ?
                    <>No Groups Found</>
                    :<></>}
                </div>
            </div>
            :

            <div className={`flexed col RSVPBody logisticsText ${fade ? "" : "fading"}`}>
                {!peopleConfirmed ? 
                <div className="flexed col">
                    { people_selected.length < group.guests.length && selecting === false &&
                        <>
                        <div className="flexed col">
                            <div className="flexed logisticsItem centered">
                                Are you RSVPing on behalf of your entire group? Or are you booking for just a few members?
                            </div>
                            <div className="groupChoiceButtons">
                                <Button variant="contained"
                                    color="primary"
                                    onClick = {() => {
                                        setSelecting(true);
                                    }}>
                                    <PersonAdd></PersonAdd> Select Member(s)
                                </Button>
                                <Button variant="contained"
                                    color="primary"
                                    onClick = {() => {
                                        set_people_selected([...group.guests]);
                                        setPeopleConfirmed(true);
                                    }}>
                                    <GroupAdd></GroupAdd> RSVP for Group
                                </Button>
                            </div>
                        </div>
                        </>
                    }

                    {selecting === true &&
                    <>
                    {people_selected.length < group.guests.length &&
                        <>
                            <div className="flexed logisticsItem centered">
                                Add the people in your group whom you are RSVPing on behalf of.
                            </div>
                            <div className="peopleSelection">
                                {group.guests.map(person =>
                                    !people_selected.find(p => p.first === person.first && p.last === person.last) &&
                                    <Tooltip title = {`RSVP on behalf of ${person.first}`}>
                                        <Button variant="outlined"
                                            onClick = {() => {set_people_selected([...people_selected, {...person}])}}>
                                            <PersonAdd></PersonAdd> {person.first} {person.last}
                                        </Button>
                                    </Tooltip>
                                )}
                            </div>
                        </>
                        }
                        { people_selected.length > 0 &&
                            <div className="flexed logisticsItem centered">
                                I am RSVPing for:
                            </div>
                        }
                        <div className="peopleSelected">
                            {people_selected.map(person =>
                            <Tooltip title = {`Let ${person.first} RSVP themself later`}>
                                <Button variant="outlined"
                                    onClick = {() => {removeSelected(person)}}
                                    color="secondary">
                                    {person.first} {person.last} <CancelOutlined></CancelOutlined>
                                </Button>
                            </Tooltip>
                            )}
                        </div>
                        <Tooltip title = {`${people_selected.length === 0 ? "Select at least 1 person to RSVP on behalf of" : ""}`}>
                            <Button color="primary"
                                onClick = {() => {
                                    setPeopleConfirmed(true);
                                }}
                                disabled = {people_selected.length === 0}
                                variant="outlined">
                                <Check></Check> Confirm
                            </Button>
                        </Tooltip>
                    </>
                    }

                    {/* <div className="rsvpButtonPanel">
                        <Button color="secondary"
                            onClick = {() => {
                                set_people_selected([]);
                                setGroup(null);
                                setSearch("");
                                setMatchedGroups([]);
                            }}
                            variant="outlined">
                            <Undo></Undo> Return to Group Search
                        </Button>
                    </div> */}
                </div>
                : statusConfirmed == false ?
                <>
                <div className={`flexed logisticsItem centered`}>
                    {/* <div>
                    We can't wait to celebrate - please RSVP for the following events by <span style={{fontWeight: 600}}>July 25, 2025</span> so we can prepare accordingly!
                    </div> */}
                    <div>
                        We still can't wait to celebrate with you! It's a bit late to change things given we've made all our final meetings with coordinators, purchased tickets, and communicated headcounts - <span style={{fontWeight: 600}}>please get in contact with the bride or groom to communicate your last-minute-changes.</span>
                    </div>
                </div>

                {events.map(event =>
                    <RSVPEvent dateTimeString = {event.dateTimeString}
                        description = {event.description}
                        title = {event.title}
                        items = {event.items}>
                    </RSVPEvent>
                )}

                <TableContainer component = {Paper}>
                    <Table aria-label = "RSVP Guest Responses">
                        <TableHead className="rsvpTableHead">
                            <TableRow>
                                <TableCell
                                    //  style={{width: '100%'}}
                                >Guest</TableCell>
                                <TableCell align="right">Wedding</TableCell>
                                <TableCell align="right">{group.invited_rehearsal ? "Rehearsal Dinner + " : ""} Welcome Drinks</TableCell>
                                <TableCell align="right">Brunch</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="rsvpTableBody">

                    {people_selected.length === group.guests.length ?
                    <TableRow>
                        <TableCell>
                            <div>
                            All Group Members:
                            </div>
                            <div>
                                {people_selected.map((person, index) => `${person.first}${index < people_selected.length - 1 ? ", " : ""}`)}
                            </div>
                        </TableCell>
                        <TableCell align="right">
                            <Tooltip title = {`Your group is currently ${people_selected[0].attending_ceremony === 0 ? "not planning on" : people_selected[0].attending_ceremony === -1 ? "undecided regarding" : "planning on"} attending the ceremony`}>
                                <ButtonGroup variant="outlined"
                                    orientation={isSmallScreen ? 'vertical' : 'horizontal'}
                                    aria-label="Guests Wedding Selection">
                                    <Button variant={`${people_selected[0].attending_ceremony === 1 ? "contained" : "outlined"}`}
                                        onClick = {() => {
                                            for (let i = 0; i < people_selected.length; ++i) {
                                                setAttending(people_selected[i], 1);
                                            }
                                        }}
                                        className = "rsvpFormButton"
                                        size="small"
                                        // disabled = {loading}
                                        disabled = {true}
                                        color="primary">
                                        {loading ? <ClipLoader className = "iconLoader"></ClipLoader> : <Check></Check>} <span className="rsvpFormButtonText">Accept</span>
                                    </Button>
                                    <Button variant={`${people_selected[0].attending_ceremony === 0 ? "contained" : "outlined"}`}
                                        onClick = {() => {
                                            for (let i = 0; i < people_selected.length; ++i) {
                                                setAttending(people_selected[i], 0);
                                            }
                                        }}
                                        // disabled = {loading}
                                        disabled = {true}
                                        className = "rsvpFormButton"
                                        size="small"
                                        color="secondary">
                                        {loading ? <ClipLoader className="iconLoader"></ClipLoader> : <CancelOutlined></CancelOutlined>} <span className="rsvpFormButtonText">Decline</span>
                                    </Button>
                                    {people_selected[0].attending_ceremony === -1 &&
                                        <Button variant={`${people_selected[0].attending_ceremony === -1 ? "contained" : "outlined"}`}
                                            onClick = {() => {
                                                for (let i = 0; i < people_selected.length; ++i) {
                                                    setAttending(people_selected[i], -1);
                                                }
                                            }}
                                            // disabled = {loading}
                                            disabled = {true}
                                            className = "rsvpFormButton"
                                            size="small"
                                            color="disabled">
                                            {loading ? <ClipLoader className="iconLoader"></ClipLoader> : <PsychologyAlt></PsychologyAlt>} <span className="rsvpFormButtonText">Undecided</span>
                                        </Button>
                                    }
                                </ButtonGroup>
                            </Tooltip>
                        </TableCell>
                        <TableCell align="right">
                            <Tooltip title = {`Your group is currently ${people_selected[0].attending_rehearsal === 0 ? "not planning on" : people_selected[0].attending_rehearsal === -1 ? "undecided regarding" : "planning on"} attending the rehearsal`}>
                                <ButtonGroup variant="outlined"
                                    orientation={isSmallScreen ? 'vertical' : 'horizontal'}
                                    aria-label="Guests Rehearsal Selection">
                                    <Button variant={`${people_selected[0].attending_rehearsal == 1 ? "contained" : "outlined"}`}
                                        onClick = {() => {
                                            for (let i = 0; i < people_selected.length; ++i) {
                                                setAttendingRehearsal(people_selected[i], true);
                                            }
                                        }}
                                        // disabled = {loading}
                                        disabled = {true}
                                        className = "rsvpFormButton"
                                        size="small"
                                        color="primary">
                                        {loading ? <ClipLoader className="iconLoader"></ClipLoader> : <Check></Check>} <span className="rsvpFormButtonText">Accept</span>
                                    </Button>
                                    <Button variant={`${people_selected[0].attending_rehearsal == 0 ? "contained" : "outlined"}`}
                                        onClick = {() => {
                                            for (let i = 0; i < people_selected.length; ++i) {
                                                setAttendingRehearsal(people_selected[i], false);
                                            }
                                        }}
                                        disabled = {true}
                                        className = "rsvpFormButton"
                                        size="small"
                                        color="secondary">
                                        {loading ? <ClipLoader className="iconLoader"></ClipLoader> : <CancelOutlined></CancelOutlined>} <span className="rsvpFormButtonText">Decline</span>
                                    </Button>
                                </ButtonGroup>
                            </Tooltip>
                        </TableCell>
                        <TableCell align="right">
                            <Tooltip title = {`Your group is currently ${people_selected[0].attending_brunch === 0 ? "not planning on" : people_selected[0].attending_brunch === -1 ? "undecided regarding" : "planning on"} attending brunch`}>
                                <ButtonGroup variant="outlined"
                                    orientation={isSmallScreen ? 'vertical' : 'horizontal'}
                                    aria-label="Guests Brunch Selection">
                                    <Button variant={`${people_selected[0].attending_brunch == 1 ? "contained" : "outlined"}`}
                                        onClick = {() => {
                                            for (let i = 0; i < people_selected.length; ++i) {
                                                setAttendingBrunch(people_selected[i], true);
                                            }
                                        }}
                                        // disabled = {loading}
                                        disabled = {true}
                                        className = "rsvpFormButton"
                                        size="small"
                                        color="primary">
                                        {loading ? <ClipLoader className = "iconLoader"></ClipLoader> : <Check></Check>} <span className="rsvpFormButtonText">Accept</span>
                                    </Button>
                                    <Button variant={`${people_selected[0].attending_brunch  == 0? "contained" : "outlined"}`}
                                        onClick = {() => {
                                            for (let i = 0; i < people_selected.length; ++i) {
                                                setAttendingBrunch(people_selected[i], false);
                                            }
                                        }}
                                        // disabled = {loading}
                                        disabled = {true}
                                        className = "rsvpFormButton"
                                        size="small"
                                        color="secondary">
                                        {loading ? <ClipLoader className = "iconLoader"></ClipLoader> : <CancelOutlined></CancelOutlined>} <span className="rsvpFormButtonText">Decline</span>
                                    </Button>
                                </ButtonGroup>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                    :
                    people_selected.map(person =>
                        <TableRow key={`${person.first}-${person.last}`}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{person.first} {person.last}</TableCell>
                                <TableCell align="right">
                                    <Tooltip title = {`${person.first} is currently ${person.attending_ceremony === 0 ? "not planning on" : person.attending_ceremony === -1 ? "undecided regarding" : "planning on"} attending the ceremony`}>
                                        <ButtonGroup variant="outlined"
                                            orientation={isSmallScreen ? 'vertical' : 'horizontal'}
                                            aria-label="Guests Wedding Selection">
                                            <Button variant={`${person.attending_ceremony === 1 ? "contained" : "outlined"}`}
                                                onClick = {() => {setAttending(person, 1)}}
                                                className = "rsvpFormButton"
                                                size="small"
                                                // disabled = {loading}
                                                disabled = {true}
                                                color="primary">
                                                {loading ? <ClipLoader className = "iconLoader"></ClipLoader> : <Check></Check>} <span className="rsvpFormButtonText">Accept</span>
                                            </Button>
                                            <Button variant={`${person.attending_ceremony === 0 ? "contained" : "outlined"}`}
                                                onClick = {() => {setAttending(person, 0)}}
                                                // disabled = {loading}
                                                disabled = {true}
                                                className = "rsvpFormButton"
                                                size="small"
                                                color="secondary">
                                                {loading ? <ClipLoader className="iconLoader"></ClipLoader> : <CancelOutlined></CancelOutlined>} <span className="rsvpFormButtonText">Decline</span>
                                            </Button>
                                            {person.attending_ceremony === -1 &&
                                                <Button variant={`${person.attending_ceremony === -1 ? "contained" : "outlined"}`}
                                                    onClick = {() => {setAttending(person, -1)}}
                                                    // disabled = {loading}
                                                    disabled = {true}
                                                    className = "rsvpFormButton"
                                                    size="small"
                                                    color="disabled">
                                                    {loading ? <ClipLoader className="iconLoader"></ClipLoader> : <PsychologyAlt></PsychologyAlt>} <span className="rsvpFormButtonText">Undecided</span>
                                                </Button>
                                            }
                                        </ButtonGroup>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="right">
                                    <Tooltip title = {`${person.first} is currently ${person.attending_rehearsal === 0 ? "not planning on" : person.attending_rehearsal === -1 ? "undecided regarding" : "planning on"} attending the rehearsal`}>
                                        <ButtonGroup variant="outlined"
                                            orientation={isSmallScreen ? 'vertical' : 'horizontal'}
                                            aria-label="Guests Rehearsal Selection">
                                            <Button variant={`${person.attending_rehearsal == 1 ? "contained" : "outlined"}`}
                                                onClick = {() => {setAttendingRehearsal(person, 1)}}
                                                // disabled = {loading}
                                                disabled = {true}
                                                className = "rsvpFormButton"
                                                size="small"
                                                color="primary">
                                                {loading ? <ClipLoader className="iconLoader"></ClipLoader> : <Check></Check>} <span className="rsvpFormButtonText">Accept</span>
                                            </Button>
                                            <Button variant={`${person.attending_rehearsal == 0 ? "contained" : "outlined"}`}
                                                onClick = {() => {setAttendingRehearsal(person, 0)}}
                                                className = "rsvpFormButton"
                                                size="small"
                                                color="secondary">
                                                {loading ? <ClipLoader className="iconLoader"></ClipLoader> : <CancelOutlined></CancelOutlined>} <span className="rsvpFormButtonText">Decline</span>
                                            </Button>
                                            {person.attending_rehearsal == -1 &&
                                                <Button variant={`${person.attending_rehearsal == -1 ? "contained" : "outlined"}`}
                                                    onClick = {() => {setAttendingRehearsal(person, -1)}}
                                                    // disabled = {loading}
                                                    disabled = {true}
                                                    className = "rsvpFormButton"
                                                    size="small"
                                                    color="disabled">
                                                    {loading ? <ClipLoader className="iconLoader"></ClipLoader> : <PsychologyAlt></PsychologyAlt>} <span className="rsvpFormButtonText">Undecided</span>
                                                </Button>
                                            }
                                        </ButtonGroup>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="right">
                                    <Tooltip title = {`${person.first} is currently ${person.attending_brunch === 0 ? "not planning on" : person.attending_brunch === -1 ? "undecided regarding" : "planning on"} attending brunch`}>
                                        <ButtonGroup variant="outlined"
                                            orientation={isSmallScreen ? 'vertical' : 'horizontal'}
                                            aria-label="Guests Brunch Selection">
                                            <Button variant={`${person.attending_brunch == 1 ? "contained" : "outlined"}`}
                                                onClick = {() => {setAttendingBrunch(person, 1)}}
                                                // disabled = {loading}
                                                disabled = {true}
                                                className = "rsvpFormButton"
                                                size="small"
                                                color="primary">
                                                {loading ? <ClipLoader className = "iconLoader"></ClipLoader> : <Check></Check>} <span className="rsvpFormButtonText">Accept</span>
                                            </Button>
                                            <Button variant={`${person.attending_brunch  == 0? "contained" : "outlined"}`}
                                                onClick = {() => {setAttendingBrunch(person, 0)}}
                                                // disabled = {loading}
                                                disabled = {true}
                                                className = "rsvpFormButton"
                                                size="small"
                                                color="secondary">
                                                {loading ? <ClipLoader className = "iconLoader"></ClipLoader> : <CancelOutlined></CancelOutlined>} <span className="rsvpFormButtonText">Decline</span>
                                            </Button>
                                            {person.attending_brunch == -1 &&
                                                <Button variant={`${person.attending_brunch === -1 ? "contained" : "outlined"}`}
                                                    onClick = {() => {setAttendingBrunch(person, -1)}}
                                                    // disabled = {loading}
                                                    disabled = {true}
                                                    className = "rsvpFormButton"
                                                    size="small"
                                                    color="disabled">
                                                    {loading ? <ClipLoader className="iconLoader"></ClipLoader> : <PsychologyAlt></PsychologyAlt>} <span className="rsvpFormButtonText">Undecided</span>
                                                </Button>
                                            }
                                        </ButtonGroup>
                                    </Tooltip>
                                </TableCell>
                        </TableRow>

                    )
                    }
                    </TableBody>
                    </Table>
                </TableContainer>

                    <Tooltip
                        title = {!peopleSelectedRsvped ? "Please select whether each guest is attending the ceremony on the table above" :
                            ""}
                        >
                    <Button variant="contained"
                        onClick = {() => {
                            setStatusConfirmed(true);
                            let no_attendees = true;
                            for (let i = 0; i < people_selected.length; ++i) {
                                if (people_selected[i].attending_ceremony === 1) {
                                    no_attendees = false;
                                    break;
                                }
                            }
                            if (no_attendees) {
                                setEmailConfirmed(true);
                            }
                            else {
                                setEmailConfirmed(false);
                            }
                        }}
                        disabled = {loading || !peopleSelectedRsvped}
                        color="primary">
                        {loading ? <ClipLoader className = "iconLoader"></ClipLoader> : <Check></Check>} Continue
                    </Button>
                    </Tooltip>
                </>
                : emailConfirmed === false ?
                <GroupEmailForm email={group.email}
                    confirmFunction = {() => {setEmailConfirmed(true);}}
                    saveFunction = {saveEmail}>
                </GroupEmailForm>
                : allergiesConfirmed === false ?
                <AllergyForm guests = {people_selected}
                    loading = {loading}
                    saveFunction = {saveAllergies}>
                </AllergyForm>
                :
                <div className="flexed col">
                    <div className="flexed logisticsItem centered">
                        Thank you for RSVPing, we sincerely look forward to seeing you if you are able to make it. We appreciate that you took the time to let us know so that we're able to best welcome our loved ones.
                    </div>
                    <div className="logisticsItem">
                        <CalendarMonth color="primary"></CalendarMonth>Please click the icons to add this event to your calendars.
                        <Tooltip title={"Add event to your Google Calendar"}>
                            <IconButton color="primary"
                                onClick={AddToCalendar}>
                                <Google></Google>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={"Add event to your Apple Calendar"}>
                            <IconButton color="primary"
                                onClick={AddToAppleCalendar}>
                                <Apple></Apple>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className="logisticsItem">
                        <span>
                            Please take a look at the <a className='secondary' href="/Hotels-and-Transport">Hotels and Transport Page</a> for some great hotels that are a walking distance from everything that we plan before they book out!
                        </span>
                    </div>
                    <div className="logisticsItem">
                        <span>
                            Our <a className='secondary' href="/FAQ">FAQ</a> page has some great activities to do in San Diego, and feel free to ask any questions that come to mind.
                        </span>
                    </div>
                </div>
            }
        </div>
        }
        
    </div>
    );
}