import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement, ChartOptions, LineElement, PointElement } from 'chart.js';
import { Transaction } from '@/models/transaction';
import transactionsData from '@/data/mock_data.json';
import { Bar, Line } from 'react-chartjs-2';
import { getTransactions } from '@/Services/getTransactionsService';


const InvestmentInTime = () => {
  
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const fetchData = async() => {
          const data = await getTransactions();
          if(data){
            setTransactions(data);
          }
        }
      
    useEffect(() => {
      fetchData();
    }, []);

    const dates = Array.from(new Set(transactions.map(transaction => new Date(transaction.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }))));

    const investment = transactions.filter(transaction => transaction.category === 'Investment').map(transaction => transaction.amount);
    const savings = transactions.filter(transaction => transaction.category === 'Savings').map(transaction => transaction.amount);

    const lineOptions:ChartOptions<'line'> = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          labels: {
            usePointStyle: true,
            pointStyle: 'line',
            boxWidth: 10,
            padding: 10,
            color: 'white',
          },
        },
      },
    };

    const lineData = {
      labels: dates,
      datasets: [
        {
          label: 'Savings',
          data: savings,
          borderColor: "#7A2E3B",
          fill: false,
        },
        {
          label: 'Investments',
          data: investment,
          borderColor:   "#354A5E",
          fill: false,
        }
      ],
    };
  
    return (
        <div>
        <Line data={lineData} options={lineOptions} className='mt-5 h-full w-full' />
      </div>
  )
}

export default InvestmentInTime