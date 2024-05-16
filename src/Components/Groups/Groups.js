import { useCallback, useEffect, useState } from "react"
import { useGroupService } from "../../Services/GroupService/GroupServiceContext";
import { toast, ToastContainer } from "react-toastify";
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { Add, Cancel, CancelOutlined, DinnerDining, Edit, EggAlt, EggAltOutlined, Email, Favorite, FavoriteBorder, GroupsTwoTone, LocalBar, LocalPhone, LocationOn, NoDrinks, NoMeals, PersonAdd, Restaurant } from "@mui/icons-material";

import './Groups.css';
import { BeatLoader, CircleLoader, ClipLoader } from "react-spinners";
import { useGuestService } from "../../Services/GuestService/GuestServiceContext";
import GroupCreate from "./GroupCreate";

const toastConfig = {
    autoClose: 2000
};

export default function Groups (props) {
    const groupService = useGroupService();
    const guestService = useGuestService();

    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState([]);
    const [guests, setGuests] = useState([]);
    const [editingGroup, setEditingGroup] = useState(null);

    const dialogCallback = async () => {
        setLoading(true);
        setEditingGroup(null);
        const newGroups = await createGroupToGuestArray();
        console.log(newGroups);
        setGroups(newGroups);
        setLoading(false);
    };

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
                    // setLoading(false);
                }
            }
        }

        const getGuests = async () => {
            try {
                const guestData = await guestService.getGuests();
                if (isSubscribedGuest) {
                    setGuests(guestData);
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

        getGroups();
        getGuests();
        
        return () => {
            isSubscribed = false;
            isSubscribedGuest = false;
            setLoading(false);
        }
    }, [groupService])

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

    const addDummyGroup = async () => {
        setLoading(true);

        // Generate between 1 and 4 guests
        const numDummyGuests =  Math.floor(Math.random() * (4 - 1 + 1)) + 1;
        const guestIds = [];
        for (let i = 0; i < numDummyGuests; ++i ) {
            const currId = await guestService.createDummyGuest();
            guestIds.push(currId.id);
        }
        const newGroup = await groupService.createDummyGroup(guestIds);
        // setGroups([...groups, newGroup]);
        const newGroups = await createGroupToGuestArray();
        setGroups(newGroups);

        setLoading(false);
        if (newGroup) {
            toast.success("Successfully added dummy group", toastConfig);
        } else {
            toast.error("Failure to add dummy group", toastConfig);
        }
    }

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

    const deleteAllGroups = async (group) => {
        setLoading(true);
        const updatedGroups = await groupService.deleteAllGroups();
        setGroups(updatedGroups);
        const updatedGuests = await guestService.deleteAllGuests();
        setGuests(updatedGuests);
        setLoading(false);
    }

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
                    if (groups[i].guests[j].attending_rehearsal) {
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
                    if (groups[i].guests[j].attending_ceremony) {
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
                    if (groups[i].guests[j].attending_brunch) {
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
                    if (groups[i].guests[j].attending_happy_hour) {
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
            {groups.length > 0 &&
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
            <GroupCreate closeCallback = {dialogCallback}
                cancelCallback = {dialogCancelCallback}
                group={editingGroup}
                hideButton = {false}>
            </GroupCreate>
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
                {groups &&  groups.map(group => 
                    <div className="groupContainer">
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
                            {group.invited_rehearsal == true ? "Invited to Rehearsal Dinner" : "Not Invited to Rehearsal Dinner"}
                        </div>
                        <div className="flexed centered">
                            {group.invited_happy_hour ? 
                            <LocalBar color="primary"></LocalBar> 
                            : <NoDrinks color="secondary"></NoDrinks>} 
                            {`${group.invited_happy_hour ? "" : "Not "}Invited to Happy Hour`}
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
                        <div className="flexed row">
                            <div>
                                <LocationOn color="primary"></LocationOn>
                            </div>
                            <div>
                                <div>{group.address}</div>
                                <div>{group.city}, {group.state}, {group.zip}</div>
                            </div>
                        </div>
                        <div className="guestsContainer">
                            {group.guests && group.guests.length > 0 &&
                                <h3>Guests in Group:</h3>
                            }
                            {group.guests && group.guests.map(guest =>
                                guest && guest.first !== null &&
                                <div className="flexed">
                                    <div>
                                        <Tooltip title={`This guest is ${guest.attending_ceremony ? "" : "not"} attending the ceremony`}>
                                            {guest.attending_ceremony ? <Favorite color = "primary"></Favorite> : <FavoriteBorder color="secondary"></FavoriteBorder>}
                                        </Tooltip>
                                        <Tooltip title={`This guest is ${guest.attending_brunch ? "" : "not"} attending brunch`}>
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
                                        }
                                    </div>
                                    <div>{guest.first} {guest.last}</div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )

};
