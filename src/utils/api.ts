import axios from "axios";
// Create a config object to store environment variables
const process = {
  env: import.meta.env,
};
console.log(process)
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000/api",
});

// Mock data for local development
const mockData = {
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
      // Add more investment cards here
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
};

// Helper function to simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch Mutual Funds
export const fetchMutualFunds = async () => {
  if (process.env.VITE_NODE_ENV === "development") {
    await delay(500); // Simulate API delay
    return mockData.mutualFunds;
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
    return mockData.holdings;
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


export default api;
