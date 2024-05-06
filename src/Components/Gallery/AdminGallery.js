import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import { useGalleryService } from "../../Services/GalleryService/GalleryServiceContext";
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, IconButton,
    TextField, Tooltip } from "@mui/material";
import { Abc, Add, Close, CloudUpload, Delete, Save } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";


import './Gallery.css';
import styled from "@emotion/styled";
import GalleryItem from "./GalleryItem";
import Camera from "../../page_art/camera/camera";
import GalleryCard from "./GalleryCard";

const toasterConfig = {
    autoClose: 2000
};

export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

export default function AdminGallery (props) {
    const {user} = useContext(AuthContext)
    const GalleryService = useGalleryService();

    const [initialized, setInitialized] = useState(false);
    const [textFade, setTextFade] = useState(false);
    const [galleries, setGalleries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [creatingNew, setCreatingNew] = useState(false);
    const [name, setName] = useState("");
    const [folder, setFolder] = useState("");
    const [files, setFiles] = useState([]);
    const [description ,setDescription] = useState("");
    const [error, setError] = useState("");
    // const [alts, setAlts] = useState([])
    const [adminUploadOnly, setAdminUploadOnly] = useState(false);
    const [editing, setEditing] = useState(-1);

    useEffect(() => {
        let isSubscribed = true;
        setLoading(true);
        const getGalleries = async () => {
            let galleriesData = -1;
            try {
                galleriesData = await GalleryService.fetchGalleries();
                if (isSubscribed && galleriesData !== -1) {
                    setGalleries(galleriesData);
                }   
            } catch (e) {
                // console.log("Error retrieving galleries" , e);
                toast.error("Failure to Retrieve Galleries.", toasterConfig);
            } finally {
                if (isSubscribed) {
                    setLoading(false);
                    setInitialized(true);
                    setTimeout(() => {
                        setTextFade(true);
                    }, 500);

                    if (galleriesData !== -1) {
                        // toast.success("Successfully Retrieved Galleries", toasterConfig);
                    } else {
                        toast.error("Failure to Retrieve Galleries", toasterConfig);
                    }
                }
            }
        }

        getGalleries();

        return () => {
            isSubscribed = false;
            setLoading(false);
        }
    }, [GalleryService]);

    const deleteCallback = useCallback(async (galleryItem) => {
        setLoading(true);
        try {
            const newGalleries = await GalleryService.deleteGallery(galleryItem.id);
            if (newGalleries.length !== galleries.length-1) {
                toast.error("Failure to Remove Gallery");
                setLoading(false);
            } else {
                setGalleries(newGalleries);
                toast.success("Gallery Removed Successfully", toasterConfig);
                setLoading(false);
            }
        } catch (e) {
            toast.error("Failure to Remove Gallery")
            setLoading(false);
        }
    }, [GalleryService, galleries.length])

    const updateCallback = useCallback(async (id, galleryItem, files) => {
        setLoading(true);
        try {
            const newGalleries = await GalleryService.updateGallery(id, galleryItem, files);
            if (newGalleries.length !== galleries.length) {
                toast.error("Failure to Update Gallery");
            } else {
                setGalleries(newGalleries);
                setEditing(-1);
                toast.success("Gallery Updated Successfully");
            }
        } catch (e) {
            toast.error("Failure to Update Gallery");
        } finally {
            setLoading(false);
        }
    }, [GalleryService, galleries.length])

    /**
     * When pencil icon is clicked, determines which of the admin items is being edited
     * since only one can be edited at once
     */
    const setEditingCallback = useCallback(async (id) => {
        // Toggle editing if the callback is invoked by currently-edited element
        if (editing === id) {
            setEditing(-1);
        } else {
            setEditing(id);
        }
    }, [editing])

    /**
     * Resets the form fields to default values, called on creation
     */
    const resetForm = () => {
        setName("");
        setCreatingNew("");
        setFolder("");
        setDescription("");
        setError("");
        // setAlts([]);
        setAdminUploadOnly(false);
    }

    /**
     * Gallery has a:
     *    name
     *    long_description
     *    alts
     *    directory
     *    admin_upload_only
     */

    const saveGallery = async () => {
        // Run through some basic form validations
        if (!name.length) {
            setError("Error: Name must be specified");
            return;
        } else if (description.length < 10) {
            setError("Error: Description must be specified with at least 10 characters")
            return;
        } else if (!folder.length) {
            setError("Error: Folder Name must be specified");
            return;
        }

        // Save the new gallery object
        try {
            const newGalleries = await GalleryService.createGallery({
                "name": name,
                "long_description": description,
                "alts": [],
                "directory": folder,
                "admin_upload_only": adminUploadOnly,
            }, files);



            if (newGalleries.length) {
                setGalleries([...newGalleries]);
                resetForm();
                toast.success("New Gallery Added Successfully", toasterConfig);
            } else {
                toast.error("Failure to Add New Gallery", toasterConfig);
            }
        } catch (error) {
            toast.error("Failure to Add New Gallery", toasterConfig);
        }
    }

        /**
     * Adds or changes input files
     * 
     * @param {file input change event} event 
     */
    const handleFileInputChange = (event) => {
        let newFiles = Array.from(event.target.files);

        // Read the contents of the files to a FileReader
        const readerPromises = [];
        for (let i = 0; i < newFiles.length; i++) {
            const reader = new FileReader();
            const file = newFiles[i];

            readerPromises.push(
                new Promise((resolve) => {
                    reader.onload = () => {
                        resolve(reader.result);
                    };
                    reader.readAsDataURL(file);
                })
            );
        }

        // Add the newly rendered URLs to the array to display on the UI
        let tempFiles = [];
        Promise.all(readerPromises).then((results) => {
            for (let i = 0; i < newFiles.length; ++i) {
                let file = newFiles[i];
                file.url = results[i]
                tempFiles.push(file);
            }
            setFiles([...files, ...tempFiles]);
        });
    }

    /**
     * Removes a file at the given index
     * @param {index of file in array to be removed} idx 
     */
    const removeAddedFile = (idx) => {
        let newFiles = [...files];
        if (idx === 0 || Math.abs(idx) >= newFiles.length) {
            newFiles.shift();
        } else {
            newFiles.splice(idx, 1);
        }
        setFiles([...newFiles]);
    }

    return (
        <div className="adminGalleryContainer">
        <ToastContainer></ToastContainer>
        {!textFade &&
            <Camera doTransition={true}
                opaque={initialized}
                loading = {loading}
                size={props.size ? props.size : 400}></Camera>
        }
            <h1 className={`logisticsText ${textFade ? "fading" : ""}`}>
                Galleries
            </h1>
            <p className={`logisticsText ${textFade ? "fading" : ""} galleryText`}>
                We are thrilled to share our story with you, and to have been a part of your lives. 
                If you have any photos of our times together we would be ecstatic if you shared them with us on our guest gallery!
            </p>
        {user && user.isSignedIn &&
        <div className="flexed centered col">
            {/* <Button color="primary"
                onClick = {() => setCreatingNew(!creatingNew)}
                variant="outlined">
                <Add></Add> New Gallery
            </Button> */}
            <Accordion expanded={creatingNew}>
                <AccordionSummary 
                    onClick = {() => setCreatingNew(!creatingNew)}
                    expandIcon={creatingNew ? <Close></Close> : <Add></Add>}
                    aria-controls="add-gallery-panel-content"
                    id="add-gallery-panel-header">
                    New Gallery
                </AccordionSummary>
                <AccordionDetails className="galleryForm">
                    <div className="galleryFormRow">
                        <TextField id="new-gallery-name"
                            className="galleryFormField"
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required={true}
                            placeholder="Engagement Photos"
                            variant="outlined">
                        </TextField>
                        <TextField id="new-gallery-folder"
                            className="galleryFormField"
                            label="Folder"
                            value={folder}
                            onChange={(e) => setFolder(e.target.value)}
                            required={true}
                            placeholder="/engagement"
                            variant="outlined">
                        </TextField>
                    </div>
                    <div className="galleryFormRow">
                        <TextField id="new-gallery-description"
                            label="Description"
                            className="galleryFormField"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required={true}
                            multiline={true}
                            // placeholder="Bishops Peak Sunset at San Luis Obispo, where the ring was hidden in a geode that Katrina was convinced she had found"
                            variant="outlined">
                        </TextField>
                    </div>
                    <Button component="label" variant="outlined" startIcon={<CloudUpload/>}>
                        Add Photos
                        <VisuallyHiddenInput type="file" multiple={true} onChange = {(e) => {handleFileInputChange(e)}}></VisuallyHiddenInput>
                    </Button>
                    {/* <input type="file" multiple="true" onChange={(e) => handleFileInputChange(e)}></input>*/}
                    { files.length > 0 &&
                        <div className="thumbnailImageReel">
                            {files.map((file, idx) => 
                                <div className="thumbnailImageContainer">
                                    <img className="thumbnailImage" src={file.url} alt={`thumbnail-${idx}`}/>
                                    <Tooltip title="Edit Image Description">
                                        <IconButton variant="outlined"
                                            color="primary"
                                            onClick = {() => {}}
                                            className="thumbnailImageEditDescription">
                                            <Abc></Abc>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Remove Image">
                                        <IconButton variant="outlined"
                                            color="primary"
                                            onClick = {() => {removeAddedFile(idx)}}
                                            className="thumbnailImageDelete">
                                            <Delete></Delete>
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            )}
                        </div>
                    }
                    <FormControlLabel control={<Checkbox checked = {adminUploadOnly} onChange={(e) => {setAdminUploadOnly(e.target.checked)}}></Checkbox>} label="Admin Only Uploads"></FormControlLabel>
                    <Button variant="outlined"
                        onClick = {() => {saveGallery()}}
                        color="primary">
                        <Save></Save> Save Gallery
                    </Button>
                    {error.length > 0 &&
                        <div>{error}</div>
                    }
                </AccordionDetails>
            </Accordion>
        </div>
        }
        <div className="galleryCardItemsContainer">
            {galleries.map(gallery =>
                user && user.isSignedIn ?
                <GalleryItem gallery = {gallery}
                    editing = {gallery.id === editing}
                    setEditingCallback = {setEditingCallback}
                    updateCallback = {updateCallback}
                    loading = {loading}
                    deleteCallback = {deleteCallback}>
                </GalleryItem>
                :
                <GalleryCard gallery = {gallery}
                    loading = {loading}>
                </GalleryCard>
                // <div className="padded-top-bottom">
                //     <div>Name: {gallery.name}</div>
                //     <div>Description: {gallery.long_description}</div>
                //     <div>Alts: {gallery.alts}</div>
                //     <div>Directory: {gallery.directory}</div>
                //     <div>Admin? {gallery.admin_upload_only ? "Yes" : "No"}</div>
                // </div>    
            )}
        </div>
        </div>
    );
}