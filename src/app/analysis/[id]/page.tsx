import Chart from '@/components/Chart';
import BasicTable from '@/components/Table';
import{ StockInfo } from '@/types/stockInfo';
import { utils } from '@/utils/utils';
import { resMonthRevenue, resMonthRevenueData, resStockInfo } from '@/types/res';


const interval = 5

export default async function AnalysisContainerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(new Date().setFullYear(new Date().getFullYear() - interval -1)).toISOString().split('T')[0].substring(0,4) + '-02-01'; 

  const [res, res2] = await Promise.all([
    utils.fetchData<resMonthRevenue>(`https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockMonthRevenue&data_id=${id}&start_date=${startDate}&end_date=${endDate}`),
    utils.fetchData<resStockInfo>(`https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockInfo&data_id=${id}`)
  ]);


  const transferToStockInfo = (res: resMonthRevenue, res2: resStockInfo): StockInfo => {
    if (!res.data || res.data.length === 0 || !res2.data || res2.data.length === 0) {
      throw new Error('No data found for the given stock ID');
    }

    const currentYear = new Date().getFullYear();
    const yearScale = currentYear - interval;
    const recentFiveYearsData = res.data.filter((item: resMonthRevenueData) => 
      item.revenue_year >= yearScale
    );

    return {
      id: res2.data[0].stock_id,
      name: res2.data[0].stock_name,
      month_revenue: recentFiveYearsData.map((item: resMonthRevenueData) => {
        const prevYearData = res.data.find((i: resMonthRevenueData) => 
            i.revenue_year === item.revenue_year-1 && i.revenue_month === item.revenue_month
          );
        
        const date = `${item.revenue_year}${item.revenue_month.toString().padStart(2, '0')}`;
        
        let revenue_yoy = NaN;
        if (prevYearData && prevYearData.revenue && prevYearData.revenue > 0) {
          revenue_yoy = ((item.revenue / prevYearData.revenue) - 1) * 100;
          revenue_yoy = Number(revenue_yoy.toFixed(2));
        }

        return {
          year: item.revenue_year,
          month: item.revenue_month,
          date: date,
          revenue: item.revenue,
          revenue_last_year: prevYearData ? prevYearData.revenue : 0,
          revenue_yoy: isNaN(revenue_yoy) ? NaN : revenue_yoy, 
        };
      }),
    };
  }

  const stockInfo: StockInfo = transferToStockInfo(res, res2);


  return (
    <div>
      <div className='p-5 font-bold m-3 shadow rounded-2xl'>{stockInfo.id}{stockInfo.name}</div>
      <div className='p-5 font-bold m-3 shadow rounded-2xl'>
        <Chart data={stockInfo.month_revenue} interval={interval}/>
      </div>
      <div className='p-5 font-bold m-3 shadow rounded-2xl'>
                <span className='mb-4'>詳細數據</span>
      <BasicTable data={stockInfo.month_revenue} />
      </div>
      {/* <pre>{JSON.stringify(res, null, 2)}</pre> */}
    </div>
  );
}