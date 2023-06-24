import React, { useState, useEffect } from 'react';
import cake from './images/cake.jpg';
import { Storage } from "@aws-amplify/storage"
import { Button } from '@material-ui/core';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

// async function addItem() {
//     const fileInput = document.getElementById("file-input");
//     const file = fileInput.files[0]
//     await Storage.put(file.name, file);
// }

async function addItem() {
    const fileInput = document.getElementById("file-input");
    const file = fileInput.files[0];
    // const folderName = document.getElementById("folder-input");
    const folderName = file.name; // use file name as folder name
    // const folderName = "test"
    const folderKey = `${folderName}/`; // add trailing slash to folder name
    const fileName = `${folderName}/${file.name}`; // include folder name in file key
    /*await Storage.put(fileName, file, { // use fileName as key argument
      customPrefix: {
        public: folderKey // set folderKey as custom prefix for public folder
      }
    });*/
    await Storage.put(fileName, "");
  }

function Test() {
    const [images, setImages] = useState([]);
    const [folderName, setFolderName] = useState("");

    useEffect(() => {
        async function fetchImages() {
          const files = await Storage.list('');
          let fileList = []
          for (let i = 0; i < files.results.length; ++i) {
            let fileExtension = files.results[i].key.split('.').slice(-1)[0];
            if (fileExtension === "png" || fileExtension === "jpg" || fileExtension === "jpeg") {
                fileList.push(files.results[i]);
            }
          }
          const imageUrls = await Promise.all(
            fileList.map(async (file) => {
              const imageUrl = await Storage.get(file.key);
              return imageUrl;
            })
          );
          setImages(imageUrls);
        }
    
        fetchImages();
      }, []);

    return (
      <div className="weddingBody">
        <header className="App-header">
          <img src={cake} alt="cake" className="cakeImg"/>
          <div className="padded-sides">
            <input type="file" id="file-input">
            </input>
            <input type="text" id="folder-input" value={folderName} onChange={(e) => {setFolderName(e.target.value)}}>

            </input>
            <div>
                <Button onClick={() => {addItem()}}>Add Item to Bucket</Button>
            </div>
            <Box sx={{ overflowY: 'scroll' }}>
                  <ImageList variant="masonry" cols={3} gap={8}>
                    {images.map((imageUrl, index) => (
                      <ImageListItem key={imageUrl}>
                        <img alt={`Image ${index}`}
                          src={`${imageUrl}`}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Box>
          </div>
        </header>
      </div>
    );
  } export default Test;