"use client";

import { Diamond } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

const SubSidebarItem = ({
  name,
  link,
  tip,
}: {
  name: string;
  link: string;
  tip?: number;
}) => {
  //   const router = useRouter();
  const path = usePathname();
  const active = useMemo(() => {
    if (path === link) return true;
    return false;
  }, [path, link]);
  return (
    <Link
      href={link}
      className={`flex justify-between items-center text-sm ${active ? "sub-sidebar-active-state":"sub-sidebar-hover-state"}`}
    >
      <div className="flex gap-2 items-center">
        <Diamond color="#475569" size={10} />
        {name}
      </div>
      {tip && tip > 0 && <div className="bg-[#EFF6FF] h-6 px-1 text-[11px] font-medium text-[#2563EB]">{tip}</div>}
    </Link>
  );
};

export default SubSidebarItem;
