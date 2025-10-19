import React from 'react'
import { History, Plus } from 'lucide-react'
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { useState, useEffect } from 'react';


export default function HistorialCard({ transacciones }) {

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/categorias')
      .then(response => response.json())
      .then(data => setCategorias(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div className='flex flex-col gap-4 border border-neutral-500 rounded-2xl w-full'>
      <div className='flex items-center justify-between p-4'>
        <div className='flex items-center gap-2'>
          <History className="h-5 w-5 text-neutral-600" />
          <h2 className="text-sm text-neutral-400">Últimas transacciones</h2>
        </div>
        <button className='flex items-center gap-2 hover:bg-neutral-700/50 text-white py-1 px-2 rounded-xl transition-all duration-500 hover:cursor-pointer'>
          <Plus className="h-5 w-5 text-neutral-600" />
          Añadir
        </button>
      </div>

      {
        transacciones.length !== 0 ? (
          <div className="h-[350px] overflow-y-auto px-4 pb-4">
            <div className="flex flex-col gap-4">
              {
                transacciones.map((transaccion, index) => (
                  <div key={index} className="flex items-center justify-between px-4 py-2 bg-neutral-500/10 rounded-xl overflow-hidden">
                    <div className='flex items-center gap-2'>
                      {
                        transaccion.tipo_id === 1 ? (
                          <TrendingUp className="h-6 w-6 text-green-500 bg-green-500/10 p-1 rounded-full" />
                        ) : (
                          <TrendingDown className="h-6 w-6 text-red-500 bg-red-500/10 p-1 rounded-full" />
                        )
                      }
                      <div className="flex flex-col gap-1 items-start">
                        <span>{transaccion.descripcion}</span>
                        <span className="text-sm text-neutral-400 border border-neutral-500 rounded-xl px-2  bg-neutral-800">{categorias.find(c => c.id === transaccion.categoria_id).name}</span>
                      </div>
                    </div>
                    {
                      transaccion.tipo_id === 1 ? (
                        <span className="text-sm text-green-500">+ {transaccion.cantidad}€</span>
                      ) : (
                        <span className="text-sm text-red-500">- {transaccion.cantidad}€</span>
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
              <History className="h-12 w-12 text-neutral-600 mx-auto mb-2" />
              <span className="text-sm text-neutral-400">No hay transacciones registradas</span>
            </div>
          </div>
        )
      }
    </div>
  )
}
