import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";

const SideNavbar: React.FC = () => {
  return (
    <div>
      <Disclosure as="nav">
        <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>
        <div className="p-6 w-64 h-screen bg-white z-20 fixed top-0 left-0 lg:w-60 peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
              HR SYSTEM
            </h1>
            <div className="my-4 border-b border-gray-100 pb-4">
              <NavItem icon={MdOutlineSpaceDashboard} label="Trang Chủ" />
              <NavItem icon={CgProfile} label="Nhân Sự" />
              <NavItem icon={FaRegComments} label="Tin Nhắn" />
              <NavItem icon={MdOutlineAnalytics} label="Thống Kê" />
              <NavItem icon={BiMessageSquareDots} label="Messages" />
            </div>
            {/* setting  */}
            <div className="my-4 border-b border-gray-100 pb-4">
              <NavItem icon={MdOutlineSettings} label="Settings" />
              <NavItem icon={MdOutlineMoreHoriz} label="More" />
            </div>
            {/* logout */}
            <div className="my-4">
              <NavItem icon={MdOutlineLogout} label="Logout" border />
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
  border?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, border }) => {
  return (
    <div
      className={`flex mb-2 justify-start items-center gap-4 pl-5 ${
        border ? "border border-gray-200" : ""
      } hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto`}
    >
      <Icon className="text-2xl text-gray-600 group-hover:text-white" />
      <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
        {label}
      </h3>
    </div>
  );
};

export default SideNavbar;
