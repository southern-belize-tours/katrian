import { useCallback, useContext, useEffect, useState } from "react"
import { useGroupService } from "../../Services/GroupService/GroupServiceContext";
import { toast, ToastContainer } from "react-toastify";
import { IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Tooltip } from "@mui/material";
import { CancelOutlined, Check, Close, Edit, EggAlt, EggAltOutlined, Email,
    Favorite, FavoriteBorder,
    FilterAlt,
    LocalBar, LocalPhone, LocationOn, NoDrinks, NoMeals, PlaylistRemove, QuestionMark, Restaurant } from "@mui/icons-material";

import './Groups.css';
import { ClipLoader } from "react-spinners";
import { useGuestService } from "../../Services/GuestService/GuestServiceContext";
import GroupCreate from "./GroupCreate";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";

const toastConfig = {
    autoClose: 2000
};

export default function Groups (props) {
    const {user} = useContext(AuthContext)
    const groupService = useGroupService();
    const guestService = useGuestService();

    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState([]);
    const [, setGuests] = useState([]);
    const [editingGroup, setEditingGroup] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const filterOpen = Boolean(anchorEl);
    const [filterConfig, setFilterConfig] = useState({
        'rsvp': false,
        'not_rsvp': false,
        'undecided': false,
        'invited_rehearsal': false,
        'not_invited_rehearsal': false,
        'invited_happy_hour': false,
        'not_invited_happy_hour': false,
    })

    const passesFilter = (group) => {
        if (filterConfig['rsvp'] === true) {
            let guestAttending = false;
            for (let i = 0; i < group.guests.length; ++i) {
                if (group.guests[i].attending_ceremony === 1) {
                    guestAttending = true;
                    break;
                }
            }
            if (guestAttending === false) {
                return false;
            }
        } else if (filterConfig['not_rsvp'] === true) {
            let guestRejected = false;
            for (let i = 0; i < group.guests.length; ++i) {
                if (group.guests[i].attending_ceremony === 0) {
                    guestRejected = true;
                    break;
                }
            }
            if (guestRejected === false) {
                return false;
            }
        } else if (filterConfig['undecided'] === true) {
            let guestUndecided = false;
            for (let i = 0; i < group.guests.length; ++i) {
                if (group.guests[i].attending_ceremony === -1) {
                    guestUndecided = true;
                    break;
                }
            }
            if (guestUndecided === false) {
                return false;
            }
        }
        if (filterConfig['invited_rehearsal'] === true && group.invited_rehearsal === false) {
            return false;
        } else if (filterConfig['not_invited_rehearsal'] === true && group.invited_rehearsal === true) {
            return false;
        }
        if (filterConfig['invited_happy_hour'] === true && group.invited_happy_hour === false) {
            return false;
        } else if (filterConfig['not_invited_happy_hour'] === true && group.invited_happy_hour === true) {
            return false;
        }
        return true;
    }

    const anySelected = () => {
        let keys = Object.keys(filterConfig);
        for (let i = 0; i < keys.length; ++i) {
            if (filterConfig[keys[i]] === true) {
                return true;
            }
        }
        return false;
    }

    /**
     * Sets the filter selections to empty (initial state)
     */
    const removeFilterSelections = () => {
        setFilterConfig({
            'rsvp': false,
            'not_rsvp': false,
            'undecided': false,
            'invited_rehearsal': false,
            'not_invited_rehearsal': false,
            'invited_happy_hour': false,
            'not_invited_happy_hour': false,
        })
    }

    /**
     * Toggles a filter option from the key parameter
     * 
     * @param {Filter Option to Toggle} key 
     */
    const toggleFilterOption = (key) => {
        const oldVal = filterConfig[key];
        let newFilterConfig = {...filterConfig};
        newFilterConfig[key] = !oldVal;
        return newFilterConfig;
    }

    /**
     * Sets a filter option to no longer filter the key parameter
     * 
     * @param {Filter Option to Remove} key 
     */
    const removeFilterOption = (key, newFilterConfig) => {
        newFilterConfig[key] = false;
        setFilterConfig(newFilterConfig);
    }

    const dialogCancelCallback = () => {
        setEditingGroup(null);
    }

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
                console.log("Group Component: Error retrieving groups", e);
                toast.error("Failure to Retrieve Groups.", toastConfig)
            } finally {
                if (isSubscribed) {
                    setLoading(false);
                }
            }
        }

        const getGuests = async () => {
            try {
                const guestData = await guestService.getGuests();
                if (isSubscribedGuest) {
                    setGuests(guestData);
                    const newGroups = await createGroupToGuestArray(guestData);
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

        getGroups();
        getGuests();
        
        return () => {
            isSubscribed = false;
            isSubscribedGuest = false;
            setLoading(false);
        }
        // eslint-disable-next-line
    }, [])


    const createGroupToGuestArray = async (guestData) => {
        const newGroups = await groupService.getGroups();
        const updatedGroups = newGroups.map(group => {
            const newGuests = group.Guest_ids.map(currId => {
                return guestData.find(g => g.id === currId);
            });
            return { ...group, guests: newGuests };
        });
        return updatedGroups;
    }

    const dialogCallback = useCallback(async () => {
        setLoading(true);
        try {
            const guestData = await guestService.getGuests();
            const newGroups = await createGroupToGuestArray(guestData);
            setGroups(newGroups);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
            setEditingGroup(null);
        }
        // eslint-disable-next-line
    }, [groupService, guestService]);

        // This effect runs whenever `groups` changes, ensuring UI updates
        useEffect(() => {
            // console.log("Group State Changed");
        }, [groups]);

    // const addDummyGroup = async () => {
    //     setLoading(true);

    //     // Generate between 1 and 4 guests
    //     const numDummyGuests =  Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    //     const guestIds = [];
    //     for (let i = 0; i < numDummyGuests; ++i ) {
    //         const currId = await guestService.createDummyGuest();
    //         guestIds.push(currId.id);
    //     }
    //     const newGroup = await groupService.createDummyGroup(guestIds);
    //     // setGroups([...groups, newGroup]);
    //     const newGroups = await createGroupToGuestArray();
    //     setGroups(newGroups);

    //     setLoading(false);
    //     if (newGroup) {
    //         toast.success("Successfully added dummy group", toastConfig);
    //     } else {
    //         toast.error("Failure to add dummy group", toastConfig);
    //     }
    // }

    const deleteGroup = async (group) => {
        setLoading(true);
        // Delete the group
        const updatedGroups = await groupService.deleteGroup(group.id);
        setGroups(updatedGroups);
        // Delete guests associated with the group
        for (let i = 0; i < group.Guest_ids.length; ++i ) {
            await guestService.deleteGuest(group.Guest_ids[i]);
        }
        const updatedGuests = await guestService.getGuests();
        setGuests(updatedGuests);
        setLoading(false);
        // Pop up a toast container
        if (updatedGroups.length > 0) {
            toast.success("Successfully removed group", toastConfig);
        } else {
            const tempGroups = await groupService.fetchGroups();
            if (tempGroups.length !== 0) {
                toast.error("Failure to remove group", toastConfig);
            } else {
                toast.success("Successfully removed group", toastConfig);
            }
        }
    }

    // const deleteAllGroups = async (group) => {
    //     setLoading(true);
    //     const updatedGroups = await groupService.deleteAllGroups();
    //     setGroups(updatedGroups);
    //     const updatedGuests = await guestService.deleteAllGuests();
    //     setGuests(updatedGuests);
    //     setLoading(false);
    // }

    const editGroup = (group) => {
        setEditingGroup(group);
    }

    const getRehearsalHeadcount = () => {
        let ret = 0;
        for (let i = 0; i < groups.length; ++i) {
            if (!groups[i].invited_rehearsal) {
                continue;
            }
            if (groups[i].guests) {
                for (let j = 0; j < groups[i].guests.length; ++j) {
                    if (groups[i].guests[j] && groups[i].guests[j].attending_rehearsal) {
                        ret++;
                    }
                }
            }
        }
        return ret;
    }

    const getRehearsalInvited = () => {
        let ret = 0;
        for (let i = 0; i < groups.length; ++i) {
            if (!groups[i].invited_rehearsal || !groups[i].guests) {
                continue;
            }
            ret += groups[i].guests.length;
        }
        return ret;
    }

    const getCeremonyHeadcount = () => {
        let ret = 0;
        for (let i = 0; i < groups.length; ++i) {
            if (groups[i].guests) {
                for (let j = 0; j < groups[i].guests.length; ++j) {
                    if (groups[i].guests[j] && groups[i].guests[j].attending_ceremony === 1) {
                        ret++;
                    }
                }
            }
        }
        return ret;
    }

    const getBrunchHeadcount = () => {
        let ret = 0;
        for (let i = 0; i < groups.length; ++i) {
            if (groups[i].guests) {
                for (let j = 0; j < groups[i].guests.length; ++j) {
                    if (groups[i].guests[j] && groups[i].guests[j].attending_brunch) {
                        ret++;
                    }
                }
            }
        }
        return ret;
    }

    const getCeremonyInvited = () => {
        let ret = 0;
        for (let i = 0; i < groups.length; ++i) {
            if (!groups[i].guests) {
                continue;
            }
            ret += groups[i].guests.length;
        }
        return ret;
    }

    const getHappyHourHeadcount = () => {
        let ret = 0;
        for (let i = 0; i < groups.length; ++i) {
            if (groups[i].guests) {
                for (let j = 0; j < groups[i].guests.length; ++j) {
                    if (groups[i].guests[j] && groups[i].guests[j].attending_happy_hour) {
                        ret++;
                    }
                }
            }
        }
        return ret;
    }

    const getHappyHourInvited = () => {
        let ret = 0;
        for (let i = 0; i < groups.length; ++i) {
            if (!groups[i].invited_happy_hour || !groups[i].guests) {
                continue;
            }
            ret += groups[i].guests.length;
        }
        return ret;
    }

    return (
        (user && user.isSignedIn) ?
        <div className="weddingBody">

            <ToastContainer></ToastContainer>
            <h1>Invite List</h1>
            {/* Dummy Group Button */}
            {/* <Button variant="outlined" 
                color="primary"
                disabled = {loading}    
                onClick = {() => {
                    addDummyGroup();
                }}>
                {loading ?
                    <ClipLoader className="iconLoader"></ClipLoader>
                :
                    <Add></Add> 
                }
                Add Dummy Group
            </Button> */}
            {/* {groups.length > 0 &&
            <div>
                <div>Rehearsal Headcount: {getRehearsalHeadcount()}</div>
                <div>Ceremony Headcount: {getCeremonyHeadcount()}</div>
                <div>Brunch Headcount: {getBrunchHeadcount()}</div>

            </div>
            } */}
            {groups && groups.length > 0 &&
            <TableContainer sx={{maxWidth: 650}}
                component = {Paper}>
                <Table sx={{maxWidth: 650}} 
                    id = "headhunter"
                    aria-label="heaadcounts">
                    <TableHead>
                        <TableRow>
                            <TableCell>Event</TableCell>
                            <TableCell>Headcount</TableCell>
                            <TableCell>Invited</TableCell>
                            <TableCell>Capacity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Restaurant color="primary"></Restaurant> Rehearsal
                            </TableCell>
                            <TableCell>{getRehearsalHeadcount()}</TableCell>
                            <TableCell>{getRehearsalInvited()}</TableCell>
                            <TableCell>{50}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                 <Favorite color="primary"></Favorite> Ceremony
                            </TableCell>
                            <TableCell>{getCeremonyHeadcount()}</TableCell>
                            <TableCell>{getCeremonyInvited()}</TableCell>
                            <TableCell>{150}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <EggAlt color="primary"></EggAlt> Brunch
                            </TableCell>
                            <TableCell>{getBrunchHeadcount()}</TableCell>
                            <TableCell>{getCeremonyInvited()}</TableCell>
                            <TableCell>{125}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <LocalBar color="primary"></LocalBar> Happy Hour
                            </TableCell>
                            <TableCell>{getHappyHourHeadcount()}</TableCell>
                            <TableCell>{getHappyHourInvited()}</TableCell>
                            <TableCell>{50}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            }
            <div className="flexed row">
                <GroupCreate closeCallback = {dialogCallback}
                    disabled = {loading}
                    cancelCallback = {dialogCancelCallback}
                    group={editingGroup}
                    hideButton = {false}>
                </GroupCreate>
                <div>
                    <Tooltip title={`${filterOpen ? "" : "Filter Invitees"}`}>
                        <IconButton id={`Groups-List-Filter-Button`} 
                            aria-controls = {filterOpen ? `filter-submenu` : undefined}
                            aria-haspopup="true"
                            aria-expanded={filterOpen ? 'true' : undefined}
                            onClick = { (e) => {
                                setAnchorEl(e.currentTarget)
                            }}
                            >
                            <FilterAlt color="primary"></FilterAlt>
                        </IconButton>
                        <Menu id={'filter-submenu'}
                            anchorEl = {anchorEl}
                            open = {filterOpen}
                            onClose = {() => {
                                setAnchorEl(null);
                            }}
                            MenuListProps = {{
                                'aria-labelledby': 'Groups-List-Filter-Button'
                            }}>
                            {anySelected() &&
                                <MenuItem className = {`filterOption`} 
                                    onClick = {() => {
                                        removeFilterSelections();
                                    }}>
                                    <PlaylistRemove></PlaylistRemove> Remove All Selections
                                </MenuItem>
                            }
                            <MenuItem className = {`filterOption ${filterConfig['rsvp'] === true ? "selected" : ""}`} 
                                onClick = {() => {
                                    const newOptions = toggleFilterOption('rsvp');
                                    removeFilterOption('not_rsvp', newOptions);
                                }}>
                                <Check></Check> Has RSVP'd
                            </MenuItem>
                            <MenuItem className = {`filterOption ${filterConfig['not_rsvp'] === true ? "selected" : ""}`} 
                                onClick = {() => {
                                   const newOptions = toggleFilterOption('not_rsvp');
                                    removeFilterOption('rsvp', newOptions);
                                }}>
                                <Close></Close> Has Rejected
                            </MenuItem>
                            <MenuItem className = {`filterOption ${filterConfig['undecided'] === true ? "selected" : ""}`} 
                                onClick = {() => {
                                   const newOptions = toggleFilterOption('undecided');
                                   setFilterConfig(newOptions);
                                }}>
                                <QuestionMark></QuestionMark> Undecided RSVP
                            </MenuItem>
                            <MenuItem className = {`filterOption ${filterConfig['invited_rehearsal'] === true ? "selected" : ""}`} 
                                onClick = {() => {
                                   const newOptions = toggleFilterOption('invited_rehearsal');
                                    removeFilterOption('not_invited_rehearsal', newOptions);
                                }}>
                                <Restaurant></Restaurant> Invited Rehearsal
                            </MenuItem>
                            <MenuItem className = {`filterOption ${filterConfig['not_invited_rehearsal'] === true ? "selected" : ""}`} 
                                onClick = {() => {
                                   const newOptions = toggleFilterOption('not_invited_rehearsal');
                                    removeFilterOption('invited_rehearsal', newOptions);
                                }}>
                                <NoMeals></NoMeals> Not Invited Rehearsal
                            </MenuItem>
                            <MenuItem className = {`filterOption ${filterConfig['invited_happy_hour'] === true ? "selected" : ""}`} 
                                onClick = {() => {
                                   const newOptions = toggleFilterOption('invited_happy_hour');
                                    removeFilterOption('not_invited_happy_hour', newOptions);
                                }}>
                                <LocalBar></LocalBar> Invited Happy Hour
                            </MenuItem>
                            <MenuItem className = {`filterOption ${filterConfig['not_invited_happy_hour'] === true ? "selected" : ""}`} 
                                onClick = {() => {
                                   const newOptions = toggleFilterOption('not_invited_happy_hour');
                                    removeFilterOption('invited_happy_hour', newOptions);
                                }}>
                                <NoDrinks></NoDrinks> Not Invited Happy Hour
                            </MenuItem>
                            {/* 'rsvp': false,
        'invited_rehearsal': false,
        'not_invited_rehearsal': false,
        'invited_happy_hour': false,
        'not_invited_happy_hour': false, */}
                        </Menu>
                    </Tooltip>
                    {/* Filter */}
                </div>
            </div>
            {/* <GroupCreate closeCallback = {dialogCallback}
                group={editingGroup}
                single={true}
                hideButton = {false}>
            </GroupCreate> */}
            {/* Delete All Groups Button */}
            {/* <Button variant="outlined"
                color="primary"
                disabled = {loading}
                onClick = {() => {
                    deleteAllGroups();
                }}>
                {loading ?
                    <ClipLoader className="iconLoader"></ClipLoader>
                :
                    <Cancel></Cancel>
                }
                Delete All Groups
            </Button> */}
            <div className="groupsContainer">
                {!groups || loading ?
                    <ClipLoader className="bigClip"></ClipLoader>
                //  : groups ?
                : groups.length < 1 ?
                <h3>There are Currently no Groups Invited</h3>
                :
                    groups.filter(g => passesFilter(g)).map(group => 
                    <div className="groupContainer"
                        key={`group-${group.id}`}>
                        <div className="groupHeader">
                            <h2>{group.title}</h2>
                            {loading ?
                            <ClipLoader className="iconLoader">
                            </ClipLoader>
                            :
                            <div className="groupActions">
                                <Tooltip title="Edit Group">
                                    <IconButton color="primary"
                                        onClick = {() => {
                                            editGroup(group);
                                        }}>
                                        <Edit></Edit>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete Group">
                                    <IconButton color="secondary"
                                        onClick = {() => {
                                            deleteGroup(group)
                                        }}>
                                        <CancelOutlined></CancelOutlined>
                                    </IconButton>
                                </Tooltip>
                            </div>
                            }

                        </div>
                        <div className="flexed centered">
                            {group.invited_rehearsal ? 
                            <Restaurant color="primary"></Restaurant> 
                            : <NoMeals color="secondary"></NoMeals>} 
                            {group.invited_rehearsal === true ? "Invited to Rehearsal Dinner" : "Not Invited to Rehearsal Dinner"}
                        </div>
                        <div className="flexed centered">
                            {group.invited_happy_hour === true? 
                            <LocalBar color="primary"></LocalBar> 
                            : <NoDrinks color="secondary"></NoDrinks>} 
                            {`${group.invited_happy_hour === true ? "" : "Not "}Invited to Happy Hour`}
                            {/* {group.invited_rehearsal == true ? "Invited to Rehearsal Dinner" : "Not Invited to Rehearsal Dinner"} */}
                        </div>
                        {group.email &&    
                            <div className="flexed centered">
                                <Email color="primary"></Email> {group.email}
                            </div>
                        }
                        {group.phone &&
                            <div className="flexed centered">
                                <LocalPhone color="primary"></LocalPhone> {group.phone}
                            </div>
                        }
                        {group.address &&
                        <div className="flexed row">
                            <div>
                                <LocationOn color="primary"></LocationOn>
                            </div>
                            <div>
                                <div>{group.address}</div>
                                <div>{group.city}, {group.state}, {group.zip}</div>
                            </div>
                        </div>
                        }
                        <div className="guestsContainer">
                            {group.guests && group.guests.length > 0 &&
                                <h3>Guests in Group:</h3>
                            }
                            <div>
                            {group.guests && group.guests.map(guest =>
                                guest && guest.first !== null &&
                                <div className="flexed"
                                    key={`guest-${guest.id}`}>
                                    <div>
                                        <Tooltip title={`This guest is ${guest.attending_ceremony === 1 ? "" : guest.attending_ceremony === 0 ? "not" : "undetermined regarding"} attending the ceremony`}>
                                            {guest.attending_ceremony === 1 ? <Favorite color = "primary"></Favorite> 
                                            : guest.attending_ceremony === 0 ? <Favorite color= "secondary"></Favorite>
                                            : <FavoriteBorder color="disabled"></FavoriteBorder>}
                                        </Tooltip>
                                        {/* <Tooltip title={`This guest is ${guest.attending_brunch ? "" : "not"} attending brunch`}>
                                            {guest.attending_brunch ? <EggAlt color="primary"></EggAlt> : <EggAltOutlined color="secondary"></EggAltOutlined>}
                                        </Tooltip>
                                        {group.invited_rehearsal &&
                                        <Tooltip title={`This guest is ${guest.attending_rehearsal ? "" : "not"} attending rehearsal`}>
                                            {guest.attending_rehearsal ? 
                                            <Restaurant color="primary"></Restaurant> : <NoMeals color="secondary"></NoMeals>}
                                        </Tooltip>
                                        }
                                        {group.invited_happy_hour &&
                                        <Tooltip title={`This guest is ${guest.attending_happy_hour ? "" : "not "}attending happy hour`}>
                                            {guest.attending_happy_hour ?
                                            <LocalBar color="primary"></LocalBar> : <NoDrinks color="secondary"></NoDrinks>
                                            }
                                        </Tooltip>
                                        } */}
                                    </div>
                                    <div>{guest.first} {guest.last}</div>
                                </div>
                            )}
                            </div>
                        </div>
                    </div>)
                    // :
                    // <ClipLoader className="bigClip"></ClipLoader>
                }
            </div>
        </div>
        :
        <div className="weddingBody">
            <div>You need to be signed in to view this page. Please <a href="/signin">sign in</a> first</div>
        </div>
    )

};
