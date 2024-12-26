import { Button } from "@/components/ui/button";
import { Car, Plus, SquarePen, Trash2 } from "lucide-react";
import { FC, HTMLAttributes, useEffect } from "react";
import { Card as CardContainer, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Customer } from "@/types/model";
import CustomerDialog from "./customer-action-dialog";
import { CustomerFormProps } from "@/utils/schema";
import DeleteCustomerAlertDialog from "./delete-customer-alert-dialog";
import { ActionResult } from "@/types/component";
import ViewVehiclesDialog from "./view-vehicles-dialog";

interface UserToolsProps extends HTMLAttributes<HTMLDivElement> {
  selectedCustomer: Customer | undefined;
  handleDeleteCustomer: () => void;
  handleUpdateCustomer: (data: CustomerFormProps) => Promise<ActionResult>;
  handleAddCustomer: (data: CustomerFormProps) => Promise<ActionResult>;
}

const CustomerToolBar: FC<UserToolsProps> = ({ ...props }) => {
  useEffect(() => {
    const fetchData = async () => {
      // const availableCards = await cardService.apis.getCards(true);
      // setCards(availableCards);
    };

    fetchData();
  }, []);

  return (
    <CardContainer className={cn("rounded-xl shadow-lg", props.className)}>
      <CardContent className="p-4 space-y-4 flex flex-col">
        {/** add button */}
        <CustomerDialog type="Add" onSave={props.handleAddCustomer}>
          <Button variant="positive" className="text-xl">
            <Plus />
          </Button>
        </CustomerDialog>

        {props.selectedCustomer ? (
          <>
            <CustomerDialog
              type="Edit"
              customer={props.selectedCustomer}
              onSave={props.handleUpdateCustomer}
            >
              <Button variant="neutral">
                <SquarePen />
              </Button>
            </CustomerDialog>

            <DeleteCustomerAlertDialog
              onDeleteCustomer={props.handleDeleteCustomer}
            >
              <Button variant="negative">
                <Trash2 />
              </Button>
            </DeleteCustomerAlertDialog>

            <ViewVehiclesDialog customer={props.selectedCustomer}>
              <Button variant="destructive">
                <Car />
              </Button>
            </ViewVehiclesDialog>
          </>
        ) : (
          <>
            <SquarePen className="mx-4 !mt-6" />
            <Trash2 className="mx-4 !mt-6" />
            <Car className="mx-4 !mt-6" />
          </>
        )}
      </CardContent>
    </CardContainer>
  );
};

export default CustomerToolBar;
