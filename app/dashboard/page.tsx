"use client";
import Header from "@/components/header";
import { format } from "date-fns";
import {
  CheckCircle2,
  RefreshCcw,
  ChevronRight,
  CalendarIcon,
  Plus,
  CloudDownload,
} from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import * as z from "zod";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { FloatingLabelInput } from "@/components/ui/floatingInput";
import { FloatingLabelTextarea } from "@/components/ui/floatingTextArea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  invoiceNumber: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  invoiceDate: z.string(),
  // invoiceDate: z.date().min(new Date(), {message:"Date cannot be before today"}),
  invoiceTitle: z.string(),
  invoiceDescription: z.string(),
  invoiceDue: z.string(),
  dueDate: z.date().min(new Date(), { message: "Date cannot be before today" }),
  currency: z.string(),
  itemDescription: z.string(),
  itemQuantity: z.string(),
  itemPrice: z.string(),
  itemAmount: z.string(),
  invoiceNote: z.string(),
  invoiceTerms: z.string(),
  discountType: z.string(),
  taxType: z.string(),
});

const Dashbord = () => {
  const WHENDUE = [
    "Due on receipt",
    "Due in 5 days",
    "Due in 7 days",
    "Due in 10 days",
    "Due in 15 days",
    "Due in 30 days",
    "Due in 45 days",
    "Due in 60 days",
    "Custom",
  ] as string[];
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      invoiceNumber: "INV-000001",
      invoiceDate: "",
      invoiceTitle: "",
      invoiceDescription: "",
      invoiceDue: "",
      dueDate: new Date(),
      currency: "NGN",
      discountType: "Fixed",
      taxType: "Percentage",
    },
    resolver: zodResolver(FormSchema),
    mode: "onTouched",
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }
  const [checked, setChecked] = useState(false);
  return (
    <div className="grid grid-rows-[5rem_1fr] h-full">
      <Header title="Invoice" />
      <div className="h-[calc(100vh-5rem)] max-h-[calc(100vh-5rem)]">
        <Form {...form}>
          <form className="grid grid-rows-[1fr_6rem] h-[calc(100vh-5rem)] max-h-[calc(100vh-5rem)]">
            <div className="grid grid-cols-[1fr_17.5rem] h-[calc(100vh-11rem)] max-h-[calc(100vh-11rem)]">
              <div className="p-[1.5rem] pl-[2.5rem] overflow-y-scroll no-scrollbar h-[calc(100vh-11rem)] max-h-[calc(100vh-11rem)]">
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
                  <p className="text-sm text-[#475569] my-2">
                    Enter the invoice details below to start creating your
                    invoice
                  </p>
                </div>
                <div className="grid grid-cols-[60%_1fr] gap-4">
                  <FormField
                    control={form.control}
                    name="invoiceNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FloatingLabelInput
                          {...field}
                          id="invoiceNumber"
                          label="Invoice Number"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="invoiceDate"
                    render={({ field }) => (
                      <FormItem>
                        <FloatingLabelInput
                          {...field}
                          id="invoiceDate"
                          label="Invoice Date"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="invoiceTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FloatingLabelInput
                          {...field}
                          id="invoiceTitle"
                          label="Invoice Title"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="invoiceDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FloatingLabelTextarea
                          {...field}
                          id="invoiceDescription"
                          label="Invoice Description"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-4 grid grid-cols-[60%_1fr] gap-4 align-bottom">
                  <FormField
                    control={form.control}
                    name="invoiceDue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invoice Due</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-transparent border-border">
                              <SelectValue placeholder="Select when due" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {WHENDUE.map((whenDue) => (
                              <SelectItem key={whenDue} value={whenDue}>
                                {whenDue}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Due Date</FormLabel>
                        <Popover>
                          <PopoverTrigger className="bg-transparent" asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-2 pb-4 border-b border-b-[#BFDBFE]">
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-transparent border-border">
                              <SelectValue placeholder="Select preferred currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {["NGN", "USD", "GBP", "YEN", "EUR"].map(
                              (whenDue) => (
                                <SelectItem key={whenDue} value={whenDue}>
                                  {whenDue}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="my-4 grid grid-cols-[3fr_1fr_1fr_1fr] border-y border-y-[#BFDBFE] py-2 text-[#475569] text-sm font-semibold">
                  <p>Item Detail</p>
                  <p>Quantity</p>
                  <p>Unit Price</p>
                  <p>Amount</p>
                </div>
                <div className="my-4 grid grid-cols-[3fr_1fr_1fr_1fr] text-[#475569] text-sm font-semibold">
                  <div className="w-[95%]">
                    <FormField
                      control={form.control}
                      name="itemDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter item description"
                              className="bg-transparent border-border"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-[95%]">
                    <FormField
                      control={form.control}
                      name="itemQuantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="0.00"
                              className="bg-transparent border-border"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-[95%]">
                    <FormField
                      control={form.control}
                      name="itemPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="0.00"
                              className="bg-transparent border-border"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-[95%]">
                    <FormField
                      control={form.control}
                      name="itemAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="0.00"
                              className="bg-transparent border-border"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="mt-2 flex gap-2 text-primary text-sm font-bold">
                  <Plus size={18} />
                  <p>Add Another Line Item</p>
                </div>
                <div className="mt-6 py-3 border-y hover:bg-[#F1F5F9] border-y-[#BFDBFE] text-[#475569] flex justify-end items-center gap-20 text-sm">
                  <p>Subtotal</p>
                  <p>0.00</p>
                </div>
                <div className="grid grid-cols-[40%_60%] mt-8 text-[#475569]">
                  <div>
                    <p className="text-sm align-top">More Items</p>
                  </div>
                  <div className="text-sm text-[#475569]">
                    <div>
                      <p className="font-semibold">DISCOUNT</p>
                      <div className="grid grid-cols-3 mt-2">
                        <div className="w-[95%]">
                          <FormField
                            control={form.control}
                            name="discountType"
                            render={({ field }) => (
                              <FormItem>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="bg-transparent border-border">
                                      <SelectValue placeholder="" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {["Fixed"].map((discount) => (
                                      <SelectItem
                                        key={discount}
                                        value={discount}
                                      >
                                        {discount}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-[95%]">
                          <FormField
                            control={form.control}
                            name="itemPrice"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="0.00"
                                    className="bg-transparent border-border"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-[95%]">
                          <FormField
                            control={form.control}
                            name="itemAmount"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="0.00"
                                    className="bg-transparent border-border"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="font-semibold">
                        TAX (Select all that applies)
                      </p>
                      <div className=" mt-2 flex gap-4">
                        <div className="flex gap-2">
                          <Checkbox
                            checked={!checked}
                            onCheckedChange={(value) => {
                              setChecked(!value);
                            }}
                            className="border-[2.5px] border-[#334155] rounded-[2px] data-[state=checked]:border-primary w-5 h-5"
                          />
                          <p>Value Added Tax (VAT)</p>
                        </div>
                        <div className="flex gap-2">
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(value) => {
                              setChecked(!!value);
                            }}
                            className="border-[2.5px] border-[#334155] rounded-[2px] data-[state=checked]:border-primary w-5 h-5"
                          />
                          <p>Witholding Tax (WTH)</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="font-semibold">WITHHOLDING TAX</p>
                      <div className="grid grid-cols-3 mt-2">
                        <div className="w-[95%]">
                          <FormField
                            control={form.control}
                            name="taxType"
                            render={({ field }) => (
                              <FormItem>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="bg-transparent border-border">
                                      <SelectValue placeholder="" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {["Percentage"].map((tax) => (
                                      <SelectItem key={tax} value={tax}>
                                        {tax}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-[95%]">
                          <FormField
                            control={form.control}
                            name="itemPrice"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      placeholder="0.00"
                                      className="bg-transparent border-border"
                                      {...field}
                                    />
                                    <p className="absolute right-2 top-2 font-bold">
                                      %
                                    </p>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-[95%]">
                          <FormField
                            control={form.control}
                            name="itemAmount"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="0.00"
                                    className="bg-transparent border-border"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="font-semibold">SHIPPING FEE (Optional)</p>
                      <div className=" mt-2">
                        <div className="">
                          <FormField
                            control={form.control}
                            name="itemAmount"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="0.00"
                                    className="bg-transparent border-border"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 py-3 hover:bg-[#F1F5F9] border-y border-y-[#BFDBFE] text-[#475569] flex justify-end items-center gap-20 text-sm">
                  <p>Total</p>
                  <p>0.00</p>
                </div>
                <p className="text-sm mt-4 text-[#475569]">Additional Items</p>
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="invoiceNote"
                    render={({ field }) => (
                      <FormItem>
                        <FloatingLabelInput
                          {...field}
                          id="invoiceNote"
                          label="Invoice Note"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="invoiceTerms"
                    render={({ field }) => (
                      <FormItem>
                        <FloatingLabelTextarea
                          {...field}
                          id="invoiceTerms"
                          label="Invoice Terms"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-4 font-medium">
                  <p className="text-sm #475569">
                    ATTACH A SUPPORTING DOCUMENT
                  </p>
                  <div className=" mt-2">
                    <div className="h-[140px] w-full rounded-[8px] border border-border flex flex-col justify-center  gap-4 items-center text-[#77777A]">
                      <CloudDownload className="text-primary" />
                      <p className="text-[#919094] text-sm">
                        Click to upload or drag and drop a file
                      </p>
                      <p className="text-[11px]">PDF, MS, PNG or JPEG</p>
                    </div>
                  </div>
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
        </Form>
      </div>
    </div>
  );
};

export default Dashbord;
