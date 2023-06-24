import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import Home from './Home.js';
import TimeAndDate from './TimeAndDate.js';
import WeddingToolbar from './Toolbar/Toolbar';
import WebsiteNames from './WebsiteNames.js';
import Donations from './Donations.js';
import Playlist from './Playlist.js';
import Gallery from './Gallery.js';
import Registry from './Registry.js';
import Login from './Login.js';
import Test from './Test.js';

import { Amplify } from 'aws-amplify';
import awsConfig from './aws-exports';

Amplify.configure(awsConfig);

const links = [
  {text: "Home", route: "/"},
  {text: "Time & Place", route: "/TimeAndPlace"},
  {text: "Website Names", route: "/WebsiteNames"},
  {text: "Donations", route: "/Donations"},
  {text: "Engagement Gallery", route: "/Gallery"},
  {text: "Playlist", route: "/Playlist"},
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#ac9ecf',
    },
    secondary: {
      main: '#a9b69c',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        backgroundColor: '#0077c2 !important',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#005ca9',
        },
      },
    },
  },
});

function App() {
  return (
    <>
    {/* // <ThemeProvider theme={theme}> */}
      <WeddingToolbar links={links}></WeddingToolbar>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/TimeAndPlace" component={TimeAndDate} />
          <Route path="/WebsiteNames" component={WebsiteNames} />
          <Route path="/Donations" component={Donations} />
          <Route path="/Playlist" component={Playlist}></Route>
          <Route path="/Gallery" component={Gallery}></Route>
          <Route path="/Registry" component={Registry}></Route>
          <Route path="/Login" component={Login}></Route>
          <Route path="/Test" component={Test}></Route>
          {/* <Route path="/contact" component={Contact} /> */}
        </Switch>
      </Router>
    {/* // </ThemeProvider> */}
    </>
  );
}

export default App;
