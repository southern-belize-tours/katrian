import { useContext, useEffect, useState } from "react";
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
    }, [])

    return (
    <div className="weddingBody">
        { !textFade &&
        <Camera loading={loading}
            opaque={initialized}
            doTransition={true}
            size={props.size ? props.size : 400}>
        </Camera>
        }
        {/* <h1 className={`logisticsText ${textFade ? "fading" : ""}`}>{props.gallery.name}</h1> */}
        {/* <div className="galleryDescription">{props.gallery.long_description}</div> */}
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
                {/* <div className="flexed centered text-center"> */}
                    {props.gallery.name}
                {/* </div> */}
                <div>
                    {props.gallery.long_description}
                </div>
            </div>
            }
            {/* <Tooltip title = {`${accordionExpanded ? "Show Less" : "Shore More"}`}>
                <Accordion expanded={accordionExpanded}>
                    <AccordionSummary onClick = {() => {setAccordionExpanded(!accordionExpanded)}}
                        expandIcon = {accordionExpanded ? <Close color="primary"></Close> : <ExpandMore color="primary"></ExpandMore>}>
                        {props.gallery.name}
                    </AccordionSummary>
                    <AccordionDetails>
                        {props.gallery.long_description}
                    </AccordionDetails>
                </Accordion>
            </Tooltip> */}
        </div>

        { ((props.gallery.admin_upload_only === true && user && user.isSignedIn) || (props.gallery.admin_upload_only === false) && (loading === false)) &&
            <AddPhotoDialog gallery={props.gallery}></AddPhotoDialog>
        }
        <ImageList variant="masonry" cols={3} gap={8}>
        {photos.map(photo =>
            <ImageListItem key={photo.key}>
                <img srcSet={`${photo.url}`}
                    src={`${photo.url}`}
                    alt={props.gallery.alts.find(alt=>alt.split('-')[0] === photo.key.split('-')[1]).split('-')[1]}
                    loading="lazy"/>
                <ImageListItemBar 
                    // position="below"
                    title={props.gallery.alts.find(alt=>alt.split('-')[0] === photo.key.split('-')[1]).split('-')[1]}>
                </ImageListItemBar>
            </ImageListItem>
        )

        }
        </ImageList>
        {/* {photos.map(photo =>
        <>
            <img src={photo.url}></img>
            <div>{props.gallery.alts.find(alt => alt.split('-')[0] === photo.key.split('-')[1]).split('-')[1]}</div>
        </>
        
        )} */}
    </div>
    );
}