import { Button } from "@/components/ui/button";
import { Plus, SquarePen, Trash2 } from "lucide-react";
import { FC, HTMLAttributes } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Customer } from "@/types/model";
import CustomerDialog from "./customer-dialog";
import { CustomerFormProps } from "@/utils/schema";
import DeleteCustomerAlertDialog from "./delete-customer-alert-dialog";

interface UserToolsProps extends HTMLAttributes<HTMLDivElement> {
  selectedCustomer: Customer | undefined;
  handleDeleteCustomer: () => void;
  handleUpdateCustomer: (data: CustomerFormProps) => void;
  handleAddCustomer: (data: CustomerFormProps) => void;
}

const CustomerToolBar: FC<UserToolsProps> = ({ ...props }) => {
  return (
    <Card className={cn("rounded-xl shadow-lg", props.className)}>
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
          </>
        ) : (
          <>
            <SquarePen className="mx-4 !mt-6" />
            <Trash2 className="mx-4 !mt-6" />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerToolBar;
