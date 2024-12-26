import { HTMLAttributes, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "../ui/separator";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Card, Customer, Vehicle } from "@/types/model";
import { formatDateTime } from "@/utils/helpers";
import vehicleService from "@/services/vehicle";
import VehicleActionDialog from "./vehicle-action-dialog";
import { Button } from "../ui/button";
import { ActionResult } from "@/types/component";
import { VehicleFormProps } from "@/utils/schema";
import axios, { HttpStatusCode } from "axios";

const columnHeaders = [
  "",
  "LICENSE PLATE",
  "REGISTERED DATE",
  "ATTACHED TO CARD",
];

interface VehicleDialogProps extends HTMLAttributes<HTMLDivElement> {
  customer: Customer;
}

const ViewVehiclesDialog: React.FC<VehicleDialogProps> = ({
  className,
  ...props
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>();
  const [vehicles, setVehicles] = useState<(Vehicle & { card?: Card })[]>(
    vehicleService.getVehiclesFromCustomer(props.customer)
  );
  // const [cards, setCards] = useState<Card[]>([]);

  const handleAddVehicle = async (
    data: VehicleFormProps
  ): Promise<ActionResult> => {
    try {
      const createdVehicle = await vehicleService.apis.addVehicle(
        data,
        props.customer.userId
      );

      console.log(createdVehicle);

      setVehicles(vehicleService.addVehicle(createdVehicle, vehicles));
      return { status: true, message: "Add vehicle succeed" };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == HttpStatusCode.Conflict) {
          return {
            status: false,
            message: "Add vehicle failed: licenseplate already in use",
          };
        } else if (
          error.response?.status == HttpStatusCode.UnprocessableEntity
        ) {
          return {
            status: false,
            message: "Add vehicle failed: </br> Run out of cards",
          };
        }
      }
      return {
        status: false,
        message: "Add vehicle failed",
      };
    }
  };

  const handleEditVehicle = async (
    data: VehicleFormProps
  ): Promise<ActionResult> => {
    try {
      const updatedVehicle = await vehicleService.apis.updateVehicle(
        data,
        selectedVehicle!.vehicleId
      );

      setVehicles(vehicleService.updateVehicle(updatedVehicle, vehicles));
      return { status: true, message: "Update vehicle succeed" };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == HttpStatusCode.Conflict) {
          return {
            status: false,
            message: "Update vehicle failed: licenseplate already in use",
          };
        }
      }
      return {
        status: false,
        message: "Add vehicle failed",
      };
    }
  };

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="min-w-[70rem]">
        <DialogHeader className="min-h-10 mb-2">
          <DialogTitle className="text-[1.5rem]">
            {`${props.customer.username}'s Vehicles`}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="relavtive h-[50vh] pr-3 pb-3">
          <Table>
            <TableHeader className="z-10 border-b-secondary-foreground border-b-2 sticky top-0 bg-white shadow-lg">
              <tr>
                {columnHeaders.map((item, key) => {
                  return (
                    <TableHead
                      key={key}
                      className="text-nowrap text-center text-black font-extrabold text-[1rem]"
                    >
                      {item}
                    </TableHead>
                  );
                })}
              </tr>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle, index) => (
                <TableRow
                  key={index}
                  className={cn(
                    "cursor-pointer",
                    selectedVehicle?.vehicleId === vehicle.vehicleId &&
                      "bg-slate-200"
                  )}
                  onClick={() => handleSelectVehicle(vehicle)}
                >
                  <TableCell className="text-center text-base">
                    {index + 1}
                  </TableCell>
                  <TableCell className="text-center text-base">
                    {vehicle.licensePlate}
                  </TableCell>
                  <TableCell className="text-center text-base 2xl_text-nowrap">
                    {formatDateTime(`${vehicle.createdAt}`)}
                  </TableCell>
                  <TableCell className="text-center text-base">
                    {vehicle.card?.name}
                  </TableCell>
                </TableRow>
              ))}
              <tr>
                <td>
                  <Separator />
                </td>
              </tr>
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <div className="flex justify-end gap-4 mt-5">
          <VehicleActionDialog
            vehicle={selectedVehicle}
            type="Add"
            onSave={handleAddVehicle}
          >
            <Button variant="positive">Add</Button>
          </VehicleActionDialog>
          {selectedVehicle && (
            <>
              <VehicleActionDialog
                vehicle={selectedVehicle}
                type="Edit"
                onSave={handleEditVehicle}
              >
                <Button variant="neutral">Edit</Button>
              </VehicleActionDialog>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewVehiclesDialog;
