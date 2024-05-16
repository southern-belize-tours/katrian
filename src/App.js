import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import { SignInForm } from './SignInForm/SignInForm.js';
import Home from './Home.js';
import TimeAndDate from './TimeAndDate.js';
import Donations from './Donations.js';
import Playlist from './Playlist.js';
import Gallery from './Components/Gallery/Gallery.js';
import FaqForm from './Faq/Faq.js';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import your custom theme
import Cake from './page_art/cake/cake';
import NavList from './NavList/NavList.js';
import Clock from './page_art/clock/clock';
import Camera from './page_art/camera/camera';
import Music from './page_art/music/music';
import Gift from './page_art/gift/gift';

import Sandbox from './Sandbox/Sandbox.js';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports.js';

import { AuthProvider } from './Contexts/AuthContext/AuthContext.js';
import { FaqServiceProvider } from './Services/FaqService/FaqServiceContext.js';

// Spinner
import CuvierClubHistory from './Components/CuvierClub/CuvierClubHistory.js';
import Question from './page_art/question/question.js';
import Cuvier from './page_art/cuvier/Cuvier.js';
import { TuneServiceProvider } from './Services/TuneService/TuneServiceContext.js';
import {AutoStories, BrunchDining, CloudUploadOutlined, Collections, DiamondOutlined } from '@mui/icons-material';
import Ceremony from './Ceremony.js';
import Brunch from './Brunch.js';
import { useGalleryService } from './Services/GalleryService/GalleryServiceContext.js';
import HotelAndTransport from './Components/Hotel_and_Transport/HotelAndTransport.js';
import GalleryPage from './Components/Gallery/GalleryPage.js';
import WeddingParties from './Components/Gallery/WeddingParties.js';
import BobsBurger from './Components/BobsBurger/BobsBurger.js';
import Envelope from './page_art/envelope/envelope.js';
import RSVP from './Components/RSVP/RSVP.js';
import GroupCreateForm from './ui-components/GroupCreateForm.jsx';
import GroupUpdateForm from './ui-components/GroupUpdateForm.jsx';
import Groups from './Components/Groups/Groups.js';
import GroupService from './Services/GroupService/GroupService.js';
import { GroupServiceProvider } from './Services/GroupService/GroupServiceContext.js';
import GroupCreate from './Components/Groups/GroupCreate.js';
import { GuestServiceProvider } from './Services/GuestService/GuestServiceContext.js';
import Guests from './Components/Groups/Guests.js';

Amplify.configure(awsconfig);

const timeAndPlaceItems = [
  // {text: "Summary", route: "/Logistics", component:<AccessTimeFilled color="primary" fontSize="small"></AccessTimeFilled>},
  // {text: "Bachelor Party", route: "/Bachelor", component:<Liquor color="primary" fontSize="small"></Liquor>},
  // {text: "Bachelorette Party", route: "/Bachelorette", component:<Nightlife color="primary" fontSize="small"></Nightlife>},
  // {text: "Rehearsal (Invite Only)", route: "/Rehearsal", component: <Restaurant color="primary" fontSize="small"></Restaurant>},
  // {text: "Wedding", route: "/Ceremony", component: <Diversity1 color="primary" fontSize="small"></Diversity1>},
  // {text: "Reception", route: "/Reception", component: <MusicNote color="primary" fontSize="small"></MusicNote>},
  // {text: "Saturday Brunch", route: "/Brunch", component: <EggAlt color="primary" fontSize="small"></EggAlt>},
  // {text: "Hotels and Transport", route: "/Hotels-and-Transport", component: <Hotel color="primary" fontSize="small"></Hotel>}
];

