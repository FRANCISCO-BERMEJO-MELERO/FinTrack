import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { PieChart as PieChartIcon } from 'lucide-react';

const CATEGORY_COLORS = {
    'Comida': '#EF4444',
    'Transporte': '#F59E0B',
    'Compras': '#6366F1',
    'Entretenimiento': '#EC4899',
    'Salud': '#10B981',
    'Educacion': '#3B82F6',
    'Servicios': '#14B8A6',
    'Otros': '#6B7280',
};

export default function GastosGraficoCard({ gastos }) {
    // Convertir y mapear datos para asegurar que tienen todas las propiedades necesarias
    let data = [];

    if (Array.isArray(gastos)) {
        // Si es un array, mapear para agregar propiedades necesarias
        data = gastos.map((item) => {
            if (typeof item === 'object' && item.categoria && item.cantidad !== undefined) {
                return {
                    name: item.categoria,
                    categoria: item.categoria,
                    cantidad: item.cantidad,
                    value: item.cantidad,
                    color: CATEGORY_COLORS[item.categoria] || '#6B7280'
                };
            } else if (typeof item === 'number') {
                return { name: `Item`, value: item, cantidad: item, color: '#6B7280' };
            }
            return item;
        });
    } else if (gastos && typeof gastos === 'object') {
        // Si es un objeto, convertirlo a array de objetos
        data = Object.entries(gastos).map(([categoria, cantidad]) => ({
            name: categoria,
            categoria,
            cantidad,
            value: cantidad,
            color: CATEGORY_COLORS[categoria] || '#6B7280'
        }));
    }

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const categoria = data.categoria || data.name;
            const cantidad = data.cantidad || data.value;
            const color = data.color || CATEGORY_COLORS[categoria];

            return (
                <div className="bg-neutral-800 p-3 rounded-lg shadow-lg border border-neutral-700">
                    <p className="text-sm text-neutral-100">
                        {categoria}
                    </p>
                    <p className="text-sm" style={{ color }}>
                        {formatCurrency(cantidad)}
                    </p>
                </div>
            );
        }
        return null;
    }

    return (
        <div className="flex flex-col gap-4 glass-panel w-full">
            <div className='flex items-center gap-2 p-4 border-b border-white/5'>
                <PieChartIcon className="h-5 w-5 text-slate-400" />
                <h2 className="text-sm font-medium text-slate-300" >
                    Gastos por Categoría
                </h2>
            </div>
            {
                data.length !== 0 ? (
                    <div className="w-full h-[350px] flex items-center justify-center pb-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="cantidad"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.categoria]} stroke="rgba(0,0,0,0)" />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    formatter={(value, entry, index) => (
                                        <span className="text-sm text-slate-400">
                                            {data[index].categoria}
                                        </span>
                                    )}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="h-[300px] flex items-center justify-center">
                        <div className="text-center">
                            <PieChartIcon className="h-12 w-12 text-slate-600 mx-auto mb-2" />
                            <p className="text-sm text-slate-400">
                                No hay gastos registrados
                            </p>
                        </div>
                    </div>
                )}
        </div>
    )
}
