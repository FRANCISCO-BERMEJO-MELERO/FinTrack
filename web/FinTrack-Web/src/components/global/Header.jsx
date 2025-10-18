import React from 'react'

export default function Header() {
    return (
        <header className="flex justify-between items-center">
            <div>
                <h1>FinTack</h1>
                <p className='text-sm text-gray-500'>Gestión de gatos 100%</p>
            </div>
            <button className='bg-blue-500 text-white px-4 py-2 rounded'>
                Exportar datos
            </button>
        </header>
    )
}
