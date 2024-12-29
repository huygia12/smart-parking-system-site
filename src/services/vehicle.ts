import { axiosInstance } from "@/config";
import { Card, Customer, Vehicle } from "@/types/model";
import { AxiosResponse } from "axios";

const vehicleEndPoint = "/vehicles";

const vehicleService = {
  apis: {
    addVehicle: async (data: string, userId: string) => {
      const res = await axiosInstance.post<{ info: Vehicle }>(
        `${vehicleEndPoint}`,
        {
          userId: userId,
          licensePlate: data.trim(),
        }
      );

      return res.data.info;
    },
    updateVehicle: async (newLicensePlate: string, vehicleId: string) => {
      const res = await axiosInstance.put<{ info: Vehicle }>(
        `${vehicleEndPoint}/${vehicleId}`,
        {
          licensePlate: newLicensePlate.trim(),
        }
      );

      return res.data.info;
    },
    changeCardLinkToVehicle: async (cardId: string, vehicleId: string) => {
      const res = await axiosInstance.put(`${vehicleEndPoint}/${vehicleId}`, {
        cardId: cardId.trim(),
      });

      return res.data.info;
    },
    deleteVehicle: async (vehicleId: string): Promise<AxiosResponse> => {
      const res = await axiosInstance.delete(`${vehicleEndPoint}/${vehicleId}`);
      return res;
    },
  },
  addVehicle: (newVehicle: Vehicle, prevVehicles: Vehicle[]) => {
    return [newVehicle, ...prevVehicles];
  },
  updateVehicle: (
    newLicensePlate: string,
    vehicleId: string,
    prevVehicles: Vehicle[]
  ): Vehicle[] => {
    const selectedVehicle = prevVehicles.find((c) => c.vehicleId === vehicleId);
    return [
      {
        ...selectedVehicle!,
        vehicleId: vehicleId,
        licensePlate: newLicensePlate,
      },
      ...prevVehicles.filter((e) => e.vehicleId !== vehicleId),
    ];
  },
  deleteVehicle: (vehicleId: string, prevVehicles: Vehicle[]) => {
    return [...prevVehicles.filter((e) => e.vehicleId !== vehicleId)];
  },
  formatLicensePlate: (licensePlate: string) => {
    return licensePlate.replace(/^(\d{2})([A-Z])(\d{3})(\d{2})$/, "$1$2-$3.$4");
  },
  getVehiclesFromCustomer: (
    //TODO: make cards not undefined
    customer: Customer
  ): (Vehicle & { card?: Card })[] => {
    return customer.vehicles
      ? customer.vehicles.map((vehicle) => {
          return {
            ...vehicle,
            card: customer.cards!.find(
              (card) => card.cardId === vehicle.cardId
            ),
          };
        })
      : [];
  },
};

export default vehicleService;
