import { Cancel, Check, Edit, PersonAdd, Save } from "@mui/icons-material";
import { Button, TextField, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export default function AllergyForm (props) {

    // const [email, setEmail] = useState(props.email);
    // const [error, setError] = useState(false);
    // const [isEditing, setIsEditing] = useState(false);

    const [guests, setGuests] = useState(props.guests);
    // const [allergies, setAllergies] = useState([]);

    // Keep guests up-to-date with parent component
    // useEffect(() => {
    //     setGuests(props.guests);
    // }, [props.guests])

    const saveAllergies = async () => {
        await props.saveFunction(guests);
        // props.saveFunction(allergies);
    }

    const updateGuestAllergies = (idx, text) => {
        let prevGuests = [...guests];
        const updatedGuest = {...guests[idx], notes: text}
        prevGuests[idx] = updatedGuest;
        setGuests(prevGuests);
    }

    return (
    <div className="flexed col">
        <div className="flexed col">
            <div className="flexed logisticsItem centered">
                Please add allergies, dietary restrictions, and anything we need to be aware of for your group members.
            </div>
            {guests.map((guest, idx) =>
                <div key={`guest-allergy-${idx}`}
                    className="RSVPForm flexed col">
                    <div className="">
                        {guest.first} {guest.last}
                    </div>
                    <div>
                        <TextField id={`form-allergy-update-guest-${guest.id}`}
                            placeholder="Allergic to shellfish"
                            value={guest.notes}
                            fullWidth
                            label="Allergies & Dietary Restrictions"
                            onChange = {(e) => {
                                updateGuestAllergies(idx, e.target.value);
                            }}/>
                        {/* {guest.notes} */}
                    </div>
                </div>
            )}
            {/* <div className="groupChoiceButtons"> */}
                <Button variant="contained"
                    color="primary"
                    onClick = {() => {
                        // console.log(guests);
                        // set_people_selected([...group.guests]);
                        // setPeopleConfirmed(true);
                        saveAllergies();
                    }}>
                    {props.loading ? <ClipLoader className="iconLoader"></ClipLoader> : <><Save></Save> Save & Continue</>}
                </Button>
            {/* </div> */}
        </div>
    </div>
    );
}

// Email is optional but it better be correct
// if (email.length > 0 && !email_regex.test(email)) {
//     updateError("email", "Specify a valid email address");
//     ret = false;
// }