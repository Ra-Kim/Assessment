import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid grid-cols-[20rem_1fr] h-[100vh] max-h-[100vh] bg-[#F8FAFC] overflow-y-scroll no-scrollbar">
      <Sidebar />
      <div className="min-h-[100vh] h-[100vh] max-h-[100vh] overflow-y-scroll no-scrollbar">
        {children}
      </div>
    </div>
  );
};

export default Layout;
