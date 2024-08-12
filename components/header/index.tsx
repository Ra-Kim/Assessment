import React from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const Header = ({ title }: { title: string }) => {
  return (
    <div className="bg-white flex justify-between items-center px-8">
      <p className="text-2xl font-semibold text-[#334155]">{title}</p>
      <div className="flex gap-4">
        <Image
          src={`/assets/svgs/notification-nav.svg`}
          alt="notification"
          width={34}
          height={35}
        />
        <div className="flex gap-2 items-center">
          <Image
            src={`/assets/svgs/paystack_logo.svg`}
            alt="logo"
            width={32}
            height={32}
          />
          <p className="text-sm text-[#64748B] tracking-wide">Kosofe</p>
          <ChevronDown color="#94A3B8" size={24}/>
        </div>
      </div>
    </div>
  );
};

export default Header;
