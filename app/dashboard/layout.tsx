import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid grid-cols-[20rem_1fr] max-h-[100dvh] bg-[#F8FAFC]">
      <Sidebar />
      <div className="max-h-[100vh] h-full no-scrollbar overflow-y-auto">{children}</div>
    </div>
  );
};

export default Layout;
