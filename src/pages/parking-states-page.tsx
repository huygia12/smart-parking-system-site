import { ParkingArea } from "@/components/parking-state";
import { FC } from "react";

const ParkingStatesPage: FC = () => {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <ParkingArea />
    </div>
  );
};

export default ParkingStatesPage;
