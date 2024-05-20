//Import Components 
import React from 'react';

// Custom Components
import AdminGallery from './AdminGallery.js';

export default function Gallery (props) {

    return (
      <div className="weddingBody">
        {/* <h1>Galleries</h1> */}
        <div className="flexed centered justified">
          {/* <Camera doTransition={true}
            size={props.size ? props.size : 400}></Camera> */}
        </div>
        {/* <div> */}
            {/* <GuestGallery></GuestGallery> */}
            <AdminGallery></AdminGallery>
        {/* </div> */}
      </div>
    );
}