import { AgoraVideoPlayer } from "agora-rtc-react";
import { Grid, Box, Card, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";

export default function Video(props) {
  const { users, tracks, fullName } = props;
  const [gridSpacing, setGridSpacing] = useState(12);

  useEffect(() => {
    // setGridSpacing(Math.max(Math.floor(12 / (users.length + 1)), 4));
    setGridSpacing(Math.max(Math.floor(12 / (users.length + 1))));
    console.log("gridSpacing", gridSpacing);
  }, [users, tracks]);

  // console.log("USERS---------------------------", users);
  const totalUsers = users?.length + 1;
  return (
    <Grid container style={{ height: "100%" }} spacing={1}>
      <Grid
        item
        sm={
          totalUsers === 1
            ? 12
            : null || totalUsers === 2
            ? 6
            : null || totalUsers === 3
            ? 4
            : null || totalUsers === 4
            ? 6
            : null || totalUsers > 4
            ? 3
            : null
        }
        xs={
          totalUsers === 1
            ? 12
            : null || totalUsers === 2
            ? 6
            : null || totalUsers === 3
            ? 6
            : null || totalUsers === 4
            ? 6
            : null || totalUsers > 4
            ? 6
            : null
        }
        // lg={gridSpacing}
      >
        <AgoraVideoPlayer
          videoTrack={tracks[1]}
          style={{
            height: "100%",
            width: "100%",
            background: "#454545",
            // maxWidth: "250px",
            maxHeight: `${totalUsers} <= 2 ? 100%: 280px`,

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
            <Typography variant="body2"> {fullName} </Typography>
          </Box>
        </AgoraVideoPlayer>
      </Grid>
      {users.length > 0 &&
        users.map(user => {
          if (user.videoTrack) {
            return (
              <Grid
                item
                sm={
                  totalUsers === 1
                    ? 12
                    : null || totalUsers === 2
                    ? 6
                    : null || totalUsers === 3
                    ? 4
                    : null || totalUsers === 4
                    ? 6
                    : null || totalUsers > 4
                    ? 3
                    : null
                }
                xs={
                  totalUsers === 1
                    ? 12
                    : null || totalUsers === 2
                    ? 6
                    : null || totalUsers === 3
                    ? 6
                    : null || totalUsers === 4
                    ? 6
                    : null || totalUsers > 4
                    ? 6
                    : null
                }
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
                    // maxWidth: "250px",
                    // maxHeight: "280px",
                    maxHeight: `${totalUsers} <= 2 ? 100%: 280px`,
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
                    <Typography variant="body2">{user.uid} </Typography>
                  </Box>
                </AgoraVideoPlayer>
              </Grid>
            );
          } else return null;
        })}
    </Grid>
  );
}
