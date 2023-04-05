//Import Components 
import React from 'react';

// MUI Components
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import camera from './images/camera.jpg'

function importAll(r) {
    let ret = [];
    let i = 0;
    r.keys().map((item, index) => { ret[item.replace('./', '')] = r(item); ++i });
    ret["numKeys"] = i;
    return ret;
}
let images = importAll(require.context('./images/Gallery', false, /\.(jpg)$/)); 

class Gallery extends React.Component {

    constructor(props) {
        super();
        this.images = [];
        console.log(images);
        for (const [key,] of Object.entries(images)) {
           this.images.push(key);
        }
        this.images.pop();
        console.log(this.images);
    }

    render() {
        return (
            <div className="weddingBody">
                <img src={camera} alt="camera" className="cakeImg"/>
                <Box sx={{ overflowY: 'scroll' }}>
                  <ImageList variant="masonry" cols={3} gap={8}>
                    {this.images.map((item) => (
                      <ImageListItem key={item}>
                        <img
                          alt="A cute photo"
                          src={`${images[item]}?w=248&fit=crop&auto=format`}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Box>
                <div>
                </div>
            </div> 
        );
    }
}

export default Gallery;