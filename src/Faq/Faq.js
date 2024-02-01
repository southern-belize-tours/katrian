import { useCallback, useEffect, useState } from "react";

import { Cancel, Close, ContactSupport, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Button, TextField } from "@mui/material";

import sealImage from '../images/Gallery/seals.png'

import './Faq.css';
import { FaqItem } from "./FaqItem";
import { useFaqService } from "../Services/FaqService/FaqServiceContext";
// import { BeatLoader, CircleLoader, ClipLoader } from "react-spinners";
import Question from "../page_art/question/question";

import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FaqForm = (props) => {
  const FaqService = useFaqService();

  const [fade, setFade] = useState(true);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [asking, setAsking] = useState(false);
  const [sanDiegoExpanded, setSanDiegoExpanded] = useState(false);

  useEffect(() => {
    let isSubscribed = true; // flag to handle asynchronous calls
    setLoading(true);

    const getFaqs = async () => {
      try {
        const faqsData = await FaqService.fetchFaqs();
        if (isSubscribed) {
          setFaqs(faqsData);
        }

      } catch (error) {
        console.log('Error Retrieving Questions.', error);
        toast.error("Error Retrieving Questions.", { autoClose: 2000});
      } finally {
        if (isSubscribed) {
          setLoading(false);
          setTimeout(() => {
            setFade(false)
          }, 0);
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
      const newFaqs = await FaqService.createFaq({
        "question": question,
        "likes": 0,
        "pinned": false
      });
      setFaqs([...newFaqs]);
      setQuestion("");
      toast.success("New Question Added Successfully", { autoClose: 2000});
    } catch (error) {
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
      <div className={`logisticsText ${fade ? "" : "fading"}`}>
        <Accordion id="San-Diego-Activities"
          expanded = {sanDiegoExpanded}>
          <AccordionSummary onClick = {() => {setSanDiegoExpanded(!sanDiegoExpanded)}}
            expandIcon={sanDiegoExpanded ? <Close fontSize="2rem" color="primary"></Close> : <ExpandMore fontSize="2rem" color="primary"></ExpandMore>}>
              San Diego Activities
          </AccordionSummary>
          <AccordionDetails>
            <div className="flexed col">
              <div className="padded-left logisticsItem flexed col">
                <div className="sanDiegoTitle">See the Seals</div> La Jolla Cove is home to seals that migrate with their pups during the summer and will be there during the wedding weekend.
              </div>
              <div className="padded-left logisticsItem flexed">
                <div className="sanDiegoTitle"></div>
                Swim with the leopard sharks - The south side of La Jolla Shores beach has tons of leopard sharks that migrate there for mating during this time of year. They are perfectly safe to swim with.
              </div>
              <div className="padded-left logisticsItem flexed">
                Kayak or Paddleboard - La Jolla has plenty of affordable rentals for kayaking or paddleboarding where you can adventure and see the marine life that visits during the late summer.
              </div>
              <div className="padded-left logisticsItem flexed">
                Brunch - La Jolla Cove has plenty of great brunch spots, aside from our Saturday Brunch location. "Sugar and Scribe" is one of our favorite brunch spots.
              </div>
              <div className="padded-left logisticsItem flexed">
                Mexican Food - San Diego and La Jolla have some of the greatest Mexican food north of the border. La Jolla Cove has our favorite place in town, "The Taco Stand." Downtown "Tacos El Gordo" and "TJ Tacos" have the Tijuana-style meats that are unbeatable.
              </div>
              <div className="padded-left logisticsItem flexed">
                Party - San Diego has plenty of beach towns, each with their own unique party scenes. La Jolla and Del Mar are best for enjoying a fancy cocktail while watching the sunset. Pacific Beach has lots of great places, especially for younger crowds - "PB Waterbar" and "Backyard" are fun places to grab a drink and dance. Downtown Gaslamp Quarter is ideal for a bar crawl: our favorite places are "The Tipsy Crow" and "Moonshine Flats".
              </div>
              <div className="padded-left logisticsItem flexed">
                Beers - There are lots of great breweries in San Diego. Miramar is closest to La Jolla and is home to some of our favorite spots like "Mikeller,", and "Juneshine." Downtown Gaslamp District has some good ones too, like "Bolt Brewing."
              </div>
              <div className="padded-left logisticsItem flexed">
                Wine Tasting - If you have a half-day or full-day to spend in town, there are some great wine tasting areas less than an hour away. Temecula, Julian, and Ramona all offer some great wine-tasting experiences. Julian will also have apple picking and pies to try if you can make it out there!
              </div>
              <div className="padded-left logisticsItem flexed">
                Bike/walk Mission Bay - Between Pacific Beach and Ocean Beach is a large picturesque beach strip that is a wonderful afternoon walk. There will always be something interesting going on, with plenty of places to explore, eat, or drink.
              </div>
              <div className="padded-left logisticsItem flexed">
                Golf - Torrey Pines is world-reknowned and very close to La Jolla Cove. For a more affordable/less well-planned teeing, Miramar is also a nice place to golf. A farther location that balances quality with affordability is the Rancho Bernardo Country Club. 
              </div>
              <div className="padded-left logisticsItem flexed">
                See the Coast - San Diego is home to some of the most picturesque coastline in southern California. For some awe-inspiring beauty, it is always worth a visit to Sunset Cliffs, or to the top of Black's Beach.
              </div>
              <div className="padded-left logisticsItem flexed">
                Visit Balboa Park - Balboa Park is a massive largest public park and it is well worth spending at least a half-day walking through the park itself. Inside the park is a theatre, exotic garden, japanese garden, and museum - all of which are well-worth checking out!
              </div>
              <div className="padded-left logisticsItem flexed">
                See the Zoos - If you have an extra day in San Diego, the San Diego Zoo is one of the largest Zoos around and is very worth visiting. A little farther away is the San Diego safari park, where you can see huge enclosures where all the savannah animals roam freely. It is one of the only zoos where you can see a platypus, and walk with the wallabies.  
              </div>
              <div className="padded-left logisticsItem flexed">
                Dog Beaches - San Diego is ranked the most dog-friendly city in the US and is home to some great dog beaches. One of our favorite sunday morning activities is to grab a fantastic coffee and sandwich at Achilles Coffee and walk to the Del Mar Dog Beach.
              </div>
              <div className="padded-left logisticsItem flexed">
                Coronado Island - This is one of the iconic sites of California and should not be skipped if you have the time. The Hotel Coronado has beautifull authentic architecture, and the beaches along the island are impeccable and perfect. The island is stunning and completely unique.
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      {/* At the south side of La Jolla Shores beach there will be leopard sharks that migrate there during the summer and are perfectly safe to swim with. During this time of year, La Jolla Cove is also frequented by lots of seals with their pups. Downtown La Jolla has plenty of fun shops, galleries, and restaurants. La Jolla Cove has lots of great brunch spots and is worth walking through as well: "Sugar and Scribe" is one of our favorite brunch spots, and "The Taco Stand" is one of our favorite Mexican places. Torrey Pines and Blacks Beach both offer beautiful coastal views. If you have not visited San Diego before, it is also worth trying to see Pacific Beach, Sunset Cliffs, Ocean Beach, Mission Beach, and the Downtown Gaslamp District. */}

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
