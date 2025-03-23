import React from "react";
import { Button } from "../../../../components/ui/button";

export const InvestmentPerformanceSection = ({activeTab, setActiveTab} : {activeTab:string, setActiveTab: (value: string)=>void}): JSX.Element => {
  // Navigation menu items data
  const menuItems = [
    { id: 1, label: "PHA", isActive: true },
    { id: 2, label: "Fund Analysis", isActive: false },
    { id: 3, label: "Holdings", isActive: false },
    { id: 4, label: "Transactions", isActive: false },
  ];

  return (
    <nav className="h-full w-[200px] bg-[#1b1a1a] py-10">
      <div className="flex flex-col space-y-4 px-5">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={`flex h-10 w-40 justify-start px-[22px] py-[11px] ${
              activeTab === item.label.toLowerCase().replace(" ", "")
                ? "bg-dove-gray900 rounded-md"
                : "rounded bg-transparent"
            }`}
            onClick={() =>
              setActiveTab(item.label.toLowerCase().replace(" ", ""))
            }
          >
            <span
              className={`${
                item.isActive
                  ? "font-body-semibold font-[number:var(--body-semibold-font-weight)] text-dove-gray50 text-[length:var(--body-semibold-font-size)] tracking-[var(--body-semibold-letter-spacing)] leading-[var(--body-semibold-line-height)] [font-style:var(--body-semibold-font-style)]"
                  : "font-body-regular font-[number:var(--body-regular-font-weight)] text-dove-gray50 text-[length:var(--body-regular-font-size)] tracking-[var(--body-regular-letter-spacing)] leading-[var(--body-regular-line-height)] [font-style:var(--body-regular-font-style)]"
              }`}
            >
              {item.label}
            </span>
          </Button>
        ))}
      </div>
    </nav>
  );
};
