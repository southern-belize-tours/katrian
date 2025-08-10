
// export default function Activity (props) {

//     return (
//     <div>
//         <h1>Activity Works!</h1>
//     </div>
//     );
// }

import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { styled, keyframes } from "@mui/system";

const missions = [
    {
        title: "Ghostwriter",
        description: "Declare in front of Kasian Strawick and others that you ghost-wrote the officiant speech."
    },
    {
        title: "Inchworm",
        description: "During conversation, see how far you can inch yourself away from the person before they notice."
    },
    {
        title: "Foreign Merriment",
        description: "Tell someone you invented one of the signature cocktails proudly."
    },
    {
      title: "Animal Style",
      description: "Go to the bar and ask about the secret menu"
    }
]

// Animation for green matrix-style binary effect
const binaryRain = keyframes`
  0% { transform: translateY(-100%) rotateX(90deg); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(100%) rotateX(0deg); opacity: 0; }
`;

const BinaryOverlay = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  pointerEvents: "none",
  zIndex: 0,
  backgroundColor: "rgba(0,0,0,0.9)",

  "> div": {
    position: "absolute",
    color: "#00ff00",
    fontFamily: "monospace",
    fontSize: "1rem",
    animation: `${binaryRain} 4s linear infinite`,
    whiteSpace: "nowrap",
    opacity: 0.2,
  },
}));

const getRandomBinaryString = () => {
  const length = Math.floor(Math.random() * 20) + 5;
  return Array.from({ length }, () => (Math.random() > 0.5 ? "1" : "0")).join(" ");
};

const ActivityCard = styled(Card)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  backgroundColor: "#0a0a0a",
  color: "#00ff00",
  border: `2px solid ${theme.palette.primary.main}`,
  padding: theme.spacing(2),
  fontFamily: "monospace",
  flex: "1 1 auto",
}));

const MissionText = styled(Typography)(({ theme }) => ({
  zIndex: 1,
  position: "relative",
  fontSize: "1.1rem",
}));

const Activity = ({ missionTitle, missionDetails }) => {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowOverlay(false);
    }, 8000); // 2 full animation cycles of 4s

    return () => clearTimeout(timeout);
  }, []);

  const binaryLines = Array.from({ length: 20 }, (_, idx) => (
    <div
      key={idx}
      style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
    >
      {getRandomBinaryString()}
    </div>
  ));

  return (
    <ActivityCard elevation={6}>
      {showOverlay && <BinaryOverlay>{binaryLines}</BinaryOverlay>}
      <CardContent>
        <Typography variant="h5" gutterBottom>
          🕵️ Today's Mission
        </Typography>
        {missions.map(mission =>
            <div>
            <Typography variant="p" gutterBottom>
                {mission.title}: {mission.description}
            </Typography>
            </div>
        )}
        <MissionText variant="body2">{missionDetails}</MissionText>
      </CardContent>
    </ActivityCard>
  );
};

export default Activity;
