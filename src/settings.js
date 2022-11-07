import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = localStorage.getItem("appId");
const token = localStorage.getItem("agoraToken");
export const channelName = localStorage.getItem("channelName");

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
