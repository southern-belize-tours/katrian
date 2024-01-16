import { useContext, useState } from 'react';
import './PlaylistForm.css';
import { AuthContext } from './Contexts/AuthContext/AuthContext';
import { Button, IconButton, TableCell, TableRow, TextField, Tooltip } from '@mui/material';
import { Cancel, Delete, Edit, EditOff, Save } from '@mui/icons-material';

export default function PlaylistItem ({tune, updateCallback, deleteCallback}) {
    const {user, login, logout} = useContext(AuthContext);
    const [name, setName] = useState(tune.name ? tune.name : "");
    const [artist, setArtist] = useState(tune.artist ? tune.artist : "");
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");

    return (
    // <div className="playlistItemContainer">
    <TableRow>
        {(user && user.isSignedIn && isEditing) ?
        <>
        <TableCell>
        {/* // <div className="tuneProperties"> */}
            <TextField id={`tune-name-${tune.id}`}
                className="tuneNameTextField"
                label="Name"
                multiline = {false}
                value={name}
                onChange = {(e) => {setName(e.target.value)}}
                variant="outlined">
            </TextField>
        </TableCell>
        <TableCell>
            <TextField id={`tune-artist-${tune.id}`}
                className="tuneArtistTextField"
                label="Artist"
                multiline = {false}
                value={artist}
                onChange = {(e) => {setArtist(e.target.value)}}
                variant="outlined">
            </TextField>
        </TableCell>
        </>
        :
        <>
            <TableCell>{tune.name}</TableCell>
            <TableCell>{tune.artist}</TableCell>
        </>
        }
        {user && user.isSignedIn &&
        <TableCell align="right">
            {isEditing &&
                <Tooltip title="Save Updates">
                    <Button color = "primary"
                        variant = "outlined"
                        onClick = {async () => {
                            if (name.length < 1 || artist.length < 1) {
                                let errorMessage = "";
                                if (name.length < 1) {
                                    errorMessage = errorMessage + "A name must be specified.";
                                }
                                if (artist.length < 1) {
                                    errorMessage = errorMessage + "An artist must be specified."
                                }
                                setError(errorMessage);
                                return;
                            }
                            await updateCallback(tune.id, name, artist);
                            setIsEditing(false);
                            setName(tune.name);
                            setArtist(tune.artist);
                        }}>
                        <Save></Save> Update Song
                    </Button>
                </Tooltip>
            }
            <Tooltip title={`${isEditing ? "Stop Editing Song" : "Edit Song"}`}>
                <IconButton color="primary"
                    onClick = {() => {setIsEditing(!isEditing)}}>
                    {isEditing ? <EditOff></EditOff> : <Edit></Edit>}
                </IconButton>
            </Tooltip>
            <Tooltip title = "Delete Song">
                <IconButton color="primary"
                    onClick = {async () => {
                        await deleteCallback(tune.id);
                    }}>
                    <Delete></Delete>
                </IconButton>
            </Tooltip>
        </TableCell>
        }
    </TableRow>
    );
}