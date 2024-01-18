import { useCallback, useEffect, useState } from "react";
import { Faq } from "../models";

import { DataStore } from 'aws-amplify/datastore';
import { Cancel, ContactSupport } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";

import './Faq.css';
import { FaqItem } from "./FaqItem";
import { useFaqService } from "../Services/FaqService/FaqServiceContext";
// import { BeatLoader, CircleLoader, ClipLoader } from "react-spinners";
import Question from "../page_art/question/question";

import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FaqForm = (props) => {
  const FaqService = useFaqService();

  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [asking, setAsking] = useState(false);

  useEffect(() => {
    let isSubscribed = true; // flag to handle asynchronous calls
    setLoading(true);

    const getFaqs = async () => {
      try {
        const faqsData = await FaqService.fetchFaqs();
        if (isSubscribed) {
          setFaqs(faqsData);
          toast.success("Retrieved Questions Successfully.", { autoClose: 2000})
        }

      } catch (error) {
        console.log('Error Retrieving Questions.', error);
        toast.error("Error Retrieving Questions.", { autoClose: 2000});
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    };
    getFaqs();

    return () => {
      // setLoading(false);
      isSubscribed = false; // cleanup to prevent setting state on unmounted component
    };
  }, []);

  /**
   * Callback function when a Faq question is answered on item component
   */
  const answerCallback = useCallback(async (id, answer) => {
    setLoading(true);
    try {
      const newFaqs = await FaqService.answerFaq(id, answer);
      setFaqs([...newFaqs]);
      toast.success("Answer Updated Successfully.", { autoClose: 2000 });
    } catch (e) {
      console.log("Error on answer callback ", e);
      toast.error("Failure to Update Answer.", { autoClose: 2000 });
    }
    setLoading(false);
  }, []);

  /**
   * Callback function for FaqItem pin icon clicks
   */
  const pinCallback = useCallback(async (id, pinned) => {
    setLoading(true);
    try {
      const newFaqs = await FaqService.pinFaq(id, pinned)
      setFaqs([...newFaqs]);
      toast.success(`Question Successfully ${pinned ? "Unpinned" : "Pinned"}.`, { autoClose: 2000});
    } catch (e) {
      console.log("Error on pin callback ", e);
      toast.error("Failure to Toggle Pin.", { autoClose: 2000 });
    }
    setLoading(false);
  }, []); 
  
  /**
   * Callback function for FaqItem delete icon clicks
   */
  const deleteCallback = useCallback(async (id) => {
    try {
      const newFaqs = await FaqService.deleteFaq(id);
      setFaqs([...newFaqs]);
      toast.success('Question Deleted Successfully.', { autoClose: 2000});
    } catch (e) {
      console.log("Error on delete callback", e);
      toast.error("Failure to Delete Question.", { autoClose: 2000});
    }
  }, []);

  const createFaq = async () => {
    if (question.length < 10) {
      return;
    }
    setLoading(true);
    try {
      const newFaqs = await FaqService.createFaq({"question": question, "likes": 0, "pinned": false});
      
      // const post = await DataStore.save(
      //   new Faq({
      //     question: question,
      //     likes: 0,
      //     pinned: false,
      //     // answer: 'Test FAQ Answer'
      //   })
      // );
      // const newFaqs = await DataStore.query(Faq);
      setFaqs([...newFaqs]);
      setQuestion("");
      toast.success("New Question Added Successfully", { autoClose: 2000});
      // console.log('Faq saved successfully!', post);
    } catch (error) {
      console.log('Error saving Faq', error);
      toast.error("Failure to Add New Question", { autoClose: 2000});
    }
    setLoading(false);
    setAsking(false);
  };

  return (
    <div className="weddingBody">
      <ToastContainer></ToastContainer>
      <div className="questionPanel">
        <h1>Frequently Asked Questions</h1>
      </div>

      {/* {loading && <CircularProgress></CircularProgress>} */}
      {/* <BeatLoader loading = {loading}></BeatLoader> */}
      {/* <CircleLoader size = {200} loading = {loading}></CircleLoader> */}
      {/* <ClipLoader size = {0}
        className="faqLoader"
        color = "primary"
        loading = {loading}></ClipLoader> */}

      <Question size = {props.size ? props.size : 400}
        loading = {loading}>
      </Question>

      {!loading && <Button variant="outlined"
          onClick = {() => {setAsking(!asking)}}>
          {asking ? <><Cancel></Cancel> Cancel</>
          : <><ContactSupport></ContactSupport> Ask a Question</>
          }
        </Button>}

      <div className={`questionForm ${asking ? "open" : "closed"}`} 
        onSubmit = {() => {createFaq();}}>
        <TextField multiline={true}
          placeholder="Will there be vegetarian options?"
          value={question}
          label="Your Question"
          onChange = {(e) => {setQuestion(e.target.value)}}>
        </TextField>
        <Button variant="outlined"
          onClick = {() => {createFaq();}}>
          Submit Question
        </Button>
      </div>


      {!loading && faqs.filter(faq => faq.answer).length > 0 &&
      <>
        <h2>Answered Questions</h2>
        <div className="faqItems">
        {faqs.filter(faq => faq.answer).sort((a, b) => {
    if (a.pinned && !b.pinned) {
        return -1; // a comes before b
    }
    if (!a.pinned && b.pinned) {
        return 1; // b comes before a
    }
    return 0; // no change in order
}).map(faq =>
  <FaqItem faq={faq}
      key={`faq-answered-${faq.id}`}
      answerCallback={answerCallback}
      pinCallback={pinCallback}
      deleteCallback={deleteCallback}></FaqItem>
          // <div key={`faq-answered-${faq.id}`}
          //   className="faqItem">
          //     <div className="faqBody">
          //       <PushPin>

          //       </PushPin>
          //       <div>{faq.question}</div>
          //       {faq.answer ? <div>{faq.answer}</div> : <Input placeholder="answer"></Input>}
          //     </div>
          //   {/* <IconButton><Edit></Edit></IconButton> */}
          //   { user !== null &&
          //   <>
          //     <IconButton color="primary"
          //       onClick = {() => {pinFaq(faq.id, faq.pinned)}}>
          //       <PushPin></PushPin>
          //     </IconButton>
          //     <IconButton color="primary"
          //       onClick = {() => {deleteFaq(faq.id)}}>
          //       <Delete>
          //       </Delete>
          //     </IconButton>
          //   </>
          //   }
            
          //   {/* <Edit></Edit> */}
          //   {/* <Delete onClick = {() => {deleteFaq(faq.id)}}></Delete> */}
          // </div>
        )}
        </div>
      </>
      }

      {/* Unanswered Questions here */}
      {!loading && faqs.filter(faq => !faq.answer).length > 0 &&
      <>
        <h2>Unanswered Questions</h2>
        <div className="faqItems">
          {faqs.filter(faq => !faq.answer).sort((a, b) => {
    if (a.pinned && !b.pinned) {
        return -1; // a comes before b
    }
    if (!a.pinned && b.pinned) {
        return 1; // b comes before a
    }
    return 0; // no change in order
}).map(faq =>
    <FaqItem faq={faq}
      key={`faq-unanswered-${faq.id}`}
      answerCallback={answerCallback}
      pinCallback={pinCallback}
      deleteCallback={deleteCallback}></FaqItem>
          )}
        </div>
      </>
      }
    </div>
  );
};

export default FaqForm;
