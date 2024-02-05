import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { SignInForm } from './SignInForm/SignInForm.js';
import Home from './Home.js';
import TimeAndDate from './TimeAndDate.js';
// import WebsiteNames from './WebsiteNames.js';
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
import { AccessTimeFilled, BrunchDining, Collections, Diversity1, EggAlt, Hotel, Liquor, MusicNote, Nightlife, Restaurant } from '@mui/icons-material';
import Rehearsal from './Rehearsal.js';
import Ceremony from './Ceremony.js';
import Brunch from './Brunch.js';
import { useGalleryService } from './Services/GalleryService/GalleryServiceContext.js';
import HotelAndTransport from './Components/Hotel_and_Transport/HotelAndTransport.js';
import GalleryPage from './Components/Gallery/GalleryPage.js';
import WeddingParties from './Components/Gallery/WeddingParties.js';

Amplify.configure(awsconfig);

const timeAndPlaceItems = [
  {text: "Summary", route: "/Logistics", component:<AccessTimeFilled color="primary" fontSize="small"></AccessTimeFilled>},
  // {text: "Bachelor Party", route: "/Bachelor", component:<Liquor color="primary" fontSize="small"></Liquor>},
  // {text: "Bachelorette Party", route: "/Bachelorette", component:<Nightlife color="primary" fontSize="small"></Nightlife>},
  {text: "Rehearsal", route: "/Rehearsal", component: <Restaurant color="primary" fontSize="small"></Restaurant>},
  {text: "Wedding", route: "/Ceremony", component: <Diversity1 color="primary" fontSize="small"></Diversity1>},
  // {text: "Reception", route: "/Reception", component: <MusicNote color="primary" fontSize="small"></MusicNote>},
  {text: "Saturday Brunch", route: "/Brunch", component: <EggAlt color="primary" fontSize="small"></EggAlt>},
  {text: "Hotels and Transport", route: "/Hotels-and-Transport", component: <Hotel color="primary" fontSize="small"></Hotel>}
];

const galleryItems = [
  {text: "All Galleries", route: "/Gallery", component:<Collections color="primary" fontSize="small"></Collections>},
  {text: "Wedding Party", route: "/Gallery/WeddingParty", component: <BrunchDining color="primary" fontSize="small"></BrunchDining>},
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

  const [linkSize, setLinkSize] = React.useState(100);
  const [galleries, setGalleries] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const links = [
    {text: "Home", route: "/", component: <Cake size={linkSize}></Cake>, items: []},
    {text: "Logistics", route: "/Logistics", component: <Clock size={linkSize}></Clock>, items: timeAndPlaceItems},
    {text: "FAQ", route: "/FAQ", component: <Question size={linkSize}></Question>, items: []},
    {text: "Galleries", route: "/Gallery", component: <Camera size={linkSize}></Camera>, items: galleryItems},
    {text: "Cuvier Club", route: "/CuvierClubHistory", component: <Cuvier size={linkSize}></Cuvier>, items: []},
    {text: "Playlist", route: "/Playlist", component: <Music size={linkSize}></Music>, items: []},
    {text: "Registry", route: "/Registry", component: <Gift size={linkSize}></Gift>, items: []},
  ];

  const [navLinks, setNavLinks] = React.useState([...links]);

  React.useEffect(() => {
    const checkMediaSize = () => {
      if (window.innerWidth <= 768) {
        setLinkSize(50);
      } else {
        setLinkSize(100);
      }
    }

    setLoading(true);
    let isSubscribed = true;

    const getGalleries = async () => {
      let galleriesData = -1;
      try {
        galleriesData = await GalleryService.fetchGalleries();
        if (isSubscribed && galleriesData !== -1) {
          setGalleries(galleriesData);

          let galleryLinks = navLinks[3];
          // galleryLinks.items = ;
          for (let i = 0; i < galleriesData.length; ++i) {
            const galleryLink = {text: galleriesData[i].name,
              route: "/Gallery/" + galleriesData[i].directory,
              component: <></>
            }
            galleryLinks.items.push(galleryLink);
          }
          let oldNavs = [...navLinks];
          oldNavs[3] = galleryLinks;
          // console.log(galleryLinks);
          setNavLinks(oldNavs);
        }
      } catch (e) {
        console.log("Error retrieving galleries", e);
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    }

    // console.log("Galleries: ", galleries)
    // console.log("Gallery service", GalleryService);
    if (galleries.length === 0 && GalleryService.galleries.length ===0) {
      getGalleries();
    } else if (galleries.length === 0 && GalleryService.galleries.length !== 0) {
      setGalleries(GalleryService.galleries);
      setLoading(false);
    } else {
      setLoading(false);
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
      <AuthProvider>
        {/* <BeatLoader loading = {FaqService.isLoading()}></BeatLoader> */}
      <div className="pageContainer">
      {/* <WeddingToolbar links={links}></WeddingToolbar> */}
      {/* <NavList links={links}></NavList> */}
      { loading === false ?
      <Router>
        <NavList links={navLinks}></NavList>
        <Switch>
          <Route path="/" exact component={() => <Home size={linkSize * 4}></Home>} />
          <Route path="/Logistics" exact component={() => <TimeAndDate size={linkSize * 4}></TimeAndDate>} />
          <Route path="/Rehearsal" exact component={() => <Rehearsal></Rehearsal>}></Route>
          {/* <Route path="/Bachelor" exact component={() => <Bachelor></Bachelor>}></Route> */}
          {/* <Route path="/Bachelorette" exact component={() => <Bachelorette></Bachelorette>}></Route> */}
          <Route path="/Hotels-and-Transport" exact component={() => <HotelAndTransport></HotelAndTransport>}></Route>
          <Route path="/Ceremony" exact component={() => <Ceremony></Ceremony>}></Route>
          {/* <Route path="/Reception" exact component={() => <Reception></Reception>}></Route> */}
          <Route path="/Brunch" exact component={() => <Brunch></Brunch>}></Route>
          <Route path="/CuvierClubHistory" exact component={() => <CuvierClubHistory size = {linkSize * 4}></CuvierClubHistory>} />
          <Route path="/Registry" exact component={() => <Donations size = {linkSize * 4}></Donations>} />
          <Route path="/Playlist" component={Playlist}></Route>
          <Route path="/Gallery" exact component={() => <Gallery galleries = {galleries} size = {linkSize * 4}></Gallery>}></Route>
          <Route path="/Gallery/WeddingParty" exact component={() => <WeddingParties size = {linkSize * 4}></WeddingParties>}></Route>
          {galleries.map(gallery => 
            <Route path={`/Gallery/${gallery.directory}`} exact component={() => 
              <GalleryPage gallery = {gallery}></GalleryPage>}>
            </Route>
          )}
          <Route path = "/FAQ" exact component = {() => <FaqForm size = {linkSize * 4}></FaqForm>}></Route>
          <Route path = "/Sandbox" exact component = {() => <Sandbox></Sandbox>}></Route>
          <Route path = "/SignIn" exact component = {() => <SignInForm></SignInForm>}></Route>
        </Switch>
      </Router>
      :
              <div className="loadingSpinner"></div>
      }
      {/* <NavList links={links}></NavList> */}
      </div>
      </AuthProvider>
      </TuneServiceProvider>
      </FaqServiceProvider>
    </ThemeProvider>
  );
}

export default App;
