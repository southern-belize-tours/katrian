// import React, { useEffect, useMemo, useState } from "react";
// import { Card, CardContent, Typography } from "@mui/material";
// import { styled, keyframes } from "@mui/system";

// const missions = [
//   { title: "Ghostwriter", description: "Declare in front of Kasian Strawick and others that you ghost-wrote the officiant speech." },
//   { title: "Inchworm", description: "During conversation, see how far you can inch yourself away from the person before they notice." },
//   { title: "Inventor", description: "Tell someone you invented one of the signature cocktails proudly." },
//   { title: "Animal Style", description: "Go to the bar and ask about the secret menu." },
//   { title: "Foreign Merriment", description: "Create a nonexistent word for cheers in a different language and convince a guest to cheers with you." },
//   { title: "Very Impressive", description: "Start a slow clap and get 5 people to join in." },
//   { title: "Cheers Communicant", description: "Get someone to cheers you using only eye contact and intense nodding (no hand gestures)" },
//   { title: "Something Came Up", description: "Call your friend, then immediately say \"I am a little busy, can I call ya later\" " },
//   { title: "Sharp Dresser", description: "Casually insist you always wear formal wear to casual events, even at home." },
//   { title: "Constructive Criticism", description: "Gently correct someone's pronunciation of a word, even if they said it correctly." },
//   { title: "True Motives", description: "Ask another guest what the real reason they came in today is, and wait for their answer." },
//   { title: "The Talent", description: "Casually refer to the couple as the talent. Never explain." },
//   { title: "The Waiver", description: "Ask someone if they signed the wedding attendance waiver. Act concerned." },
//   { title: "The Days", description: "Approach someone with a drink and say \"This. This is the monent we will remember.\"" },
//   { title: "Political Outcast", description: "Tell someone you were almost in the wedding party but politics got in the way." },
//   { title: "The Message", description: "Ask someone if they also found the hidden message in the seating chart, and do not explain." },
//   { title: "A Strange Person", description: "Introduce your friend to someone and say something normal about them but act like it's extremely weird" },
//   { title: "Expressionist", description: "Verbally use emojis during conversation" },
//   { title: "Feature Film", description: "Say you saw a well-known movie, then describe it completely incorrectly to someone." },
//   { title: "Tranquillo", description: "During a normal conversation, casually tell someone to calm down." },
//   { title: "Websters", description: "Make up a fake word and try to floopy it into conversation without people noticing." }
// ];

// // Animation for green matrix-style binary effect
// const binaryRain = keyframes`
//   0% { transform: translateY(-100%) rotateX(90deg); opacity: 0; }
//   50% { opacity: 1; }
//   100% { transform: translateY(100%) rotateX(0deg); opacity: 0; }
// `;

// const BinaryOverlay = styled("div")(({ theme }) => ({
//   position: "absolute",
//   top: 0,
//   left: 0,
//   width: "100%",
//   height: "100%",
//   overflow: "hidden",
//   pointerEvents: "none",
//   zIndex: 0,
//   backgroundColor: "rgba(0,0,0,0.9)",
//   "> div": {
//     position: "absolute",
//     color: "#00ff00",
//     fontFamily: "monospace",
//     fontSize: "1rem",
//     animation: `${binaryRain} 1s linear infinite`,
//     whiteSpace: "nowrap",
//     opacity: 0.2,
//   },
// }));

// const getRandomBinaryString = () => {
//   const length = Math.floor(Math.random() * 20) + 5;
//   return Array.from({ length }, () => (Math.random() > 0.5 ? "1" : "0")).join(" ");
// };

// const ActivityCard = styled(Card)(({ theme }) => ({
//   position: "relative",
//   overflow: "hidden",
//   backgroundColor: "#0a0a0a",
//   color: "#00ff00",
//   border: `2px solid ${theme.palette.primary.main}`,
//   padding: theme.spacing(2),
//   fontFamily: "monospace",
//   flex: "1 1 auto",
//   marginTop: "3rem",
// }));

// const MissionText = styled(Typography)(({ theme }) => ({
//   zIndex: 1,
//   position: "relative",
//   fontSize: "1.1rem",
// }));

// const Activity = ({ missionTitle, missionDetails }) => {
//   const [showOverlay, setShowOverlay] = useState(true);

