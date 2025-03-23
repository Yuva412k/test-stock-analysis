import axios from "axios";
// Create a config object to store environment variables
const process = {
  env: import.meta.env,
};
console.log(process)
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000/api",
});

// Fund data for the visualization
const fundData = [
  {
    name: "Nippon Large Cap Fund - Direct Plan",
    bgColor: "bg-[#f8d07b]",
    color: "#f8d07b",
  },
  {
    name: "Motilal Large Cap Fund - Direct Plan",
    bgColor: "bg-[#0070df]",
    color: "#0070df",
  },
  {
    name: "HDFC Large Cap Fund",
    bgColor: "bg-[#c56a09]",
    color: "#c56a09",
  },
  {
    name: "ICICI Prudential Midcap Fund",
    bgColor: "bg-[#9e9d24]",
    color: "#9e9d24",
  },
];

// Stock data for the visualization
const stockData = [
  { name: "HDFC LTD.", color: "#36A2EB" },
  { name: "RIL", color: "#FF6384" },
  { name: "INFY", color: "#4BC0C0" },
  { name: "TCS", color: "#FF9F40" },
  { name: "HDFCBANK", color: "#9966FF" },
  { name: "BHARTIARTL", color: "#FFCD56" },
];

// Mock data for local development
const mockData = {
  currencyCode: "₹",
  mutualFunds: [
    {
      id: 1,
      name: "Large Cap Fund",
      nav: 25.67,
      oneYearReturn: 12.5,
      threeYearReturn: 10.2,
      fiveYearReturn: 9.8,
      investedAmount: 50000,
      isWatchlisted: false,
      expenseRatio: 1.2,
      fundManager: "John Doe",
      riskLevel: "Moderate",
      historicalPerformance: [
        { date: "2022-01", value: 100 },
        { date: "2022-02", value: 105 },
        { date: "2022-03", value: 110 },
        { date: "2022-04", value: 108 },
        { date: "2022-05", value: 112 },
      ],
    },
    // Add more mock mutual funds here
  ],
  holdings: [
    {
      id: 1,
      name: "HDFC Bank",
      quantity: 100,
      averagePrice: 1500,
      currentPrice: 1650,
      value: 165000,
      sector: "Financial",
      profitLoss: 15000,
      profitLossPercentage: 10,
    },
    // Add more mock holdings here
  ],
  sectors: [
    "Financial",
    "Technology",
    "Healthcare",
    "Consumer Goods",
    "Energy",
  ],
  portfolioData: {
    currencyCode: "₹",
    investmentCards: [
      {
        id: 1,
        title: "Current Investment Value",
        value: "5,75,000",
        change: "+0.6%",
        period: "1D Return",
        isPositive: true,
      },
      {
        id: 1,
        title: "Current Investment Value",
        value: "5,75,000",
        change: "+0.6%",
        period: "1D Return",
        isPositive: true,
      },
      {
        id: 1,
        title: "Current Investment Value",
        value: "5,75,000",
        change: "+0.6%",
        period: "1D Return",
        isPositive: true,
      },
      {
        id: 1,
        title: "Current Investment Value",
        value: "5,75,000",
        change: "+0.6%",
        period: "1D Return",
        isPositive: true,
      },
    ],
  },
  performanceData: [
    { date: "2023-01", value: 100000 },
    { date: "2023-02", value: 105000 },
    { date: "2023-03", value: 102000 },
    { date: "2023-04", value: 108000 },
    { date: "2023-05", value: 112000 },
  ],
  compositionData: [
    { name: "Stocks", value: 60 },
    { name: "Mutual Funds", value: 25 },
    { name: "Bonds", value: 10 },
    { name: "Cash", value: 5 },
  ],
  walletBalance: 5000.0,
  transactions: [
    {
      id: 1,
      date: "2025-03-20",
      type: "buy",
      stock: "AAPL",
      quantity: 10,
      price: 150,
      total: 1500,
      fees: 5,
      taxes: 10,
      netAmount: 1485,
    },
    {
      id: 2,
      date: "2025-03-21",
      type: "sell",
      stock: "GOOGL",
      quantity: 5,
      price: 2800,
      total: 14000,
      fees: 10,
      taxes: 20,
      netAmount: 13970,
    },
    {
      id: 3,
      date: "2025-03-22",
      type: "buy",
      stock: "MSFT",
      quantity: 8,
      price: 310,
      total: 2480,
      fees: 6,
      taxes: 12,
      netAmount: 2462,
    },
  ],
  sankeyData: {
    datasets: [{
      label: 'Fund Allocation',
      data: [
        { from: 'Nippon Large Cap Fund - Direct Plan', to: 'HDFC LTD.', flow: 20 },
        { from: 'Nippon Large Cap Fund - Direct Plan', to: 'RIL', flow: 15 },
        { from: 'Motilal Large Cap Fund - Direct Plan', to: 'INFY', flow: 25 },
        { from: 'Motilal Large Cap Fund - Direct Plan', to: 'TCS', flow: 20 },
        { from: 'HDFC Large Cap Fund', to: 'HDFCBANK', flow: 30 },
        { from: 'ICICI Prudential Midcap Fund', to: 'BHARTIARTL', flow: 15 },
      ],
      colorFrom: (c) => fundData.find(f => f.name === c.dataset.data[c.dataIndex].from)?.color || '#000000',
      colorTo: (c) => stockData.find(s => s.name === c.dataset.data[c.dataIndex].to)?.color || '#000000',
    }]
  },
  sectorAllocation: [
    {
      id: 1,
      name: "Financial",
      amount: "₹1,95,000",
      percentage: "34",
      bgColor: "bg-[#9bb0c7]",
      size: "col-span-2 row-span-1",
      stocks: [
        { name: "HDFC Bank", percentage: "15%", price: 1500 },
        { name: "ICICI Bank", percentage: "10%", price: 800 },
        { name: "SBI", percentage: "9", price: 400 },
        { name: "ANS", percentage: "9", price: 400 },
        { name: "LLB", percentage: "9", price: 400 },
        { name: "LLB", percentage: "9", price: 400 },
      ],
    },
    {
      id: 2,
      name: "Healthcare",
      amount: "₹83,250",
      percentage: "14.5",
      bgColor: "bg-[#adb8cf]",
      size: "col-span-1 row-span-1",
      stocks: [
        { name: "Sun Pharma", percentage: "7%", price: 750 },
        { name: "Dr Reddy's", percentage: "4.5%", price: 3500 },
        { name: "Cipla", percentage: "3%", price: 900 },
      ],
    },
    {
      id: 3,
      name: "Technology",
      amount: "₹1,11,000",
      percentage: "19",
      bgColor: "bg-[#c6c4d8]",
      size: "col-span-1 row-span-1",
      stocks: [
        { name: "TCS", percentage: "10%", price: 3200 },
        { name: "Infosys", percentage: "6%", price: 1400 },
        { name: "Wipro", percentage: "3%", price: 400 },
      ],
    },
    {
      id: 4,
      name: "Consumer Goods",
      amount: "₹55,500",
      percentage: "9.5",
      bgColor: "bg-[#dad3e1]",
      size: "col-span-1 row-span-1",
      stocks: [
        { name: "HUL", percentage: "5%", price: 2200 },
        { name: "ITC", percentage: "3%", price: 215 },
        { name: "Nestle", percentage: "1.5%", price: 18000 },
      ],
    },
    {
      id: 5,
      name: "Energy",
      amount: "₹55,500",
      percentage: "9.5",
      bgColor: "bg-[#ebe2ea]",
      size: "col-span-1 row-span-1",
      stocks: [
        { name: "Reliance", percentage: "6%", price: 2400 },
        { name: "ONGC", percentage: "2%", price: 150 },
        { name: "NTPC", percentage: "1.5%", price: 120 },
      ],
    },
    {
      id: 6,
      name: "Other Sectors",
      amount: "₹55,500",
      percentage: "9.5",
      bgColor: "bg-[#f8f3f5]",
      size: "col-span-1 row-span-1",
      stocks: [
        { name: "Bharti Airtel", percentage: "3%", price: 700 },
        { name: "L&T", percentage: "3.5%", price: 1600 },
        { name: "Asian Paints", percentage: "3%", price: 3000 },
      ],
    },
  ]
};

