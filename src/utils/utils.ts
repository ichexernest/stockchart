export const utils = {
  formatDate: (year: number, month: number): string => {
    return `${year}${month.toString().padStart(2, '0')}`;
  },
fetchData: async <T = unknown>(endpoint: string): Promise<T> => {
  if (!process.env.FINMIND_TOKEN) {
    throw new Error('FINMIND_TOKEN is not defined');
  }

  try {
    const response = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${process.env.FINMIND_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch operation failed:', error);
    throw error;
  }
},
};
