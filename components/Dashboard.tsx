import React, { useEffect, useState } from 'react'
import { WalletIcon, CurrencyDollarIcon, BanknotesIcon, CreditCardIcon } from '@heroicons/react/24/solid';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions, ArcElement } from 'chart.js';
import transactionsData from '@/data/mock_data.json';
import LineChart from '@/components/charts/LineChart';
import DoughnutChart from './charts/DoughnutChart';
import notificationData from '@/data/mock_data_notification.json';
import {Notification} from '@/models/notification';
import DashboardNotifications from './DashboardNotifications';


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
      <p className='dashboard-main'> Dashboard </p>
      
      {/* Hlavní grid pro dlaždice */}
      <div className='grid grid-cols-5 gap-3 w-full'>
        {/* Levá část - KPIs a grafy */}
        <div className='col-span-4 grid grid-cols-4 gap-3'>
          {/* KPI dlaždice */}
          <div className='dashboard-kpi' data-aos="fade-right">
            <WalletIcon className="kpi-icons" />
            <div className='kpi-name pt-6'>
              Balance
            </div>
            <div className='dashboard-figures'>
              {balance}$
            </div>
          </div>
          <div className='dashboard-kpi' data-aos="fade-right">
            <CurrencyDollarIcon className="kpi-icons" />
            <div className='kpi-name pt-6'>
              Income
            </div>
            <div className='dashboard-figures'>
              {totalIncome}$
            </div>
          </div>
          <div className='dashboard-kpi' data-aos="fade-right">
            <CreditCardIcon className="kpi-icons" />
            <div className='kpi-name pt-6'>
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
          {/* Pravá dlaždice pro připomínky následujících transakcí */}
          <DashboardNotifications/>
          {/* Grafy */}
          <div className='dashboard-plots col-span-2' data-aos="fade-down">
            <LineChart />
          </div>
          <div className='dashboard-plots col-span-2' data-aos="fade-down">
            <DoughnutChart />
          </div>
          </div>
          </div>
  )
}

export default Dashboard;