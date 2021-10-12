import { Dialog, IconButton, Rating } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useState } from "react";
import { IAgent } from "../../types/Agent";
import CloseIcon from "@mui/icons-material/Close";
import "./Agent.css";

const Agent: FC<{ agent: IAgent }> = ({ agent }) => {
  const [showAgentData, setShowAgentData] = useState<boolean>(false);

  return (
    <>
      <div className="container" onClick={() => setShowAgentData(true)}>
        <header>
          <div className="avatar-holder">
            <img
              src={agent.photoUrl}
              className="avatar"
              alt={agent.firstName}
            />
          </div>
          <h2 className="agent-name">
            {agent.firstName + " " + agent.lastName}
          </h2>
        </header>
        <div className="body">{agent.aboutMe}</div>
        <footer>
          <div className="full-width-flex-box">
            <div className="one-third-flex-box">
              <span>{agent.address}</span>
            </div>
            <div className="one-third-flex-box">
              <span>Areas of Practice: {agent.practiceAreas}</span>
            </div>
          </div>
        </footer>
      </div>
      <Dialog
        open={showAgentData}
        onClose={() => setShowAgentData(false)}
        onBackdropClick={() => setShowAgentData(false)}
      >
        <Box className="agent-dialog">
          <IconButton
            onClick={() => setShowAgentData(false)}
            style={{
              color: "#ffffff",
              background: "#9443fe",
              marginLeft: "auto",
              position: "absolute",
              top: "0",
              right: "10px",
              marginTop: "10px",
            }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={agent.photoUrl}
            width="100px"
            height="100px"
            alt={agent.firstName}
            style={{ borderRadius: "50%", objectFit: "fill" }}
          />
          <h3>Agent ID: {agent.id}</h3>
          <h4>Agent Licence: {agent.agentLicence}</h4>
          <h4>
            <b>
              {agent.firstName} {agent.lastName}
            </b>
          </h4>
          <b>Ratings: </b>
          <Rating name="read-only" value={5} readOnly />
          <p>
            <b>Address:</b> {agent.address}
          </p>
          <p style={{ textAlign: "justify" }}>
            <b>About Me:</b> {agent.aboutMe}
          </p>
          <p>{agent.aboutMe}</p>
        </Box>
      </Dialog>
    </>
  );
};

export default Agent;
