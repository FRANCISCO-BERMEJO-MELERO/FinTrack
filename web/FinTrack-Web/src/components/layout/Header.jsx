import React from 'react'

export default function Header() {
    return (
        <header className="flex justify-between items-center py-4 px-2">
            <div>
                <h1 className="text-3xl font-bold text-gradient tracking-tight">FinTrack</h1>
                <p className='text-sm text-slate-400 font-medium'>Gestión de gastos 100%</p>
            </div>
            <button className='btn-primary'>
                Exportar datos
            </button>
        </header>
    )
}