//   // Pick a random mission exactly once (per mount)
//   const selectedMission = useMemo(
//     () => missions[Math.floor(Math.random() * missions.length)],
//     []
//   );

//   useEffect(() => {
//     const timeout = setTimeout(() => setShowOverlay(false), 2000); // ~2 cycles if your animation is 1s
//     return () => clearTimeout(timeout);
//   }, []);

//   const binaryLines = Array.from({ length: 20 }, (_, idx) => (
//     <div
//       key={idx}
//       style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
//     >
//       {getRandomBinaryString()}
//     </div>
//   ));

//   return (
//     <ActivityCard elevation={6}>
//       {showOverlay && <BinaryOverlay>{binaryLines}</BinaryOverlay>}
//       <CardContent>
//         <Typography variant="h4" gutterBottom>
//           🕵️ Today&apos;s Mission
//         </Typography>

//         <Typography variant="h6" gutterBottom>
//           {selectedMission.title}
//         </Typography>
//         <MissionText variant="body1">
//           {selectedMission.description}
//         </MissionText>

//         {missionDetails && (
//           <MissionText variant="body2" sx={{ mt: 2 }}>
//             {missionDetails}
//           </MissionText>
//         )}
//       </CardContent>
//     </ActivityCard>
//   );
// };

// export default Activity;

// import React, { useEffect, useMemo, useState } from "react";
// import { Card, CardContent, Typography, Box } from "@mui/material";
// import { styled, keyframes } from "@mui/system";

// /* -------------------- Missions -------------------- */
// const missions = [
//   { title: "Ghostwriter", description: "Declare in front of Kasian Strawick and others that you ghost-wrote the officiant speech." },
//   { title: "Inchworm", description: "During conversation, see how far you can inch yourself away from the person before they notice." },
//   { title: "Inventor", description: "Tell someone you invented one of the signature cocktails proudly." },
//   { title: "Animal Style", description: "Go to the bar and ask about the secret menu." },
//   { title: "Foreign Merriment", description: "Create a nonexistent word for cheers in a different language and convince a guest to cheers with you." },
//   { title: "Very Impressive", description: "Start a slow clap and get 5 people to join in." },
//   { title: "Cheers Communicant", description: "Get someone to cheers you using only eye contact and intense nodding (no hand gestures)" },
//   { title: "Something Came Up", description: "Call your friend, then immediately say \"I am a little busy, can I call ya later\" " },
//   { title: "Sharp Dresser", description: "Casually insist you always wear formal wear to casual events, even at home." },
//   { title: "Constructive Criticism", description: "Gently correct someone's pronunciation of a word, even if they said it correctly." },
//   { title: "True Motives", description: "Ask another guest what the real reason they came in today is, and wait for their answer." },
//   { title: "The Talent", description: "Casually refer to the couple as the talent. Never explain." },
//   { title: "The Waiver", description: "Ask someone if they signed the wedding attendance waiver. Act concerned." },
//   { title: "The Days", description: "Approach someone with a drink and say \"This. This is the monent we will remember.\"" },
//   { title: "Political Outcast", description: "Tell someone you were almost in the wedding party but politics got in the way." },
//   { title: "The Message", description: "Ask someone if they also found the hidden message in the seating chart, and do not explain." },
//   { title: "A Strange Person", description: "Introduce your friend to someone and say something normal about them but act like it's extremely weird" },
//   { title: "Expressionist", description: "Verbally use emojis during conversation" },
//   { title: "Feature Film", description: "Say you saw a well-known movie, then describe it completely incorrectly to someone." },
//   { title: "Tranquillo", description: "During a normal conversation, casually tell someone to calm down." },
//   { title: "Websters", description: "Make up a fake word and try to floopy it into conversation without people noticing." }
// ];

// /* -------------------- Binary Overlay -------------------- */
// const binaryRain = keyframes`
//   0% { transform: translateY(-100%) rotateX(90deg); opacity: 0; }
//   50% { opacity: 1; }
//   100% { transform: translateY(100%) rotateX(0deg); opacity: 0; }
// `;

