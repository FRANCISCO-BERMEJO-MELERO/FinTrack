import React from 'react'
import { AlignHorizontalDistributeCenter } from 'lucide-react';


const CATEGORIAS = [
    'Criptomonedas',
    'Bonos',
    'Fundos',
    'Propiedades',
    'Acciones',
    'ETF',
    'Otros'
];

const COLORS = {
    'Criptomonedas': '#EF4444',
    'Bonos': '#F59E0B',
    'Fundos': '#6366F1',
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
        <div className="flex flex-col gap-4 border border-neutral-500 rounded-2xl w-full p-4">
            <h2 className="text-sm text-neutral-400 mb-4 flex items-center gap-2">
                <AlignHorizontalDistributeCenter className="h-5 w-5 text-neutral-600" />
                Distribución de inversiones
            </h2>
            <div className="gap-4 flex flex-col h-[350px] overflow-auto">
                {
                    CATEGORIAS.map((categoria) => {
                        const tipoInversiones = groupedInversiones[categoria] || {};
                        return (
                            <div key={categoria} className="p-4 border border-neutral-500 rounded-lg ">
                                <h3 className="text-sm text-neutral-400 mb-2 w-full flex flex-col ">{categoria}</h3>
                                {
                                    Object.entries(tipoInversiones).map(([tipoInversion, inversiones]) => (
                                        <div key={tipoInversion} className="mb-4 w-full">
                                            <div className="flex flex-col gap-2">
                                                {
                                                    Object.entries(inversiones).map(([activo, cantidad]) => (
                                                        <div key={activo} className="flex items-center gap-2">
                                                            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[categoria] }}></div>
                                                            <p>
                                                                {activo}: {cantidad} €
                                                            </p>
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
