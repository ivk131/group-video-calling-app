import { useState } from "react";
import { useClient } from "./settings";
import { Grid, Button, Box, IconButton, Tooltip } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import GroupsIcon from "@material-ui/icons/GroupSharp";
import CallEndIcon from "@material-ui/icons/CallEnd";

export default function Controls(props) {
  const client = useClient();
  const { tracks, setStart, setInCall } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

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

          {/* <Button
            variant="contained"
            color={trackState.audio ? "primary" : "secondary"}
            onClick={() => mute("audio")}
          >
            {trackState.audio ? <MicIcon /> : <MicOffIcon />}
          </Button> */}
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

          {/* <Button
            variant="contained"
            color={trackState.video ? "primary" : "secondary"}
            onClick={() => mute("video")}
          >
            {trackState.video ? <VideocamIcon /> : <VideocamOffIcon />}
          </Button> */}
        </Grid>
        <Grid item>
          <IconButton
            variant="outlined"
            color="secondary"
            onClick={() => leaveChannel()}
          >
            <CallEndIcon />
          </IconButton>
          {/* <Button
            variant="outlined"
            color="default"
            onClick={() => leaveChannel()}
          >
            Leave
            <ExitToAppIcon />
          </Button> */}
        </Grid>
        <Box pl={3} />
        <Grid item>
          <Tooltip title="Participent">
            <IconButton>
              <GroupsIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Box flexGrow={0.3} />
      </Grid>
    </Box>
  );
}
