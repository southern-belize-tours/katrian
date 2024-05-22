import { useCallback, useContext, useEffect, useState } from "react";
import Camera from "../../page_art/camera/camera";
import { useGalleryService } from "../../Services/GalleryService/GalleryServiceContext";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import { Accordion, AccordionDetails, AccordionSummary, ImageList, ImageListItem, ImageListItemBar, Tooltip } from "@mui/material";
import { Close, ExpandMore } from "@mui/icons-material";
import AddPhotoDialog from "./AddPhotoDialog";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function GalleryPage (props) {
    const GalleryService = useGalleryService();
    const {user} = useContext(AuthContext)

    const [loading, setLoading] = useState(true);
    const [gallery, setGallery] = useState(props.gallery);
    const [photos, setPhotos] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const [textFade, setTextFade] = useState(false);
    const [accordionExpanded, setAccordionExpanded] = useState(false);

    const history = useHistory();

    /**
     * Download the photos from the current gallery
     */
    useEffect(() => {
        let isSubscribed = true;
        let currDir = history.location.pathname.split('/')[history.location.pathname.split('/').length -1];
        setLoading(true);
        const getPhotos = async () => {
            try {
                // If the gallery isn't dynamically loaded, compute which gallery this is from the route
                if (props.gallery === null) {
                    const galleries = await GalleryService.fetchGalleries();
                    const currGallery = galleries.find(gallery => gallery.directory === currDir);
                    setGallery(currGallery);
                }
                // Fetch the photos
                const photosData = await GalleryService.fetchPhotosByGallery(currDir);
                if (isSubscribed) {
                    setPhotos(photosData);
                }
            } catch (e) {
                console.log("Error retrieving photos", e);
            } finally {
                // Update the UI function
                if (isSubscribed) {
                    setLoading(false);
                    setInitialized(true);
                    setTimeout(() => {
                        setTextFade(true);
                    }, 500);
                }
            }
        }

        // Call Async function in a useEffect
        getPhotos();
        return () => {
            isSubscribed = false;
            setLoading(false);
        }
    }, [GalleryService, history.location.pathname, props.gallery]);

    const photoAddedCallback = useCallback(async () => {
        setLoading(true);
        try {
            const photosData = await GalleryService.fetchPhotosByGallery(gallery.directory);
            setPhotos(photosData);
            // will need to implement logic to get the new alts
        } catch (e) {

        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line
    }, [GalleryService]);

    const getAlt = (alt_list, photo) => {
        if (!alt_list || !alt_list.length) {
            return false;
        }
        if (alt_list.find(alt => alt.split('-')[0] === photo.key.split('-')[1])) {
            return alt_list.find(alt => alt.split('-')[0] === photo.key.split('-')[1]).split('-')[1];
        }
        return false;
    }

    return (
    <div className="weddingBody">
        { !textFade &&
        <Camera loading={loading}
            opaque={initialized}
            doTransition={true}
            size={props.size ? props.size : 400}>
        </Camera>
        }

        {gallery !== null &&
            <div className={`logisticsText ${textFade ? "fading" : ""}`}>
                {gallery.long_description.length > 200 ?
                    <Tooltip title = {`${accordionExpanded ? "Show Less" : "Shore More"}`}>
                        <Accordion expanded={accordionExpanded}>
                            <AccordionSummary onClick = {() => {setAccordionExpanded(!accordionExpanded)}}
                                expandIcon = {accordionExpanded ? <Close color="primary"></Close> : <ExpandMore color="primary"></ExpandMore>}>
                                {gallery.name}
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="logisticsText fading galleryText">
                                    {gallery.long_description}
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </Tooltip>
                :
                <div className="flexed col centered">
                    {gallery.name}
                    <div className="logisticsText fading galleryText">
                        {gallery.long_description}
                    </div>
                </div>
                }
            </div>
        }

        { ((gallery !== null) && 
        // eslint-disable-next-line
            (((gallery.admin_upload_only === true) && (user) && (user.isSignedIn)) ||
        // eslint-disable-next-line
            (gallery.admin_upload_only === false) && (loading === false))) &&
            <AddPhotoDialog gallery={gallery}
                saveCallback={photoAddedCallback}>
            </AddPhotoDialog>
        }
            <ImageList variant="masonry"    
                className = "galleryPageImageList"
                cols={3}
                gap={8}>
            {photos.map(photo =>
                <ImageListItem key={photo.key}>
                    <img srcSet={`${photo.url}`}
                        src={`${photo.url}`}
                        alt={getAlt(gallery.alts, photo)}
                        loading="lazy"/>
                    {getAlt(gallery.alts, photo).length &&
                        <ImageListItemBar 
                        position="below"
                        title={getAlt(gallery.alts, photo)}>
                        </ImageListItemBar>
                    }
                </ImageListItem>
            )

            }
            </ImageList>
    </div>
    );
}