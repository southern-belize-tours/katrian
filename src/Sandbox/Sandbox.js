import { ClipLoader } from "react-spinners";
import Question from "../page_art/question/question";
import Cuvier from "../page_art/cuvier/Cuvier";
import Music from "../page_art/music/music";
import Cake from "../page_art/cake/cake";

export default function Sandbox (props) {

    return (
    <div className="weddingBody">
        <h1>Sandbox Works!</h1>
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

        <Cake size = {400}></Cake>
        <Cake size = {200}></Cake>
        <Cake size = {100}></Cake>
        <Cake size = {50}></Cake>

    </div>
    );
}