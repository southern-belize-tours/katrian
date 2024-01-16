import { useCallback, useContext, useEffect, useState } from "react";
import { useTuneService } from "./Services/TuneService/TuneServiceContext";
import { ClipLoader } from "react-spinners";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";

import './PlaylistForm.css';
import PlaylistItem from "./PlaylistItem";
import Music from "./page_art/music/music";
import { AuthContext } from "./Contexts/AuthContext/AuthContext";

import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// toast.configure();

export default function PlaylistForm () {
    const {user, login, logout} = useContext(AuthContext);
    const TuneService = useTuneService();

    const [name, setName] = useState("");
    const [artist, setArtist] = useState("");
    const [tunes, setTunes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let isSubscribed = true;
        setLoading(true);
        const getTunes = async () => {
            try {
                const tunesData = await TuneService.fetchTunes();
                if (isSubscribed) {
                    setTunes(tunesData);
                    toast.success("Retrieved Songs Successfully", {autoCloase: 2000});
                }
            } catch (e) {
                console.log("Error retrieving tunes", e);
                toast.error("Failure to Retrieve Songs", {autoCloase: 2000});
            } finally {
                if (isSubscribed) {
                    setLoading(false);
                }
            }
        }

        getTunes();

        return () => {
            isSubscribed = false;
            setLoading(false);
        }
    }, []);

    const updateCallback = useCallback(async (id, name, artist) => {
        setLoading(true);
        try {
            const newTunes = await TuneService.updateTune(id, name, artist);
            setTunes(newTunes);
            toast.success('Song Updated Successfully.', { autoClose: 2000});
        } catch (e) {
            console.log("Error updating tune", e);
            toast.error("Failure to Update Song", {autoCloase: 2000});
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteCallback = useCallback(async (id) => {
        setLoading(true);
        try {
            const newTunes = await TuneService.deleteTune(id);
            setTunes(newTunes);
            toast.success('Song Removed Successfully.', { autoClose: 2000});
        } catch (e) {
            console.log("Error on tune delete callback", e);
            toast.error("Failure to Remove Song", {autoCloase: 2000});
        } finally {
            setLoading(false);
        }
    }, []);

    const createTune = async () => {
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
        setLoading(true);
        try {
            const newTunes = await TuneService.createTune({"name": name, "artist": artist});
            setTunes(newTunes);
            setName("");
            setArtist("");
            setError("");
            toast.success('New Song Added Successfully.', { autoClose: 2000});
        } catch (e) {
            console.log("Error saving tune", e);
        } finally {
            setLoading(false);
        }
    }

    return (
    <div className="weddingBody">
        <ToastContainer></ToastContainer>
        <h1>Guest Music Recommendations</h1>
        <Music size = {400}
            loading={loading}>
        </Music>
        <p>
            We hope to play music that will make it difficult to sit down.
            Please feel free to request collaborator access on our <a target="_blank" href="https://open.spotify.com/playlist/05qaofCfEVNM02kdE81AEy?si=447cd6af3d7b47f2">Spotify Playlist</a>.
        </p>
        {!loading &&
        <div className="playlistFormContainer">
            <div className="playlistAddForm">
                <TextField multiline = {false}
                    className="playlistFormField"
                    placeholder="Gimme! Gimme! Gimme! (A Man After Midnight)"
                    value = {name}
                    label = "Song Name"
                    error = {error}
                    required = {true}
                    onChange = {(e) => {setName(e.target.value)}}>
                </TextField>
                <TextField multiline = {false}
                    className="playlistFormField"
                    placeholder="ABBA"
                    value = {artist}
                    label = "Artist"
                    error = {error}
                    required = {true}
                    onChange = {(e) => {setArtist(e.target.value)}}>
                </TextField>
                <Button variant="outlined"
                    onClick = {() => {createTune();}}>
                    <Add></Add> Add Tune
                </Button>
            </div>
            <div className = "playlistItems">
            <TableContainer component={Paper}>
                <Table aria-label="playlist table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Artist</TableCell>
                            {user && user.isSignedIn &&
                                <TableCell align="right">Update</TableCell>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tunes.map(tune =>
                            <PlaylistItem tune = {tune}
                                key={`playlist-item-${tune.id}`}
                                updateCallback={updateCallback}
                                deleteCallback={deleteCallback}>
                            </PlaylistItem>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* {tunes.map(tune =>
                <PlaylistItem tune = {tune}
                    key={`playlist-item-${tune.id}`}
                    updateCallback={updateCallback}
                    deleteCallback={deleteCallback}>
                </PlaylistItem>
            )} */}
            </div>
        </div>
        }
    </div>
    )
}