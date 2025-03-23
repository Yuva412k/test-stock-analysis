import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Select } from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import { fetchHoldings, fetchSectors } from "../../utils/api";
import { Loader } from "../../components/Loader/Loader";

interface Holding {
  id: number;
  name: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  value: number;
  sector: string;
  profitLoss: number;
  profitLossPercentage: number;
}

export const Holdings: React.FC = () => {
  const { data: holdings, isLoading: isHoldingsLoading } = useQuery<Holding[]>(
    "holdings",
    fetchHoldings
  );
  const { data: sectors, isLoading: isSectorsLoading } = useQuery<string[]>(
    "sectors",
    fetchSectors
  );
  const [sortBy, setSortBy] = useState<keyof Holding>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterSector, setFilterSector] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const handleSort = (key: keyof Holding) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const filteredAndSortedHoldings = holdings
    ?.filter(
      (holding) =>
        holding.name.toLowerCase().includes(search.toLowerCase()) &&
        (filterSector === "" || holding.sector === filterSector)
    )
    .sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  if (isHoldingsLoading || isSectorsLoading)
    return (
      <>
        <Loader />
        {/* Add an empty container to maintain layout structure */}
        <div className="relative w-full max-w-[1442px] bg-[#171616] rounded-[30px] overflow-hidden min-h-screen" />
      </>
    );

  return (
    <Card className="w-full bg-[#1b1a1a] text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Holdings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <Input
            placeholder="Search holdings"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 bg-[#2a2a2a] text-white border-gray-600"
          />
          <Select
            value={filterSector}
            onValueChange={setFilterSector}
            className="w-48"
          >
            <option value="">All Sectors</option>
            {sectors?.map((sector, index) => (
              <option key={index} value={sector}>
                {sector}
              </option>
            ))}
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              {[
                "Name",
                "Quantity",
                "Average Price",
                "Current Price",
                "Value",
                "Profit/Loss",
                "P/L %",
              ].map((header, index) => (
                <TableHead
                  key={index}
                  onClick={() =>
                    handleSort(
                      header.toLowerCase().replace(/\s/g, "") as keyof Holding
                    )
                  }
                  className="cursor-pointer"
                >
                  {header}
                  {sortBy === header.toLowerCase().replace(/\s/g, "") && (
                    <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedHoldings?.map((holding) => (
              <TableRow key={holding.id}>
                <TableCell>{holding.name}</TableCell>
                <TableCell>{holding.quantity}</TableCell>
                <TableCell>₹{holding.averagePrice.toFixed(2)}</TableCell>
                <TableCell>₹{holding.currentPrice.toFixed(2)}</TableCell>
                <TableCell>₹{holding.value.toFixed(2)}</TableCell>
                <TableCell
                  className={
                    holding.profitLoss >= 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  ₹{holding.profitLoss.toFixed(2)}
                </TableCell>
                <TableCell
                  className={
                    holding.profitLossPercentage >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {holding.profitLossPercentage.toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
