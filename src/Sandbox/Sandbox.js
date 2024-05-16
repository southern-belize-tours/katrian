// import { ClipLoader } from "react-spinners";
// import Question from "../page_art/question/question";
// import Cuvier from "../page_art/cuvier/Cuvier";
// import Music from "../page_art/music/music";
// import Cake from "../page_art/cake/cake";
// import Camera from "../page_art/camera/camera.js"
// import Gift from "../page_art/gift/gift.js"

import Envelope from "../page_art/envelope/envelope";


export default function Sandbox (props) {

    return (
    <div className="weddingBody">
        <h1>Sandbox</h1>
        <Envelope size={400}></Envelope>
        <Envelope size={200}></Envelope>
        <Envelope size={100}></Envelope>
        <Envelope size={50}></Envelope>

        {/* <Question loading = {true} size={300}></Question> */}
        {/* // <Question size={200}></Question> */}
        {/* // <Question size={100}></Question> */}
        {/* // <Question size={50}></Question> */}
        {/* <Cuvier size = {400}></Cuvier> */}
        {/* <Cuvier size = {200}></Cuvier> */}
        {/* <Cuvier size = {100}></Cuvier> */}
        {/* <Cuvier size = {50}></Cuvier> */}
        {/* <Music size = {400} loading = {true}></Music> */}
        {/* <Music size = {200} loading = {true}></Music> */}
        {/* <Music size = {100} loading = {true}></Music> */}
        {/* <Music size = {50} loading = {true}></Music> */}
{/* 
        <Cake size = {400}
            disappearing={true}
            doTransition={true}></Cake> */}
        {/* <Cake size = {200} doTransition={true}></Cake> */}
        {/* <Cake size = {100} doTransition={true}></Cake> */}
        {/* <Cake size = {50} doTransition={true}></Cake> */}

        {/* <Camera size = {400} loading={false}></Camera> */}
        {/* <Camera size = {200} loading={false}></Camera> */}
        {/* <Camera size = {100} loading={false}></Camera> */}
        {/* <Camera size = {50} loading={false}></Camera> */}

        {/* <Gift size = {400}></Gift>
        <Gift size = {200}></Gift>
        <Gift size = {100}></Gift>
        <Gift size = {50}></Gift> */}

    </div>
    );
}