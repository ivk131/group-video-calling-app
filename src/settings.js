import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "002d67ae068040be96b28ec17b115ea8";
const token =
  "007eJxTYOjcIh1fvdqmVip8bdJ8h71f9v4yYmNbvufs56y1k819TTcoMBgYGKWYmSemGphZGJgYJKVamiUZWaQmG5onGRqapiZa8AUkJjcEMjKI/2tjYIRCEJ+NISU1N1/XkIEBAG2gHwQ=";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "demo-1";
