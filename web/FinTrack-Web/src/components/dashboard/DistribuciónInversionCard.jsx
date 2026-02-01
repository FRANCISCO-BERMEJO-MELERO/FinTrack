import React from 'react'
import { AlignHorizontalDistributeCenter } from 'lucide-react';


const CATEGORIAS = [
    'Criptomonedas',
    'Bonos',
    'Fondos',
    'Propiedades',
    'Acciones',
    'ETF',
    'Otros'
];

const COLORS = {
    'Criptomonedas': '#EF4444',
    'Bonos': '#F59E0B',
    'Fondos': '#6366F1',
    'Propiedades': '#10B981',
    'Acciones': '#3B82F6',
    'ETF': '#EC4899',
    'Otros': '#6B7280',
};

export default function DistribuciónInversionCard({ inversiones }) {
    const groupedInversiones = inversiones.reduce((acc, inversion) => {
        const categoria = acc[inversion.tipo_inversion] || {};
        const tipoInversion = categoria[inversion.categoria] || {};
        tipoInversion[inversion.activo] = tipoInversion[inversion.activo] || 0;
        tipoInversion[inversion.activo] += inversion.cantidad;
        categoria[inversion.categoria] = tipoInversion;
        acc[inversion.tipo_inversion] = categoria;
        return acc;
    }, {});

    return (
        <div className="flex flex-col gap-4 glass-panel w-full p-4">
            <h2 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
                <AlignHorizontalDistributeCenter className="h-5 w-5 text-slate-400" />
                Distribución de inversiones
            </h2>
            <div className="gap-4 flex flex-col h-[350px] overflow-auto custom-scrollbar pr-2">
                {
                    CATEGORIAS.map((categoria) => {
                        const tipoInversiones = groupedInversiones[categoria] || {};
                        return (
                            <div key={categoria} className="p-4 bg-white/5 rounded-xl border border-white/5">
                                <h3 className="text-sm font-medium text-slate-300 mb-3 w-full flex flex-col ">{categoria}</h3>
                                {
                                    Object.entries(tipoInversiones).map(([tipoInversion, inversiones]) => (
                                        <div key={tipoInversion} className="mb-2 w-full last:mb-0">
                                            <div className="flex flex-col gap-2">
                                                {
                                                    Object.entries(inversiones).map(([activo, cantidad]) => (
                                                        <div key={activo} className="flex items-center justify-between text-sm">
                                                            <div className="flex items-center gap-2">
                                                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[categoria] }}></div>
                                                                <span className="text-slate-400">{activo}</span>
                                                            </div>
                                                            <span className="font-medium text-slate-200">{cantidad} €</span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
