import { useEffect, useState } from "react";
import { useGroupService } from "../../Services/GroupService/GroupServiceContext";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Button, Checkbox, Dialog, DialogActions,
    DialogContent, DialogTitle, IconButton, TextField, Tooltip } from "@mui/material";
import { Add, Close, ErrorOutline, ExpandMore, GroupAdd, PersonAdd, Save } from "@mui/icons-material";
import { useGuestService } from "../../Services/GuestService/GuestServiceContext";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const us_states = [
    "",
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", 
    "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", 
    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", 
    "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", 
    "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", 
    "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", 
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", 
    "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", 
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const toastConfig = {
    autoClose: 2000
};

export default function GroupCreate (props) {
    const groupService = useGroupService();
    const guestService = useGuestService();

    const [additionalFieldsExpanded, setAdditionalFieldsExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [single, setSingle] = useState(false);
    const [title, setTitle] = useState("");
    const [invitedRehearsal, setInvitedRehearsal] = useState(false);
    const [invitedHappyHour, setInvitedHappyHour] = useState(false);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [people, setPeople] = useState([]);
    const [zip, setZip] = useState("");
    const [dialogOpen, setDialogOpen] = useState(props.group ? true : false);
    const [errors, setErrors] = useState({
        title: "",
        address: "",
        city: "",
        state: "",
        email: "",
        phone: "",
        zip: "",
        people: "",
    });

    const setDefaultValues = () => {
        setLoading(false);
        setSingle(false);
        setTitle("");
        setAdditionalFieldsExpanded(false);
        setInvitedHappyHour(false);
        setInvitedRehearsal(false);
        setAddress("");
        setCity("");
        setState("");
        setPhone("");
        setEmail("");
        setPeople([]);
        setZip("");
        setDialogOpen(false);
        setErrors({
            title: "",
            address: "",
            city: "",
            state: "",
            phone: "",
            email: "",
            zip: "",
            people: "",
        })
    }

    /**
     * If opened from an edit button, set all the fields to the group data
     */
    useEffect(() => {
        if (props.group) {
            setDialogOpen(true);
            setTitle(props.group.title);
            setInvitedRehearsal(props.group.invited_rehearsal);
            setInvitedHappyHour(props.group.invited_happy_hour);
            setEmail(props.group.email);
            setCity(props.group.city);
            setState(props.group.state);
            setAddress(props.group.address);
            setZip(props.group.zip);
            setErrors({
                title: "",
                address: "",
                phone: "",
                city: "",
                state: "",
                email: "",
                zip: "",
            });
            setPeople(props.group.guests);
        }
    }, [props.group])

    const updateTitle = (e) => {
        setTitle(e.target.value);
    }

    const updateEmail = (e) => {
        setEmail(e.target.value);
    }

    const updatePhone = (e) => {
        const val = e.target.value;
        if (/^\d{0,10}$/.test(val)) {
            setPhone(val);
        }
    }

    const updateAddress = (e) => {
        setAddress(e.target.value); 
    }

    const updateCity = (e) => {
        setCity(e.target.value);
    }

    const updateZip = (e) => {
        const val = e.target.value;
        if (/^\d{0,5}$/.test(val)) {
            setZip(val);
        }
    }

    const updateState = (e) => {
        if (!e.target.innerText) {
            setState(e.target.defaultValue);
        } else {
            setState(e.target.innerText);
        }
    }

    const addPerson = (e) => {
        updateError("people", "");
        const newPerson = {
            first: "",
            last: "",
        }
        setPeople([...people, newPerson]);  
    }

    const removePerson = async (idx) => {
        // If editing a current group you remove person from the backend
        if (people[idx].id) {
            setLoading(true);

            // Remove the guest from guest data model
            await guestService.deleteGuest(people[idx].id);
            
            // Update the guest Ids from group data model
            const guestIds = [...props.group.Guest_ids];
            const newGuestIds = [];
            for (let i = 0; i < guestIds.length; ++i) {
                if (guestIds[i] !== people[idx].id) {
                    newGuestIds.push(guestIds[i]);
                }
            }
            const groupData = {
                "id": props.group.id,
                "title": props.group.title,
                "invited_rehearsal": props.group.invited_rehearsal,
                "address": props.group.address,
                "city": props.group.city,
                "state": props.group.state,
                "zip": props.group.zip,
                "email": props.group.email,
                "invited_happy_hour": props.group.invited_happy_hour,
                "phone": props.group.phone,
                "Guest_ids": newGuestIds,
            };
            await groupService.updateGroup(groupData);

            setLoading(false);
        }
        // Update the front-end array: don't update the forms from the new group data, leave as-is
        let newPeople = [...people];
        newPeople.splice(idx, 1);
        setPeople(newPeople);
    }

    const updateFirst = (e, idx) => {
        let newPeople = [...people];
        let newPerson = newPeople[idx];
        newPerson.first = e.target.value;
        setPeople(newPeople);
    }

    const updateLast = (e, idx) => {
        let newPeople = [...people];
        let newPerson = newPeople[idx];
        newPerson.last = e.target.value;
        setPeople(newPeople);
    }

    const updateError = (key, val) => {
        let newErrors = {...errors};
        newErrors[key] = val;
        setErrors(newErrors);
    }

    const isValid = () => {
        let ret = true;
        // 10 digits optionally preceeded by 1
        const phone_regex = /^(1)?\d{10}$/;
        const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!single && title.length < 3) {
            updateError("title", "Specify at least 3 characters for the group title");
            ret = false;
        }
        // Email is optional but it better be correct
        if (email.length > 0 && !email_regex.test(email)) {
            updateError("email", "Specify a valid email address");
            ret = false;
        }
        // Phone is optional but it better be correct
        if (phone.length > 0 && !phone_regex.test(phone)) {
            updateError("phone", "Specify a valid phone number");
            ret = false;
        }
        // if (address.length < 3) {
        //     updateError("address", "Specify at least 3 characters for the address");
        //     ret = false;
        // }
        // if (city.length < 3) {
        //     updateError("city", "Specify at least 3 characters for the city");
        //     ret = false;
        // }
        // if (zip.length !==5) {
        //     updateError("zip", "Specify exactly 5 digits for the zip code");
        //     ret = false;
        // }
        // if (state.length <= 0) {
        //     updateError("state", "Specify a state");
        //     ret = false;
        // }
        if (people.length < 1) {
            ret = false;
            updateError("people", "Please add at least one person to the group");
        }
        for (let i = 0; i < people.length; ++i) {
            const currPerson = people[i];
            if (currPerson.first.length < 1 || currPerson.last.length < 0) {
                ret = false;
            }
        }
        return ret;
    }

    const save = async () => {
        if (isValid()) {
            setLoading(true);
            const guestIds = [];
            if (props.group === null) {
                for (let i = 0; i < people.length; ++i) {
                    const guestData = {
                        "first": people[i].first,
                        "last": people[i].last,
                        "attending_ceremony": -1,
                        "attending_happy_hour": false,
                        "attending_brunch": false,
                        "attending_rehearsal": false,
                    };
                    // console.log(guestData)
                    const newGuest = await guestService.createGuest(guestData);
                    guestIds.push(newGuest.id);
                }
                await groupService.createGroup({
                    "title": single ? people[0].first + " " + people[0].last : title,
                    "invited_rehearsal": invitedRehearsal,
                    "invited_happy_hour": invitedHappyHour,
                    "address": address,
                    "city": city,
                    "state": state,
                    "zip": zip,
                    "email": email,
                    "Guest_ids": guestIds,
                });
            } else {
                for (let i = 0; i < people.length; ++i) {
                    // Determine whether to edit existing data or create new
                    let guestData = {};
                    if (props.group && people[i].id ) {
                        guestData = {
                            "id": people[i].id,
                            "first": people[i].first,
                            "last": people[i].last,
                            "attending_ceremony": people[i].attending_ceremony,
                            "attending_happy_hour": people[i].attending_happy_hour,
                            "attending_brunch": people[i].attending_brunch,
                            "attending_rehearsal": people[i].attending_rehearsal,
                        }
                        const newGuest = await guestService.updateGuest(guestData);
                        guestIds.push(people[i].id);
                        console.log(newGuest);
                    } else {
                        guestData = {
                            "first": people[i].first,
                            "last": people[i].last,
                            "attending_ceremony": -1,
                            "attending_happy_hour": false,
                            "attending_brunch": false,
                            "attending_rehearsal": false,
                        }
                        const newGuest = await guestService.createGuest(guestData);
                        guestIds.push(newGuest.id);
                        console.log(newGuest);
                    }
                }
                const groupData = {
                    "id": props.group.id,
                    "title": title,
                    "invited_rehearsal": invitedRehearsal,
                    "address": address,
                    "city": city,
                    "state": state,
                    "zip": zip,
                    "email": email,
                    "phone": phone,
                    "invited_happy_hour": invitedHappyHour,
                    "Guest_ids": guestIds
                };
                await groupService.updateGroup(groupData);
            }
            setLoading(false);
            toast.success("Successfully created group", toastConfig);
            setDialogOpen(false);
            setDefaultValues();
            if (props.closeCallback) {
                props.closeCallback();
            }
        }
        return;
    }

    return (
        <div>
            {!props.group && !props.hideButton &&
            <div className="flexed wrap">
                <Button variant = "outlined"
                    disabled={props.disabled}
                    onClick = {() => {
                        setDialogOpen(!dialogOpen); 
                    }}
                    color="primary">
                    {props.disabled ? 
                    <ClipLoader className="iconLoader"></ClipLoader>
                    :<GroupAdd></GroupAdd>
                    } Create New Group
                </Button>
                <Button variant = "outlined"
                    disabled={props.disabled}
                    onClick = {() => {
                        const newPerson = {
                            first: "",
                            last: "",
                        }
                        setSingle(true);
                        setPeople([newPerson]);
                        setDialogOpen(!dialogOpen); 
                    }}
                    color="primary">
                    {props.disabled ? 
                    <ClipLoader className="iconLoader"></ClipLoader>
                    :<Add></Add>
                    } Add Single Guest
                </Button>
            </div>
            }

            <Dialog open={dialogOpen}>
                <DialogTitle>
                    {props.group ? "Edit Group" : single ? "Add Single Guest" : "Create New Group"}
                </DialogTitle>
                <DialogContent>
                    <div className="groupCreateFormContainer">
                        {single && people.length ? 
                            people.map((person, idx) =>
                                <div className = "addressFields">
                                    <TextField className = "groupCreateFormField"
                                        placeholder="John"
                                        value = {person.first}
                                        label = "First Name"
                                        required = {true}
                                        onChange = {(e) => {
                                            updateFirst(e, idx);
                                        }}>
                                    </TextField>
                                    <TextField className = "groupCreateFormField"
                                        placeholder="Doe"
                                        value = {person.last}
                                        label = "Last Name"
                                        required = {true}
                                        onChange = {(e) => {
                                            updateLast(e, idx);
                                        }}>
                                    </TextField>
                                </div>
                            )
                        :
                        <TextField className="groupCreateFormField"
                            fullWidth
                            placeholder="John and Jane Doe Family"
                            value = {title}
                            label = "Group Name"
                            error = {errors["title"].length > 0}
                            required = {true}
                            onChange = {(e) => {
                                updateTitle(e);
                            }}>
                        </TextField>
                        }
                        
                        <Accordion expanded = {additionalFieldsExpanded}>
                            <AccordionSummary onClick = {() => {
                                    setAdditionalFieldsExpanded(!additionalFieldsExpanded);
                                }}
                                expandIcon = {additionalFieldsExpanded ? 
                                    <Close fontSize="2rem" color="primary"></Close>
                                    : <ExpandMore fontSize="2rem" color="primary"></ExpandMore>}>
                                Optional Additional Fields
                            </AccordionSummary>
                            <AccordionDetails className="logisticsAccordion">
                                <TextField className="groupCreateFormField"
                                    fullWidth
                                    placeholder="jdoe@gmail.com"
                                    value = {email}
                                    label = {`${single ? "Guest" : "Group"} Email (optional)`}
                                    error = {errors["email"].length > 0}
                                    required = {false}
                                    onChange = {(e) => {
                                        updateEmail(e);
                                    }}>
                                </TextField>
                                <TextField className="groupCreateFormField"
                                    fullWidth
                                    placeholder="1234567890"
                                    value = {phone}
                                    label = {`${single ? "Guest" : "Group"} Phone Number (optional)`}
                                    error = {errors["phone"].length > 0}
                                    required = {false}
                                    onChange = {(e) => {
                                        updatePhone(e);
                                    }}>
                                </TextField>
                                <div className="addressFields">
                                    <TextField className = "groupCreateFormField"
                                        fullWidth
                                        placeholder="1234 Lakeshore Drive"
                                        value = {address}
                                        label = "Address 1st Line, Unit (optional)"
                                        error = {errors["address"].length > 0}
                                        required = {false}
                                        onChange = {(e) => {
                                            updateAddress(e);
                                        }}>
                                    </TextField>
                                    <TextField className = "groupCreateFormField"
                                        placeholder="San Diego"
                                        value = {city}
                                        label = "City (optional)"
                                        error = {errors["city"].length > 0}
                                        required = {false}
                                        onChange = {(e) => {
                                            updateCity(e);
                                        }}>
                                    </TextField>
                                    <TextField className = "groupCreateFormField"
                                        placeholder="12345"
                                        value = {zip}
                                        label = "Zip Code (optional)"
                                        error = {errors["zip"].length > 0}
                                        required = {false}
                                        inputProps={{ maxLength: 5 }} // Restrict input length to 5 characters for zip code
                                        onChange = {(e) => {
                                            updateZip(e);
                                        }}>
                                    </TextField>
                                    <Autocomplete className = "groupCreateFormField"
                                        value={state}
                                        fullWidth   
                                        options={us_states.map((option) => option)}
                                        onChange = {(e) => {
                                            updateState(e)
                                        }}
                                        renderInput={(params) => <TextField {...params} label="State (optional)" />}
                                    />
                                </div>
                            </AccordionDetails>
                        </Accordion>

                        {!single &&
                        <>
                            <div>
                                <Button color={`${errors.people && errors.people.length > 0 ? "error" : "primary"}`}
                                    onClick = {(e) => {
                                        addPerson(e);
                                    }}
                                    variant="outlined">
                                    <PersonAdd></PersonAdd> Add Person to Group
                                </Button>
                            </div>
                            {(people && people.length) ? people.map((person, idx) =>
                                <div className = "addressFields">
                                    <TextField className = "groupCreateFormField"
                                        placeholder="John"
                                        value = {person.first}
                                        label = "First Name"
                                        required = {true}
                                        onChange = {(e) => {
                                            updateFirst(e, idx);
                                        }}>
                                    </TextField>
                                    <TextField className = "groupCreateFormField"
                                        placeholder="Doe"
                                        value = {person.last}
                                        label = "Last Name"
                                        required = {true}
                                        onChange = {(e) => {
                                            updateLast(e, idx);
                                        }}>
                                    </TextField>
                                    <div className="closeContainer">
                                    <Tooltip title = "Remove Person">
                                        <IconButton 
                                            disabled = {loading}
                                            onClick = {() => {
                                            removePerson(idx);
                                        }}>
                                            {loading ? 
                                                <ClipLoader className="iconLoader"></ClipLoader>                                        
                                            :
                                                <Close></Close>
                                            }
                                        </IconButton>
                                    </Tooltip>
                                    </div>
                                </div>
                            ) : <></>}
                            </>
                        }

                        <div>
                            <div>
                            <Checkbox 
                                checked = {invitedRehearsal}
                                defaultChecked = {props.group && props.group.invited_rehearsal === true}
                                label = "Invited to Rehearsal"
                                onChange = {(e) => {setInvitedRehearsal(e.target.checked)}}>
                            </Checkbox> Invited to Rehearsal
                            </div>
                            <div>
                            <Checkbox value = {invitedHappyHour}
                                defaultChecked = {props.group && props.group.invited_happy_hour === true}
                                label = "Invited to Happy Hour"
                                onChange = {(e) => {setInvitedHappyHour(e.target.checked)}}>
                            </Checkbox> Invited to Happy Hour
                            </div>
                        </div>
                        
                    </div>

                    <div>
                        {errors.people && errors.people.length > 0 &&
                            <div className="error"> <ErrorOutline></ErrorOutline> {errors.people}</div>
                        }
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined"
                        color="secondary"
                        disabled = {loading}
                        onClick = {() => {
                            setDefaultValues();
                            props.cancelCallback();
                        }}>
                        {loading ? <ClipLoader className="iconLoader"></ClipLoader> : <Close></Close>} Close
                    </Button>
                    <Button variant="outlined"
                        color="primary"
                        disabled = {loading}
                        onClick = {() => {
                            save();
                        }}>
                        {loading ? <ClipLoader className="iconLoader"></ClipLoader> : <Save></Save>} Save
                    </Button>
                </DialogActions>
            </Dialog>
            
        </div>
    );
}