// Core Components
import React, { useEffect, useState } from 'react';

// MUI Components
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

// Helper function to import all images in a directory
function importAll(r) {
    let ret = [];
    let i = 0;
    r.keys().map((item, index) => { ret[item.replace('./', '')] = r(item); ++i });
    ret["numKeys"] = i;
    return ret;
}

function GallerySummary(props) {

    
    // Initialize empty array of images
    const [images, setImages] = useState([]);
    const [initialImages, setInitialImages] = useState([]);

    // const directoryString = `./images${props.gallery.route}/`;
    // const directoryString = './images' + props.gallery.route + '/';

    // Imports all images from the src/images/Gallery directory
    useEffect(() => {
        let originalImages = importAll(require.context('./images/Gallery/proposal/', false, /\.(jpg)$/)); 
        // let originalImages = importAll(require.context(directoryString, false, /\.(jpg)$/)); 
        setInitialImages(originalImages);
        let tempImages = [];
        if (originalImages !== null) {  
            for (const [key,] of Object.entries(originalImages)) {
                tempImages.push(key);
            }
            tempImages.pop();
            setImages(tempImages);
        }
        console.log(images);
        console.log(initialImages);
    }, []);

    return (
        // <div className="weddingBody">
        <div>
            <h1>{props.gallery.text}</h1>
            <div>
                {props.gallery.description.map(line => <p>{line}</p>)}
            </div>
            <div className="flexed">
                {props.galleries.map(gallery => gallery.text !== props.gallery.text && <a href={gallery.route}>{gallery.text}</a>)}
            </div>
            {/* {props.gallery.description && props.gallery.description.length > 0 ? props.gallery.desription.map(line =>
                <p>{line}</p>
                
            ) : <></>} */}
            <Box sx={{ overflowY: 'scroll' }}>
                <ImageList variant="masonry" cols={3} gap={8}>
                    {images.map((item) => (
                      <ImageListItem key={item}>
                        <img
                          alt="Cute proposal at mount hood"
                          src={`${initialImages[item]}?w=248&fit=crop&auto=format`}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </div>
    )

} export default GallerySummary;