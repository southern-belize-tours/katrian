import { useCallback, useEffect, useState } from "react";

import { Cancel, Close, ContactSupport, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Button, TextField, Tooltip } from "@mui/material";

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
  const [initialized, setInitialized] = useState(false);
  const [asking, setAsking] = useState(false);
  const [sanDiegoExpanded, setSanDiegoExpanded] = useState(false);
  const [answeredOpened, setAnsweredOpened] = useState(true);
  const [unansweredOpened, setUnansweredOpened] = useState(false);

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
        // console.log('Error Retrieving Questions.', error);
        toast.error("Error Retrieving Questions.", { autoClose: 2000});
      } finally {
        if (isSubscribed) {
          setLoading(false);
          setInitialized(true);
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
      {fade &&
        <Question size = {props.size ? props.size : 400}
          opaque = {initialized}
          loading = {loading}>
        </Question> 
      }
      <h1 className={`logisticsText ${fade ? "" : "fading"}`}>Frequently Asked Questions</h1>
      {!loading && <Button variant="outlined"
          onClick = {() => {setAsking(!asking)}}>
          {asking ? <><Cancel></Cancel> Cancel</>
          : <><ContactSupport></ContactSupport> Ask a Question</>
          }
        </Button>}

      {/* Question Form */}
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

      {/* San Diego */}
      <Tooltip title={`${sanDiegoExpanded ? "" : "View Our Recommended San Diego Activities"}`}>
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
              <div className="padded-left logisticsItem flexed col">
                <div className="sanDiegoTitle">Swim with the leopard sharks</div>
                The south side of La Jolla Shores beach has tons of leopard sharks that migrate there for mating during this time of year. They are perfectly safe to swim with.
              </div>
              <div className="padded-left logisticsItem flexed col">
                <div className="sanDiegoTitle">Del Mar Horse Races</div>
                The Del Mar Horse Races are always a unique and fantastic experience. August 2025, Del Mar will be hosting the world championships for the "Breeder's Cup," which is a seriosly big deal. The races will no doubt be very busy, but will likely be an unforgettable time. During the week after opening on a typical summer, traffic getting into Del Mar can take up to 30 minutes of driving. So one can imagine that it would be best to get into town quite early if you plan on going to the races on Saturday.
              </div>
              <div className="padded-left logisticsItem flexed col">
                <div className="sanDiegoTitle">Kayak or Paddleboard</div>
                La Jolla has plenty of affordable rentals for kayaking or paddleboarding where you can adventure and see the marine life that visits during the late summer.
              </div>
              <div className="padded-left logisticsItem flexed col">
              <div className="sanDiegoTitle">Brunch</div>
                La Jolla Cove has plenty of great brunch spots, aside from our Saturday Brunch location. "Sugar and Scribe" is one of our favorite brunch spots.
              </div>
              <div className="padded-left logisticsItem flexed col">
                <div className="sanDiegoTitle">Mexican Food</div>
                San Diego and La Jolla have some of the greatest Mexican food north of the border. La Jolla Cove has our favorite place in town, "The Taco Stand." Downtown "Tacos El Gordo" and "TJ Tacos" have the Tijuana-style meats that are unbeatable.
              </div>
              <div className="padded-left logisticsItem flexed col">
                <div className="sanDiegoTitle">Party</div>
                San Diego has plenty of beach towns, each with their own unique party scenes. La Jolla and Del Mar are best for enjoying a fancy cocktail while watching the sunset. Pacific Beach has lots of great places, especially for younger crowds - "PB Waterbar" and "Backyard" are fun places to grab a drink and dance. Downtown Gaslamp Quarter is ideal for a bar crawl: our favorite places are "The Tipsy Crow" and "Moonshine Flats".
              </div>
              <div className="padded-left logisticsItem flexed col">
                <div className="sanDiegoTitle">Breweries</div>
                There are lots of great breweries in San Diego. Miramar is closest to La Jolla and is home to some of our favorite spots like "Mikeller,", and "Juneshine." Downtown Gaslamp District has some good ones too, like "Bolt Brewing."
              </div>
              <div className="padded-left logisticsItem flexed col">
                <div className="sanDiegoTitle">Wine Tasting</div>
                If you have a half-day or full-day to spend in town, there are some great wine tasting areas less than an hour away. Temecula, Julian, and Ramona all offer some great wine-tasting experiences. Julian will also have apple picking and pies to try if you can make it out there!
              </div>
              <div className="padded-left logisticsItem flexed col">
                <div className="sanDiegoTitle">Bike/walk Mission Bay</div>
                Between Pacific Beach and Ocean Beach is a large picturesque beach strip that is a wonderful afternoon walk. There will always be something interesting going on, with plenty of places to explore, eat, or drink.
              </div>
              <div className="padded-left logisticsItem flexed col">
                <div className="sanDiegoTitle">Golf</div>
                Torrey Pines is world-reknowned and very close to La Jolla Cove. For a more affordable/less well-planned teeing, Miramar is also a nice place to golf. A farther location that balances quality with affordability is the Rancho Bernardo Country Club. 
              </div>
              <div className="padded-left logisticsItem flexed col">
                <div className="sanDiegoTitle">See the Coast</div>
                San Diego is home to some of the most picturesque coastline in southern California. For some awe-inspiring beauty, it is always worth a visit to Sunset Cliffs, or to the top of Black's Beach.
              </div>
              <div className="padded-left logisticsItem flexed col">
                <div className="sanDiegoTitle">Visit Balboa Park</div>
                Balboa Park is a massive largest public park and it is well worth spending at least a half-day walking through the park itself. Inside the park is a theatre, exotic garden, japanese garden, and museum - all of which are well-worth checking out!
              </div>
              <div className="padded-left logisticsItem flexed col">
                <div className="sanDiegoTitle">See the Zoos</div>
                 If you have an extra day in San Diego, the San Diego Zoo is one of the largest Zoos around and is very worth visiting. A little farther away is the San Diego safari park, where you can see huge enclosures where all the savannah animals roam freely. It is one of the only zoos where you can see a platypus, and walk with the wallabies.  
              </div>
              <div className="padded-left logisticsItem flexed col">
                <div className="sanDiegoTitle">Dog Beaches</div>
                San Diego is ranked the most dog-friendly city in the US and is home to some great dog beaches. One of our favorite sunday morning activities is to grab a fantastic coffee and sandwich at Achilles Coffee and walk to the Del Mar Dog Beach.
              </div>
              <div className="padded-left logisticsItem flexed col">
                <div className="sanDiegoTitle">Coronado Island</div>
                This is one of the iconic sites of California and should not be skipped if you have the time. The Hotel Coronado has beautifull authentic architecture, and the beaches along the island are impeccable and perfect. The island is stunning and completely unique.
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      </Tooltip>

      {/* Answered FAQs */}
      <Tooltip title={`${answeredOpened ? "" : "View User-Submitted Questions with Answers"}`}>
      {!loading && faqs.filter(faq => faq.answer).length > 0 &&
      <div className={`logisticsText ${fade ? "" : "fading"}`}>
        <Accordion expanded = {answeredOpened}>
          <AccordionSummary onClick = {() => {setAnsweredOpened(!answeredOpened);}}
            expandIcon = {answeredOpened ? <Close fontSize="2rem" color="primary"></Close> : <ExpandMore fontSize="2rem" color="primary"></ExpandMore>}>
            Submitted Questions
          </AccordionSummary>
          <AccordionDetails>
            <div className="faqItems">
              {faqs.filter(faq => faq.answer).sort((a, b) => {
                if (a.pinned && !b.pinned) {
                  return -1;
                }
                if (!a.pinned && b.pinned) {
                  return 1;
                }
                return 0;
              }).map(faq =>
                <FaqItem faq={faq}
                  key={`faq-answered-${faq.id}`}
                  answerCallback={answerCallback}
                  pinCallback={pinCallback}
                  deleteCallback={deleteCallback}>
                </FaqItem>
              )}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      }
      </Tooltip>

      {/* Unanswered Questions here */}
      <Tooltip title={`${unansweredOpened ? "" : "View Questions we haven't gotten to answering yet"}`}>
      {!loading && faqs.filter(faq => !faq.answer).length > 0 &&
        <div className={`logisticsText ${fade ? "" : "fading"}`}>
          <Accordion expanded={unansweredOpened}>
            <AccordionSummary onClick = {() => {setUnansweredOpened(!unansweredOpened)}}
              expandIcon = {unansweredOpened ? <Close fontSize="2rem" color="primary"></Close> : <ExpandMore fontSize="2rem" color="primary"></ExpandMore>}>
              Unanswered Questions
            </AccordionSummary>
            <AccordionDetails>
              <div className="faqItems">
                {faqs.filter(faq => !faq.answer).sort((a, b) => {
                  if (a.pinned && !b.pinned) {
                    return -1;
                  }
                  if (!a.pinned && b.pinned) {
                    return 1;
                  }
                  return 0;
                  }).map(faq =>
                  <FaqItem faq={faq}
                    key={`faq-unanswered-${faq.id}`}
                    answerCallback={answerCallback}
                    pinCallback={pinCallback}
                    deleteCallback={deleteCallback}>
                  </FaqItem>
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      }
      </Tooltip>
      
    </div>
  );
};

export default FaqForm;
