import React from 'react'
import { Plus, LayoutDashboard, History, Wallet, CreditCard } from "lucide-react"
import { NavLink } from 'react-router-dom'

export default function Navbar() {
    const navItems = [
        { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { path: "/nueva", label: "Nueva", icon: Plus },
        { path: "/historial", label: "Historial", icon: History },
        { path: "/objetivos", label: "Objetivos", icon: CreditCard },
        { path: "/nuevos-gastos-fijos", label: "Añadir Gasto Fijo", icon: Plus },
        { path: "/gastos-fijos", label: "Gastos Fijos", icon: Wallet },
    ];

    return (
        <nav className='glass-panel p-2 mx-2'>
            <ul className='flex gap-2 justify-evenly items-center'>
                {navItems.map((item) => (
                    <li key={item.path}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${isActive
                                    ? 'bg-blue-600/20 text-blue-400 shadow-lg shadow-blue-500/10'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`
                            }
                        >
                            {item.icon && <item.icon className="h-5 w-5" />}
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
