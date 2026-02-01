import React from 'react'
import { History, Plus } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function HistorialCard({ transacciones, categorias }) {

  return (
    <div className='flex flex-col gap-4 glass-panel w-full'>
      <div className='flex items-center justify-between p-4 border-b border-white/5'>
        <div className='flex items-center gap-2'>
          <History className="h-5 w-5 text-slate-400" />
          <h2 className="text-sm font-medium text-slate-300">Últimas transacciones</h2>
        </div>
        <Link to="/nueva" className='flex items-center gap-2 hover:bg-white/10 text-slate-300 hover:text-white py-1 px-3 rounded-xl transition-all duration-300 hover:cursor-pointer text-sm font-medium'>
          <Plus className="h-4 w-4" />
          Añadir
        </Link>
      </div>

      {
        transacciones.length !== 0 ? (
          <div className="h-[350px] overflow-y-auto px-4 pb-4 custom-scrollbar">
            <div className="flex flex-col gap-3">
              {
                transacciones.map((transaccion, index) => (
                  <div key={index} className="flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors rounded-xl overflow-hidden border border-white/5">
                    <div className='flex items-center gap-3'>
                      {
                        transaccion.tipo_id === 1 ? (
                          <TrendingUp className="h-8 w-8 text-green-400 bg-green-500/10 p-1.5 rounded-full" />
                        ) : transaccion.tipo_id === 3 ? (
                          <TrendingDown className="h-8 w-8 text-blue-400 bg-blue-500/10 p-1.5 rounded-full" />
                        ) : (
                          <TrendingDown className="h-8 w-8 text-red-400 bg-red-500/10 p-1.5 rounded-full" />
                        )
                      }
                      <div className="flex flex-col gap-0.5 items-start">
                        <span className="font-medium text-slate-200">{transaccion.descripcion}</span>
                        <span className="text-xs text-slate-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">{categorias.find(c => c.id === transaccion.categoria_id)?.name || 'Sin categoría'}</span>
                      </div>
                    </div>
                    {
                      transaccion.tipo_id === 1 ? (
                        <span className="font-medium text-green-400">+ {transaccion.cantidad}€</span>
                      ) : transaccion.tipo_id === 3 ? (
                        <span className="font-medium text-blue-400">- {transaccion.cantidad}€</span>
                      ) : (
                        <span className="font-medium text-red-400">- {transaccion.cantidad}€</span>
                      )
                    }
                  </div>
                ))
              }
            </div>
          </div>
        ) : (
          <div className="h-[350px] flex items-center justify-center pb-4">
            <div className="text-center">
              <History className="h-12 w-12 text-slate-600 mx-auto mb-2" />
              <span className="text-sm text-slate-400">No hay transacciones registradas</span>
            </div>
          </div>
        )
      }
    </div>
  )
}
