import { useCallback, useEffect, useState } from "react";

import { BeachAccess, Cancel, Castle, Check, Close, ContactSupport, DirectionsBike, EggAlt, EmojiNature, ExpandMore, GolfCourse, Kayaking, LiquorOutlined, LocalDining, Pets, ScubaDiving, SportsBar, SportsScore, Waves, WineBar, Yard } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Button, TextField, Tooltip } from "@mui/material";

import sd_brewing_image from '../images/FAQ/sd_brewing_map.jpg';
import seal_image from '../images/FAQ/la_jolla_seals.jpg';
import leopard_shark_image from '../images/FAQ/leopard_sharks.png';
import del_mar_image from '../images/FAQ/del_mar.jpg';
import kayak_image from '../images/FAQ/kayak.jpg';
import morning_glory_image from '../images/FAQ/morning_glory.webp';
import taco_stand_image from '../images/FAQ/taco_stand.jpeg';
import pb_image from '../images/FAQ/pb.jpg';
import temecula_image from '../images/FAQ/temecula.jpg';
import mission_beach_image from '../images/FAQ/mission_beach.webp';
import tp_image from '../images/FAQ/torrey_pines.jpeg';
import sunset_cliffs_image from '../images/FAQ/sunset_cliffs.jpg';
import balboa_image from '../images/FAQ/balboa_park.jpg';
import zoo_image from '../images/FAQ/zoo.webp';
import dog_beach_image from '../images/FAQ/dog_beach.jpg';
import coronado_image from '../images/FAQ/coronado.webp';

import './Faq.css';
import { FaqItem } from "./FaqItem";
import { useFaqService } from "../Services/FaqService/FaqServiceContext";
import Question from "../page_art/question/question";

