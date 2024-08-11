import Image from "next/image";
import Link from "next/link";
import React from "react";

const SidebarItem = ({
  name,
  link,
  image,
}: {
  name: string;
  link: string;
  image: string;
}) => {
  return (
    <Link
      href={link}
      className="flex gap-2 w-full sidebar-hover-state"
    >
      <Image src={image} alt="" width={24} height={24} />
      {name}
    </Link>
  );
};

export default SidebarItem;
