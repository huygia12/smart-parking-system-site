import { Customer } from "@/types/model";
import { FC, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { toast } from "sonner";
import { userService } from "@/services";
import {
  CustomerTable,
  CustomerToolBar,
} from "@/components/customer-management";
import { CustomerFormProps } from "@/utils/schema";
import axios, { HttpStatusCode } from "axios";
import { ActionResult } from "@/types/component";

const CustomerManagement: FC = () => {
  const initData = useRouteLoaderData("customer_management") as Customer[];
  const [customers, setUsers] = useState<Customer[]>(initData);
  const [selectedUser, setSelectedUser] = useState<Customer | undefined>();

  const handleDeleteCustomer = () => {
    const deleteUser = userService.apis.deleteCustomer(selectedUser!.userId);
    toast.promise(deleteUser, {
      loading: "Processing...",
      success: () => {
        setUsers(userService.deleteCustomer(selectedUser!, customers));
        setSelectedUser(undefined);
        return "Delete customer succeed";
      },
      error: () => {
        return "Delete customer failed";
      },
    });
  };

  const handleUpdateCustomer = async (
    data: CustomerFormProps
  ): Promise<ActionResult> => {
    try {
      const updateCustomer = await userService.apis.updateCustomer(
        selectedUser!.userId,
        data
      );

      setUsers(userService.updateCustomer(updateCustomer, customers));
      return { status: true, message: "Update customer succeed" };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == HttpStatusCode.Conflict) {
          return {
            status: false,
            message: "Update customer failed: email already in use",
          };
        }
      }
      return {
        status: false,
        message: "Update customer failed",
      };
    }
  };

  const handleAddCustomer = async (
    data: CustomerFormProps
  ): Promise<ActionResult> => {
    try {
      const createCustomer = await userService.apis.createCustomer(data);

      setUsers(userService.addCustomer(createCustomer, customers));
      return { status: true, message: "Create customer succeed" };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == HttpStatusCode.Conflict) {
          return {
            status: false,
            message: "Add customer failed: email already in use",
          };
        }
      }
      return {
        status: false,
        message: "Add customer failed",
      };
    }
  };

  return (
    <div className="my-8">
      <div className="flex gap-4 mx-auto w-xl">
        <CustomerTable
          customers={customers}
          onSelectCustomer={setSelectedUser}
          className="flex-1 w-1" // set width to make flex work ????
        />

        <CustomerToolBar
          selectedCustomer={selectedUser}
          handleAddCustomer={handleAddCustomer}
          handleUpdateCustomer={handleUpdateCustomer}
          handleDeleteCustomer={handleDeleteCustomer}
        />
      </div>
    </div>
  );
};

export default CustomerManagement;
