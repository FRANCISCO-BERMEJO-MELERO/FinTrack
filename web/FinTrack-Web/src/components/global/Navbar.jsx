import React from 'react'
import {Plus} from "lucide-react"

export default function Navbar() {
    return (
        <nav className='py-2 bg-neutral-600 rounded-2xl'>
            <ul className='flex gap-4 justify-evenly'>
                <li className='hover:cursor-pointer hover:scale-110 transition-all duration-300'>Dashboard</li>
                <li className='hover:cursor-pointer hover:scale-110 transition-all duration-300 flex items-center gap-1'> <Plus className="h-5 w-5 text-neutral-200" /> Nueva</li>
                <li className='hover:cursor-pointer hover:scale-110 transition-all duration-300'>Historial</li>
                <li className='hover:cursor-pointer hover:scale-110 transition-all duration-300'>Gastos Fijos</li>
            </ul>
        </nav>
    )
}
