import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { Switch, Route } from "react-router-dom";

import Home from './Home.js';
import TimeAndDate from './TimeAndDate.js';
import WeddingToolbar from './Toolbar/Toolbar';
import WebsiteNames from './WebsiteNames.js';
import Donations from './Donations.js';
import Playlist from './Playlist.js';
import Gallery from './Gallery.js';

const links = [
  {text: "Home", route: "/"},
  {text: "Time & Place", route: "/TimeAndPlace"},
  {text: "Website Names", route: "/WebsiteNames"},
  {text: "Donations", route: "/Donations"},
  {text: "Engagement Gallery", route: "/Gallery"},
  {text: "Playlist", route: "/Playlist"},
];

function App() {
  return (
    <>
      <WeddingToolbar links={links}></WeddingToolbar>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/TimeAndPlace" component={TimeAndDate} />
          <Route path="/WebsiteNames" component={WebsiteNames} />
          <Route path="/Donations" component={Donations} />
          <Route path="/Playlist" component={Playlist}></Route>
          <Route path="/Gallery" component={Gallery}></Route>
          {/* <Route path="/contact" component={Contact} /> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
