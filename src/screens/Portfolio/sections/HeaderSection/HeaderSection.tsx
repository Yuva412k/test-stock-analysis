import { LogOutIcon } from "lucide-react";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../../components/ui/navigation-menu";

export const HeaderSection = (): JSX.Element => {
  // Navigation menu items data
  const menuItems = [
    { name: "Home", isActive: false },
    { name: "Portfolio", isActive: true },
    { name: "Mutual Funds", isActive: false },
    { name: "Tools", isActive: false },
    { name: "Transactions", isActive: false },
  ];

  return (
    <header className="w-full h-20 bg-[#1b1a1a] relative">
      <div className="flex items-center h-full px-12">
        {/* Logo */}
        <img
          className="w-[26px] h-[38px] mr-32"
          alt="Logo"
          src="https://c.animaapp.com/m8kgn877BAe2ZS/img/group-47952.png"
        />

        {/* Navigation Menu */}
        <NavigationMenu className="max-w-none">
          <NavigationMenuList className="flex space-x-10">
            {menuItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  className={`font-${item.isActive ? "body-semibold" : "body-regular"} text-${item.isActive ? "dove-gray50" : "dove-gray200"} text-[14px] relative ${item.isActive ? "after:absolute after:w-16 after:h-0.5 after:bg-[#0070df] after:rounded-[10px] after:bottom-[-20px] after:left-[-8px]" : ""}`}
                >
                  {item.name}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side icons */}
        <div className="ml-auto flex items-center space-x-8">
          <div className="flex items-center space-x-4">
            {/* Notification icons */}
            <div className="relative">
              <img
                className="w-[21px] h-[21px]"
                alt="Notification icon"
                src="https://c.animaapp.com/m8kgn877BAe2ZS/img/clip-path-group.png"
              />
              <img
                className="absolute w-[7px] h-[7px] top-0 left-[79px]"
                alt="Notification indicator"
                src="https://c.animaapp.com/m8kgn877BAe2ZS/img/group-47959.png"
              />
            </div>

            {/* Message icon */}
            <div className="relative">
              <img
                className="w-5 h-[19px]"
                alt="Message icon"
                src="https://c.animaapp.com/m8kgn877BAe2ZS/img/vector-2.svg"
              />
              <img
                className="absolute w-1 h-0.5 top-[22px] left-[8px]"
                alt="Message indicator"
                src="https://c.animaapp.com/m8kgn877BAe2ZS/img/vector-5.svg"
              />
            </div>

            {/* Profile icon */}
            <img
              className="w-[27px] h-[22px]"
              alt="Profile icon"
              src="https://c.animaapp.com/m8kgn877BAe2ZS/img/vector-3.svg"
            />
          </div>

          {/* Logout icon */}
          <LogOutIcon className="w-[21px] h-[21px] text-white" />
        </div>
      </div>
    </header>
  );
};
