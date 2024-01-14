import { useCallback, useContext, useEffect, useState } from "react";
import { Faq } from "../models";

import { DataStore } from 'aws-amplify/datastore';
import { Cancel, ContactSupport, Delete, PushPin } from "@mui/icons-material";
import { Button, CircularProgress, IconButton, Input } from "@mui/material";

import './Faq.css';
import { AuthContext } from "../Contexts/AuthContext/AuthContext";
import { FaqItem } from "./FaqItem";
import { useFaqService } from "../Services/FaqService/FaqServiceContext";
import { BeatLoader, CircleLoader, ClipLoader } from "react-spinners";
import Question from "../page_art/question/question";

const FaqForm = () => {
  const FaqService = useFaqService();

  // Get current user data for context
  const {user, login, logout} = useContext(AuthContext);

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
        }

        // const faqsData = await DataStore.query(Faq);
        // console.log('faqs retrieved successfully!', JSON.stringify(faqsData, null, 2));
        // if (isSubscribed) {
        //   setFaqs(faqsData);
        // }
      } catch (error) {
        console.log('Error retrieving faqs', error);
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
    } catch (e) {
      console.log("Error on answer callback ", e);
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
    } catch (e) {
      console.log("Error on pin callback ", e);
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
    } catch (e) {
      console.log("Error on delete callback");
    }
  }, []);

  const deleteFaq = async (id) => {
    setLoading(true);
    try {
      const newFaqs = await FaqService.deleteFaq(id);
      setFaqs([...newFaqs]);

      // const faqToDelete = await DataStore.query(Faq, id);
      // await DataStore.delete(faqToDelete);
      // const updateFaqs = faqs.filter(faq => faq.id !== id);
      // setFaqs([...updateFaqs]);
    } catch (error) {
      console.log("Error deleting faq", error);
    }
    setLoading(false);
  }

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
      // console.log('Faq saved successfully!', post);
    } catch (error) {
      console.log('Error saving Faq', error);
    }
    setLoading(false);
    setAsking(false);
  };

  /**
   * Toggles the pinning of a FAQ
   * 
   * @param {Id of the FAQ element} id 
   * @param {Whether the current FAQ element is currently pinned} pinned 
   */
  const pinFaq = async (id, pinned) => {
    setLoading(true);
    try {
      const faqToUpdate = await DataStore.query(Faq, id);
      const updatedFaq = Faq.copyOf(faqToUpdate, updated => {
        updated.pinned = !pinned;
      });
      const result = await DataStore.save(updatedFaq);
      const newFaqs = await DataStore.query(Faq);
      setFaqs([...newFaqs]);

      // Update the tour object with the new data
      // const updatedTour = Tour.copyOf(originalTour, updated => {
      //   updated.excursions = tour.excursions;
      //   updated.price = tour.price;
      //   updated.priceChild = tour.priceChild;
      //   updated.url = tour.url;
      //   updated.whatToBring = tour.whatToBring;
      //   updated.includes = tour.includes;
      //   updated.content = tour.content;
      // });
  
      // // Save the updated tour object to the DataStore
      // const result = await DataStore.save(updatedTour);
    } catch (error) {
      console.log("Error pinning question", error);
    }
    setLoading(false);
  }

  return (
    <div className="weddingBody">
      {/* {user!==null && <h1>Signed In!</h1>} */}
      <div className="questionPanel">
        <h1>Frequently Asked Questions</h1>
      </div>

      {/* {loading && <CircularProgress></CircularProgress>} */}
      {/* <BeatLoader loading = {loading}></BeatLoader> */}
      {/* <CircleLoader size = {200} loading = {loading}></CircleLoader> */}
      <ClipLoader size = {0}
        className="faqLoader"
        color = "primary"
        loading = {loading}></ClipLoader>

      <Question size = {400}
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
        <Input type="text"
          multiline={true}
          value={question}
          placeholder="Your Question"
          onChange = {(e) => {setQuestion(e.target.value)}}>
        </Input>
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
