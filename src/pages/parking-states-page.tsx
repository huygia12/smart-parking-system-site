// import { EditableCartTable } from "@/components/cart-vistiting";
import { cn } from "@/lib/utils";
import { SlotStatus } from "@/types/enum";
import { ParkingSlot } from "@/types/model";
import { FC, useRef, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";

const ParkingStatesPage: FC = () => {
  // const parkingSlots = useRouteLoaderData("parking_status") as ParkingSlot[];
  const parkingSlots = useRef<ParkingSlot[]>([
    {
      slotId: 1,
      state: SlotStatus.OCCUPIED,
    },
    {
      slotId: 2,
      state: SlotStatus.OCCUPIED,
    },
    {
      slotId: 3,
      state: SlotStatus.OCCUPIED,
    },
    {
      slotId: 4,
      state: SlotStatus.OCCUPIED,
    },
    {
      slotId: 5,
      state: SlotStatus.OCCUPIED,
    },
    {
      slotId: 6,
      state: SlotStatus.OCCUPIED,
    },
  ]);
  const slotWidth = useRef<number>(10);
  const parkingSlotWitdh = useRef<number>(60);
  const [isParked, setIsParked] = useState(false);

  const handleParkCar = () => {
    setIsParked(true);
    setTimeout(() => setIsParked(false), 3000); // Reset after animation
  };

  return (
    <div className="flex flex-col">
      {/* <EditableCartTable className="3xl_col-span-3" /> */}
      <div className="flex flex-col items-center justify-center bg-transparent space-y-8">
        <div
          className={`mx-auto relative h-[20rem] w-[60rem] px-1 bg-white rounded-lg overflow-hidden`}
        >
          {/* Parking Slot */}
          <div className="flex gap-1">
            {parkingSlots.current.map((slot) => (
              <span key={slot.slotId} className={`bg-red-500 w-[10rem] h-20`} />
            ))}
          </div>

          {/* Car */}
          <img
            src="/car-1.png"
            className={cn(
              "absolute bottom-0 h-36 rotate-90 transition-transform duration-1000",
              isParked && `translate-x-[10rem]`
            )}
          />
        </div>

        <button
          onClick={handleParkCar}
          className="px-4 py-2 bg-green-500 text-white"
        >
          Park the Car
        </button>
      </div>
    </div>
  );
};

export default ParkingStatesPage;
