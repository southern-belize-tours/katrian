import { useEffect, useState } from "react";
import { useGalleryService } from "../../Services/GalleryService/GalleryServiceContext";
import { Cancel, Check, Delete, Edit, Save } from "@mui/icons-material";
import { Button, IconButton, Menu, MenuItem, TextField, Tooltip } from "@mui/material";


export default function GalleryItem (props) {
    const GalleryService = useGalleryService();   

    const [photos, setPhotos] = useState([]);
    const [, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [description, setDescription] = useState(props.gallery.long_description);
    const [name, setName] = useState(props.gallery.name);
    const [alts,] = useState(props.gallery.alts);

    const deleteConfirmOpen = Boolean(anchorEl);

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
    }, [GalleryService, props.gallery.directory]);

    /**
     * Function called for delete clicking to run modal confirm/cancel
     * 
     * @param {event} e 
     */
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    /**
     * Closes the menu
     */
    const handleClose = () => {
        setAnchorEl(null);
    }

    /**
     * Removes a file at the given index
     * @param {index of file in array to be removed} idx 
     */
    const removeFile = (idx) => {
        let newFiles = [...photos];
        if (idx === 0 || Math.abs(idx) >= newFiles.length) {
            newFiles.shift();
        } else {
            newFiles.splice(idx, 1);
        }
        setPhotos([...newFiles]);
    }

    return (
        <div className="padded-top-bottom">
            <div className="gallery-item-title-container">
                <h3 className="gallery-item-title">
                    {props.gallery.name}
                </h3>
                <div className="gallery-item.toolbar">
                    { props.loading ? 
                        <div className="galleryItemLoadingSpinner">
                        </div>
                    :
                    <>
                    <Tooltip title={`${props.editing ? "Cancel Edits" : "Edit Gallery"}`}>
                        <IconButton variant="outlined"
                            onClick = {() => {props.setEditingCallback(props.gallery.id)}}
                            color="primary">
                            {
                                props.editing ? <Cancel></Cancel>
                                : <Edit></Edit>
                            }
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Gallery">
                        <IconButton variant="outlined"
                            aria-controls = { deleteConfirmOpen ? `delete-confirmation-${props.gallery.directory}` : undefined}
                            aria-haspopup="true"
                            aria-expanded={deleteConfirmOpen ? 'true' : undefined}
                            onClick={(e) => {handleClick(e)}}
                            color="primary">
                            <Delete></Delete>
                        </IconButton>
                        <Menu id={`delete-confirmation-${props.gallery.directory}`}
                            anchorEl = {anchorEl}
                            open = { deleteConfirmOpen}
                            onClose = {() => {handleClose()}}
                            MenuListProps = {{
                                'aria-labelledby': `delete-button-${props.gallery.directory}`
                            }}>
                            <MenuItem onClick = {async () => {
                                await props.deleteCallback(props.gallery);
                                // await GalleryService.removeGallery(props.gallery);
                                // @TODO May need to add a callback function here for parent component to re-fetch
                                handleClose();
                            }}>
                                Yes, Delete <Check color="primary"></Check>
                            </MenuItem>
                            <MenuItem onClick = {handleClose}>
                                No, Cancel <Cancel color="primary"></Cancel>
                            </MenuItem>
                        </Menu>
                    </Tooltip>
                    </>
                    }
                    
                </div>
            </div>
            {/* <div>Name: {props.gallery.name}</div> */}
            { props.editing ?
                <div>
                                            {/* <TextField id="new-gallery-folder"
                            className="galleryFormField"
                            label="Folder"
                            value={folder}
                            onChange={(e) => setFolder(e.target.value)}
                            required={true}
                            placeholder="/engagement"
                            variant="outlined">
                        </TextField> */}
                    <TextField id={`gallery-edit-name-${props.gallery.directory}`}
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={props.gallery.name}
                        variant="outlined">
                    </TextField>
                    <TextField id={`gallery-edit-description-${props.gallery.directory}`}
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={props.gallery.long_description}
                        variant="outlined">
                    </TextField>
                </div>
            :
                <div>
                    <div>Description: {props.gallery.long_description}</div>
                    <div>Alts: {props.gallery.alts}</div>
                    <div>Directory: {props.gallery.directory}</div>
                    <div>Admin: {props.gallery.admin_upload_only ? "Yes" : "No"}</div>
                </div>
            }
            {photos.length > 0 &&
                <div className="thumbnailImageReel">
                    {photos.map((photo, idx) =>
                        <div className="thumbnailImageContainer"
                            key={`gallery-item-photo-${idx}`}>
                            <img className="thumbnailImage"
                                alt={`Gallery Item ${idx}`}
                                src={photo.url}/>
                            {props.editing &&
                            <Tooltip title="Remove Image">
                                <IconButton variant="outlined"
                                    color="primary"
                                    onClick = {() => {removeFile(idx)}}
                                    className="thumbnailImageDelete">
                                    <Delete></Delete>
                                </IconButton>
                            </Tooltip>
                            }
                        </div>
                    )}
                </div>
            }
            {props.editing &&
            <Button variant="outlined"
                color="primary"
                onClick = {() => {props.updateCallback(props.gallery.id, {"name": name, "long_description": description, "alts": alts}, photos)}}>
                <Save></Save> Save Changes
            </Button>
            }
            {/* {photos.map(photo => <img src={photo}/>)} */}
        </div>
    );
}