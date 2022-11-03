import { AgoraVideoPlayer } from "agora-rtc-react";
import { Grid, Box, Card, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";

export default function Video(props) {
  const { users, tracks } = props;
  const [gridSpacing, setGridSpacing] = useState(12);

  useEffect(() => {
    setGridSpacing(Math.max(Math.floor(12 / (users.length + 1)), 4));
    console.log("gridSpacing", gridSpacing);
  }, [users, tracks]);

  console.log("users, tracks", users);

  return (
    <Grid container style={{ height: "100%" }} spacing={1}>
      <Grid item xs={6} md={3} lg={2} sm={gridSpacing}>
        <AgoraVideoPlayer
          videoTrack={tracks[1]}
          style={{
            height: "100%",
            width: "100%",
            maxWidth: "250px",
            maxHeight: "280px",

            position: "relative",
          }}
        >
          <Box
            style={{
              position: "absolute",
              bottom: "1%",
              left: "2%",
              zIndex: 1,
              background: "#fafafa",
              padding: "2px 4px",
              borderRadius: "4px",
            }}
          >
            <Typography variant="body2">Vikash Kumar</Typography>
          </Box>
        </AgoraVideoPlayer>
      </Grid>
      {users.length > 0 &&
        users.map(user => {
          if (user.videoTrack) {
            return (
              <Grid
                item
                xs={6}
                lg={2}
                md={3}
                sm={gridSpacing}
                style={{ minHeight: "230px", borderRadius: "16px" }}
              >
                <AgoraVideoPlayer
                  videoTrack={user.videoTrack}
                  key={user.uid}
                  style={{
                    position: "relative",
                    height: "100%",
                    width: "100%",
                    borderRadius: "16px",
                    background: "#f2f4f6",
                    maxWidth: "250px",
                    maxHeight: "280px",
                  }}
                >
                  <Box
                    style={{
                      position: "absolute",
                      bottom: "1%",
                      left: "2%",
                      zIndex: 1,
                      background: "#fafafa",
                      padding: "2px 4px",
                      borderRadius: "4px",
                    }}
                  >
                    <Typography variant="body2">{user.userName} </Typography>
                  </Box>
                </AgoraVideoPlayer>
              </Grid>
            );
          } else return null;
        })}
    </Grid>
  );
}
