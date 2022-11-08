import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import VideoCall from "./VideoCall";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container, Box, Typography } from "@material-ui/core";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import WelcomeScreen from "./components/WelcomeScreen";
import axios from "axios";
import { db } from "../src/utils/firebase";
import { onValue, ref } from "firebase/database";

function App() {
  const [inCall, setInCall] = useState(true);
  const [fullName, setFullName] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [eventsList, setEventsList] = useState([]);

  // const handleJoinVideoCall = () => {
  //   setInCall(true);
  // };

  useEffect(() => {
    const query = ref(db, "events");
    console.log("query=============================", query);
    return onValue(query, snapshort => {
      const data = snapshort.val();

      if (snapshort.exists()) {
        Object.values(data).map(event => {
          setEventsList(event => [...eventsList, event]);
        });
      }
    });

    let isLogin = localStorage.getItem("isLogin");
    setIsLogin(true);
  }, [isLogin]);

  console.log("eventList=========================", eventsList);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Navigate
              to={
                localStorage.getItem("isLogin")
                  ? "/group-video-calling-app"
                  : "/group-video-calling-app/signup"
              }
              replace={true}
            />
          }
        />
        <Route
          path="/group-video-calling-app"
          element={<VideoCall setInCall={setInCall} fullName={fullName} />}
        />
        <Route path="/group-video-calling-app/signup" element={<SignUp />} />
        <Route path="group-video-calling-app/login" element={<Login />} />
        <Route
          path="group-video-calling-app/welcome"
          element={<WelcomeScreen />}
        />
        {/* <Route
          path="/group-video-calling-app"
          element={<VideoCall setInCall={setInCall} fullName={fullName} />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
