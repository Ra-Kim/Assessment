import Header from "@/components/header";
import { purchaseOrderColumns } from "@/components/table/columns";
import PurchaseOrderDataTable from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { purchaseOrderData } from "@/lib/constants";
import { Plus } from "lucide-react";

const PurchaseOrders = () => {
  return (
    <div className="grid grid-rows-[5rem_1fr] ml-4 h-full ">
      <Header title="Invoice" />
      <div>
        <div className="px-4 pr-10 mt-6 mb-8 flex justify-between">
          <div>
            <p className="text-[#1E293B] text-[1.75rem] font-semibold">
              Purchase order
            </p>
            <p className="text-[#475569] tracking-wide">
              You currently have{" "}
              <span className="font-semibold text-[1.375rem]">26</span> purchase
              orders
            </p>
          </div>
          <div>
            <Button className="flex gap-2 min-h-12">
              <Plus size={24} />
              <p className="text-sm font-bold">Create New Purchase Order</p>
            </Button>
          </div>
        </div>
        <div className="bg-white px-8 py-4">
          <PurchaseOrderDataTable
            columns={purchaseOrderColumns}
            data={purchaseOrderData.purchase_orders}
          />
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrders;
