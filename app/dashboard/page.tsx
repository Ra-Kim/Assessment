import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { CheckCircle2, RefreshCcw } from "lucide-react";
import React from "react";

const Dashbord = () => {
  return (
    <div className="grid grid-rows-[5rem_1fr]">
      <Header title="Invoice" />
      <form className="grid grid-rows-[1fr_6rem]">
        <div className="grid grid-cols-[1fr_17.5rem]">
          <div></div>
          <div className="bg-white border-t border-t-[#F1F5F9] border-l border-l-[#F1F5F9] p-6">
            <p className="text-[#0F172A] font-semibold tracking-[0.15px]">
              Create New Service Invoice
            </p>
            <div className="mt-4 flex flex-col gap-6 text-sm font-bold">
              <div className="flex gap-2 items-center text-green-500">
                <CheckCircle2 />
                <p>Customer Details</p>
              </div>
              <div className="flex gap-2 items-center text-primary">
                <CheckCircle2 />
                <p>Invoice Details</p>
              </div>
              <div className="flex gap-2 items-center text-gray-500">
                <CheckCircle2 />
                <p>Preview</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white px-8 shadow-[0px_1px_2px_0px_#2563EB1A] flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <RefreshCcw className="text-primary" size={24} />
            <p className="text-primary font-bold text-sm">Make recurring</p>
          </div>
          <div className="flex gap-4">
            <Button className="bg-primary-foreground border-2 border-primary text-primary">
              Save as Draft
            </Button>
            <Button type="submit">Proceed to Preview</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Dashbord;