// const BinaryOverlay = styled("div")(() => ({
//   position: "absolute",
//   inset: 0,
//   overflow: "hidden",
//   pointerEvents: "none",
//   zIndex: 0,
//   backgroundColor: "rgba(0,0,0,0.9)",
//   "> div": {
//     position: "absolute",
//     color: "#00ff00",
//     fontFamily: "monospace",
//     fontSize: "1rem",
//     animation: `${binaryRain} 1s linear infinite`,
//     whiteSpace: "nowrap",
//     opacity: 0.2
//   }
// }));

// const getRandomBinaryString = () =>
//   Array.from({ length: Math.floor(Math.random() * 20) + 5 }, () =>
//     Math.random() > 0.5 ? "1" : "0"
//   ).join(" ");

// /* -------------------- Styled Shell -------------------- */
// const ActivityCard = styled(Card)(({ theme }) => ({
//   position: "relative",
//   overflow: "hidden",
//   backgroundColor: "#0a0a0a",
//   color: "#00ff00",
//   border: `2px solid ${theme.palette.primary.main}`,
//   padding: theme.spacing(2),
//   fontFamily: "monospace",
//   flex: "1 1 auto",
//   marginTop: "3rem"
// }));

// const MissionText = styled(Typography)(() => ({
//   zIndex: 1,
//   position: "relative",
//   fontSize: "1.1rem"
// }));

// /* -------------------- Redactions -------------------- */
// const RedactionRow = styled("div")(() => ({
//   display: "flex",
//   gap: "8px",
//   flexWrap: "wrap",
//   marginTop: "8px"
// }));

// const Redacted = styled("span")(() => ({
//   display: "inline-block",
//   background: "#000",
//   color: "transparent",
//   borderRadius: "2px",
//   height: "0.9em",
//   width: "80px",
//   verticalAlign: "middle",
//   boxShadow: "0 0 0 1px #111 inset"
// }));

// function RandomRedactions({ count = 8 }) {
//   const bars = useMemo(
//     () =>
//       Array.from({ length: count }, (_, i) => (
//         <Redacted
//           key={i}
//           style={{ width: `${Math.floor(Math.random() * 120) + 40}px` }}
//         />
//       )),
//     [count]
//   );
//   return <RedactionRow>{bars}</RedactionRow>;
// }

// /* -------------------- Dossier (File) UI -------------------- */
// const Dossier = styled("div")(() => ({
//   position: "relative",
//   width: "100%",
//   maxWidth: 560,
//   marginTop: "16px",
//   cursor: "pointer",
//   perspective: "1000px",
//   userSelect: "none"
// }));

// const Cover = styled("div")(({ open }) => ({
//   position: "relative",
//   height: 120,
//   background: "linear-gradient(180deg, #b98f4a, #9b7a3d)", // manila folder vibe
//   border: "1px solid #4a3a1c",
//   borderBottom: "none",
//   borderRadius: "8px 8px 0 0",
//   transformOrigin: "top",
//   transform: open
//     ? "translateY(-96px) rotateX(84deg)"
//     : "translateY(0) rotateX(0deg)",
//   transition: "transform 600ms cubic-bezier(.2,.8,.2,1)"
// }));

// const Tab = styled("div")(() => ({
//   position: "absolute",
//   top: 8,
//   left: 16,
//   background: "#caa25a",
//   border: "1px solid #4a3a1c",
//   padding: "4px 10px",
//   borderRadius: "4px",
//   fontWeight: 700,
//   color: "#2c220f",
//   letterSpacing: "0.06em",
//   textTransform: "uppercase"
// }));

// const PaperSheet = styled("div")(({ open }) => ({
//   background: "#f0efe9",
//   color: "#222",
//   border: "1px solid #c9c7be",
//   borderTop: "none",
//   borderRadius: "0 0 8px 8px",
//   padding: "16px 18px",
//   minHeight: 160,
//   transformOrigin: "top",
//   transform: open ? "translateY(-96px)" : "translateY(-8px)",
//   transition: "transform 600ms cubic-bezier(.2,.8,.2,1)",
//   position: "relative",
//   overflow: "hidden"
// }));

// const ConfidentialStamp = styled("div")(() => ({
//   position: "absolute",
//   top: 12,
//   right: -10,
//   transform: "rotate(-12deg)",
//   fontWeight: 900,
//   fontSize: "0.9rem",
//   padding: "4px 10px",
//   border: "2px solid #b00000",
//   color: "#b00000",
//   background: "transparent",
//   letterSpacing: "0.1em"
// }));

