import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { Switch, Route } from "react-router-dom";

import Home from './Home.js';
import TimeAndDate from './TimeAndDate.js';
import WeddingToolbar from './Toolbar/Toolbar';
// import WebsiteNames from './WebsiteNames.js';
import Donations from './Donations.js';
import Playlist from './Playlist.js';
import Gallery from './Gallery.js';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import your custom theme
import Cake from './page_art/cake/cake';
import NavList from './NavList';
import Clock from './page_art/clock/clock';
import Camera from './page_art/camera/camera';
import Music from './page_art/music/music';
import GallerySummary from './GallerySummary';
import Gift from './page_art/gift/gift';

const links = [
  {text: "Home", route: "/", component: <Cake size={100}></Cake>},
  {text: "Time & Place", route: "/TimeAndPlace", component: <Clock size={100}></Clock>},
  // {text: "Website Names", route: "/WebsiteNames"},
  {text: "Engagement Gallery", route: "/Gallery", component: <Camera size={100}></Camera>},
  {text: "Playlist", route: "/Playlist", component: <Music size={100}></Music>},
  {text: "Donations", route: "/Donations", component: <Gift size={100}></Gift>},
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

function App() {

  return (
    <ThemeProvider theme = {theme}>
      
      {/* <WeddingToolbar links={links}></WeddingToolbar> */}
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/TimeAndPlace" component={TimeAndDate} />
          {/* <Route path="/WebsiteNames" component={WebsiteNames} /> */}
          <Route path="/Donations" component={Donations} />
          <Route path="/Playlist" component={Playlist}></Route>
          <Route path="/Gallery" exact component={() => <Gallery galleries = {galleries}></Gallery>}></Route>
          {galleries.map(gallery => 
            <Route path={gallery.route} exact component={() => <GallerySummary galleries = {galleries}
              gallery = {gallery}></GallerySummary>}></Route>
          )}
          {/* <Route path="/contact" component={Contact} /> */}

        </Switch>
        <NavList links={links}></NavList>

      </Router>
    </ThemeProvider>
  );
}

export default App;