// Helper function to simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch Mutual Funds
export const fetchMutualFunds = async () => {
  if (process.env.VITE_NODE_ENV === "development") {
    await delay(500); // Simulate API delay
    return { funds: mockData.mutualFunds, currencyCode: mockData.currencyCode };
  }
  const response = await api.get("/mutual-funds");
  return response.data;
};

// Toggle Watchlist
export const toggleWatchlist = async (fundId: number) => {
  if (process.env.VITE_NODE_ENV === "development") {
    await delay(200); // Simulate API delay
    mockData.mutualFunds = mockData.mutualFunds.map((fund) =>
      fund.id === fundId
        ? { ...fund, isWatchlisted: !fund.isWatchlisted }
        : fund
    );
    return { success: true };
  }
  const response = await api.post(`/mutual-funds/${fundId}/toggle-watchlist`);
  return response.data;
};

// Fetch Holdings
export const fetchHoldings = async () => {
  if (process.env.VITE_NODE_ENV === "development") {
    await delay(500); // Simulate API delay
    return  mockData.holdings;
  }
  const response = await api.get("/holdings");
  return response.data;
};

// Fetch Sectors
export const fetchSectors = async () => {
  if (process.env.VITE_NODE_ENV === "development") {
    await delay(200); // Simulate API delay
    return mockData.sectors;
  }
  const response = await api.get("/sectors");
  return response.data;
};

// Fetch Portfolio Data
export const fetchPortfolioData = async () => {
  if (process.env.VITE_NODE_ENV === "development") {
    await delay(500); // Simulate API delay
    return mockData.portfolioData;
  }
  const response = await api.get("/portfolio");
  return response.data;
};