const galleryItems = [
  {text: "All Galleries", route: "/Gallery", component:<Collections color="primary" fontSize="small"></Collections>},
  {text: "Our Story", route: "/Gallery/Story", component: <AutoStories color="primary" fontSize="small"></AutoStories>},
  {text: "Proposal", route: "/Gallery/Proposal", component: <DiamondOutlined color="primary" fontSize="small"></DiamondOutlined>},
  {text: "Wedding Party", route: "/Gallery/WeddingParties", component: <BrunchDining color="primary" fontSize="small"></BrunchDining>},
  {text: "Guest Uploads", route: "/Gallery/GuestUploads", component: <CloudUploadOutlined color="primary" fontSize="small"></CloudUploadOutlined>},

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
  const GalleryService = useGalleryService();

  const initializeLinkSize = () => {
    if (window.innerWidth <= 768) {
      return 35;
    } else {
      return 100;
    }
  }

  const [linkSize, setLinkSize] = React.useState(initializeLinkSize());
  const [size, setSize] = React.useState(window.innerWidth);
  const [galleries, setGalleries] = React.useState([]);
  // const [, ] = React.useState(false);

  const links = [
    {text: "Home", route: "/", component: <Cake size={linkSize}></Cake>, items: []},
    {text: "Travel", route: "/Hotels-and-Transport", component: <Clock size={linkSize}></Clock>, items: timeAndPlaceItems},
    {text: "FAQ", route: "/FAQ", component: <Question size={linkSize}></Question>, items: []},
    {text: "Galleries", route: "/Gallery", component: <Camera size={linkSize}></Camera>, items: galleryItems},
    // {text: "Cuvier Club History", route: "/CuvierClubHistory", component: <Cuvier size={linkSize}></Cuvier>, items: []},
    {text: "RSVP", route: "/RSVP", component: <Envelope size={linkSize}></Envelope>, items: []},
    {text: "Playlist", route: "/Playlist", component: <Music size={linkSize}></Music>, items: []},
    {text: "Registry", route: "/Registry", component: <Gift size={linkSize}></Gift>, items: []},
  ];

  const [navLinks, ] = React.useState([...links]);

  React.useEffect(() => {
    const checkMediaSize = () => {
      if (window.innerWidth <= 768) {
        setLinkSize(35);
      } else {
        setLinkSize(100);
      }
      setSize(window.innerWidth);
    }

    // setLoading(true);
    let isSubscribed = true; 

    const getGalleries = async () => {
      try {
         await GalleryService.fetchGalleries();
        // await GalleryService.fetchGalleryLinks();

        // if (isSubscribed && galleriesData !== -1) {
        //   // setGalleries(galleriesData);
        //   let galleryLinks = navLinks[3];
        //   for (let i = 0; i < galleriesData.length; ++i) {
        //     const galleryLink = {text: galleriesData[i].name,
        //       route: "/Gallery/" + galleriesData[i].directory,
        //       component: <></>
        //     }
        //     galleryLinks.items.push(galleryLink);
        //   }
        //   let oldNavs = [...navLinks];
        //   oldNavs[3] = galleryLinks;
          // setNavLinks(oldNavs);
        // }
      } catch (e) {
        console.log("Error retrieving galleries", e);
      } finally {
        if (isSubscribed) {
          // setLoading(false);
          setGalleries(GalleryService.galleries);
        }
      }
    }

    if (galleries.length === 0) {
      // getGalleries();
      // setGalleries(GalleryService.fetchGalleryLinks());
    } else if (galleries.length === 0 && GalleryService.galleries.length !== 0) {
      // getGalleries();
      // setGalleries(GalleryService.galleries);
      // setLoading(false);
    } else {
      // setLoading(false);
    }

    // Only check the resizing every 100ms
    const debouncedCheckMediaSize = debounce(checkMediaSize, 100);

    debouncedCheckMediaSize();
    window.addEventListener('resize', debouncedCheckMediaSize);

    return () => {
      isSubscribed = false;
      window.removeEventListener('resize', debouncedCheckMediaSize);
    }
  }, [])

  return (
    <ThemeProvider theme = {theme}>
      <FaqServiceProvider>
      <TuneServiceProvider>
      <GroupServiceProvider>
      <GuestServiceProvider>
      <AuthProvider>
      <div className="pageContainer">
      <Router>
        {/* <NavList links={navLinks}></NavList> */}
        {size > 768 ? 
        <NavList links={navLinks}></NavList>
        : 
        // <div>Foo</div>
        <BobsBurger links={navLinks}></BobsBurger>
        }
        <Switch>
          {/* <Route path="/" exact component={() => <Home size={linkSize * 4}></Home>} /> */}
          {/* {galleries.length > 0 && */}
            <Route path="/" exact component={() => <Home></Home>} />
          {/* // } */}
          {/* <Route path="/" exact component={() => <Home></Home>} /> */}
          <Route path="/Logistics" exact component={() => <TimeAndDate size={linkSize * 4}></TimeAndDate>} />
          {/* <Route path="/Rehearsal" exact component={() => <Rehearsal></Rehearsal>}></Route> */}
          <Route path="/Hotels-and-Transport" exact component={() => <HotelAndTransport></HotelAndTransport>}></Route>
          <Route path="/Ceremony" exact component={() => <Ceremony></Ceremony>}></Route>
          <Route path="/Brunch" exact component={() => <Brunch></Brunch>}></Route>
          <Route path="/CuvierClubHistory" exact component={() => <CuvierClubHistory size = {linkSize * 4}></CuvierClubHistory>} />
          <Route path="/Registry" exact component={() => <Donations size = {linkSize * 4}></Donations>} />
          <Route path="/Playlist" component={Playlist}></Route>
          <Route path="/Gallery" exact component={() => <Gallery galleries = {galleries} size = {linkSize * 4}></Gallery>}></Route>
          <Route path="/Gallery/WeddingParties" exact component={() => <WeddingParties size = {linkSize * 4}></WeddingParties>}></Route>
          <Route path="/RSVP"
            exact component = {() => <RSVP size = {linkSize * 4}></RSVP>}>
            {/* exact component = {() => <div>Foo</div>}> */}
          </Route>
          <Route path="/Gallery/Proposal"
            exact component={() => <GalleryPage gallery = {null}></GalleryPage>}>
          </Route>
          <Route path="/Gallery/GuestUploads"
            exact component={() => <GalleryPage gallery = {null}></GalleryPage>}>
          </Route>
          <Route path="/Gallery/Story"
            exact component={() => <GalleryPage gallery = {null}></GalleryPage>}>
          </Route>
          <Route path = "/FAQ" exact component = {() => <FaqForm size = {linkSize * 4}></FaqForm>}></Route>
          <Route path = "/Sandbox" exact component = {() => <Sandbox></Sandbox>}></Route>
          <Route path = "/SignIn" exact component = {() => <SignInForm></SignInForm>}></Route>
          <Route path = "/Group" exact component = {() => <>
            {/* <GroupCreate></GroupCreate> */}
            {/* <Guests></Guests> */}
            <Groups></Groups>
            {/* <GroupUpdateForm></GroupUpdateForm> */}
            </>}></Route>
        </Switch>
      </Router>
      {/* <div className="loadingSpinner"></div> */}
      </div>
      </AuthProvider>
      </GuestServiceProvider>
      </GroupServiceProvider>
      </TuneServiceProvider>
      </FaqServiceProvider>
    </ThemeProvider>
  );
}

export default App;