// /* -------------------- Component -------------------- */
// const Activity = ({ missionDetails }) => {
//   const [showOverlay, setShowOverlay] = useState(true);
//   const [dossierOpen, setDossierOpen] = useState(false);
//   const [showMission, setShowMission] = useState(false);

//   const selectedMission = useMemo(
//     () => missions[Math.floor(Math.random() * missions.length)],
//     []
//   );

//   useEffect(() => {
//     const t = setTimeout(() => setShowOverlay(false), 2000);
//     return () => clearTimeout(t);
//   }, []);

//   const handleOpen = () => {
//     if (dossierOpen) return;
//     setDossierOpen(true);
//     setTimeout(() => setShowMission(true), 620);
//   };

//   const binaryLines = Array.from({ length: 20 }, (_, idx) => (
//     <div
//       key={idx}
//       style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
//     >
//       {getRandomBinaryString()}
//     </div>
//   ));

//   return (
//     <ActivityCard elevation={6}>
//       {showOverlay && <BinaryOverlay>{binaryLines}</BinaryOverlay>}
//       <CardContent>
//         <Typography variant="h4" gutterBottom>
//           🕵️ Today&apos;s Mission
//         </Typography>

//         <Typography variant="body1" sx={{ mb: 1 }}>
//           Your mission is of utmost importance. Should you choose to accept it,
//           please <strong>open the file</strong>.
//         </Typography>
//         <div style = {{backgroundColor: "white", padding: "0.5rem"}}>
//         <Typography variant="caption"
//           sx={{ opacity: 0.9, backgroundColor: "white", color: "black" }}>
//           NOTICE: Unauthorized disclosure of the following contents is strictly{" "}
//           <Redacted /> by order of Section <Redacted />. Refer to file{" "}
//           <Redacted /> for clearance verification.
//         </Typography>
//         <RandomRedactions count={10} />
//         </div>

//         <Dossier onClick={handleOpen}>
//           <Cover open={dossierOpen}>
//             <Tab>CLASSIFIED</Tab>
//           </Cover>
//           <PaperSheet open={dossierOpen}>
//             <ConfidentialStamp>TOP SECRET</ConfidentialStamp>
//             {!showMission ? (
//               <Box sx={{ color: "#444", fontFamily: "monospace" }}>
//                 ▶ Click to open dossier…
//               </Box>
//             ) : (
//               <Box
//                 sx={{
//                   animation: "fadeIn 300ms ease-out forwards",
//                   "@keyframes fadeIn": {
//                     from: { opacity: 0, transform: "translateY(6px)" },
//                     to: { opacity: 1, transform: "translateY(0)" }
//                   }
//                 }}
//               >
//                 <Typography variant="h6" gutterBottom sx={{ color: "#111" }}>
//                   {selectedMission.title}
//                 </Typography>
//                 <Typography variant="body1" sx={{ color: "#111" }}>
//                   {selectedMission.description}
//                 </Typography>

//                 {missionDetails && (
//                   <Typography variant="body2" sx={{ mt: 2, color: "#333" }}>
//                     {missionDetails}
//                   </Typography>
//                 )}
//               </Box>
//             )}
//           </PaperSheet>
//         </Dossier>
//       </CardContent>
//     </ActivityCard>
//   );
// };

// export default Activity;
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, Typography, Box, Checkbox, FormControlLabel } from "@mui/material";
import { styled, keyframes } from "@mui/system";

