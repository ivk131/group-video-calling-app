import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "002d67ae068040be96b28ec17b115ea8";
const token =
  "007eJxTYBAVfhIw2ViuxvnLZGFth/u3/mgzZVXcLRfebhL60oi1skyBwcDAKMXMPDHVwMzCwMQgKdXSLMnIIjXZ0DzJ0NA0NdFiT0RyckMgI8OSDCcmRgYIBPHZGFJSc/N1DRkYAL0/HR4=";

export const channelName = "demo-1";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
