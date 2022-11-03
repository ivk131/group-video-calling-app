import { useState, useEffect } from "react";
import {
  config,
  useClient,
  useMicrophoneAndCameraTracks,
  channelName,
} from "./settings.js";
import { Grid, Toolbar, Box } from "@material-ui/core";
import Video from "./Video";
import Controls from "./Controls";

export default function VideoCall(props) {
  const { setInCall } = props;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    let init = async name => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setUsers(prevUsers => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack.stop();
        }
        if (mediaType === "video") {
          setUsers(prevUsers => {
            return prevUsers.filter(User => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", user => {
        setUsers(prevUsers => {
          return prevUsers.filter(User => User.uid !== user.uid);
        });
      });

      try {
        await client.join(config.appId, name, config.token, null);
      } catch (error) {
        console.log("error");
      }

      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      try {
        init(channelName);
      } catch (error) {
        console.log(error);
      }
    }
  }, [channelName, client, ready, tracks]);

  return (
    <Box
      style={{
        height: "95%",
        background: "#454545",
        borderRadius: "8px",
      }}
    >
      <Grid
        container
        direction="column"
        style={{
          height: "95%",
          background: "#454545",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <Grid item style={{ height: "90%", overflow: "hide" }}>
          {start && tracks && <Video tracks={tracks} users={users} />}
        </Grid>
        {/* <Toolbar /> */}

        <Grid item style={{ height: "5%" }}>
          {ready && tracks && (
            <Controls
              tracks={tracks}
              setStart={setStart}
              setInCall={setInCall}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
