import { useState } from "react";
import { useClient } from "./settings";
import {
  Grid,
  Button,
  Box,
  IconButton,
  Tooltip,
  Badge,
} from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import GroupsIcon from "@material-ui/icons/GroupSharp";
import CallEndIcon from "@material-ui/icons/CallEnd";
import DialogModal from "./components/DialogModal";
import { Link, Navigate } from "react-router-dom";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import StopScreenShareIcon from "@material-ui/icons/StopScreenShare";

export default function Controls(props) {
  const client = useClient();
  const { tracks, setStart, setInCall, users } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });
  const [open, setOpen] = useState(false);
  const [isScreenShare, setIsScreenShare] = useState(false);

  const handleClose = () => setOpen(true);

  const mute = async type => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState(ps => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState(ps => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    // client.remoteUsers();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  return (
    <Box
      style={{ background: "#f2f4f6", borderRadius: "8px" }}
      p={2}
      justifyContent="center"
    >
      <Grid container spacing={2} alignItems="center">
        <Box flexGrow={0.5} />
        <Grid item>
          <Tooltip title={trackState.audio ? "Mute" : "Unmute"}>
            <IconButton
              variant="contained"
              color={trackState.audio ? "primary" : "secondary"}
              onClick={() => mute("audio")}
            >
              {trackState.audio ? <MicIcon /> : <MicOffIcon />}
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title={trackState.video ? "Hide" : "Show"}>
            <IconButton
              variant="contained"
              color={trackState.video ? "primary" : "secondary"}
              onClick={() => mute("video")}
            >
              {trackState.video ? <VideocamIcon /> : <VideocamOffIcon />}
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid item>
          <Tooltip title={trackState.video ? "Screen Share" : "Stop share"}>
            <IconButton
              variant="contained"
              // color={isScreenShare ? "primary" : "secondary"}
              // onClick={() => mute("video")}
            >
              {isScreenShare ? <ScreenShareIcon /> : <StopScreenShareIcon />}
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid item>
          <IconButton
            variant="outlined"
            color="secondary"
            onClick={() => {
              leaveChannel();
              window.location.href = "/group-video-calling-app/welcome";
            }}
          >
            <CallEndIcon />
          </IconButton>
        </Grid>
        <Box pl={3} />
        <Grid item>
          <IconButton onClick={() => setOpen(true)}>
            <Badge badgeContent={users?.length + 1}>
              <GroupsIcon />
            </Badge>
          </IconButton>
        </Grid>
        <Box flexGrow={0.3} />
      </Grid>
      <DialogModal
        onClose={handleClose}
        open={open}
        setOpen={setOpen}
        users={users}
      />
    </Box>
  );
}
