import Image from "next/image";
import React from "react";
import SidebarItem from "./sidebarItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import SubSidebarItem from "./subSideBarItem";

const Sidebar = () => {
  return (
    <div className="pt-8 pb-4 border-r border-r-[#F1F5F9] grid grid-rows-[5rem_1fr] h-[100dvh] bg-white">
      <div className="px-8">
        <Image src={`/assets/Logo.png`} alt="logo" width={80} height={28} />
      </div>
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
                    <p className="font-normal">Invoice</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <SubSidebarItem
                    name={"Purchase Order"}
                    link={"/dashboard/purchaseOrders"}
                    tip={25}
                  />
                  <SubSidebarItem
                    name={"Invoice history"}
                    link={"/dashboard/invoices"}
                    tip={93}
                  />
                  <SubSidebarItem
                    name={"Estimates"}
                    link={"/dashboard/estimates"}
                    tip={126}
                  />
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
                    <p className="font-normal">Human Resource</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <SubSidebarItem
                    name={"Onboarding"}
                    link={"/dashboard/onboarding"}
                  />
                  <SubSidebarItem
                    name={"Invoice history"}
                    link={"/dashboard/performanceManagement"}
                  />
                  <SubSidebarItem
                    name={"Leave Mangement"}
                    link={"/dashboard/leaveManagement"}
                  />
                  <SubSidebarItem
                    name={"Attendance Mangement"}
                    link={"/dashboard/attendanceManagement"}
                  />
                  <SubSidebarItem
                    name={"Payroll"}
                    link={"/dashboard/payroll"}
                  />
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
