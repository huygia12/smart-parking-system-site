import { AxiosResponse } from "axios";
import { axiosInstance } from "@/config/axios-config";
import { Customer } from "@/types/model";
import { CustomerFormProps } from "@/utils/schema";
import { Args } from "@/utils/helpers";

const userEndPoint = "/users";

const userService = {
  apis: {
    getUser: async (args: Args | string): Promise<Customer | null> => {
      const customerID: string =
        typeof args === "string" ? args : args.params.id!;

      try {
        const res = await axiosInstance.get<{ info: Customer }>(
          `${userEndPoint}/${customerID}`
        );
        return res.data.info;
      } catch (error) {
        console.error("Unexpected error:", error);
        return null;
      }
    },
    getCustomers: async (): Promise<Customer[]> => {
      const res = await axiosInstance.get<{
        info: Customer[];
      }>(userEndPoint);
      return res.data.info;
    },
    createCustomer: async (data: CustomerFormProps): Promise<Customer> => {
      const response = await axiosInstance.post<{ info: Customer }>(
        `${userEndPoint}`,
        {
          userName: data.username.trim(),
        }
      );

      return response.data.info;
    },
    updateCustomer: async (
      customerID: string,
      data: CustomerFormProps
    ): Promise<Customer> => {
      const res = await axiosInstance.put<{ info: Customer }>(
        `${userEndPoint}/${customerID}`,
        {
          userName: data.username.trim(),
        }
      );
      return res.data.info;
    },
    updateStaffPassword: async (
      prePassword: string,
      newPassword: string
    ): Promise<AxiosResponse> => {
      const res = await axiosInstance.patch(`${userEndPoint}/password`, {
        oldPassword: prePassword.trim(),
        newPassword: newPassword.trim(),
      });
      return res;
    },

    deleteCustomer: async (customerID: string): Promise<AxiosResponse> => {
      const res = await axiosInstance.delete(`${userEndPoint}/${customerID}`);
      return res;
    },
  },
  addCustomer: (newCustomer: Customer, prevCustomers: Customer[]) => {
    return [newCustomer, ...prevCustomers];
  },
  updateCustomer: (selectedCustomer: Customer, prevCustomers: Customer[]) => {
    return [
      selectedCustomer,
      ...prevCustomers.filter((e) => e.userId !== selectedCustomer.userId),
    ];
  },
  deleteCustomer: (selectedCustomer: Customer, prevCustomers: Customer[]) => {
    return [
      ...prevCustomers.filter((e) => e.userId !== selectedCustomer.userId),
    ];
  },
};

export default userService;
