import { Role, SlotStatus } from "@/types/enum";

export type Card = {
  cardId: string;
  userId: string | null;
  user?: User;
};

export type User = {
  userId: string;
  username: string;
  role: Role;
};

export type Customer = User & {
  createdAt: Date;
  isActive: boolean;
  vehicles: Vehicle[];
};

export type Vehicle = {
  vehicleId: string;
  userId: string;
  licensePlate: string;
};

export type ParkingSlot = {
  slotId: number;
  state: SlotStatus;
};
