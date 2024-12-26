import { axiosInstance } from "@/config";
import { Card, Customer, Vehicle } from "@/types/model";
import { VehicleFormProps } from "@/utils/schema";
import { AxiosResponse } from "axios";

const vehicleEndPoint = "/vehicles";

const vehicleService = {
  apis: {
    addVehicle: async (data: VehicleFormProps, userId: string) => {
      const res = await axiosInstance.post<{ info: Vehicle }>(
        `${vehicleEndPoint}`,
        {
          userId: userId,
          licensePlate: data.licensePlate.trim(),
        }
      );

      return res.data.info;
    },
    updateVehicle: async (data: VehicleFormProps, vehicleId: string) => {
      const res = await axiosInstance.put<{ info: Vehicle }>(
        `${vehicleEndPoint}/${vehicleId}`,
        {
          licensePlate: data.licensePlate.trim(),
        }
      );

      return res.data.info;
    },
    changeCardLinkToVehicle: async (cardId: string, vehicleId: string) => {
      const res = await axiosInstance.put<{ info: Vehicle }>(
        `${vehicleEndPoint}/${vehicleId}`,
        {
          cardId: cardId.trim(),
        }
      );

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
  updateVehicle: (selectedVehicle: Vehicle, prevCustomers: Vehicle[]) => {
    return [
      selectedVehicle,
      ...prevCustomers.filter((e) => e.vehicleId !== selectedVehicle.vehicleId),
    ];
  },
  deleteCustomer: (selectedVehicle: Vehicle, prevVehicles: Vehicle[]) => {
    return [
      ...prevVehicles.filter((e) => e.vehicleId !== selectedVehicle.vehicleId),
    ];
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
