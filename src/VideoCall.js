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
import SignUp from "./components/SignUp.js";

export default function VideoCall(props) {
  const { fullName } = props;
  const { setInCall } = props;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    let init = async (name, userName) => {
      client.on("user-published", async (user, mediaType) => {
        // user.userName = userName;
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
        await client.join(config.appId, name, config.token, 0);
      } catch (error) {
        console.log("error");
      }

      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      try {
        init(channelName, fullName);
      } catch (error) {
        console.log(error);
      }
    }
  }, [channelName, client, ready, tracks]);

  console.log("users", users);
  return (
    <Box
      style={{
        height: "100vh",
        background: "#0000",
        // borderRadius: "8px",
      }}
    >
      {/* <SignUp /> */}
      <Grid
        container
        direction="column"
        style={{
          height: "100vh",
          background: "#0000",
          padding: "16px",
          // borderRadius: "8px",
        }}
      >
        <Grid item style={{ height: "83vh", overflow: "hide" }}>
          {start && tracks && (
            <Video tracks={tracks} users={users} fullName={fullName} />
          )}
        </Grid>
        {/* <Toolbar /> */}

        <Grid item style={{ height: "10%" }}>
          {ready && tracks && (
            <Controls
              tracks={tracks}
              setStart={setStart}
              setInCall={setInCall}
              users={users}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