/* -------------------- Missions -------------------- */
const missions = [
  { title: "Ghostwriter", description: "Declare in front of Kasian Strawick and others that you ghost-wrote the officiant speech." },
  { title: "Inchworm", description: "During conversation, see how far you can inch yourself away from the person before they notice." },
  { title: "Inventor", description: "Tell someone you invented one of the signature cocktails proudly." },
  { title: "Animal Style", description: "Go to the bar and ask about the secret menu." },
  { title: "Foreign Merriment", description: "Create a nonexistent word for cheers in a different language and convince a guest to cheers with you." },
  { title: "Very Impressive", description: "Start a slow clap and get 5 people to join in." },
  { title: "Cheers Communicant", description: "Get someone to cheers you using only eye contact and intense nodding (no hand gestures)" },
  { title: "Something Came Up", description: "Call your friend, then immediately say \"I am a little busy, can I call ya later\" " },
  { title: "Sharp Dresser", description: "Casually insist you always wear formal wear to casual events, even at home." },
  { title: "Constructive Criticism", description: "Gently correct someone's pronunciation of a word, even if they said it correctly." },
  { title: "True Motives", description: "Ask another guest what the real reason they came in today is, and wait for their answer." },
  { title: "The Talent", description: "Casually refer to the couple as the talent. Never explain." },
  { title: "The Waiver", description: "Ask someone if they signed the wedding attendance waiver. Act concerned." },
  { title: "The Days", description: "Approach someone with a drink and say \"This. This is the monent we will remember.\"" },
  { title: "Political Outcast", description: "Tell someone you were almost in the wedding party but politics got in the way." },
  { title: "The Message", description: "Ask someone if they also found the hidden message in the seating chart, and do not explain." },
  { title: "A Strange Person", description: "Introduce your friend to someone and say something normal about them but act like it's extremely weird" },
  { title: "Expressionist", description: "Verbally use emojis during conversation" },
  { title: "Feature Film", description: "Say you saw a well-known movie, then describe it completely incorrectly to someone." },
  { title: "Tranquillo", description: "During a normal conversation, casually tell someone to calm down." },
  { title: "Websters", description: "Make up a fake word and try to floopy it into conversation without people noticing." }
];

/* -------------------- Binary Overlay -------------------- */
const binaryRain = keyframes`
  0% { transform: translateY(-100%) rotateX(90deg); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(100%) rotateX(0deg); opacity: 0; }
`;

const BinaryOverlay = styled("div")(({ theme }) => ({
  position: "absolute",
  inset: 0,
  overflow: "hidden",
  pointerEvents: "none",
  zIndex: 0,
  backgroundColor: "rgba(0,0,0,0.9)",
  "> div": {
    position: "absolute",
    color: "#00ff00",
    fontFamily: "monospace",
    fontSize: "1rem",
    animation: `${binaryRain} 1s linear infinite`,
    whiteSpace: "nowrap",
    opacity: 0.2
  },
  [theme.breakpoints.down("sm")]: {
    "> div": { fontSize: "0.75rem" }
  }
}));

const getRandomBinaryString = () =>
  Array.from({ length: Math.floor(Math.random() * 20) + 5 }, () =>
    Math.random() > 0.5 ? "1" : "0"
  ).join(" ");

/* -------------------- Shell & Text -------------------- */
// Replace ActivityOuter or wrap your component with:
const ActivityOuter = styled(Box)({
  width: "100%",
  maxWidth: "100vw",
  overflowX: "hidden",
  boxSizing: "border-box",

  margin: "0px",
  padding: "0px",
  // maxWidth: "85vw",
});


// Replace your ActivityCard styled() with:
const ActivityCard = styled(Card)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  backgroundColor: "#0a0a0a",
  color: "#00ff00",
  border: `2px solid ${theme.palette.primary.main}`,
  padding: theme.spacing(2),
  fontFamily: "monospace",
  marginTop: "1.5rem",
  width: "100%",
  minHeight: "98vh",
  // maxWidth: "min(560px, 92vw)",   // <= clamps to viewport on phones
  marginLeft: "auto",
  marginRight: "auto",
  boxSizing: "border-box"
}));


const MissionText = styled(Typography)(({ theme }) => ({
  zIndex: 1,
  position: "relative",
  fontSize: "clamp(0.98rem, 2.5vw, 1.1rem)",
  wordBreak: "break-word",
  overflowWrap: "anywhere",
  hyphens: "auto"
}));

/* -------------------- Redactions -------------------- */
const RedactionRow = styled("div")(() => ({
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  marginTop: "8px"
}));

const Redacted = styled("span")(() => ({
  display: "inline-block",
  background: "#000",
  color: "transparent",
  borderRadius: "2px",
  height: "0.9em",
  width: "80px",
  verticalAlign: "middle",
  boxShadow: "0 0 0 1px #111 inset"
}));

function RandomRedactions({ count = 8 }) {
  const bars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => (
        <Redacted
          key={i}
          style={{ width: `${Math.floor(Math.random() * 120) + 40}px` }}
        />
      )),
    [count]
  );
  return <RedactionRow>{bars}</RedactionRow>;
}

/* -------------------- Dossier + Animations (Responsive) -------------------- */


