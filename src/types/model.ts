import { Role, SlotStatus } from "@/types/enum";

export type Card = {
  cardId: string;
  cardCode: string;
  name: string;
  userId: string | null;
  user?: User;
};

export type User = {
  userId: string;
  username: string;
  email: string;
  role: Role;
};

export type Customer = User & {
  createdAt: Date;
  vehicles: Vehicle[];
  cards: Card[];
};

export type Vehicle = {
  vehicleId: string;
  cardId: string;
  userId: string;
  createdAt: Date;
  licensePlate: string;
  card?: Card;
};

export type ParkingSlot = {
  slotId: number;
  state: SlotStatus;
};

export type Video = {
  videoId: string;
  name: string;
  createdAt: string;
};
