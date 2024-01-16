import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { SignInForm } from './SignInForm/SignInForm.js';
import Home from './Home.js';
import TimeAndDate from './TimeAndDate.js';
// import WebsiteNames from './WebsiteNames.js';
import Donations from './Donations.js';
import Playlist from './Playlist.js';
import Gallery from './Gallery.js';
import FaqForm from './Faq/Faq.js';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import your custom theme
import Cake from './page_art/cake/cake';
import NavList from './NavList/NavList.js';
import Clock from './page_art/clock/clock';
import Camera from './page_art/camera/camera';
import Music from './page_art/music/music';
import GallerySummary from './GallerySummary';
import Gift from './page_art/gift/gift';

import Sandbox from './Sandbox/Sandbox.js';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports.js';

import { AuthProvider } from './Contexts/AuthContext/AuthContext.js';
import { FaqServiceProvider, useFaqService } from './Services/FaqService/FaqServiceContext.js';

// Spinner
import CuvierClubHistory from './CuvierClub/CuvierClubHistory.js';
import Question from './page_art/question/question.js';
import Cuvier from './page_art/cuvier/Cuvier.js';
import { TuneServiceProvider } from './Services/TuneService/TuneServiceContext.js';

Amplify.configure(awsconfig);

const timeAndPlaceItems = [
  {text: "Summary", route: "/TimeAndPlace"},
  {text: "Bachelor Party", route: "/Bachelor"},
  {text: "Bachelorette Party", route: "/Bachelorette"},
  {text: "Rehearsal", route: "/Rehearsal"},
  {text: "Ceremony", route: "/Ceremony"},
  {text: "Saturday Brunch", route: "/Brunch"},
];

const journeyDescription = [
  "Ian and Katrina met and dated in Oakridge High School Junior and Senior Year",
  "They reunited as College Sophomores, met abroad and fell in love in Torino Italy, and dated long-distance between Santa Cruz and San Luis Obispo",
  "After graduating, they moved to San Diego, where they lived for 4 years and got engaged",
  "They now live happily in Zurich, Switzerland together"
];

const bamboozlingDescription = [
  "Katrina's hawkish senses immediately pick up red flags in the unnatural occurence of Ian making structured plans",
  "Ian created an elaborate web of lies and smoke prior to prosing in order to ensure she never saw it coming",
  "He asked for her fathers blessing prior to a New Year's trip to Japan, where they spent time looking at diamonds.",
  "Empty ring boxes were scattered around the house, and Ian disappeared inexplicably for strange chores throughout the days",
  "Katrina was surprised with a weekend trip to Hawaii, where all her bags were packed with nice clothes and her makeup supplies. She was too nervous to stand up in a 5 star restaurant to look at the sunset."
];

const proposalDescription = [
  "Ian proposed to Katrina on March 25th, 2023.",
  "He proposed on top of Bishop's Peak, San Luis Obispo, one of Katrina's favorite college hiking spots, during a \"girl's trip\".",
  "After convincing her that natural geodes were present on the volcanic mountain, he revealed the ring in a geode hidden at the top of the peak.",
  "Many thanks to the great friends who hiked the muddy peak beforehand and helped to circumvent katrina's vigilance. Thank You Melissa, Smita, Matt, Seabass, and Dana."
];

const eurotripDescription = [
  "",
];

const galleries = [
  {text: "The Journey", route: "/Gallery/journey", description: journeyDescription},
  {text: "The Bamboozling", route: "/Gallery/bamboozling", description: bamboozlingDescription},
  {text: "The Proposal", route: "/Gallery/proposal", description: proposalDescription},
  {text: "The Eurotrip", route: "/Gallery/eurotrip", description: eurotripDescription}
];

function debounce(fn, ms) {
  let timer;
  return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
      }, ms);
  };
}

function App() {
  const [linkSize, setLinkSize] = React.useState(100);

  const FaqService = useFaqService();

  React.useEffect(() => {
    const checkMediaSize = () => {
      if (window.innerWidth <= 768) {
        setLinkSize(50);
      } else {
        setLinkSize(100);
      }
    }

    // Only check the resizing every 100ms
    const debouncedCheckMediaSize = debounce(checkMediaSize, 100);

    debouncedCheckMediaSize();
    window.addEventListener('resize', debouncedCheckMediaSize);

    return () => window.removeEventListener('resize', debouncedCheckMediaSize);
  }, [])

  const links = [
    {text: "Home", route: "/", component: <Cake size={linkSize}></Cake>, items: []},
    {text: "Logistics", route: "/Logistics", component: <Clock size={linkSize}></Clock>, items: timeAndPlaceItems},
    {text: "FAQ", route: "/FAQ", component: <Question size={linkSize}></Question>, items: []},
    {text: "Gallery", route: "/Gallery", component: <Camera size={linkSize}></Camera>, items: []},
    {text: "Cuvier Club", route: "/CuvierClubHistory", component: <Cuvier size={linkSize}></Cuvier>, items: []},
    {text: "Playlist", route: "/Playlist", component: <Music size={linkSize}></Music>, items: []},
    {text: "Donations", route: "/Donations", component: <Gift size={linkSize}></Gift>, items: []},
  ];

  return (
    <ThemeProvider theme = {theme}>
      <FaqServiceProvider>
      <TuneServiceProvider>
      <AuthProvider>
        {/* <BeatLoader loading = {FaqService.isLoading()}></BeatLoader> */}
      <div className="pageContainer">
      {/* <WeddingToolbar links={links}></WeddingToolbar> */}
      {/* <NavList links={links}></NavList> */}
      <Router>
        <NavList links={links}></NavList>
        <Switch>
          <Route path="/" exact component={() => <Home size={linkSize * 4}></Home>} />
          <Route path="/Logistics" exact component={() => <TimeAndDate size={linkSize * 4}></TimeAndDate>} />
          <Route path="/CuvierClubHistory" exact component={() => <CuvierClubHistory size = {linkSize * 4}></CuvierClubHistory>} />
          <Route path="/Donations" exact component={() => <Donations size = {linkSize * 4}></Donations>} />
          <Route path="/Playlist" component={Playlist}></Route>
          <Route path="/Gallery" exact component={() => <Gallery galleries = {galleries} size = {linkSize * 4}></Gallery>}></Route>
          {galleries.map(gallery => 
            <Route path={gallery.route} exact component={() => <GallerySummary galleries = {galleries}
              gallery = {gallery}></GallerySummary>}></Route>
          )}
          {/* <Route path = "/Pumpkin" exact component={() => <Pumpkin></Pumpkin>}></Route> */}
          <Route path = "/FAQ" exact component = {() => <FaqForm size = {linkSize * 4}></FaqForm>}></Route>
          {/* <Route path = "/test" exact component = {() => <FaqCreateForm></FaqCreateForm>}></Route> */}
          {/* <Route path="/contact" component={Contact} /> */}
          <Route path = "/Sandbox" exact component = {() => <Sandbox></Sandbox>}></Route>
          <Route path = "/SignIn" exact component = {() => <SignInForm></SignInForm>}></Route>
        </Switch>
      </Router>
      {/* <NavList links={links}></NavList> */}
      </div>
      </AuthProvider>
      </TuneServiceProvider>
      </FaqServiceProvider>
    </ThemeProvider>
  );
}

export default App;