import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FaqForm = (props) => {
  const FaqService = useFaqService();

  const [fade, setFade] = useState(true);
  const [error, setError] = useState("");
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
  }, [FaqService]);

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
  }, [FaqService]);

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
  }, [FaqService]); 
  
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
  }, [FaqService]);

  const createFaq = async () => {
    if (question.length < 10) {
      setError("Please specify at least 10 characters of text for your question.")
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
      setError("");
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
      {(!loading && !asking) && <Button variant="outlined"
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
          error={error}
          label="Your Question"
          onChange = {(e) => {setQuestion(e.target.value)}}>
        </TextField>
        {error.length > 0 &&
          <div className="errorMessage">
            {error}
          </div>
        }
        <div className="questionFormButtons">
          <Button variant="outlined"
            onClick = {() => {createFaq();}}>
            <Check></Check> Submit Question
          </Button>
          <Button variant="outlined"
            color="secondary"
            onClick = {() => {
              setQuestion("");
              setError("");
              setAsking(false);
            }}>
              <Cancel></Cancel> Cancel
          </Button>
        </div>
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
              <div className="logisticsItem flexed col">
                <div className="sanDiegoTitle"><BeachAccess fontSize="2rem" color="primary"></BeachAccess> See the Seals</div> 
                <div className="thingsToDoItem">
                  <img src={seal_image}
                    alt="See the seals"
                    className="thingsToDoImage">
                  </img>
                  <div>
                    La Jolla Cove is home to seals that migrate with their pups during the summer and will be there during the wedding weekend. <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/ipsG4tQ38vL6n9bX7" className="secondary" target="_blank" rel="noreferrer">Seal Rock</a></Tooltip> is a good place to see them.
                  </div>
                </div>
              </div>
              <div className="logisticsItem flexed col">
                <div className="sanDiegoTitle"><ScubaDiving fontSize="2rem" color="primary"></ScubaDiving> Swim with the leopard sharks</div>
                <div className="thingsToDoItem">
                  <img src={leopard_shark_image}
                    alt="Swim with the Sharks"
                    className="thingsToDoImage">
                  </img>
                  <div>
                    <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/43z5Wd8YGQV1WiXE6" target="_blank" rel="noreferrer" className="secondary">The south side of La Jolla Shores Beach</a></Tooltip> has tons of leopard sharks that migrate there for mating during this time of year. They are perfectly safe to swim with, and you do not need to wade far out to see them.
                  </div>
                </div>
              </div>
              <div className="logisticsItem flexed col">
                <div className="sanDiegoTitle"><SportsScore fontSize="2rem" color="primary"></SportsScore>Del Mar Horse Races</div>
                <div className="thingsToDoItem">
                  <img src={del_mar_image}
                    alt="Go to the Del Mar Horse Races"
                    className="thingsToDoImage">
                  </img>
                  <div>
                    <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/fnwQnAgJNm9hniu27" rel="noreferrer" target="_blank" className="secondary">The Del Mar Horse Races</a></Tooltip> are always a unique and fantastic experience. August 2025, Del Mar will be hosting the world championships for the "Breeder's Cup," which will be a really big event (which will likely need <Tooltip title="View Ticket Purchasing Site"><a href="https://www.breederscup.com/tickets?gad_source=1&gclid=CjwKCAjw88yxBhBWEiwA7cm6pXc2DlO9LOOqIHMLmuPblSc4zQZRNhL4Gmv8C8p6p8UhJ_4JdMYnDBoCuJcQAvD_BwE" rel="noreferrer" target="_blank" className="secondary">tickets</a></Tooltip> purchased in advance). The races will no doubt be very busy, but will likely be an unforgettable time. During the week after opening on a typical summer, traffic getting into Del Mar can take up to 30 minutes of driving. It would be best to get into town quite early if you plan on going to the races on Saturday.
                  </div>
                </div>
              </div>
              <div className="logisticsItem flexed col">
                <div className="sanDiegoTitle"><Kayaking fontSize="2rem" color="primary"></Kayaking> Kayak or Paddleboard</div>
                <div className="thingsToDoItem">
                  <img src={kayak_image}
                    alt="Kayak La Jolla Shores"
                    className="thingsToDoImage">
                  </img>
                  <div>
                    La Jolla has plenty of affordable rentals for kayaking or paddleboarding where you can adventure and see the marine life that visits during the late summer. <Tooltip title="Open Website for La Jolla Kayak"><a href="http://www.lajollakayak.com/" rel="noreferrer" target="_blank" className="secondary">La Jolla Kayak</a></Tooltip> is a good spot for simple rentals without needing to take a group tour, where you won't need to haul your Kayak too far.
                  </div>
                </div>
              </div>
              <div className="logisticsItem flexed col">
              <div className="sanDiegoTitle"><EggAlt fontSize="2rem" color="primary"></EggAlt> Brunch</div>
                <div className="thingsToDoItem">
                  <img src={morning_glory_image}
                    alt="Brunch Feasts in various San Diego Spots. Bottomless is always an option!"
                    className="thingsToDoImage">
                  </img>
                  <div>
                    La Jolla Cove has plenty of great brunch spots, aside from our Saturday Brunch location (The Cottage). <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/ZvJbmcd86Vf2TwXf8" rel="noreferrer" target="_blank" className="secondary">Sugar and Scribe</a></Tooltip> is one of our favorite brunch spots in La Jolla. If you want to go downtown and can tolerate waiting for brunch, our favorite spot in San Diego is <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/JvKdLSR8K9PCUCSk6" target="_blank" rel="noreferrer" className="secondary">Morning Glory Cafe</a></Tooltip>.
                  </div>
                </div>
              </div>
              <div className="logisticsItem flexed col">
                <div className="sanDiegoTitle"><LocalDining fontSize="2rem" color="primary"></LocalDining> Mexican Food</div>
                <div className="thingsToDoItem">
                  <img src={taco_stand_image}
                    alt="Mexican Food! The Salsa Verde is a necessity."
                    className="thingsToDoImage">
                  </img>
                  <div>
                    San Diego and La Jolla have some of the greatest Mexican food north of the border. La Jolla Cove has our favorite place in town, <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/gPFsmjDNCpeAdgQp9" target="_blank" rel="noreferrer" className="secondary">The Taco Stand</a></Tooltip> (Also ranked America's 4th best casual eatery by Tripadvisor). Mission Beach <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/vv7wySA8q5hU5vH27" target="_blank" rel="noreferrer" className="secondary">Tacos El Gordo</a></Tooltip> and <Tooltip title="Open Location in Google Maps"><a href="vhttps://maps.app.goo.gl/Rigjz4qPQ1u51ryC6" rel="noreferrer" target="_blank" className="secondary">TJ Tacos</a></Tooltip> have the Tijuana-style meats and birrias that are unbeatable.
                  </div>
                </div>
              </div>
              <div className="logisticsItem flexed col">
                <div className="sanDiegoTitle"><LiquorOutlined fontSize="2rem" color="primary"></LiquorOutlined> Party</div>
                <div className="thingsToDoItem">
                  <img src={pb_image}
                    alt="Enjoy the nightlife - there are different vibes of bars for everyone."
                    className="thingsToDoImage">
                  </img>
                  <div>
                    San Diego has plenty of beach towns, each with their own unique party scenes. La Jolla and Del Mar are best for enjoying a nice cocktail while watching the sunset. Pacific Beach has lots of great places, especially for younger crowds - <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/JVYan1iWeJa3SoYR7" target="_blank" rel="noreferrer" className="secondary">PB Waterbar</a></Tooltip> and <Tooltip title="Open Location in Google Maps"><a href="832 Garnet Ave, Pacific Beach, CA 92109, United States" target="_blank" rel="noreferrer" className="secondary">Backyard</a></Tooltip> are fun places to grab a drink and dance. Downtown Gaslamp Quarter is ideal for a bar crawl: our favorite places are <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/oVfy12vTjnbv9hiK6" rel="noreferrer" target="_blank" className="secondary">The Tipsy Crow</a></Tooltip> and <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/iVFWpxZUJ7AV45RP9" target="_blank" rel="noreferrer" className="secondary">Moonshine Flats</a></Tooltip>.
                  </div>
                </div>
              </div>
              <div className="logisticsItem flexed col">
                <div className="sanDiegoTitle"><SportsBar fontSize="2rem" color="primary"></SportsBar> Breweries</div>
                <div className="thingsToDoItem">
                  <img src={sd_brewing_image}
                    alt="California's Craft Beer Capital"
                    className="thingsToDoImage">
                  </img>
                  <div>
                    There are lots of great <Tooltip title="View San Diego Breweries Map"><a href="https://web.sdbeer.com/search" target="_blank" rel="noreferrer" className="secondary">breweries in San Diego</a></Tooltip>, which is considered a stronghold of craft beers. Miramar is closest to La Jolla and is home to some of our favorite spots like <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/PwZY3CQquP7R2G9B9" target="_blank" rel="noreferrer" className="secondary">Mikeller</a></Tooltip>, <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/xKFMpAkmBTHvoEnv5" rel="noreferrer" target="_blank" className="secondary">Green Flash</a></Tooltip>, and <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/qu8jHGKUdnaQXndTA" rel="noreferrer" target="_blank" className="secondary">Juneshine</a></Tooltip>. Downtown Gaslamp District has some good ones too, like <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/Qmq8iGERWnUQQ35u8" rel="noreferrer" target="_blank" className="secondary">Bolt Brewing</a></Tooltip>.
                  </div>
                </div>
              </div>
              <div className="logisticsItem flexed col">
                <div className="sanDiegoTitle"> <WineBar fontSize="2rem" color="primary"></WineBar> Wine Tasting</div>
                <div className="thingsToDoItem">
                  <img src={temecula_image}
                    alt="The Napa of Southern California"
                    className="thingsToDoImage">
                  </img>
                  <div>
                    If you have a half-day or full-day to spend in town, there are some great wine tasting areas less than an hour away. Temecula, Julian, and Ramona all offer some great wine-tasting experiences. Julian will also have apple picking and pies to try if you can make it out there!
                  </div>
                </div>
              </div>
              <div className="logisticsItem flexed col">
                <div className="sanDiegoTitle"><DirectionsBike fontSize="2rem" color="primary"></DirectionsBike> Bike/walk Mission Beach</div>
                <div className="thingsToDoItem">
                  <img src={mission_beach_image}
                    alt="Walk Mission Beach"
                    className="thingsToDoImage">
                  </img>
                  <div>
                    Between Pacific Beach and Ocean Beach is a large picturesque beach strip that is a wonderful afternoon walk. There will always be something interesting going on, with plenty of places to explore, eat, or drink.
                  </div>
                </div>
              </div>
              <div className="logisticsItem flexed col">
                <div className="sanDiegoTitle"><GolfCourse fontSize="2rem" color="primary"></GolfCourse> Golf</div>
                <div className="thingsToDoItem">
                  <img src={tp_image}
                    alt="Play a few holes at Torrey Pines or other great courses."
                    className="thingsToDoImage">
                  </img>
                  <div>
                    Torrey Pines is world-reknowned and very close to La Jolla Cove. For a more affordable/less well-planned teeing, Miramar is also a nice place to golf. A farther location that balances quality with affordability is the Rancho Bernardo Country Club. 
                  </div>
                </div>
              </div>
              <div className="logisticsItem flexed col">
                <div className="sanDiegoTitle"><Waves fontSize="2rem" color="primary"></Waves> See the Coast</div>
                <div className="thingsToDoItem">
                  <img src = {sunset_cliffs_image}
                    alt="Check out the coastline at Sunset Cliffs"
                    className="thingsToDoImage">
                  </img>
                  <div>
                    San Diego is home to some of the most picturesque coastline in southern California. For some awe-inspiring beauty, it is always worth a visit to <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/q4hhcKBeu3E2xEm68" target="_blank" rel="noreferrer" className="secondary">Sunset Cliffs</a></Tooltip>, or to the top of <Tooltip title="Open Location for Closest Parking in Google Maps"><a href="https://maps.app.goo.gl/XZbqAb21KzwWMvrw5" target="_blank" rel="noreferrer" className="secondary">Black's Beach</a></Tooltip> (right next to Torrey Pines).
                  </div>
                </div>
              </div>
              <div className="logisticsItem flexed col">
                <div className="sanDiegoTitle"><Yard fontSize="2rem" color="primary"></Yard> Visit Balboa Park</div>
                <div className="thingsToDoItem">
                  <img src = {balboa_image}
                    alt="Walk Balboa park"
                    className="thingsToDoImage">
                  </img>
                  <div>
                    <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/JkYekafMtXasz3hm7" target="_blank" rel="noreferrer" className="secondary">Balboa Park</a></Tooltip> is a massive largest public park and it is well worth spending at least a half-day walking through the park itself. Inside the park is a theatre, exotic garden, japanese garden, and museum - all of which are well-worth checking out. Right next to the park is the San Diego Zoo, and Balboa park is also within close proximity to <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/5y1SzouQRbEDJnaW9" target="_blank" rel="noreferrer" className="secondary">Hillcrest</a></Tooltip>, and the <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/xAdCtEAiMVewGU4H6" rel="noreferrer" target="_blank" className="secondary">Gaslamp District</a></Tooltip> (both places worth visiting).
                  </div>
                </div>
              </div>
              <div className="logisticsItem flexed col">
                <div className="sanDiegoTitle"><EmojiNature fontSize="2rem" color="primary"></EmojiNature> See the Zoos</div>
                  <div className="thingsToDoItem">
                    <img src = {zoo_image}
                      alt="Visit the San Diego Zoo"
                      className="thingsToDoImage">
                    </img>
                    <div>
                      If you have an extra day in San Diego, the <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/LcPCcAuZA7jVMLcz5" rel="noreferrer" target="_blank" className="secondary">San Diego Zoo</a></Tooltip> (within Balboa Park, another worthwhile site) is one of the largest Zoos around and is well-worth visiting. A little farther away is the <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/Jcj1DELimNpWm1Ui6" rel="noreferrer" target="_blank" className="secondary">San Diego Safari Park</a></Tooltip>, where you can see huge enclosures where all the savannah animals roam freely. It is one of the only zoos in the US where you can see a platypus, and walk with the wallabies.  
                    </div>
                  </div>
              </div>
              <div className="logisticsItem flexed col">
                <div className="sanDiegoTitle"><Pets fontSize="2rem" color="primary"></Pets> Dog Beaches</div>
                <div className="thingsToDoItem">
                  <img src = {dog_beach_image}
                    alt="Dog Beach and Coffee"
                    className="thingsToDoImage">
                  </img>
                  <div>
                    San Diego is ranked the most dog-friendly city in the US and is home to some great dog beaches. One of our favorite sunday morning activities is to grab a fantastic coffee and sandwich at <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/uPtCGNLNJtYH3ARG9" target="_blank" rel="noreferrer" className="secondary">Achilles Coffee</a></Tooltip> and walk to the <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/xMkdwzYy63cGjGxP6" target="_blank" rel="noreferrer" className="secondary">Del Mar Dog Beach</a></Tooltip>. These locations are also both within walking distance of the Del Mar Race Tracks if you want to attend the Breeder's Cup Championship after morning coffee.
                  </div>
                </div>
              </div>
              <div className="logisticsItem flexed col">
                <div className="sanDiegoTitle"><Castle fontSize="2rem" color="primary"></Castle> Coronado Island</div>
                <img src = {coronado_image}
                  alt="Coronado Island"
                  className="thingsToDoImage">
                </img>
                <div>
                  This is one of the iconic sites of California and should not be skipped if you have the time. The <Tooltip title="Open Location in Google Maps"><a href="https://maps.app.goo.gl/yNsZRkwus9uKLYXAA" target="_blank" rel="noreferrer" className="secondary">Hotel del Coronado</a></Tooltip> has beautiful authentic architecture, and the beaches along the island are impeccable and perfect. The island is stunning and completely unique.
                </div>
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
