import { useEffect, useState } from "react";

import './RSVP.css';
import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import { CalendarMonth, CancelOutlined, Check, CheckOutlined, GroupAdd, InfoOutlined,
    LocationOn, PersonAdd, Search, Undo } from "@mui/icons-material";
import { useGroupService } from "../../Services/GroupService/GroupServiceContext";
import { useGuestService } from "../../Services/GuestService/GuestServiceContext";
import { toast} from 'react-toastify';
import { ClipLoader } from "react-spinners";

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
        setLoading(true);
        let newPeople = [...people_selected];
        for (let i = 0; i < newPeople.length; ++i ) {
            if (newPeople[i].first === person.first && newPeople[i].last === person.last) {
                newPeople[i].attending_ceremony = val;
                // If they aren't going to the ceremony they don't get to go to rehearsal or brunch
                if (val === false) {
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
                await guestService.updateGuest(guestData);
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
    

    return (
        <div className="weddingBody">
            <h1 className={`logisticsText ${fade ? "" : "fading"}`}>
                Pre-RSVP {group !== null &&
                    <Tooltip title="Return to Group Search">
                        <IconButton variant="outlined"
                            onClick = {() => {
                                setPeopleConfirmed(false);
                                setSearch("");
                                set_people_selected([]);
                                setMatchedGroups([]);
                                setGroup(null);
                                setSelecting(false);
                            }}
                            color="primary">
                            <Undo color="primary"></Undo>
                        </IconButton>
                    </Tooltip>
                }
            </h1>
            <div className="flexed logisticsItem centered">
                We kindly ask you to pre-RSVP on our website. This is an early RSVP without the commitment, but will help give us a guest estimate (guestimate). You can update your status later as the date approaches.
            </div>
            {group === null ?
            <div className={`flexed col logisticsText ${fade ? "" : "fading"}`}>
                <div className="flexed logisticsItem centered">
                    Search for your party by names to RSVP
                </div>
                <div className="searchFieldContainer">
                    <TextField id="wedding-group-search"
                        className="weddingGroupSearchField"
                        placeholder="Doe"
                        value = {search}
                        disabled = {loading}
                        label = "Last Name"
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
                </div>
            </div>
            :

            <div className={`flexed col logisticsText ${fade ? "" : "fading"}`}>
                {!peopleConfirmed ? 
                <div className="flexed col">
                    { people_selected.length < group.guests.length && selecting === false &&
                        <div>
                            <div className="flexed logisticsItem centered">
                                Are you RSVPing on behalf of your entire group? Or are you booking for just a few members?
                            </div>
                            <div className="groupChoiceButtons">
                                <Button variant="contained"
                                    color="primary"
                                    onClick = {() => {
                                        set_people_selected([...group.guests]);
                                        setPeopleConfirmed(true);
                                    }}>
                                    <GroupAdd></GroupAdd> RSVP for Group
                                </Button>
                                <Button variant="contained"
                                    color="primary"
                                    onClick = {() => {
                                        setSelecting(true);
                                    }}>
                                    <PersonAdd></PersonAdd> Select Member(s)
                                </Button>
                            </div>
                        </div>
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
                            <Tooltip title = {`Let ${person.first} RSVP themself`}>
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
                :
                <>
                {/* Rehearsal */}
                { group.invited_rehearsal === true &&
                <>
                <div className="summaryItemName">
                    Rehearsal
                </div>
                <div className="summaryItemLocation">
                    <CalendarMonth color="primary"></CalendarMonth>
                    <div>
                        Thursday, August 21st, 2025
                    </div>
                </div>
                <Tooltip title={`${text === "TBD Address" ? "Location Copied Successfully!" : "Copy Location to Clipboard"}`}>
                    <div className="summaryItemLocation textCopy"
                        onClick = {() => {copyTextToClipBoard("TBD Address")}}>
                            {
                            text === "TBD Address" ?
                            <CheckOutlined color="primary"></CheckOutlined>
                            :
                            <LocationOn color="primary"></LocationOn>
                            }
                        <div>
                            TBD
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
                            <div>
                                {person.first}
                                {/* {person.attending == true ? "attending" : "not attending"} */}
                                {/* {person.attending} */}
                            </div>
                            <div className="RSVPAcceptReject">
                                <Button variant={`${person.attending_rehearsal ? "contained" : "outlined"}`}
                                    onClick = {() => {setAttendingRehearsal(person, true)}}
                                    disabled = {loading}
                                    color="primary">
                                    {loading ? <ClipLoader className="iconLoader"></ClipLoader> : <Check></Check>} Accept
                                </Button>
                                <Button variant={`${person.attending_rehearsal ? "outlined" : "contained"}`}
                                    onClick = {() => {setAttendingRehearsal(person, false)}}
                                    color="secondary">
                                    {loading ? <ClipLoader className="iconLoader"></ClipLoader> : <CancelOutlined></CancelOutlined>} Decline
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
                    Ceremony
                </div>
                <div className="summaryItemLocation">
                    <CalendarMonth color="primary"></CalendarMonth>
                    <div>
                        Friday, August 22nd, 2025
                    </div>
                </div>
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
                            The Wedding Bowl, La Jolla
                        </div>
                    </div>
                </Tooltip>
                <div className="RSVPForm">
                    {
                        people_selected.map(person => 
                        <div className="RSVPFormField">
                            <div>
                                {person.first}
                                {/* {person.attending == true ? "attending" : "not attending"} */}
                                {/* {person.attending} */}
                            </div>
                            <div className="RSVPAcceptReject">
                                <Button variant={`${person.attending_ceremony ? "contained" : "outlined"}`}
                                    onClick = {() => {setAttending(person, true)}}
                                    disabled = {loading}
                                    color="primary">
                                    {loading ? <ClipLoader className = "iconLoader"></ClipLoader> : <Check></Check>} Accept
                                </Button>
                                <Button variant={`${person.attending_ceremony ? "outlined" : "contained"}`}
                                    onClick = {() => {setAttending(person, false)}}
                                    disabled = {loading}
                                    color="secondary">
                                    {loading ? <ClipLoader className="iconLoader"></ClipLoader> : <CancelOutlined></CancelOutlined>} Decline
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
                    <CalendarMonth color="primary"></CalendarMonth>
                    <div>
                        Saturday, August 23rd, 2025
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
                <div className="RSVPForm">
                    {
                        people_selected.map(person => 
                        <div className="RSVPFormField">
                            <div>
                                {person.first}
                            </div>
                            <div className="RSVPAcceptReject">
                                <Button variant={`${person.attending_brunch ? "contained" : "outlined"}`}
                                    onClick = {() => {setAttendingBrunch(person, true)}}
                                    disabled = {loading}
                                    color="primary">
                                    {loading ? <ClipLoader className = "iconLoader"></ClipLoader> : <Check></Check>} Accept
                                </Button>
                                <Button variant={`${person.attending_brunch ? "outlined" : "contained"}`}
                                    onClick = {() => {setAttendingBrunch(person, false)}}
                                    disabled = {loading}
                                    color="secondary">
                                    {loading ? <ClipLoader className = "iconLoader"></ClipLoader> : <CancelOutlined></CancelOutlined>} Decline
                                </Button>
                            </div>
                        </div>
                    )
                    }
                </div>

                {/* Happy Hour */}
                {group.invited_happy_hour &&
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
                }
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
                </>}
        </div>
        }
        
    </div>
    );
}