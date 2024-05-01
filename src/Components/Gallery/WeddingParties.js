import { useEffect, useState } from "react";
import Camera from "../../page_art/camera/camera";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";

// The boys
import seabass from '../../images/Gallery/weddingParties/sebass.jpg';
import kasian from '../../images/Gallery/weddingParties/kasian.jpg';
import justin from '../../images/Gallery/weddingParties/justin.jpg';
import adam from '../../images/Gallery/weddingParties/adam.jpg';
import anshu from '../../images/Gallery/weddingParties/anshu.jpg';
import sam from '../../images/Gallery/weddingParties/sam.jpg';
import botfeld from '../../images/Gallery/weddingParties/botfeld.jpg';

// The grils
import smita from '../../images/Gallery/weddingParties/smita.png';
import gianna from '../../images/Gallery/weddingParties/2BF2CDD3-A8FE-4718-BF5D-5DE561022BD9.JPG';
// src/images/Gallery/weddingParties/2BF2CDD3-A8FE-4718-BF5D-5DE561022BD9.JPG
import marissa from '../../images/Gallery/weddingParties/marissa2.jpeg';
import ray from '../../images/Gallery/weddingParties/3830.jpeg';
import jordan from '../../images/Gallery/weddingParties/20181110_162837.jpg';
import melissa from '../../images/Gallery/weddingParties/melissa.JPG';
import mei from '../../images/Gallery/weddingParties/20230401_152920.jpg';

const weddingPartyImages = [
    seabass, kasian, justin, adam, anshu, sam, botfeld,
    smita, gianna, marissa, ray, jordan, melissa, mei
];

const weddingPartyTitles = [
    "Sebastian Garcia - Best Man",
    "Kasian Strawick - Groomsman",
    "Justin Bengis - Groomsman",
    "Adam Rahmanan - Groomsman",
    "Anshuman Kowtha - Groomsman",
    "Samuel Mandel - Groomsman",
    "Michael Botfeld - Groomsman",

    "Smita Carvalho - Maid of Honor",
    "Gianna Memo - Bridesmaid",
    "Marissa Quilici - Bridesmaid",
    "Ray Russell - Bridesmaid",
    "Jordan Legge - Bridesmaid",
    "Melissa Nunez - Bridesmaid",
    "Meigan Feekes - Bridesmaid",
];

export default function WeddingParties (props) {
    const [initialized, setInitialized] = useState(false);
    const [textFade, setTextFade] = useState(false);

    /**
     * Fades in the text on intiialization
     */
    useEffect(() => {
        setInitialized(true);
        setTimeout(() => {
            setTextFade(true);
        }, 500);
    })

    return (
    <div className="weddingBody">
        { !textFade &&
            <Camera opaque = {initialized}
                doTransition={true}
                size={props.size ? props.size : 400}>
            </Camera>
        }
        <div className={`logisticsText ${textFade ? "fading" : ""}`}>
            <div className="flexed col centered">
                Wedding Parties
                <div>
                    {/* Put the long description here once you get connection */}
                </div>
            </div>
        </div>

        <ImageList cols={7}
            id='wedding-parties-image-list'
            gap={8}>
        { weddingPartyImages.map((photo, idx) =>
            <ImageListItem key={`wedding-party-image-${idx}`}>
                <img src={`${photo}`}
                    loading="lazy">
                </img>
                <ImageListItemBar position="below"
                    title={weddingPartyTitles[idx]}>
                </ImageListItemBar>
            </ImageListItem>
        )}
        </ImageList>
    </div>
    );

}