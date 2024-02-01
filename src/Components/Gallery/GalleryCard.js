import { useEffect, useState } from "react";
import { useGalleryService } from "../../Services/GalleryService/GalleryServiceContext";
import { Tooltip } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

// gallery, loading
export default function GalleryCard (props) {
    const GalleryService = useGalleryService();
    
    const history = useHistory();

    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(props.loading);

    useEffect(() => {
        let isSubscribed = true;
        setLoading(true);
        const getPhotos = async () => {
            try {
                const photosData = await GalleryService.fetchPhotosByGallery(props.gallery.directory);
                if (isSubscribed) {
                    setPhotos(photosData);
                }
            } catch (e) {
                console.log("Error retrieving photos", e);
            } finally {
                if (isSubscribed) {
                    setLoading(false);
                }
            }
        }

        getPhotos();

        return () => {
            isSubscribed = false;
            setLoading(false);
        }
    }, []);

    return (
    <Tooltip title = {`Navigate to ${props.gallery.name}`}>
        <div className="galleryCardContainer"
            onClick = {() => {history.push("/Gallery/" + props.gallery.directory)}}
            style={{backgroundImage: `url(${photos[0] ? photos[0].url: ""})`}}>
            {/* Gallery Card Works */}
            <div className="galleryTitle">
                {props.gallery.name}
                <div className="galleryLine"></div>
            </div>
            {/* <div className="galleryLine"></div> */}
        </div>
    </Tooltip>
    )
}