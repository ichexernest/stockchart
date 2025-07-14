export type BaseStock = {
  id: string;
  name: string;
}

export type MonthRevenue = {
  year: number;
  month: number;
  date: string;
  revenue: number;
  revenue_last_year: number;
  revenue_yoy: number;
}

export type StockInfo = BaseStock & {
  month_revenue: MonthRevenue[];
}