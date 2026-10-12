import Pusher from "pusher";

export const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID || "283",
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || "c5dae3641",
  secret: process.env.PUSHER_SECRET || "04cd8072c84",
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "sa1",
  useTLS: true,
});
