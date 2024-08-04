import { Check, Edit } from "@mui/icons-material";
import { Button, TextField, Tooltip } from "@mui/material";
import { useState } from "react";

const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export default function GroupEmailForm (props) {

    const [email, setEmail] = useState(props.email);
    const [error, setError] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const emailValid = (address) => {
        if (address.length < 1 || email_regex.test(address)) {
            return false;
        }
        return true;
    }

    const saveEmail = () => {
        props.saveFunction(email);
    }

    return (
    <div className="flexed col">
        {props.email && props.email.length > 0 ?
        <div className="flexed col">
            <div className="logisticsItem">
                <span>
                    The current best email we have for reaching your group is <span style={{fontWeight: "600"}}>{props.email}</span>
                </span>
            </div>
            <div className="flexed logisticsItem centered">
                Is this a good place to reach you? Or is there a better address?
            </div>
            {!isEditing &&
            <div className='groupChoiceButtons'>
                <Button variant="outlined"
                    color="secondary"
                    onClick = {() => {setIsEditing(true);}}>
                    <Edit></Edit> Edit Email
                </Button>
                <Button variant="outlined"
                    color="primary"
                    onClick = {() => {props.confirmFunction();}}>
                    <Check></Check> Complete RSVP
                </Button>
            </div>
            }
        </div>
        :
        <div className="flexed col">
            <div className="flexed logisticsItem centered">
                We currently don't an email on file for reaching your group. Please enter the best email address with which we can reach your group.
            </div>
        </div>
        }
        {(props.email.length === 0 || isEditing) &&
        <>
            <TextField id="form-email-update"
                // className="weddingGroupSearchField"
                placeholder="jdoe@gmail.com"
                value = {email}
                // disabled = {loading}
                error = {error}
                label = "Group Email"
                onChange = {(e) => {
                    setEmail(e.target.value);
                    setError(emailValid(e.target.value));
                }}/>
            <Button color="primary"
                variant="contained"
                onClick = {() => {
                    setIsEditing(false);
                    saveEmail();
                }}
                disabled = {!email_regex.test(email)}>
                Save
            </Button>
            </>
        }
    </div>
    );
}

// Email is optional but it better be correct
// if (email.length > 0 && !email_regex.test(email)) {
//     updateError("email", "Specify a valid email address");
//     ret = false;
// }