// Replace your DossierWrap with:
const DossierWrap = styled("div")(({ dismissing }) => ({
  position: "relative",
  width: "100%",
  maxWidth: "100%",
  marginTop: 16,
  cursor: "pointer",
  perspective: "1000px",
  userSelect: "none",
  "--folderH": "120px",
  "--lift": "calc(var(--folderH) * 0.8)",
  willChange: "transform, opacity",
  ...(dismissing ? { animation: "dossierDisappear 600ms ease forwards" } : {}),
  "@keyframes dossierDisappear": {
    from: { opacity: 1, transform: "scale(1) rotate(0deg)" },
    to: { opacity: 0, transform: "scale(0.92) rotate(-2deg)" }
  },
  "@media (max-width: 600px)": { "--folderH": "96px" },
  "@media (max-width: 400px)": { "--folderH": "84px" }
}));

// Ensure cover/sheet never exceed their parent width:
const Cover = styled("div")(({ open }) => ({
  width: "100%",                     // add this
  position: "relative",
  height: "var(--folderH)",
  background: "linear-gradient(180deg, #b98f4a, #9b7a3d)",
  border: "1px solid #4a3a1c",
  borderBottom: "none",
  borderRadius: "8px 8px 0 0",
  transformOrigin: "top",
  transform: open
    ? "translateY(calc(var(--lift) * -1)) rotateX(84deg)"
    : "translateY(0) rotateX(0deg)",
  transition: "transform 600ms cubic-bezier(.2,.8,.2,1)"
}));

const PaperSheet = styled("div")(({ open }) => ({
  width: "100%",                     // add this
  background: "#f0efe9",
  color: "#222",
  border: "1px solid #c9c7be",
  borderTop: "none",
  borderRadius: "0 0 8px 8px",
  padding: "12px 14px 56px",
  minHeight: "min(260px, 60vh)",
  transformOrigin: "top",
  transform: open ? "translateY(calc(var(--lift) * -1))" : "translateY(-8px)",
  transition: "transform 600ms cubic-bezier(.2,.8,.2,1)",
  position: "relative",
  overflow: "hidden",
  boxSizing: "border-box"
}));


const Tab = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 8,
  left: 12,
  background: "#caa25a",
  border: "1px solid #4a3a1c",
  padding: "4px 10px",
  borderRadius: "4px",
  fontWeight: 700,
  color: "#2c220f",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  fontSize: "clamp(0.6rem, 2.5vw, 0.8rem)"
}));

const ConfidentialStamp = styled("div")({
  position: "absolute",
  top: 10,
  right: 6,                  // was -8 (can push outside)
  transform: "rotate(-12deg)",
  fontWeight: 900,
  fontSize: "clamp(0.7rem, 2.5vw, 0.9rem)",
  padding: "4px 10px",
  border: "2px solid #b00000",
  color: "#b00000",
  background: "transparent",
  letterSpacing: "0.1em",
  pointerEvents: "none",
  maxWidth: "calc(100% - 12px)" // safety for super narrow screens
});

const CompleteBadge = styled("div")(({ theme }) => ({
  position: "absolute",
  right: 8,
  bottom: 6,
  background: "rgba(255,255,255,0.9)",
  border: "1px dashed #7a1c1c",
  borderRadius: 6,
  padding: "2px 8px",
  display: "flex",
  alignItems: "center",
  gap: 6,
  color: "#7a1c1c",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  boxShadow: "0 1px 0 rgba(0,0,0,0.2)",
  ".MuiFormControlLabel-label": {
    fontSize: "clamp(0.6rem, 2.8vw, 0.72rem)",
    fontWeight: 800
  }
}));

