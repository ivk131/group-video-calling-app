import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

// const appId = "587b85fcda284250a336e0a1710744f4";
// const token =
//   "007eJxTYOi9v+HBosePZa4JGm1TNjph5uDuLfLhzYafAgUbTu4SemmiwGBqYZ5kYZqWnJJoZGFiZGqQaGxslmqQaGhuaGBuYpJm0syWkNwQyMiQfnECEyMDBIL43Aw+mWWpIanFJQbm5gwMAIoVIfI=";
// export const channelName = "LiveTest077";

const appId = "002d67ae068040be96b28ec17b115ea8";
const token =
  "007eJxTYLBa+yuqZdrdVM5di23avt/j8Hx7sCX6W7aXqK94/OwH5rMUGAwMjFLMzBNTDcwsDEwMklItzZKMLFKTDc2TDA1NUxMtih6nJzcEMjIsLtRkZmSAQBCfjSElNT9X15CBAQC+WyAW";
export const channelName = "deom-1";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
