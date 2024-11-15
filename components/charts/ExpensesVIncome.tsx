import React, { useEffect, useState }   from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement, ChartOptions } from 'chart.js';
import { Transaction } from '@/models/transaction';
import transactionsData from '@/data/mock_data.json';
import { Doughnut } from 'react-chartjs-2';
import Switch from '@mui/material/Switch/Switch';


const ExpensesVIncome = () => {

    const [transactions, setTransactions] = useState<typeof Transaction[]>([]);

    const[monthView, setMonthView] = useState(false);

    const currentMonth = new Date().getMonth() + 1;

    const currentYear = new Date().getFullYear();

    useEffect(() => {
    // nahrání mock data
    setTransactions(transactionsData.transactions);
    }, []);

    const types = transactions.map(transaction => transaction.type).filter((value, index, self) => self.indexOf(value)===index);

    let typesTotal = types.map(type => transactions.filter(transaction=> transaction.type === type).
    reduce((sum,transaction) => sum + transaction.amount, 0));

        
    if(monthView) {
        typesTotal = types.map(type => transactions.filter(transaction=> transaction.type === type &&
           transaction.date.substring(5, 7) == currentMonth.toString() &&
           transaction.date.substring(0, 4) == currentYear.toString()).
            reduce((sum,transaction) => sum + transaction.amount, 0));
     }

    const doughnutOptions: ChartOptions<'doughnut'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              usePointStyle: true,
              boxWidth: 20,
              padding: 10,
              color: 'white',
            },
          },
        },
        cutout: '80%',
      }

      const doughnutData = {
        labels: types,
        datasets: [
          {
            label: 'Transactions by type',
            data: typesTotal,
            backgroundColor: ['#D32F2F', '#1976D2','#FBC02D'],
            hoverOffset: 2,
          }
        ],
      };

    return (
        <div>
        <div className='flex items-center'>
          <Switch checked={monthView} onChange={() => setMonthView(!monthView)} />
          <span className="font-title text-sm ml-2 text-white">{monthView ? 'Month View' : 'All Records'}</span>
        </div>
        <div className=''>
        <Doughnut data={doughnutData} options={doughnutOptions} data-aos="fade-up" className=' pt-8 w-32 h-72 flex flex-col items-center' />
      </div>
      </div>
    )
}

export default ExpensesVIncome