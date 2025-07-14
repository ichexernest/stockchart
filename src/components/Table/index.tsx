import { MonthRevenue } from "@/types/stockInfo";
import { utils } from "@/utils/utils";

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface BasicTableProps {
  data: MonthRevenue[];
}

export default function BasicTable({data}: BasicTableProps) {
  return (
    
    <TableContainer component={Paper}       
    sx={{ 
        direction: 'rtl',
        '& .MuiTable-root': { 
          direction: 'ltr'
        }
      }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="bg-gray-100">
            <TableCell className="sticky z-10 left-0 bg-gray-100 min-w-[180px]">年度月份</TableCell>
            {data.length > 0 && data.map((item, index) => (
              <TableCell key={index}>{utils.formatDate(item.year, item.month)}</TableCell> ))}
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow className="bg-white">
            <TableCell className="sticky z-10 left-0 bg-white min-w-[180px]">每月營收</TableCell> 
                {data.length > 0 && data.map((item, index) => (
              <TableCell key={index}>{(item.revenue  / 1000).toLocaleString()}</TableCell> ))}
            </TableRow>
            <TableRow className="bg-gray-100">
              <TableCell className="sticky z-10 left-0 bg-gray-100 min-w-[180px]" >單月營收年增率（％）</TableCell> 
                {data.length > 0 && data.map((item, index) => (
              <TableCell key={index}>{item.revenue_yoy}%</TableCell> ))}
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
