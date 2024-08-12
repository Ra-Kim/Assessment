import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { CheckCircle2, RefreshCcw, ChevronRight } from "lucide-react";
import React from "react";
import Image from "next/image";

const Dashbord = () => {
  return (
    <div className="grid grid-rows-[5rem_1fr] h-full">
      <Header title="Invoice" />
      <form className="grid grid-rows-[1fr_6rem]">
        <div className="grid grid-cols-[1fr_17.5rem]">
          <div className="p-[1.5rem] pl-[2.5rem]">
            <div className="flex gap-2 items-center text-sm font-semibold">
              <div className="flex gap-1 items-center text-primary">
                <Image
                  src={`/assets/svgs/blueInvoice.svg`}
                  alt=""
                  width={24}
                  height={24}
                />
                <p>Invoice</p>
              </div>
              <ChevronRight size={20} className="text-[#64748B]" />
              <div>New Service Invoice</div>
            </div>
            <div className="mt-8">
              <p className="text-2xl font-semibold">Invoice Details</p>
              <p className="text-sm text-[#475569] my-2">Enter the invoice details below to start creating your invoice</p>
            </div>
          </div>
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
