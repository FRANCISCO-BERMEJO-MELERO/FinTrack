import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { PieChart as PieChartIcon } from 'lucide-react';

const CATEGORY_COLORS = {
    'Criptomonedas': '#EF4444',
    'Bonos': '#F59E0B',
    'Fondos': '#6366F1',
    'Propiedades': '#10B981',
    'Acciones': '#3B82F6',
    'ETF': '#EC4899',
    'Otros': '#6B7280',
};


export default function InversionGraficoCard({ inversiones }) {

    // Unir transacciones del mismo activo en un objeto
    let data = {};

    inversiones.forEach((inversion) => {
        const { tipo_inversion, cantidad } = inversion;
        if (data[tipo_inversion]) {
            data[tipo_inversion].cantidad += cantidad;
            data[tipo_inversion].value += cantidad;
        } else {
            data[tipo_inversion] = {
                name: tipo_inversion,
                tipo_inversion,
                cantidad: cantidad,
                value: cantidad,
                color: CATEGORY_COLORS[tipo_inversion] || '#6B7280'
            };
        }
    });

    // Convertir objeto a array
    data = Object.values(data);

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
            const tipoInversion = data.tipo_inversion || data.name;
            const cantidad = data.cantidad || data.value;
            const color = data.color || CATEGORY_COLORS[tipoInversion];

            return (
                <div className="bg-neutral-800 p-3 rounded-lg shadow-lg border border-neutral-700">
                    <p className="text-sm text-neutral-100">
                        {tipoInversion}
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
                    Inversiones
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
                                        <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.tipo_inversion]} stroke="rgba(0,0,0,0)" />
                                    ))}
                                </Pie>
                                <Tooltip content={(props) => <CustomTooltip {...props} />} />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    formatter={(value, entry, index) => (
                                        <span className="text-sm text-slate-400">
                                            {data[index].tipo_inversion}
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
                                No hay inversiones registrados
                            </p>
                        </div>
                    </div>
                )}
        </div>
    )
}
