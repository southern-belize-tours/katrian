import * as React from 'react';


// Caurosel experiment
// import Carousel from 'react-material-ui-carousel'
// import { Paper, Button } from '@mui/material'
import Summary from './Summary';

function TimeAndDate(props) {

  let items = [
    {name: "Time and Place Summary",
      component: <Summary></Summary>
    },
    // {name: "Friday Itinerary",
    //   component: <>Ceremony</>
    // },
    // {name: "Saturday Itinerary Itinerary",
    //   component: <>Brunch</>
    // },
    // {name: "Sunday Itinerary",
    //   component: <>Hang out?</>
    // }
  ];

    return (
      <div className="weddingBody">
        <h1>Time and Place Summary</h1>
        <Summary size={props.size ? props.size : 400}></Summary>
      </div>
    );
  } export default TimeAndDate;