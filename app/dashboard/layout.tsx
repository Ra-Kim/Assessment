import Sidebar from "@/components/sidebar";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid grid-cols-[20rem_1fr] max-h-[100dvh]">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
