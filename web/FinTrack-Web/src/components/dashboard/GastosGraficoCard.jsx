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
    // Convertir objeto a array si es necesario
    let data = [];

    if (Array.isArray(gastos)) {
        // Si es un array
        data = gastos.map((item, index) => {
            if (typeof item === 'number') {
                return { name: `Item ${index + 1}`, value: item };
            }
            return item;
        });
    } else if (gastos && typeof gastos === 'object') {
        // Si es un objeto, convertirlo a array de objetos
        data = Object.entries(gastos).map(([categoria, cantidad]) => ({
            categoria,
            cantidad
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
            const { name, value, color } = payload[0].payload;
            return (
                <div className="bg-neutral-800 p-3 rounded-lg shadow-lg border border-neutral-700">
                    <p className="text-sm text-neutral-100">
                        {name}
                    </p>
                    <p className="text-sm" style={{ color }}>
                        {formatCurrency(value)}
                    </p>
                </div>
            );
        }
        return null;
    }

    return (
        <div className="flex flex-col gap-4 border border-neutral-500 rounded-2xl w-full">
            <div className='flex items-center gap-2 p-4'>
                <PieChartIcon className="h-5 w-5 text-neutral-600" />
                <h2 className="text-sm text-neutral-400" >
                    Gastos
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
                                    labelLine={false}
                                    outerRadius="80%"
                                    fill="#8884d8"
                                    dataKey="cantidad"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.categoria]} name={entry.categoria} value={entry.cantidad} color={CATEGORY_COLORS[entry.categoria]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    formatter={(value) => (
                                        <span className="text-sm text-neutral-400">
                                            {value}
                                        </span>
                                    )}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="h-[300px] flex items-center justify-center">
                        <div className="text-center">
                            <PieChartIcon className="h-12 w-12 text-neutral-600 mx-auto mb-2" />
                            <p className="text-sm text-neutral-400">
                                No hay gastos registrados
                            </p>
                        </div>
                    </div>
                )}
        </div>
    )
}
