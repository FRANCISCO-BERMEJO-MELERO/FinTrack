import React from 'react'
import {Plus} from "lucide-react"

export default function Navbar({ setPage }) {
    return (
        <nav className='py-2 bg-neutral-600 rounded-2xl'>
            <ul className='flex gap-4 justify-evenly'>
                <li className='hover:cursor-pointer hover:scale-110 transition-all duration-300' onClick={() => setPage("dashboard")}>Dashboard</li>
                <li className='hover:cursor-pointer hover:scale-110 transition-all duration-300 flex items-center gap-1' onClick={() => setPage("nueva")}> <Plus className="h-5 w-5 text-neutral-200" /> Nueva</li>
                <li className='hover:cursor-pointer hover:scale-110 transition-all duration-300' onClick={() => setPage("historial")}>Historial</li>
                <li className='hover:cursor-pointer hover:scale-110 transition-all duration-300' onClick={() => setPage("gastosFijos")}>Gastos Fijos</li>
            </ul>
        </nav>
    )
}