// Fetch Performance Data
export const fetchPerformanceData = async () => {
  if (process.env.VITE_NODE_ENV === "development") {
    await delay(500); // Simulate API delay
    return mockData.performanceData;
  }
  const response = await api.get("/performance");
  return response.data;
};

// Fetch Composition Data
export const fetchCompositionData = async () => {
  if (process.env.VITE_NODE_ENV === "development") {
    await delay(500); // Simulate API delay
    return mockData.compositionData;
  }
  const response = await api.get("/composition");
  return response.data;
};


export interface Transaction {
  id: number;
  date: string;
  type: 'buy' | 'sell' | 'deposit';
  stock: string;
  quantity: number;
  price: number;
  total: number;
  fees: number;
  taxes: number;
  netAmount: number;
}

export const fetchTransactions = async () => {
  if (process.env.VITE_NODE_ENV === "development") {
    await delay(500); // Simulate API delay
    return mockData.transactions as Transaction[];
  }
  const response = await axios.get("/transactions");
  return response.data as Transaction[];
};

const mockUserProfile = {
  name: "John Doe",
  email: "johndoe@example.com",
  phone: "123-456-7890",
};

export const fetchUserProfile = async () => {
  if (process.env.VITE_NODE_ENV === "development") {
    await delay(500); // Simulate API delay
    return mockUserProfile;
  }
  const response = await axios.get("/user/profile");
  return response.data;
};

export const updateUserProfile = async (userData:any) => {
  if (process.env.VITE_NODE_ENV === "development") {
    await delay(500); // Simulate API delay
    return { success: true, message: "Profile updated successfully" };
  }
  const response = await axios.put("/user/profile", userData);
  return response.data;
};

export const authLogin = async (userData: any) => {
  if (process.env.VITE_NODE_ENV === "development") {
    await delay(500); // Simulate API delay
    return { data: {token: "local-token", user: mockUserProfile}};
  }
  const response = await axios.post("/login", userData);
  return response.data;
};


export const fetchWalletBalance = async () => {
  if (process.env.VITE_NODE_ENV === "development") {
    await delay(500); // Simulate API delay
    return mockData.walletBalance;
  }
  const response = await axios.get("/wallet/balance");
  return response.data;
};


export const addFunds = async (amount:number) => {
  if (process.env.VITE_NODE_ENV === "development") {
    await delay(500);
    mockData.walletBalance += amount;
    return { success: true, newBalance: mockData.walletBalance };
  }
  const response = await axios.post("/wallet/add-funds", { amount });
  return response.data;
};


const mockNotifications = [
  {
    id: "1",
    message: "Your order has been shipped!",
    read: false,
    timestamp: "2025-03-23 10:15 AM",
  },
  {
    id: "2",
    message: "New message from support.",
    read: false,
    timestamp: "2025-03-22 5:30 PM",
  },
  {
    id: "3",
    message: "Reminder: Your subscription renews tomorrow.",
    read: true,
    timestamp: "2025-03-21 9:00 AM",
  },
];

export const fetchNotifications = async () => {
  if (process.env.VITE_NODE_ENV === "development") {
    await delay(500); // Simulate API delay
    return mockNotifications;
  }
  const response = await axios.get("/notifications");
  return response.data;
};


const mockFundAnalysis = [
  {
    id: 1,
    name: "Fund A",
    data: [
      { date: "2025-03-20", value: 105, benchmark: 100 },
      { date: "2025-03-21", value: 110, benchmark: 102 },
    ],
    sharpeRatio: 1.2,
    standardDeviation: 0.15,
    alpha: 0.05,
    beta: 1.1,
  },
  {
    id: 2,
    name: "Fund B",
    data: [
      { date: "2025-03-20", value: 98, benchmark: 100 },
      { date: "2025-03-21", value: 97, benchmark: 99 },
    ],
    sharpeRatio: 0.8,
    standardDeviation: 0.2,
    alpha: -0.02,
    beta: 0.9,
  },
];

export const fetchFundAnalysis = async () => {
  if (process.env.VITE_NODE_ENV === "development") {
    await delay(500); // Simulate API delay
    return mockFundAnalysis;
  }
  const response = await axios.get("/fund-analysis");
  return response.data;
};


// Fetch Sankey Data
export const fetchOverviewSectionData= async () => {
  if (process.env.VITE_NODE_ENV === 'development') {
    await delay(500);
    return {sankeyData: mockData.sankeyData, fundData, stockData};
  }
  const response = await api.get('/sankey-data');
  return response.data;
};

// Fetch Sector Allocation
export const fetchSectorAllocation = async () => {
  if (process.env.VITE_NODE_ENV === 'development') {
    await delay(500);
    return { data: mockData.sectorAllocation, currencyCode: mockData.currencyCode };
  }
  const response = await api.get('/sector-allocation');
  return response.data;
};

export default api;
