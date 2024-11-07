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

  const handleUpdateCustomer = (data: CustomerFormProps) => {
    const updateUser = userService.apis.updateCustomer(
      selectedUser!.userId,
      data
    );

    toast.promise(updateUser, {
      loading: "Processing...",
      success: (user: Customer) => {
        setSelectedUser(user);
        setUsers(userService.updateCustomer(user, customers));
        return "Update customer succeed";
      },
      error: (error) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.status == HttpStatusCode.Conflict) {
            return "Update customer failed: name already in use";
          }
        }
        return "Update customer failed";
      },
    });
  };

  const handleAddCustomer = (data: CustomerFormProps) => {
    const createCustomer = userService.apis.createCustomer(data);

    toast.promise(createCustomer, {
      loading: "Processing...",
      success: (newCustomer: Customer) => {
        setUsers(userService.addCustomer(newCustomer, customers));
        return "Create customer succeed";
      },
      error: (error) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.status == HttpStatusCode.Conflict) {
            return "Add customer failed: name already in use";
          }
        }
        return "Add customer failed";
      },
    });
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
