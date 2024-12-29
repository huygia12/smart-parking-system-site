import { toast } from "sonner";
import { FC, useMemo, useRef } from "react";
import { useAuth } from "@/hooks";
import { DropMenuLinkItem, DropdownAvatar } from "@/components/common";
import { LinkItem } from "@/types/component";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const StaffHeader: FC = () => {
  const { logout } = useAuth();
  const navItems = useRef<LinkItem[]>([
    {
      name: "Customers",
      src: "/customers",
      visible: true,
    },
    {
      name: "Cards",
      src: "/cards",
      visible: true,
    },
    {
      name: "Videos",
      src: "/videos",
      visible: true,
    },
  ]);
  const selectedRoute = useMemo<string>(
    () => location.pathname,
    [location.pathname]
  );

  return (
    <div className="font-sans bg-white w-full flex items-center justify-between py-3 px-40 sticky top-0 z-50 shadow-xl">
      <span className="flex items-baseline gap-5">
        {navItems.current.map((item) => (
          <NavLink
            key={item.name}
            to={item.src || "/staff"}
            unstable_viewTransition
            className={cn(
              "text-xl font-normal hover_scale-110 transition ease-out duration-300",
              selectedRoute === item.src && "text-2xl font-extrabold"
            )}
          >
            {item.name}
          </NavLink>
        ))}
      </span>

      {/** AVATAR */}
      <DropdownAvatar className="ml-10">
        <DropMenuLinkItem
          item={{
            name: "Parking Lot",
            src: `/parkingStatus`,
            visible: true,
          }}
        />
        <DropMenuLinkItem
          item={{
            name: "Logout",
            visible: true,
            handleClick: async () => {
              const promise = logout();
              toast.promise(promise, {
                loading: "Loging out...",
                success: "Logout succeed",
              });
            },
          }}
        />
      </DropdownAvatar>
    </div>
  );
};

export default StaffHeader;
