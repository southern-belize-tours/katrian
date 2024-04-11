import { useCallback, useContext, useEffect, useState } from "react";
import Camera from "../../page_art/camera/camera";
import { useGalleryService } from "../../Services/GalleryService/GalleryServiceContext";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import { Accordion, AccordionDetails, AccordionSummary, Button, ImageList, ImageListItem, ImageListItemBar, Tooltip } from "@mui/material";
import { Close, CloudUpload, ExpandMore } from "@mui/icons-material";
import { VisuallyHiddenInput } from "./AdminGallery";
import AddPhotoDialog from "./AddPhotoDialog";

export default function GalleryPage (props) {
    const GalleryService = useGalleryService();
    const {user} = useContext(AuthContext)

    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const [textFade, setTextFade] = useState(false);
    const [accordionExpanded, setAccordionExpanded] = useState(false);

    /**
     * Download the photos from the current gallery
     */
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
                    setInitialized(true);
                    setTimeout(() => {
                        setTextFade(true);
                    }, 500);
                }
            }
        }

        getPhotos();

        return () => {
            isSubscribed = false;
            setLoading(false);
        }
    }, []);

    const photoAddedCallback = useCallback(async () => {
        setLoading(true);
        try {
            const photosData = await GalleryService.fetchPhotosByGallery(props.gallery.directory);
            setPhotos(photosData);
            // will need to implement logic to get the new alts
        } catch (e) {

        } finally {
            setLoading(false);
        }
    }, []);

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
        <div className={`logisticsText ${textFade ? "fading" : ""}`}>
            {props.gallery.long_description.length > 200 ?
                <Tooltip title = {`${accordionExpanded ? "Show Less" : "Shore More"}`}>
                    <Accordion expanded={accordionExpanded}>
                        <AccordionSummary onClick = {() => {setAccordionExpanded(!accordionExpanded)}}
                            expandIcon = {accordionExpanded ? <Close color="primary"></Close> : <ExpandMore color="primary"></ExpandMore>}>
                            {props.gallery.name}
                        </AccordionSummary>
                        <AccordionDetails>
                            {props.gallery.long_description}
                        </AccordionDetails>
                    </Accordion>
                </Tooltip>
            :
            <div className="flexed col centered">
                {props.gallery.name}
                <div>
                    {props.gallery.long_description}
                </div>
            </div>
            }
        </div>

        { ((props.gallery.admin_upload_only === true && user && user.isSignedIn) || (props.gallery.admin_upload_only === false) && (loading === false)) &&
            <AddPhotoDialog gallery={props.gallery}
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
                        alt={getAlt(props.gallery.alts, photo)}
                        loading="lazy"/>
                    {getAlt(props.gallery.alts, photo).length &&
                        <ImageListItemBar 
                        position="below"
                        title={getAlt(props.gallery.alts, photo)}>
                        </ImageListItemBar>
                    }
                </ImageListItem>
            )

            }
            </ImageList>
    </div>
    );
}