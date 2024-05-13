import { useEffect, useState } from "react";

import './RSVP.css';
import { Button, Checkbox, IconButton, TextField, Tooltip } from "@mui/material";
import { Add, CalendarMonth, Cancel, CancelOutlined, Check, CheckOutlined, GroupAdd, InfoOutlined, LocationOn, PersonAdd, Search, Undo } from "@mui/icons-material";

const group1 = {
    rehearsal: true,
    people: [
    {
        first: "greg",
        last: "nemo",
        attending: false,
    },
    {
        first: "randa",
        last: "nono",
        attending: false,
    }
]};

const group2 = {
    rehearsal: true,
    people:[
        {
            first: "gregory",
            last: "nemo",
            attending: false,
        },
        {
            first: "gianna",
            last: "nono",
            attending: false,
        }
    ]
};

const group3 = {
    rehearsal: false,
    people:[
        {
            first: "maya",
            last: "strawick",
            attending: false,
        },
    ]
};

const allGroups = [
    group1, group2, group3
];



// [{people: [
//     {
//         first: "greg",
//         last: "nemo",
//     },
//     {
//         first: "randa",
//         last: "nono",
//     }
// ]}]

export default function RSVP (props) {
    const [fade, setFade] = useState(true);
    const [people_selected, set_people_selected] = useState([]);
    const [group, setGroup] = useState(null);
    const [allPeople, setAllPeople] = useState(null);
    const [search, setSearch] = useState("");
    // const [people, setPeople] = useState([...group1])
    const [text, setText] = useState("");
    const [matchedGroups, setMatchedGroups] = useState([]);
    const [peopleConfirmed, setPeopleConfirmed] = useState(false);

    useEffect(() => {
        // Set text fading animation
        setTimeout(() => {
            setFade(false);
        }, 0);

        // Delete this block when we get the backend connected
        // let newPeople = [...people]
        // for (let i = 0; i < newPeople.length; ++i) {
        //     newPeople[i].attending = false;
        //     newPeople[i].attendingBrunch = false;
        // }
        // setPeople([...newPeople]);

        // Get the people from all wedding groups to be searchable
        const tempAllPeople = [];
        allGroups.forEach(group => {
            tempAllPeople.push(...group.people);
        });
        setAllPeople([...tempAllPeople]);

    }, [])

    const copyTextToClipBoard = (text) => {
        navigator.clipboard.writeText(text).then(function() {
            setText(text);
        }).catch(function(err) {
            console.error('Could not copy text: ', err);
        });
    }

    const setAttending = (person, val) => {
        let newPeople = [...group.people];
        for (let i = 0; i < newPeople.length; ++i ) {
            if (newPeople[i].first === person.first && newPeople[i].last === person.last) {
                newPeople[i].attending = val;
                // If they aren't going to the ceremony they don't get to go to rehearsal or brunch
                if (val === false) {
                    newPeople[i].attendingBrunch = false;
                    newPeople[i].attendingRehearsal = false;
                }
                break;
            }
        }
        let newGroup = {...group};
        newGroup.people = [...newPeople];
        setGroup({...newGroup});
        // setPeople([...newPeople]);
    }

    const setAttendingBrunch = (person, val) => {
        let newPeople = [...group.people];
        for (let i = 0; i < newPeople.length; ++i ) {
            if (newPeople[i].first === person.first && newPeople[i].last === person.last) {
                newPeople[i].attendingBrunch = val;

                // They'd better be coming to the ceremony if they are going to brunch/rehearsal
                if (val === true) {
                    newPeople[i].attending = true;
                }
                break;
            }
        }
        let newGroup = {...group};
        newGroup.people = [...newPeople];
        setGroup({...newGroup});
        // setPeople([...newPeople]);
    }

    const setAttendingRehearsal = (person, val) => {
        let newPeople = [...group.people];
        for (let i = 0; i < newPeople.length; ++i ) {
            if (newPeople[i].first === person.first && newPeople[i].last === person.last) {
                newPeople[i].attendingRehearsal = val;

                // They'd better be coming to the ceremony if they are going to brunch/rehearsal
                if (val === true) {
                    newPeople[i].attending = true;
                }
                break;
            }
        }
        let newGroup = {...group};
        newGroup.people = [...newPeople];
        setGroup({...newGroup});
        // setPeople([...newPeople]);
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
                                setSearch("");
                                setMatchedGroups([]);
                                setGroup(null);
                            }}
                            color="primary">
                            <Undo color="primary"></Undo>
                        </IconButton>
                    </Tooltip>
                }
            </h1>
            <div>
                We kindly ask you to pre-RSVP on our website. This is an early RSVP without the commitment, but will help give us a guest estimate (guestimate). You can update your status later as the date approaches.
            </div>
            {group === null ?
            <div className={`flexed col logisticsText ${fade ? "" : "fading"}`}>
                <div className="flexed logisticsItem centered">
                    Search for your party by names to RSVP
                </div>
                {/* <div>Search for your group</div> */}
                <div className="searchFieldContainer">
                    <TextField id="wedding-group-search"
                        className="weddingGroupSearchField"
                        placeholder="Doe"
                        value = {search}
                        label = "Last Name"
                        onChange = {(e) => {
                            setSearch(e.target.value)
                            if (e.target.value.length === 0) {
                                setMatchedGroups([]);
                            } else {
                                let newMatchedGroups = [];
                                allGroups.forEach(group => {
                                    let groupContainsSearch = false;
                                    for (let i = 0; i < group.people.length; ++i) {
                                        if (group.people[i].first.toLowerCase().includes(e.target.value.toLowerCase()) ||
                                            group.people[i].last.toLowerCase().includes(e.target.value.toLowerCase())) {
                                                groupContainsSearch = true;
                                                break;
                                            }
                                    
                                    }
                                    if (groupContainsSearch) {
                                        newMatchedGroups.push({...group});
                                    }
                                })
                                setMatchedGroups([...newMatchedGroups]);
                                // setMatchedGroups(allPeople.filter(person => person.first.toLowerCase().includes(search.toLowerCase()) || person.last.toLowerCase().includes(search.toLowerCase())));
                            }
                            // allPeople.filter(person)
                            // return people.filter(person => person.last.toLowerCase() === lastName.toLowerCase());
                            // return people.filter(person => person.last.toLowerCase() === lastName.toLowerCase());
                        }}>
                            {/* <Search color="primary"
                        className="searchFieldIcon">
                    </Search> */}
                    </TextField>
                    <Search color="primary"
                        className="searchFieldIcon">
                    </Search>
                </div>
                <div className="flexed col">
                    {matchedGroups.map(group =>
                    <Tooltip title="Select this Group">
                    <div className="matchedGroup padded"
                        onClick={() => {setGroup(group)}}>
                        {group.people.map(person => 
                            <div>
                                {/* <div> */}
                                    {/* {person.first} */}
                                {/* </div> */}
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
                    { people_selected.length < group.people.length &&
                        <div className="flexed logisticsItem centered">
                            Add the people in your group whom you are RSVPing on behalf of.
                        </div>
                    }
                    <div className="peopleSelection">
                        {people_selected.length < group.people.length &&
                        <Button variant="contained"
                            onClick = {() => {set_people_selected([...group.people])}}>
                            <GroupAdd></GroupAdd> Add All
                        </Button>
                        }
                        {group.people.map(person =>
                            !people_selected.find(p => p.first === person.first && p.last === person.last) &&
                            <Tooltip title = {`RSVP on behalf of ${person.first}`}>
                                <Button variant="outlined"
                                    onClick = {() => {set_people_selected([...people_selected, {...person}])}}>
                                    <PersonAdd></PersonAdd> {person.first} {person.last}
                                </Button>
                            </Tooltip>
                        )}
                    </div>
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
                    <div className="rsvpButtonPanel">
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
                        <Tooltip title = {`${people_selected.length === 0 ? "Select at least 1 person to RSVP on behalf of" : ""}`}>
                            <Button color="primary"
                                onClick = {() => {
                                    setPeopleConfirmed(true);
                                }}
                                disabled = {people_selected.length === 0}
                                // disabled = {true}
                                variant="outlined">
                                <Check></Check> Confirm
                            </Button>
                        </Tooltip>
                    </div>
                </div>
                :
                <>
                {/* Rehearsal */}
                { group.rehearsal == true &&
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
                                <Button variant={`${person.attendingRehearsal ? "contained" : "outlined"}`}
                                    onClick = {() => {setAttendingRehearsal(person, true)}}
                                    color="primary">
                                    <Check></Check> Accept
                                </Button>
                                <Button variant={`${person.attendingRehearsal ? "outlined" : "contained"}`}
                                    onClick = {() => {setAttendingRehearsal(person, false)}}
                                    color="secondary">
                                    <CancelOutlined></CancelOutlined> Decline
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
                {/* <div className="summaryItemLocation">
                    <InfoOutlined color="primary"></InfoOutlined>
                    
                </div> */}
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
                                <Button variant={`${person.attending ? "contained" : "outlined"}`}
                                    onClick = {() => {setAttending(person, true)}}
                                    color="primary">
                                    <Check></Check> Accept
                                </Button>
                                <Button variant={`${person.attending ? "outlined" : "contained"}`}
                                    onClick = {() => {setAttending(person, false)}}
                                    color="secondary">
                                    <CancelOutlined></CancelOutlined> Decline
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
                                {/* {person.attending == true ? "attending" : "not attending"} */}
                                {/* {person.attending} */}
                            </div>
                            <div className="RSVPAcceptReject">
                                <Button variant={`${person.attendingBrunch ? "contained" : "outlined"}`}
                                    onClick = {() => {setAttendingBrunch(person, true)}}
                                    color="primary">
                                    <Check></Check> Accept
                                </Button>
                                <Button variant={`${person.attendingBrunch ? "outlined" : "contained"}`}
                                    onClick = {() => {setAttendingBrunch(person, false)}}
                                    color="secondary">
                                    <CancelOutlined></CancelOutlined> Decline
                                </Button>
                            </div>
                        </div>
                    )
                    }
                </div>
{/* 
                <table className='attendingTable'>
                    <tr>
                        <th className="maxCell">Name</th>
                        <th>Attending Rehearsal</th>
                        <th>Attending Ceremony</th>
                        <th>Attending Brunch</th>
                    </tr>
                    {group.people.map(person =>
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