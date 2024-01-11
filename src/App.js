import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { Switch, Route } from "react-router-dom";

// import Amplify from 'aws-amplify';
// import awsexports from './amplifyconfiguration.json';
import awsmobile from './aws-exports.js';

import { SignInForm } from './SignInForm/SignInForm.js';
import Home from './Home.js';
import TimeAndDate from './TimeAndDate.js';
import WeddingToolbar from './Toolbar/Toolbar';
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

import Pumpkin from './pumpkin/pumpkin';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports.js';

import FaqCreateForm from './ui-components/FaqCreateForm.jsx';
import { AuthProvider } from './Contexts/AuthContext/AuthContext.js';
import { FaqServiceProvider } from './Services/FaqService/FaqServiceContext.js';

// Amplify.configure(awsmobile);
Amplify.configure(awsconfig);
// Amplify.configure(awsmobile);
// Amplify.configure({
//   "aws_project_region": "us-west-1",
//   "aws_appsync_graphqlEndpoint": "https://76tshlu6cjb4hjkat6i3cjveuu.appsync-api.us-west-1.amazonaws.com/graphql",
//   "aws_appsync_region": "us-west-1",
//   "aws_appsync_authenticationType": "API_KEY",
//   "aws_appsync_apiKey": "da2-3p4t2ij5fvbodfkbbpiq4yva3u",
//   "aws_cognito_identity_pool_id": "us-west-1:893f9b7f-0fc8-4f18-aeb6-20e175af113b",
//   "aws_cognito_region": "us-west-1",
//   "aws_user_pools_id": "us-west-1_LU7xMvL74",
//   "aws_user_pools_web_client_id": "j6eibf38u82cour861lojk0qo",
//   "oauth": {},
//   "aws_cognito_username_attributes": [
//     "EMAIL"
//   ],
//   "aws_cognito_social_providers": [],
//   "aws_cognito_signup_attributes": [],
//   "aws_cognito_mfa_configuration": "OFF",
//   "aws_cognito_mfa_types": [
//     "SMS"
//   ],
//   "aws_cognito_password_protection_settings": {
//     "passwordPolicyMinLength": 8,
//     "passwordPolicyCharacters": [
//       "REQUIRES_LOWERCASE",
//       "REQUIRES_NUMBERS",
//       "REQUIRES_SYMBOLS",
//       "REQUIRES_UPPERCASE"
//     ]
//   },
//   "aws_cognito_verification_mechanisms": [
//     "EMAIL"
//   ]
// })

const timeAndPlaceItems = [
  {text: "Summary", route: "/TimeAndPlace"},
  {text: "Bachelor Party", route: "/Bachelor"},
  {text: "Bachelorette Party", route: "/Bachelorette"},
  {text: "Rehearsal", route: "/Rehearsal"},
  {text: "Ceremony", route: "/Ceremony"},
  {text: "Saturday Brunch", route: "/Brunch"},
];

const links = [
  {text: "Home", route: "/", component: <Cake size={100}></Cake>, items: []},
  {text: "Logistics", route: "/Logistics", component: <Clock size={100}></Clock>, items: timeAndPlaceItems},
  // {text: "Website Names", route: "/WebsiteNames"},
  {text: "Donations", route: "/Donations", component: <Gift size={100}></Gift>, items: []},
  {text: "Engagement Gallery", route: "/Gallery", component: <Camera size={100}></Camera>, items: []},
  {text: "Playlist", route: "/Playlist", component: <Music size={100}></Music>, items: []},
  // {text: "FAQ", route: "/FAQ", component: <Music size={100}></Music>}
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
      <FaqServiceProvider>
      <AuthProvider>
      <div className="pageContainer">
      {/* <WeddingToolbar links={links}></WeddingToolbar> */}
      <NavList links={links}></NavList>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Logistics" component={TimeAndDate} />
          {/* <Route path="/WebsiteNames" component={WebsiteNames} /> */}
          <Route path="/Donations" component={Donations} />
          <Route path="/Playlist" component={Playlist}></Route>
          <Route path="/Gallery" exact component={() => <Gallery galleries = {galleries}></Gallery>}></Route>
          {galleries.map(gallery => 
            <Route path={gallery.route} exact component={() => <GallerySummary galleries = {galleries}
              gallery = {gallery}></GallerySummary>}></Route>
          )}
          {/* <Route path = "/Pumpkin" exact component={() => <Pumpkin></Pumpkin>}></Route> */}
          <Route path = "/FAQ" exact component = {() => <FaqForm></FaqForm>}></Route>
          {/* <Route path = "/test" exact component = {() => <FaqCreateForm></FaqCreateForm>}></Route> */}
          {/* <Route path="/contact" component={Contact} /> */}
          <Route path = "/SignIn" exact component = {() => <SignInForm></SignInForm>}></Route>
        </Switch>
      </Router>
      {/* <NavList links={links}></NavList> */}
      </div>
      </AuthProvider>
      </FaqServiceProvider>
    </ThemeProvider>
  );
}

export default App;