/* -------------------- Component -------------------- */
const Activity = ({ missionDetails }) => {
  const [showOverlay, setShowOverlay] = useState(true);
  const [dossierOpen, setDossierOpen] = useState(false);
  const [showMission, setShowMission] = useState(false);
  const [dismissing, setDismissing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const selectedMission = useMemo(
    () => missions[Math.floor(Math.random() * missions.length)],
    []
  );

  useEffect(() => {
    const t = setTimeout(() => setShowOverlay(false), 2000);
    return () => clearTimeout(t);
  }, []);

  const handleOpen = () => {
    if (dossierOpen || dismissing || completed) return;
    setDossierOpen(true);
    setTimeout(() => setShowMission(true), 620);
  };

  const handleCompleteClick = (e) => {
    e.stopPropagation();
    if (dismissing || completed) return;
    setDismissing(true);
    setTimeout(() => {
      setCompleted(true);
      setDossierOpen(false);
      setShowMission(false);
      setDismissing(false);
    }, 620);
  };

// Where you build binaryLines, change left% from 100% to 90%
const binaryLines = Array.from({ length: 20 }, (_, idx) => (
  <div
    key={idx}
    style={{
      left: `${Math.random() * 90}%`,  // was 100%
      top: `${Math.random() * 100}%`
    }}
  >
    {getRandomBinaryString()}
  </div>
));


  return (
    <ActivityOuter>
      <ActivityCard elevation={6}>
        {showOverlay && <BinaryOverlay>{binaryLines}</BinaryOverlay>}
        <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontSize: "clamp(1.2rem, 5vw, 1.8rem)",
              wordBreak: "break-word",
              overflowWrap: "anywhere",
              hyphens: "auto"
            }}
          >
            🕵️ Today&apos;s Mission
          </Typography>

          {!completed && (
            <>
              <MissionText sx={{ mb: 1 }}>
                Your mission is of utmost importance. Should you choose to accept it,
                please <strong>open the file</strong>.
              </MissionText>
              <div style={{backgroundColor: "white", color: "black", padding: "0.5rem"}}>
              <Typography
                variant="caption"
                sx={{ opacity: 0.9, display: "block", backgroundColor: "white", color: "black" }}
              >
                NOTICE: Unauthorized disclosure of the following contents is strictly{" "}
                <Redacted /> by order of Section <Redacted />. Refer to file{" "}
                <Redacted /> for clearance verification.
              </Typography>
              <RandomRedactions count={8} />
              </div>
            </>
          )}

          {!completed ? (
            <DossierWrap onClick={handleOpen} dismissing={dismissing}>
              <Cover open={dossierOpen}>
                <Tab>CLASSIFIED</Tab>
              </Cover>
              <PaperSheet open={dossierOpen}>
                <ConfidentialStamp>CONFIDENTIAL</ConfidentialStamp>

                {!showMission ? (
                  <Box sx={{ color: "#444", fontFamily: "monospace", fontSize: "clamp(0.9rem, 3.5vw, 1rem)" }}>
                    ▶ Tap to open dossier…
                  </Box>
                ) : (
                  <Box
                    sx={{
                      animation: "fadeIn 300ms ease-out forwards",
                      "@keyframes fadeIn": {
                        from: { opacity: 0, transform: "translateY(6px)" },
                        to: { opacity: 1, transform: "translateY(0)" }
                      }
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "#111", fontSize: "clamp(1rem, 4.5vw, 1.25rem)" }}
                    >
                      {selectedMission.title}
                    </Typography>
                    <MissionText sx={{ color: "#111" }}>
                      {selectedMission.description}
                    </MissionText>
                    {missionDetails && (
                      <Typography variant="body2" sx={{ mt: 2, color: "#333" }}>
                        {missionDetails}
                      </Typography>
                    )}
                  </Box>
                )}

                {/* Mission Complete checkbox badge */}
                <CompleteBadge onClick={(e) => e.stopPropagation()}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        color="success"
                        onChange={handleCompleteClick}
                        sx={{ p: 0.3, "& svg": { transform: "scale(0.95)" } }}
                      />
                    }
                    label="Mission Complete"
                    sx={{ m: 0 }}
                  />
                </CompleteBadge>
              </PaperSheet>
            </DossierWrap>
          ) : (
            <Box
              sx={{
                mt: 2,
                p: { xs: 1.5, sm: 2 },
                border: "1px dashed #2e7d32",
                borderRadius: 2,
                background: "rgba(46, 125, 50, 0.1)"
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#7CFC00", mb: 1, fontSize: "clamp(1rem, 4.5vw, 1.2rem)" }}
              >
                ✅ Fantastic work, Agent.
              </Typography>
              <MissionText>
                Thank you for your service. Report to the <strong>bar staff</strong> and
                inform them you completed the activity for your debriefing.
              </MissionText>
            </Box>
          )}
        </CardContent>
      </ActivityCard>
    </ActivityOuter>
  );
};

export default Activity;

