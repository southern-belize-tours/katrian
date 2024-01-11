import * as React from 'react';


// Caurosel experiment
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Summary from './Summary';

function TimeAndDate() {

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
        <Summary></Summary>
      </div>

      // <div className="weddingBody">
      //   <Carousel autoPlay={false}>
      //     {items.map( (item, i) => 
      //       <Paper className="summaryPaper">
      //         <h1>{item.name}</h1>
      //         {item.component}
      //       </Paper>
      //       )}
      //   </Carousel>
      // // </div>
    );
  } export default TimeAndDate;