export interface resStockInfoData{
    industry_category: string;
    stock_id: string;
    stock_name: string;
    type: string;
    date: string;
}

export interface resStockInfo {
  msg: string;
  status: number;
  data: resStockInfoData[];
}

export interface resMonthRevenueData{
    date: string;
    stock_id: string;
    country: string;
    revenue: number;
    revenue_month: number;
    revenue_year: number;
}

export interface resMonthRevenue {
  msg: string;
  status: number;
  data: resMonthRevenueData[];
}