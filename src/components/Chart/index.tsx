'use client'
import React , {useState, useMemo} from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsGrid } from '@mui/x-charts/ChartsGrid';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { MonthRevenue } from '@/types/stockInfo';
import { AxisValueFormatterContext } from '@mui/x-charts';

interface ChartProps {
  data: MonthRevenue[];
  interval: number;
}

export default function Chart({data, interval}: ChartProps) {

  const series = [
  { type: 'line', dataKey: 'revenue_yoy', color: '#d12c0f', yAxisId: 'rightAxis' },
  { type: 'bar', dataKey: 'revenue', color: '#e3c564', yAxisId: 'leftAxis' },
]as const;

  const [yearInterval, setYearInterval] = useState(interval);
  const currentYear = new Date().getFullYear();
  const yearScale = currentYear - yearInterval;
  
    const recentYearsData = data.filter((item: MonthRevenue) => 
      item.year >= yearScale
    );

    const processedData = recentYearsData.map(item => ({
    ...item,
    revenue_yoy: isNaN(item.revenue_yoy) ? undefined : item.revenue_yoy
  }));


  const handleChange = (event: SelectChangeEvent) => {
    setYearInterval(event.target.value as unknown as number);
  };

  const shownYears = useMemo(() =>{
    const shownYears = new Set<string>();
    let yearMinDates = '';
    
    data.forEach((item) => {
      if (item.month === 1) {
        shownYears.add(item.date);
      } else {
      if (!shownYears.has(item.year + '01') && !yearMinDates) {
        yearMinDates = item.date;
      }
      }
    });
    if(yearMinDates!=='')shownYears.add(yearMinDates)
    return shownYears;
  }, [data]);

  return (
    <Stack sx={{ width: '100%' }}>
      <div className='flex justify-between items-center mb-4'>
        <span>每月營收</span>
                <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">year interval</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={yearInterval.toString()}
          label="yearInterval"
          onChange={handleChange}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>
    </Box>
      </div>
      <Box sx={{ width: '100%' }}>
        <ChartContainer
          series={series}
          xAxis={[
            {
              scaleType: 'band',
              dataKey: 'date',
              label: 'Year',
              valueFormatter: (value: string, context: AxisValueFormatterContext) => 
                context.location === 'tick'
                  ? value.substring(0, 4)
                  : value,
              tickInterval:  (value: string) => shownYears.has(value) 
            },
          ]}
         yAxis={[
            { 
              id: 'leftAxis', 
              width: 100,
              valueFormatter: (value: number) => `${(value / 1000).toLocaleString()}`
            },
            { 
              id: 'rightAxis', 
              position: 'right', 
              width: 100,
              valueFormatter: (value: number) => `${(value ?? 0).toFixed(1)}%`
            },
          ]}
          dataset={processedData}
          height={400}
        >
          <ChartsGrid horizontal />
          <BarPlot />
          <LinePlot />
          <MarkPlot />

          <ChartsXAxis />
          <ChartsYAxis axisId="leftAxis" label="（千元）" />
          <ChartsYAxis axisId="rightAxis" label="（％）" />
          <ChartsTooltip />
        </ChartContainer>
      </Box>
    </Stack>
  );
}