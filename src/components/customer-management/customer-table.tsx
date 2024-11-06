import { FC, HTMLAttributes, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime } from "@/utils/helpers";
import { Customer } from "@/types/model";
import { cn } from "@/lib/utils";

const columnHeaders = ["", "CUSTOMER", "REGISTERED DATE", "STATUS"];

interface CustomerTableProps extends HTMLAttributes<HTMLTableElement> {
  customers: Customer[];
  onSelectCustomer?: (customer: Customer) => void;
}

const CustomerTable: FC<CustomerTableProps> = ({ ...props }) => {
  const [selectedCustomer, setSelectedCustomer] = useState<
    Customer | undefined
  >();

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    props.onSelectCustomer && props.onSelectCustomer(customer);
  };

  return (
    <Card className={cn("rounded-2xl shadow-lg", props.className)}>
      <CardHeader className="py-6">
        <CardTitle className="text-8">CUSTOMER LIST</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col px-4">
        <ScrollArea className="relavtive h-[58vh] pr-3 pb-3">
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
              {props.customers.map((customer, index) => (
                <TableRow
                  key={index}
                  className={cn(
                    "cursor-pointer",
                    selectedCustomer?.userId === customer.userId &&
                      "bg-theme-softer"
                  )}
                  onClick={() => handleSelectCustomer(customer)}
                >
                  <TableCell className="text-center text-base">
                    {index + 1}
                  </TableCell>
                  <TableCell className="text-center text-base">
                    {customer.username}
                  </TableCell>
                  <TableCell className="text-center text-base 2xl_text-nowrap">
                    {formatDateTime(`${customer.createdAt}`)}
                  </TableCell>
                  <TableCell className="text-center text-base">
                    {customer.isActive}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CustomerTable;
