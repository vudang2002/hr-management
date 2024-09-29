import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";

const SideNavbarEmp: React.FC = () => {
  return (
    <div>
      <Disclosure as="nav">
        <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-white hover:bg-white hover:text-[#2899a9] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>
        <div className="p-6 w-64 h-screen bg-[#2899a9] text-white z-20 fixed top-0 left-0 lg:w-60 peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start items-center">
            <div className="flex justify-center items-center w-full mb-4">
              <Image
                src="/images/logoHR_System.jpg"
                alt="Logo"
                width={120}
                height={120}
                className="rounded-[30px] border border-white"
              />
            </div>
            <h1 className="text-base text-center cursor-pointer font-bold text-white border-b border-gray-100 pb-4 w-full"></h1>
            <div className="my-4 border-b border-gray-100 pb-4">
              <NavItem
                icon={MdOutlineSpaceDashboard}
                label="Trang Chủ"
                href="/employee"
              />
              <NavItem icon={CgProfile} label="Hồ Sơ" href="/employee/profile" />
              <NavItem
                icon={FaRegComments}
                label="Đơn Xin Nghỉ"
                href="/employee/leave_application"
              />
              
              <NavItem
                icon={MdOutlineSettings}
                label="Cài Đặt"
                href="/employee/setting"
              />
            </div>
            {/* setting  */}

            {/* logout */}
            <div className="my-4">
              <NavItem
                icon={MdOutlineLogout}
                label="Đăng Xuất"
                href="/logout"
                border
              />
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
};

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  border?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  label,
  href,
  border,
}) => {
  return (
    <Link href={href}>
      <div
        className={`flex mb-2 justify-start items-center gap-4 pl-5 ${
          border ? "border border-gray-200" : ""
        } hover:bg-white p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto`}
      >
        <Icon className="text-2xl text-white group-hover:text-[#2899a9]" />
        <h3 className="text-base text-white group-hover:text-[#2899a9] font-semibold">
          {label}
        </h3>
      </div>
    </Link>
  );
};

export default SideNavbarEmp;