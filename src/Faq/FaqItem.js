import { Delete, Edit, PushPin } from "@mui/icons-material";
import { Button, IconButton, TextField, Tooltip } from "@mui/material";
// import { useFaqService } from "../Services/FaqService/FaqServiceContext";
import { useContext, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext/AuthContext";

export const FaqItem = ({faq, answerCallback, pinCallback, deleteCallback}) => {
    const {user} = useContext(AuthContext);
    const [answer, setAnswer] = useState(faq.answer ? faq.answer : "");
    const [isEditing, setIsEditing] = useState(false);

    return (
    <div key={`faq-item-${faq.answer && faq.answer.length ? "answered" : "unanswered"}-${faq.id}`}
        className="faqItem">
        <Tooltip title={`${faq.pinned ? "The Planners have Pinned this Question." : ""}`}>
            <PushPin color="primary"
                className = {`faqPin ${faq.pinned ? "pinned" : ""}`}>
            </PushPin>
        </Tooltip>
        <div className="faqBody">
            <div className="faqQuestion">{faq.question}</div>
            {faq.answer && faq.answer.length &&
            <div className="faqAnswer">
                {isEditing ? 
                <>
                {/* <div className="faqAnswer"> */}
                    <TextField id={`answer-faq-${faq.id}`}
                        className="faqAnswerText"
                        label="Answer"
                        multiline = "true"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        variant="outlined">
                    </TextField>
                    <Button variant="outlined"
                        onClick = {async () => {
                            await answerCallback(faq.id, answer);
                            setIsEditing(false);
                            setAnswer(faq.answer);
                        }}>
                        Update Answer
                    </Button>
                {/* </div> */}
                </>
                : 
                <div>{faq.answer}</div>
                }
            </div>
            }
            {(user && user.isSignedIn && !faq.answer) &&
            <div className="faqAnswer">
                <TextField id={`answer-faq-${faq.id}`}
                    className="faqAnswerText"
                    label="Answer"
                    multiline = "true"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    variant="outlined">
                </TextField>
                <Button variant="outlined"
                    onClick = {async () => {
                        await answerCallback(faq.id, answer);
                        setIsEditing(false);
                        setAnswer(faq.answer);
                    }}>
                    Submit Answer
                </Button>
            </div>
            }
        </div>
        {user && user.isSignedIn &&
        <div className="faqToolbar">
            <Tooltip title={`${faq.pinned ? "Unpin Question" : "Pin Question"}`}>
                <IconButton color={`${faq.pinned ? "primary" : "secondary"}`}
                    onClick = {async () => {
                        await pinCallback(faq.id, faq.pinned);
                       }}>
                    <PushPin></PushPin>
                </IconButton>
            </Tooltip>
            <Tooltip title={`${isEditing ? "Stop Editing Answer" : "Edit Answer"}`}>
                <IconButton color={`${isEditing ? "secondary" : "primary"}`}
                    onClick = {() => {setIsEditing(!isEditing);}}>
                    <Edit></Edit>
                </IconButton>
            </Tooltip>
            <Tooltip title = "Delete Question">
                <IconButton color="primary"
                    onClick = {async () => {
                        await deleteCallback(faq.id);
                        }}>
                    <Delete>
                    </Delete>
                </IconButton>
            </Tooltip>
        </div>
        }
    </div>
    );
}