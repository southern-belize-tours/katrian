//Import Components 
import React from 'react';

// MUI Components
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

// Custom Components
import Camera from './page_art/camera/camera.js';
import GallerySummary from './GallerySummary.js';

// Images and Styling
import camera from './images/camera.png'

// Carousel Refractoring
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Summary from './Summary';

class Gallery extends React.Component {

    constructor(props) {
        super();
    }

    render() {
        return (
          <div className="weddingBody">
            <h1>Galleries</h1>
            {/* <Carousel autoPlay={false}
              style={{scroll: "auto"}}>
              {this.props.galleries.map((gallery, i) =>
                <Paper className="flexed centered">
                  <GallerySummary galleries = {this.props.galleries}
                    gallery = {gallery}>
                      
                    </GallerySummary>
                </Paper>
              )}
            </Carousel> */}
              {/* <img src={camera} alt="camera" className="cakeImg"/> */}
              <div className="flexed centered justified">
                <Camera doTransition={true}
                  size={this.props.size ? this.props.size : 400}></Camera>
              </div>
              <div>
                {/* {this.props.galleries.map(gallery => 
                  <h2>
                    <a href={gallery.route}>{gallery.text}</a>
                  </h2>)} */}
              {this.props.galleries.map(gallery => {
                    <a href = {gallery.route}>{gallery.text}</a>
                    // <GallerySummary gallery = {gallery} ></GallerySummary>
                  })}
              </div>
              <div>
              </div>
            </div>
        );
    }
}

export default Gallery;