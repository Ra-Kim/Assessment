import Image from "next/image";
import React from "react";
import SidebarItem from "./sidebarItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const Sidebar = () => {
  return (
    <div className="px-8 pt-8 pb-4 border-r border-r-[#F1F5F9] grid grid-rows-[80px_1fr] h-[100dvh]">
      <Image src={`/assets/Logo.png`} alt="logo" width={80} height={28} />
      <div className="flex flex-col justify-between overflow-y-scroll no-scrollbar">
        <ul>
          <li>
            <SidebarItem
              name={"Dashboard"}
              link={"/dashboard"}
              image={"/assets/svgs/dashboard.svg"}
            />
          </li>
          <li>
            <Accordion type="single" collapsible>
              <AccordionItem value="invoice">
                <AccordionTrigger className="sidebar-hover-state">
                  <div className="flex gap-2">
                    <Image
                      src={`/assets/svgs/invoice.svg`}
                      alt=""
                      width={24}
                      height={24}
                    />
                    <p>Invoice</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p>Purchase Order</p>
                  <p>Invoice history</p>
                  <p>Estimates</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
          <li>
            <Accordion type="single" collapsible>
              <AccordionItem value="hr">
                <AccordionTrigger className="sidebar-hover-state">
                  <div className="flex gap-2">
                    <Image
                      src={`/assets/svgs/hr.svg`}
                      alt=""
                      width={24}
                      height={24}
                    />
                    <p>Human Resource</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p>Onboarding</p>
                  <p>Performance Management</p>
                  <p>Leave Management</p>
                  <p>Attendance Management</p>
                  <p>Payroll</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
          <li>
            <SidebarItem
              name={"Project Management"}
              link={"/dashboard"}
              image={"/assets/svgs/project.svg"}
            />
          </li>
          <li>
            <SidebarItem
              name={"Inventory"}
              link={"/dashboard"}
              image={"/assets/svgs/inventory.svg"}
            />
          </li>
          <li>
            <SidebarItem
              name={"Accounting"}
              link={"/dashboard"}
              image={"/assets/svgs/accounting.svg"}
            />
          </li>
          <li>
            <SidebarItem
              name={"Customer Relations"}
              link={"/dashboard"}
              image={"/assets/svgs/people_alt.svg"}
            />
          </li>
        </ul>
        <SidebarItem
          name={"Settings"}
          link={"/dashboard"}
          image={"/assets/svgs/settings.svg"}
        />
      </div>
    </div>
  );
};

export default Sidebar;
