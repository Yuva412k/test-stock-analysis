import React, { useState } from "react";
import { useQuery } from "react-query";
import { Card, CardContent } from "../../../../components/ui/card";
import { fetchSectorAllocation } from "../../../../utils/api";
import { motion, AnimatePresence } from "framer-motion";

interface Stock {
  name: string;
  percentage: number;
  price: number;
}

interface Sector {
  name: string;
  percentage: number;
  stocks: Stock[];
}

export const SectorAllocationSection: React.FC = () => {
  const { data, isLoading } = useQuery<{ data: Sector[], currencyCode: string }>("sectorAllocation", fetchSectorAllocation);
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="w-full p-5 bg-[#1b1a1a] rounded-[11px]">
      <header className="mb-8">
        <h2 className="font-title-semibold text-dove-gray50">
          Sector Allocation
        </h2>
      </header>

      <div className="grid grid-cols-3 gap-5">
        {data?.data?.map((sector) => (
          <Card
            key={sector.name}
            className={`bg-[${sector.name.toLowerCase().replace(" ", "-")}] ${sector.bgColor}  rounded-xl border-none relative overflow-hidden`}
            onMouseEnter={() => setHoveredSector(sector.name)}
            onMouseLeave={() => setHoveredSector(null)}
          >
            <CardContent className="p-4 h-[200px] relative">
              <h3 className="font-title-1-semibold text-bermuda-gray950">{sector.name}</h3>
              <p className="font-body-regular text-bermuda-gray950 mt-2">{sector.percentage}%</p>
              <AnimatePresence>
                {hoveredSector === sector.name && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black bg-opacity-70 p-4"
                  >
                    <div className="grid grid-cols-2 gap-2 h-full">
                      {sector.stocks.map((stock, index) => (
                        <div
                          key={stock.name}
                          className="bg-white bg-opacity-20 p-2 rounded"
                          style={{
                            gridColumn: index === 0 && sector.stocks.length === 3 ? "span 2" : "span 1",
                            fontSize: `${Math.max(10, stock.percentage / 2)}px`,
                          }}
                        >
                          <p className="font-semibold">{stock.name}</p>
                          <p>{stock.percentage}%</p>
                          <p>{data.currencyCode}{stock.price}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
