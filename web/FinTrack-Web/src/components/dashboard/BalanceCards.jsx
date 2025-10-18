import React from 'react'
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';


export default function IngresosGastos({ ingresos, gastos, balance}) {
  
  const cards = [
    {
      titulo: 'Ingresos',
      cantidad: ingresos,
      color: 'text-[#16A34A]',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      icon: TrendingUp,
      iconColor: 'text-[#16A34A]',
    },
    {
      titulo: 'Gastos',
      cantidad: gastos,
      color: 'text-[#DC2626]',
      bgColor: 'bg-red-50 dark:bg-red-950/20',
      icon: TrendingDown,
      iconColor: 'text-[#DC2626]',
    },
    {
      titulo: 'Balance',
      cantidad: balance,
      color: balance >= 0 ? 'text-[#2563EB]' : 'text-[#DC2626]',
      bgColor: balance >= 0 ? 'bg-blue-50 dark:bg-blue-950/20' : 'bg-red-50 dark:bg-red-950/20',
      icon: Wallet,
      iconColor: balance >= 0 ? 'text-[#2563EB]' : 'text-[#DC2626]',
    },
  ];

  
  return (
    <div className="flex gap-4 ">
      {
        cards.map((card, index) => (
          <div key={index} className={`flex flex-col gap-2 border border-neutral-500 rounded-2xl p-4 w-full text-gray-500`}>
            <div className='flex justify-between items-center'>
              <h2>{card.titulo}</h2>
              {
                card.titulo === 'Balance' ? <card.icon className='text-blue-500 bg-blue-500/10 p-1 rounded-full' /> : card.cantidad < 0 ? <card.icon className='text-red-500 bg-red-500/10 p-1 rounded-full' /> : <card.icon className='text-green-500 bg-green-500/10 p-1 rounded-full' />
              }
            </div>
            <span   
            style={{color: card.titulo === 'Balance' ? 'dodgerblue' : card.cantidad < 0 ? 'red' : 'green'}}>
              {card.cantidad}€
            </span>
          </div>
        ))
      }
    </div>
  )
}

{/* <div className='flex flex-col gap-2 border border-neutral-500 rounded-2xl p-4 w-full text-gray-500'>
  <div className='flex justify-between items-center'>
    <h2>{titulo}</h2>
    {
      cantidad < 0 ? <TrendingDown className='text-red-500 bg-red-500/10 p-1 rounded-full' /> : <TrendingUp className='text-green-500 bg-green-500/10 p-1 rounded-full' />
    }
  </div>
  <span   
  style={{color: cantidad < 0 ? 'red' : 'green'}}>
    {cantidad}€
  </span>
</div> */}