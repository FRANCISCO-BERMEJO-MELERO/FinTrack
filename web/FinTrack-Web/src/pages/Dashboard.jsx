import React from 'react'
import BalanceCards from "../components/dashboard/BalanceCards"
import GastosGraficoCard from "../components/dashboard/GastosGraficoCard"
import UltimasTransaccionesCard from "../components/dashboard/UltimasTransaccionesCard"
import InversionGraficoCard from "../components/dashboard/InversionGraficoCard"
import DistribuciónInversionCard from "../components/dashboard/DistribuciónInversionCard"
import { useDashboardData } from "../hooks/useDashboardData"

export default function Dashboard() {
    const {
        inversiones,
        ingresos,
        gastos,
        transaccionesActuales,
        gastosPorCategoria,
        gastosInversiones,
        balance,
        categorias,
        loading,
        error
    } = useDashboardData();

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error al cargar datos</p>;

    return (
        <div className='flex flex-col gap-4'>
            <BalanceCards ingresos={ingresos} gastos={(-gastos - gastosInversiones)} balance={balance} />
            <div className="flex gap-4">
                <GastosGraficoCard gastos={gastosPorCategoria} />
                <UltimasTransaccionesCard transacciones={transaccionesActuales} categorias={categorias} />
            </div>
            <div className="flex gap-4">
                <InversionGraficoCard inversiones={inversiones} />
                <DistribuciónInversionCard inversiones={inversiones} />
            </div>
        </div>
    )
}
