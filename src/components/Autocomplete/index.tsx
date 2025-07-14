import { utils } from '@/utils/utils';
import AutocompleteClient from './AutocompleteClient';
import { resStockInfo } from '@/types/res';
import { BaseStock } from '@/types/stockInfo';



export default async function Autocomplete() {
  let stockData: BaseStock[] = [];
  
  try {
    const data = await utils.fetchData<resStockInfo>(`https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockInfo`);
    stockData = data.data.map(item => ({
  id: item.stock_id,
  name: item.stock_name
}));
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return <AutocompleteClient initialData={stockData} />;
}