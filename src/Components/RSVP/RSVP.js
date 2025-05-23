import { useCallback, useEffect, useState } from "react";

import './RSVP.css';
import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import { Apple, CalendarMonth, CancelOutlined, Check, CheckOutlined, Google, GroupAdd, InfoOutlined,
    LocationOn, PersonAdd, PsychologyAlt, Search, Undo } from "@mui/icons-material";
import { useGroupService } from "../../Services/GroupService/GroupServiceContext";
import { useGuestService } from "../../Services/GuestService/GuestServiceContext";
import { toast, ToastContainer} from 'react-toastify';
import { ClipLoader } from "react-spinners";
import GroupEmailForm from "./GroupEmailForm";
import AllergyForm from "./AllergyForm";

const toastConfig = {
    autoClose: 2000
};

export default function RSVP (props) {
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
                }
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
                    newPeople[i].attending_ceremony = true;
                }
                const guestData = {
                    "id": newPeople[i].id,
                    "first": newPeople[i].first,
                    "last": newPeople[i].last,
                    "attending_ceremony": newPeople[i].attending_ceremony,
                    "attending_rehearsal": newPeople[i].attending_rehearsal,
                    "attending_brunch": newPeople[i].attending_brunch,
                    "attending_happy_hour": newPeople[i].attending_happy_hour,
                }
                await guestService.updateGuest(guestData);
                break;
            }
        }
        set_people_selected(newPeople);
        setLoading(false);
    }

    const setAttendingHappyHour = async (person, val) => {
        setLoading(true);
        let newPeople = [...people_selected];
        for (let i = 0; i < newPeople.length; ++i ) {
            if (newPeople[i].first === person.first && newPeople[i].last === person.last) {
                newPeople[i].attending_happy_hour = val;

                // They'd better be coming to the ceremony if they are going to brunch/rehearsal
                if (val === true) {
                    newPeople[i].attending_ceremony = true;
                }
                const guestData = {
                    "id": newPeople[i].id,
                    "first": newPeople[i].first,
                    "last": newPeople[i].last,
                    "attending_ceremony": newPeople[i].attending_ceremony,
                    "attending_rehearsal": newPeople[i].attending_rehearsal,
                    "attending_brunch": newPeople[i].attending_brunch,
                    "attending_happy_hour": newPeople[i].attending_happy_hour,
                }
                await guestService.updateGuest(guestData);
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
                    newPeople[i].attending_ceremony = true;
                }
                const guestData = {
                    "id": newPeople[i].id,
                    "first": newPeople[i].first,
                    "last": newPeople[i].last,
                    "attending_ceremony": newPeople[i].attending_ceremony,
                    "attending_rehearsal": newPeople[i].attending_rehearsal,
                    "attending_brunch": newPeople[i].attending_brunch,
                    "attending_happy_hour": newPeople[i].attending_happy_hour,
                }
                await guestService.updateGuest(guestData);
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
                    <div>Thank you for helping us plan by RSVPing here. Please respond by <span style={{fontWeight: 600}}>July 25, 2025</span>.</div>
                </div>
                {/* <div className="flexed logisticsItem centered">
                    Please respond by <span style={{fontWeight: 600}}>July 25, 2025</span>.
                </div> */}
                <div className="flexed logisticsItem centered">
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

            <div className={`flexed col logisticsText ${fade ? "" : "fading"}`}>
                {!peopleConfirmed ? 
                <div className="flexed col">
                    { people_selected.length < group.guests.length && selecting === false &&
                        <>
                        {/* <div className="flexed col">
                            {group.email && group.email.length > 0 ?
                            <div className="flexed logisticsItem centered">
                                The current best email we have for reaching your group is {group.email}
                            </div>
                            :
                            <div className="flexed logisticsItem centered">
                                We currently don't an email on file for reaching your group.
                            </div>
                            }
                        </div> */}
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
                                {/* {people_selected.length < group.guests.length &&
                                <Button variant="contained"
                                    onClick = {() => {set_people_selected([...group.guests])}}>
                                    <GroupAdd></GroupAdd> Add All
                                </Button>
                                } */}
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
                    Thank you for helping us plan by RSVPing here. You can always update your status later if things change.
                </div>
                {/* Rehearsal */}
                { group.invited_rehearsal === true &&
                <>
                <div className="summaryItemName">
                    Rehearsal
                </div>
                <div className="summaryItemLocation">
                    {/* We're so excited to celebrate with you before the wedding! Please join us for a rehearsal dinner as detailed below. Other than the bridal party, this is NOT mandatory, so if you are not arriving early or not able to attend, but still plan to attend the wedding, this is of course fine too. */}
                    We’re excited to kick things off with a relaxed evening together before the wedding! If you’ve received an invite to this informal seated dinner we're hosting, please join us if you're in town early. No pressure if you can't make it—unless you're in the bridal party, attendance isn’t required.
                </div>
                <div className="summaryItemLocation">
                    <CalendarMonth color="primary"></CalendarMonth>
                    <div>
                        Thursday, August 21st, 2025, 5:30pm - 8:00pm
                    </div>
                </div>
                <Tooltip title={`${text === "7776 Eads Ave, La Jolla, CA 92037" ? "Location Copied Successfully!" : "Copy Location to Clipboard"}`}>
                    <div className="summaryItemLocation textCopy"
                        onClick = {() => {copyTextToClipBoard("7776 Eads Ave, La Jolla, CA 92037")}}>
                            {
                            text === "7776 Eads Ave, La Jolla, CA 92037" ?
                            <CheckOutlined color="primary"></CheckOutlined>
                            :
                            <LocationOn color="primary"></LocationOn>
                            }
                        <div>
                            The Cottage, La Jolla
                        </div>
                    </div>
                </Tooltip>
                <div className="summaryItemLocation">
                    <InfoOutlined color="primary"></InfoOutlined>
                    <div>
                        Rehearsal-specific guests invited to this event.
                    </div>
                </div>
                <div className="RSVPForm">
                    {
                        people_selected.map(person => 
                        <div className="RSVPFormField">
                            <div className="RSVPName">
                                <Tooltip title = {`${person.first} is currently ${person.attending_rehearsal === 0 ? "not planning on" : person.attending_rehearsal === -1 ? "undecided regarding" : "planning on"} attending the rehearsal`}>
                                    {person.first}
                                </Tooltip>
                            </div>
                            <div className="RSVPAcceptReject">
                                <Button variant={`${person.attending_rehearsal == 1 ? "contained" : "outlined"}`}
                                    onClick = {() => {setAttendingRehearsal(person, 1)}}
                                    disabled = {loading}
                                    size="small"
                                    color="primary">
                                    {loading ? <ClipLoader className="iconLoader"></ClipLoader> : <Check></Check>} Accept
                                </Button>
                                <Button variant={`${person.attending_rehearsal == 0 ? "contained" : "outlined"}`}
                                    onClick = {() => {setAttendingRehearsal(person, 0)}}
                                    size="small"
                                    color="secondary">
                                    {loading ? <ClipLoader className="iconLoader"></ClipLoader> : <CancelOutlined></CancelOutlined>} Decline
                                </Button>
                                <Button variant={`${person.attending_rehearsal == -1 ? "contained" : "outlined"}`}
                                    onClick = {() => {setAttendingRehearsal(person, -1)}}
                                    disabled = {loading}
                                    size="small"
                                    color="disabled">
                                    {loading ? <ClipLoader className="iconLoader"></ClipLoader> : <PsychologyAlt></PsychologyAlt>} Undecided
                                </Button>
                            </div>
                        </div>
                    )
                    }
                </div>
                </>
                }
                {/* Ceremony */}
                <div className="summaryItemName">
                    Ceremony + Reception
                </div>
                <Tooltip title={"Add to Google Calendar"}>
                    <div className="summaryItemLocation"
                        onClick = {AddToCalendar}>
                        <CalendarMonth color="primary"></CalendarMonth>
                        <div>
                            Friday, August 22nd, 2025, 5:00pm
                        </div>
                    </div>
                </Tooltip>
                <Tooltip title={`${text === "590 Coast S Blvd, La Jolla, CA 92037" ? "Location Copied Successfully!" : "Copy Location to Clipboard"}`}>
                    <div className="summaryItemLocation textCopy"
                        onClick = {() => {copyTextToClipBoard("590 Coast S Blvd, La Jolla, CA 92037")}}>
                            {
                            text === "590 Coast S Blvd, La Jolla, CA 92037" ?
                            <CheckOutlined color="primary"></CheckOutlined>
                            :
                            <LocationOn color="primary"></LocationOn>
                            }
                        <div>
                            The Wedding Bowl, La Jolla Cove
                        </div>
                    </div>
                </Tooltip>
                <div className="RSVPForm">
                    {
                        people_selected.map((person, idx) => 
                        <div className="RSVPFormField"
                            key={`RSVP-guest-${idx}`}>
                            <div className="RSVPName">
                                <Tooltip title = {`${person.first} is currently ${person.attending_ceremony === 0 ? "not planning on" : person.attending_ceremony === -1 ? "undecided regarding" : "planning on"} attending the ceremony`}>
                                    {person.first}
                                </Tooltip>
                                {/* {person.attending == true ? "attending" : "not attending"} */}
                                {/* {person.attending} */}
                            </div>
                            <div className="RSVPAcceptReject">
                                <Button variant={`${person.attending_ceremony === 1 ? "contained" : "outlined"}`}
                                    onClick = {() => {setAttending(person, 1)}}
                                    size="small"
                                    disabled = {loading}
                                    color="primary">
                                    {loading ? <ClipLoader className = "iconLoader"></ClipLoader> : <Check></Check>} Accept
                                </Button>
                                <Button variant={`${person.attending_ceremony === 0 ? "contained" : "outlined"}`}
                                    onClick = {() => {setAttending(person, 0)}}
                                    disabled = {loading}
                                    size="small"
                                    color="secondary">
                                    {loading ? <ClipLoader className="iconLoader"></ClipLoader> : <CancelOutlined></CancelOutlined>} Decline
                                </Button>
                                <Button variant={`${person.attending_ceremony === -1 ? "contained" : "outlined"}`}
                                    onClick = {() => {setAttending(person, -1)}}
                                    disabled = {loading}
                                    size="small"
                                    color="disabled">
                                    {loading ? <ClipLoader className="iconLoader"></ClipLoader> : <PsychologyAlt></PsychologyAlt>} Undecided
                                </Button>
                            </div>
                        </div>
                    )
                    }
                </div>

                {/* Brunch */}
                <div className="summaryItemName">
                    Brunch
                </div>
                <div className="summaryItemLocation">
                    If you’ll still be around on Saturday, we’d love to see you one more time over a hosted brunch featuring bottomless mimosas, eggs, bacon, and more.
                </div>
                <div className="summaryItemLocation">
                    <CalendarMonth color="primary"></CalendarMonth>
                    <div>
                        Saturday, August 23rd, 2025, 10:30am - 12:30pm
                    </div>
                </div>
                <Tooltip title={`${text === "8030 Girard Ave, La Jolla, CA 92037" ? "Location Copied Successfully!" : "Copy Location to Clipboard"}`}>
                    <div className="summaryItemLocation textCopy"
                        onClick = {() => {copyTextToClipBoard("8030 Girard Ave, La Jolla, CA 92037")}}>
                            {
                            text === "8030 Girard Ave, La Jolla, CA 92037" ?
                            <CheckOutlined color="primary"></CheckOutlined>
                            :
                            <LocationOn color="primary"></LocationOn>
                            }
                        <div>
                            Cove House, La Jolla Cove
                        </div>
                    </div>
                </Tooltip>
                <div className="RSVPForm">
                    {
                        people_selected.map(person => 
                        <div className="RSVPFormField">
                            <div className="RSVPName">
                                <Tooltip title = {`${person.first} is currently ${person.attending_brunch === 0 ? "not planning on" : person.attending_brunch === -1 ? "undecided regarding" : "planning on"} attending brunch`}>
                                    {person.first}
                                </Tooltip>
                            </div>
                            <div className="RSVPAcceptReject">
                                <Button variant={`${person.attending_brunch == 1 ? "contained" : "outlined"}`}
                                    onClick = {() => {setAttendingBrunch(person, 1)}}
                                    disabled = {loading}
                                    size="small"
                                    color="primary">
                                    {loading ? <ClipLoader className = "iconLoader"></ClipLoader> : <Check></Check>} Accept
                                </Button>
                                <Button variant={`${person.attending_brunch  == 0? "contained" : "outlined"}`}
                                    onClick = {() => {setAttendingBrunch(person, 0)}}
                                    disabled = {loading}
                                    size="small"
                                    color="secondary">
                                    {loading ? <ClipLoader className = "iconLoader"></ClipLoader> : <CancelOutlined></CancelOutlined>} Decline
                                </Button>
                                <Button variant={`${person.attending_brunch === -1 ? "contained" : "outlined"}`}
                                    onClick = {() => {setAttendingBrunch(person, -1)}}
                                    disabled = {loading}
                                    size="small"
                                    color="disabled">
                                    {loading ? <ClipLoader className="iconLoader"></ClipLoader> : <PsychologyAlt></PsychologyAlt>} Undecided
                                </Button>
                            </div>
                        </div>
                    )
                    }
                </div>

                {/* Happy Hour */}
                {/* {group.invited_happy_hour &&
                <>
                <div className="summaryItemName">
                    Happy Hour
                </div>
                <div className="summaryItemLocation">
                    <CalendarMonth color="primary"></CalendarMonth>
                    <div>
                        Saturday, August 23rd, 2025
                    </div>
                </div>
                <Tooltip title={`${text === "7776 Eads Ave, La Jolla, CA 92037" ? "Location Copied Successfully!" : "Copy Location to Clipboard"}`}>
                    <div className="summaryItemLocation textCopy"
                        onClick = {() => {copyTextToClipBoard("TBD")}}>
                            {
                            text === "TBD" ?
                            <CheckOutlined color="primary"></CheckOutlined>
                            :
                            <LocationOn color="primary"></LocationOn>
                            }
                        <div>
                            TBD
                        </div>
                    </div>
                </Tooltip>
                <div className="RSVPForm">
                    {
                        people_selected.map(person => 
                        <div className="RSVPFormField">
                            <div>
                                {person.first}
                            </div>
                            <div className="RSVPAcceptReject">
                                <Button variant={`${person.attending_happy_hour ? "contained" : "outlined"}`}
                                    onClick = {() => {setAttendingHappyHour(person, true)}}
                                    disabled = {loading}
                                    color="primary">
                                    {loading ? <ClipLoader className = "iconLoader"></ClipLoader> : <Check></Check>} Accept
                                </Button>
                                <Button variant={`${person.attending_happy_hour ? "outlined" : "contained"}`}
                                    onClick = {() => {setAttendingHappyHour(person, false)}}
                                    disabled = {loading}
                                    color="secondary">
                                    {loading ? <ClipLoader className = "iconLoader"></ClipLoader> : <CancelOutlined></CancelOutlined>} Decline
                                </Button>
                            </div>
                        </div>
                    )
                    }
                </div>
                </>
                } */}
{/* 
                <table className='attendingTable'>
                    <tr>
                        <th className="maxCell">Name</th>
                        <th>Attending Rehearsal</th>
                        <th>Attending Ceremony</th>
                        <th>Attending Brunch</th>
                    </tr>
                    {group.guests.map(person =>
                        <tr>
                            <td className="maxCell">{person.first} {person.last}</td>
                            <td>
                                <Checkbox></Checkbox>
                            </td>
                            <td>
                                <Checkbox></Checkbox>
                            </td>
                            <td>
                                <Checkbox></Checkbox>
                            </td>
                        </tr>
                    )}

                </table> */}
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
                        disabled = {loading}
                        color="primary">
                        {loading ? <ClipLoader className = "iconLoader"></ClipLoader> : <Check></Check>} Continue
                    </Button>
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