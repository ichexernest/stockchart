'use client';

import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import { BaseStock } from '@/types/stockInfo';

interface AutocompleteClientProps {
  initialData: BaseStock[];
}

export default function AutocompleteClient({ initialData }: AutocompleteClientProps) {
  const router = useRouter();

  const uniqueData = initialData.filter((item, index, self) => 
    index === self.findIndex(t => 
      t.id === item.id && t.name === item.name
    )
  );

  const handleClick = (stockItem: BaseStock | null) => {
    if (stockItem) {
      router.push(`/analysis/${stockItem.id}`);
    }
  };

  return (
    <Autocomplete
    className='w-[400px]'
      options={uniqueData}
      getOptionLabel={(option) => `${option.id} - ${option.name}`}
      onChange={(event, value) => handleClick(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="搜尋股票代碼或名稱"
          variant="outlined"
          fullWidth
        />
      )}
      noOptionsText="找不到相符的股票"
      openOnFocus={false}
    />
  );
}