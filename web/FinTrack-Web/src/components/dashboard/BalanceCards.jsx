import React from 'react'
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';


export default function IngresosGastos({ ingresos, gastos, balance }) {

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
      color: balance >= 0 ? 'text-blue-400' : 'text-red-400',
      bgColor: balance >= 0 ? 'bg-blue-500/10' : 'bg-red-500/10',
      icon: Wallet,
      iconColor: balance >= 0 ? 'text-blue-400' : 'text-red-400',
    },
  ];

  return (
    <div className="flex gap-4 ">
      {
        cards.map((card, index) => (
          <div key={index} className={`flex flex-col gap-2 glass-panel p-4 w-full text-slate-400 hover:scale-105 transition-transform duration-300`}>
            <div className='flex justify-between items-center'>
              <h2 className="font-medium text-slate-300">{card.titulo}</h2>
              {
                card.titulo === 'Balance' ? <card.icon className='text-blue-400 bg-blue-500/10 p-1 rounded-full h-8 w-8' /> : card.cantidad < 0 ? <card.icon className='text-red-400 bg-red-500/10 p-1 rounded-full h-8 w-8' /> : <card.icon className='text-green-400 bg-green-500/10 p-1 rounded-full h-8 w-8' />
              }
            </div>
            <span
              className="text-2xl font-bold"
              style={{ color: card.titulo === 'Balance' ? '#60a5fa' : card.cantidad < 0 ? '#f87171' : '#4ade80' }}>
              {typeof card.cantidad === 'number' ? card.cantidad.toFixed(2) + '€' : '--'}
            </span>
          </div>
        ))
      }
    </div>
  )
}