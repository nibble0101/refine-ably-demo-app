import { Ably } from "@refinedev/ably";

export const ablyClient = new Ably.Realtime(process.env.REACT_APP_ABLY_API_KEY!);