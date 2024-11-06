import React, { useEffect, useState } from 'react'
import { WalletIcon, CurrencyDollarIcon, BanknotesIcon, CreditCardIcon } from '@heroicons/react/24/solid';
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions, ArcElement } from 'chart.js';
import transactionsData from '@/data/mock_data.json';
import LineChart from '@/components/charts/LineChart';
import DoughnutChart from './charts/DoughnutChart';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {

  //KPIs:

  const totalExpenses = transactionsData.transactions.filter(transaction => transaction.type === "expense")
  .reduce((sum, transaction) => sum+ transaction.amount, 0);

  const totalIncome = transactionsData.transactions.filter(transaction => transaction.type === "income")
  .reduce((sum, transaction) => sum+ transaction.amount, 0);

  const balance = totalIncome - totalExpenses;

  const investment = transactionsData.transactions.filter(transaction => transaction.type === "Savings & Investment")
  .reduce((sum, transaction) => sum + transaction.amount, 0);

  //-------------------------------------------------------------------------------------

  return (
    <div className='bg-[#1c1c1e] relative w-full h-screen overflow-y-scroll p-5'>
      <div className='dashboard-main'> Dashboard </div>
      <div className='grid grid-cols-4 gap-3 pt-5 w-3/4'>
        <div className='dashboard-kpi' data-aos="fade-right">
          <WalletIcon className="kpi-icons" />
            <div className='kpi-name'>
              Balance
            </div>
          <div className='dashboard-figures'>
            {balance}$
          </div>
        </div>
        <div className='dashboard-kpi' data-aos="fade-right">
          <CurrencyDollarIcon className="kpi-icons" />
          <div className='kpi-name'>
            Income
          </div>
          <div className='dashboard-figures'>
            {totalIncome}$
          </div>
        </div>
        <div className='dashboard-kpi' data-aos="fade-right">
          <CreditCardIcon className="kpi-icons" />
          <div className='kpi-name'>
            Expenses
          </div>
          <div className='dashboard-figures'>
            {totalExpenses}$
          </div>
        </div>
        <div className='dashboard-kpi' data-aos="fade-right">
          <BanknotesIcon className="kpi-icons" />
          <div className='kpi-name'>
            Savings & Investment
          </div>
          <div className='dashboard-figures'>
            {investment}$
          </div>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-5 w-3/4'>
      <div className='dashboard-lineplot' data-aos="fade-down">
        <LineChart/>
      </div>
      <div className='dashboard-lineplot' data-aos="fade-down">
        <DoughnutChart/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;