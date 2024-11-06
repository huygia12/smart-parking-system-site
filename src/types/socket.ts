import { ParkingSlot } from "./model";

//Events
export interface ClientEvents {
  "user:join": () => void;
  "user:leave": () => void;
}

export interface ServerEvents {
  "user:update": (payload: { userId: string }) => void;
  "parkingSlot:update": (payload: { parkingSlots: ParkingSlot[] }) => void;
}

export interface SocketEmitError {
  status: number;
  message?: string;
  detail?: unknown;
}
