import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement, ChartOptions, LineElement, PointElement } from 'chart.js';
import { Transaction } from '@/models/transaction';
import transactionsData from '@/data/mock_data.json';
import Switch from '@mui/material/Switch';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);


const BarChart = () => {

  const[monthView, setMonthView] = useState(false);

  const currentMonth = new Date().getMonth() + 1;

  const currentYear = new Date().getFullYear();

    const [transactions, setTransactions] = useState<typeof Transaction[]>([]);

  useEffect(() => {
    // nahrání mock data
    setTransactions(transactionsData.transactions);
  }, []);

  let sortedExpenses = transactions
    .filter(transaction => transaction.type === 'expense')
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  if(monthView){
    sortedExpenses = transactions
      .filter(transaction => transaction.type === 'expense' && 
      transaction.date.substring(5, 7) == currentMonth.toString() &&
      transaction.date.substring(0, 4) == currentYear.toString())
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
  }

  const barData = {
    labels: sortedExpenses.map(expense => expense.category),
    datasets: [
      {
        label: 'Top Expenses',
        data: sortedExpenses.map(expense => expense.amount),
        backgroundColor:  ['#D32F2F', '#1976D2', '#FBC02D', '#388E3C', '#7B1FA2'],
      },
    ],
  };

  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
      },
    },
  };

  return (
    <div>
    <div className='flex items-center'>
      <Switch checked={monthView} onChange={() => setMonthView(!monthView)} />
      <span className="font-title text-sm ml-2 text-white">{monthView ? 'Month View' : 'All Records'}</span>
    </div>
    <div className='w-full h-52 mx-auto'>
      <Bar data={barData} options={barOptions} />
    </div>
    </div>
  )
}

export default BarChart