import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip } from "@mui/material";
import { VisuallyHiddenInput } from "./AdminGallery";
import { Add, Close, CloudUpload, Delete, Save } from "@mui/icons-material";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import './Gallery.css';
import { useGalleryService } from "../../Services/GalleryService/GalleryServiceContext";

const toasterConfig = {
    autoClose: 2000
};

export default function AddPhotoDialog (props) {
    const GalleryService = useGalleryService();

    const [open, setDialogOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [alts, setAlts] = useState([]);
    const [loading, setLoading] = useState(false);

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

            // Update the alts as well
            let newAlts = [];
            for (let j = 0; j < [...files, ...tempFiles].length; ++j) {
                newAlts.push('');
            }
            setAlts([...newAlts]);
            setDialogOpen(true);
        });
    }

    const isValid = () => {
        for (let i = 0; i  < alts.length; ++i) {
            if (alts[i].length < 1) {
                // return false;
            }
        }
        // Check to see if the alts are all filled out to a certain length
        return true;
    }

    /**
     * Prepends each file-name to the alts so that they can be later matched
     *     Assumes that altList and fileList are the same length (which should always be the case)
     * @param {*} altList 
     * @param {*} fileList 
     */
    const buildAlts = (altList, fileList) => {
        if (altList.length !== fileList.length) {
            console.log("Error: alt list length is not equal to file list length");
            return;
        }
        let newAlts = [...altList];
        // An alt for a file will have the file name (which becomes the key) prepended
        for (let i = 0; i < altList.length; ++i) {
            newAlts[i] = fileList[i].name + "-" + newAlts[i];
        }
        return newAlts;
    }

    const handleSave = async () => {
        setLoading(true);
        if (!isValid()) {
            // Do some error setting here
            return;
        }
        // console.log(files);
        let databaseAlts = buildAlts(alts, files);
        await GalleryService.addNewFilesAlts(props.gallery.id, props.gallery.directory, databaseAlts, files);
        setLoading(false);

        // close the dialog
        setDialogOpen(false);

        // toast to your success
        toast.success("New Photo(s) Added Successfully", toasterConfig);
        props.saveCallback();
    }

    const updateAlt = (e, idx) => {
        let newAlts = [...alts];
        newAlts[idx] = e.target.value;
        setAlts([...newAlts]);
    }

    /**
     * Removes a file (and its associated alt description) at given index
     * @param {nth file to be removed} idx 
     */
    const deleteImage = (idx) => {
        let newFiles = [...files];
        let newAlts = [...alts];
        if (idx ===0 || Math.abs(idx) >= newFiles.length) {
            newFiles.shift();
            newAlts.shift();
        } else {
            newFiles.splice(idx, 1);
            newAlts.splice(idx, 1);
        }
        setFiles([...newFiles]);
        setAlts([...newAlts]);
    }

    return (
    <div>
        <ToastContainer></ToastContainer>
            <Button component="label"
                variant="outlined"
                startIcon={<CloudUpload/>}>
                Add Photos
                <VisuallyHiddenInput type="file"
                    multiple={true}
                    onChange = {(e) => {handleFileInputChange(e)}}>
                </VisuallyHiddenInput>
            </Button>
            <Dialog fullWidth={true}
                open={open}
                maxWidth = {'xl'}
                onClose = {() => {setDialogOpen(false);}}>
                <DialogTitle>Add Photos</DialogTitle>
                <DialogContent>
                {/* <VisuallyHiddenInput type="file"
                    multiple={true}
                    onChange = {(e) => {handleFileInputChange(e)}}>
                </VisuallyHiddenInput> */}
                <div className="dialogContentImages">
                    {files.map((file, idx) =>
                        <div className="dialogImageContainer">
                            <div className="dialogImage" 
                                style={{backgroundImage: `url(${file.url})`}}>
                                <TextField id = {`image-alt-input-${idx}`}
                                    label = "Description"
                                    className="dialogImageAltField"
                                    placeholder = "Girl's trip to San Luis Obispo"
                                    value={alts[idx]}
                                    required={true}
                                    variant="outlined"
                                    onChange={(e) => updateAlt(e, idx)}>
                                </TextField>
                                <Tooltip title="Delete Added Photo">
                                    <IconButton variant="outlined"
                                        onClick = {() => {deleteImage(idx);}}
                                        className="dialogImageDelete"
                                        color="primary">
                                        <Delete></Delete>
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                    )}
                    <Button variant="outlined"
                        component="label"
                        className="dialogImageContainer addNewImage">
                        <div className="flexed centered">
                            <Add fontSize="2rem" color="primary"></Add> Add More Images
                        </div>
                        {/* Add More Photos */}
                        <VisuallyHiddenInput type="file"
                            multiple={true}
                            onChange = {(e) => {handleFileInputChange(e)}}>
                        </VisuallyHiddenInput>
                    </Button>
                    {/* <div className="dialogImageContainer addNewImage">
                        <div className="flexed centered">
                            <Add fontSize="2rem" color="primary"></Add> Add More Images
                        </div>
                        <VisuallyHiddenInput type="file"
                            multiple={true}
                            onChange = {(e) => {handleFileInputChange(e)}}>
                        </VisuallyHiddenInput>
                    </div> */}
                </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined"
                        onClick = {() => {setDialogOpen(false);}}>
                        <Close></Close> Close
                    </Button>
                    <Button variant="outlined"
                        onClick = {handleSave}>
                        <Save></Save> Save
                    </Button>
                </DialogActions>
            </Dialog>
    </div>
    )
};