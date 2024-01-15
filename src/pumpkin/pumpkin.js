import './pumpkin.css';
import Bone from './bone';

import LocationOn from '@mui/icons-material/LocationOn';
import { Checkroom } from '@mui/icons-material';
import { Restaurant } from '@mui/icons-material';
import { LocalBar } from '@mui/icons-material';
import { PersonAddAlt1 } from '@mui/icons-material';
import HelpOutline from '@mui/icons-material/HelpOutline';
import { Event } from '@mui/icons-material';
import { Button } from '@mui/material';

const costumeNames = [
    {name: "Skellington", imageUrl: ""},
    {name: "Pumpkin", imageUrl: ""},
    {name: "Avocado", imageUrl: ""},
    {name: "Ghost", imageUrl: ""},
    {name: "Sonic the Hedgehog", imageUrl: ""},
    {name: "Any of the Skooby Doo Villains", imageUrl: ""},
    {name: "Spongebob", imageUrl: ""},
    {name: "Spider", imageUrl: ""},
    {name: "Robot", imageUrl: ""},
    {name: "", imageUrl: ""},
    {name: "", imageUrl: ""},    
    {name: "", imageUrl: ""},
    {name: "", imageUrl: ""},
    {name: "", imageUrl: ""},
    {name: "", imageUrl: ""},
    {name: "", imageUrl: ""},
    {name: "", imageUrl: ""},
    {name: "", imageUrl: ""},
    {name: "", imageUrl: ""},
    {name: "", imageUrl: ""},
    {name: "", imageUrl: ""},
    {name: "", imageUrl: ""},
]

function pumpkin (props) {
    let bones = [0,0,0,0,0,0,0,0,0,0,0,0,0,,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

    return (
        <div className="spookyContainer">
            <div className = "bonesContainer">
                {bones.map( idx =>
                    <Bone></Bone>
                )}
            </div>
            {/* <Bone></Bone> */}
            <h2 className="halloweenTitle">You are invited to a Spooky Pumpkin Carving Party</h2>
            <div className = "infoContainer">
                <div className="infoBullet">
                    <Event className="halloweenIcon"></Event>
                    October 21st. 19:00 - 22:00. Carving starts at 20:00.
                </div>
                <div className="infoBullet">
                    <LocationOn className="halloweenIcon"></LocationOn>
                    40 Glatttaalstrasse, 8052, Zurich. 9th floor, appartment on the right
                </div>
                <div className="infoIndent">
                        From PwC Office take the 75 Bus going Northwest towards Seebach, get off at Ausserdorf Strasse, and buzz into the tall building with a bowling sign on it.
                </div>
                {/* <div className="infoIndent"> */}
                {/* </div> */}
                <div className="infoBullet">
                    <Checkroom className="halloweenIcon"></Checkroom>
                    Costumes are not mandatory, but are highly encouraged
                </div>
                <div className="infoIndent">
                    Not sure what costume to wear? Get some inspiration from our costume name generator!
                    <Button>Generate</Button>
                </div>
                <div className="infoBullet">
                    <Restaurant className="halloweenIcon"></Restaurant>
                    Pumpkins will be provided, and chosen first-come-first serve. Come at 7pm, carving starts at 8:30pm.
                </div>
                <div className="infoBullet">
                    <LocalBar className="halloweenIcon"></LocalBar>
                    Bring Your Own Potions, snacks will be provided
                </div>
                <div className="infoBullet">
                    <PersonAddAlt1 className="halloweenIcon"></PersonAddAlt1>
                    Feel Free to invite a +1, just please notify us so we can get a "Pumpkin-Head-Count"
                </div>
                <div className="infoBullet">
                    <HelpOutline className="halloweenIcon"></HelpOutline>
                    If you have any questions, please contact Ian at +41-76-805-69-21 or ianfeekes@gmail.com
                </div>
            </div>
        </div>
    );
} export default pumpkin;