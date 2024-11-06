import { toast } from "sonner";
import { FC } from "react";
import { useAuth } from "@/hooks";
import { DropMenuLinkItem, DropdownAvatar } from "@/components/common";

const StaffHeader: FC = () => {
  const { logout } = useAuth();
  return (
    <div className="w-full py-3 flex flex-col sticky top-0 z-50 bg-theme shadow-xl items-center">
      <div className="w-sm md_w-md lg_w-lg xl_w-xl 2xl_w-2xl 4xl_w-3xl flex items-center justify-between">
        {/** NAV BAR */}
        <span></span>

        {/** NOTIFICATION AND AVATAR */}
        <div className="flex items-center">
          <DropdownAvatar className="ml-10">
            <DropMenuLinkItem
              item={{
                name: "Parking Check",
                src: `/`,
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
      </div>
    </div>
  );
};

export default StaffHeader;
