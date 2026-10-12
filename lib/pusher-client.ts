import PusherClient from "pusher-js";

let pusherClientInstance: PusherClient | null = null;

export function getPusherClient(): PusherClient {
  if (!pusherClientInstance) {
    pusherClientInstance = new PusherClient(
      process.env.NEXT_PUBLIC_PUSHER_KEY || "c5dae3641",
      {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "sa1",
      }
    );
  }
  return pusherClientInstance;
}
