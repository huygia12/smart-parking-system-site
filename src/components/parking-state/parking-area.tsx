import { FC, useEffect, useLayoutEffect, useRef } from "react";
import { useState } from "react";
import { Separator } from "../ui/separator";

type SlotStatus = 0 | 1; // 0 for free, 1 for occupied

const ParkingArea: FC = () => {
  const [w, setW] = useState<number>();
  const [h, setH] = useState<number>();
  const parklock = useRef<boolean>(false);
  const [entranceGateState, setEntranceGateState] = useState<boolean>(true);
  const [exitGateState, setExitGateState] = useState<boolean>(true);
  const [parklist, setParklist] = useState<SlotStatus[]>(Array(6).fill(0));
  const parkingSpaceRef = useRef<HTMLDivElement>(null);
  const firstLineRef = useRef<HTMLDivElement>(null);
  const secondLineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (parkingSpaceRef.current) {
      setW(parkingSpaceRef.current.offsetWidth);
      setH(parkingSpaceRef.current.offsetHeight);
      if (firstLineRef.current)
        firstLineRef.current.style.height = `${parkingSpaceRef.current.offsetWidth * 0.1}px`;
      if (secondLineRef.current)
        secondLineRef.current.style.height = `${parkingSpaceRef.current.offsetWidth * 0.1}px`;
    }
  }, []);

  useEffect(() => {
    if (parkingSpaceRef.current && h && w) {
      // Tạo animation style
      const anim = document.createElement("style");
      const rule1 = document.createTextNode(`
        @-webkit-keyframes car-park {
          from { transform: rotate(270deg); }
          80% { transform: rotate(270deg) translate(0px, -${w}px); }
          90% { transform: rotate(270deg) translate(0px, -${w}px) rotate(90deg); }
          to { transform: rotate(270deg) translate(0px, -${w}px) rotate(90deg) translate(0px, -${h * 0.25}px); }
        }
      `);
      anim.appendChild(rule1);

      const rule2 = document.createTextNode(`
        @-webkit-keyframes car-bottom {
          from { transform: rotate(270deg); }
          80% { transform: rotate(270deg) translate(0px, -${w}px); }
          90% { transform: rotate(270deg) translate(0px, -${w}px) rotate(90deg); }
          to { transform: rotate(270deg) translate(0px, -${w}px) rotate(90deg) translate(0px, ${h * 0.25}px); }
        }
      `);
      anim.appendChild(rule2);

      const rule3 = document.createTextNode(`
        @-webkit-keyframes car-exit-top {
          from { transform: rotate(270deg) translate(0px, -${w}px) rotate(90deg) translate(0px, -${h * 0.25}px); }
          80% { transform: rotate(270deg) translate(0px, -${w}px) rotate(90deg) translate(0px, -${h * 0.25}px) translate(0px, ${h * 0.25}px); }
          90% { transform: rotate(270deg) translate(0px, -${w}px) rotate(90deg) translate(0px, -${h * 0.25}px) translate(0px, ${h * 0.25}px) rotate(90deg); }
          to { transform: rotate(270deg) translate(0px, -${w}px) rotate(90deg) translate(0px, -${h * 0.25}px) translate(0px, ${h * 0.25}px) rotate(90deg) translate(0px, -${w}px); }
        }
      `);
      anim.appendChild(rule3);

      const rule4 = document.createTextNode(`
        @-webkit-keyframes car-exit-bottom {
          from { transform: rotate(270deg) translate(0px, -${w}px) rotate(90deg) translate(0px, ${h * 0.25}px); }
          80% { transform: rotate(270deg) translate(0px, -${w}px) rotate(90deg) translate(0px, ${h * 0.25}px) translate(0px, -${h * 0.25}px); }
          90% { transform: rotate(270deg) translate(0px, -${w}px) rotate(90deg) translate(0px, ${h * 0.25}px) translate(0px, -${h * 0.25}px) rotate(90deg); }
          to { transform: rotate(270deg) translate(0px, -${w}px) rotate(90deg) translate(0px, ${h * 0.25}px) translate(0px, -${h * 0.25}px) rotate(90deg) translate(0px, -${w}px); }
        }
      `);
      anim.appendChild(rule4);

      parkingSpaceRef.current.appendChild(anim);
    }
  }, [w, h]);

  const handleCarExit = (slot: number) => {
    if (!parklock.current) {
      const newParklist = [...parklist];
      newParklist[slot] = 0;
      setParklist(newParklist);

      parklock.current = true;
      const carElement = document.getElementById(`car${slot}`);

      if (carElement) {
        carElement.style.animation = `car-exit-top ${7 - slot}s both`;
      }

      setTimeout(
        () => {
          if (carElement) carElement.remove();
          parklock.current = false;
        },
        Number(`${7 - slot}000`)
      );
    }
  };

  const generateNewCar = (slot: number) => {
    if (parkingSpaceRef.current && w) {
      const space = parkingSpaceRef.current;
      const img = document.createElement("img");
      img.src = "car-1.png";
      img.className = "absolute z-10 m-auto";
      img.style.width = `${w * 0.2}px`;
      img.id = `car${slot}`;

      space.appendChild(img);
    }
  };

  const handleCarEnter = (slot: number) => {
    if (!document.getElementById(`car${slot}`) && !parklock.current && w) {
      const newParklist = [...parklist];
      newParklist[slot] = 1;
      setParklist(newParklist);

      parklock.current = true;

      generateNewCar(slot);

      const carElement = document.getElementById(`car${slot}`);
      if (carElement) {
        const slotWidth = w / 6;
        carElement.style.right = `${-w + (6 - slot) * slotWidth - slotWidth / 2 - carElement.offsetWidth / 2}px`;

        carElement.style.animation = `car-park ${7 - slot}s both`;
      }

      setTimeout(
        () => {
          parklock.current = false;
        },
        Number(`${7 - slot}000`)
      );
    } else {
      handleCarExit(slot);
    }
  };

  const handleChangeEntranceGateState = () => {
    setEntranceGateState((prevState) => !prevState);
  };

  const handleChangeExitGateState = () => {
    setExitGateState((prevState) => !prevState);
  };

  return (
    <div className="w-full h-full flex items-center justify-center gap-10 mt-10">
      <div className="bg-[rgb(45,42,42)] w-[20rem] px-4">
        <div className="text-white mt-4 text-xl font-bold">
          Slot Management Remote
        </div>
        <div className="text-white grid grid-cols-3 gap-3 py-4">
          {parklist.map((isOccupied, slotIndex) => (
            <span
              key={slotIndex}
              onClick={() => handleCarEnter(slotIndex)}
              id={`slot${slotIndex + 1}`}
              className={`py-4 text-center cursor-pointer ${isOccupied == 1 ? "bg-red-700" : "bg-green-700"}`}
            >
              {slotIndex + 1}
            </span>
          ))}
        </div>
        <Separator />
        <div className="text-white mt-4 text-xl font-bold">Entrance Gate</div>
        <div className="text-white grid grid-cols-3 gap-3 py-4">
          <span
            onClick={() => handleChangeEntranceGateState()}
            className={`text-center py-4 cursor-pointer ${entranceGateState ? "bg-red-700" : "bg-green-700"}`}
          >
            {entranceGateState ? `CLOSE` : `OPEN`}
          </span>
        </div>
        <Separator />
        <div className="text-white mt-4 text-xl font-bold">Exit Gate</div>
        <div className="text-white grid grid-cols-3 gap-3 py-4">
          <span
            onClick={() => handleChangeExitGateState()}
            className={`text-center py-4 cursor-pointer ${exitGateState ? "bg-red-700" : "bg-green-700"}`}
          >
            {exitGateState ? `CLOSE` : `OPEN`}
          </span>
        </div>
      </div>

      <div
        ref={parkingSpaceRef}
        className="flex-1 flex flex-col justify-center items-center relative h-full"
      >
        <div className="w-full h-[26rem] flex">
          {Array.from({ length: 6 }).map((_, slotNumber) => {
            return (
              <span
                key={slotNumber}
                className="w-1/6 h-full border-x-2 font-sans text-6xl text-opacity-50 border-[rgb(24,20,20)] bg-[rgb(31,31,40)] flex justify-center items-center text-[14px] text-[rgb(240,240,236)]"
                id={`slot-${slotNumber + 1}`}
              >
                {`${slotNumber + 1}`}
              </span>
            );
          })}
        </div>

        <div className="h-full w-full flex flex-col">
          <div
            className={`w-full h-2/6 border-b-4 border-dashed border-yellow-300`}
            ref={firstLineRef}
          ></div>
          <div className={`w-full h-1/6`}></div>
          <div className={`w-full h-1/6`}></div>
          <div
            className={`w-full h-2/6 border-t-4 border-dashed border-yellow-300`}
            ref={secondLineRef}
          ></div>
        </div>

        {/* <button onClick={() => handleCarEnter(1)}>click me</button> */}
      </div>

      <div className="h-full flex flex-col justify-center items-center relative">
        <div className="h-3/"></div>
        <div className="relative w-[200px] h-2/5 border-y-blue-900 border-y-2 border-solid bg-[rgb(43,43,55)] text-white font-extrabold flex justify-center items-center text-lg">
          <span className="absolute left-1 top-1 opacity-50 text-base">
            Entrance
          </span>
          {entranceGateState ? `OPENING` : `BLOCKED`}
        </div>
        <div className="relative w-[200px] h-2/5 border-y-blue-900 border-y-2 border-solid bg-[rgb(43,43,55)] text-white font-extrabold flex justify-center items-center text-lg">
          <span className="absolute left-1 top-1 opacity-50 text-base">
            Exit
          </span>
          {exitGateState ? `OPENING` : `BLOCKED`}
        </div>
      </div>
    </div>
  );
};

export default ParkingArea;
