import React from 'react'
import BalanceCards from "../components/dashboard/BalanceCards"
import GastosGraficoCard from "../components/dashboard/GastosGraficoCard"
import UltimasTransaccionesCard from "../components/dashboard/UltimasTransaccionesCard"
import InversionGraficoCard from "../components/dashboard/InversionGraficoCard"
import DistribuciónInversionCard from "../components/dashboard/DistribuciónInversionCard"


import { useEffect, useState, useCallback } from "react"

export default function Dashboard({setPage}) {

    const [transacciones, setTransacciones] = useState([])
    const [inversiones, setInversiones] = useState([])
    const [categorias, setCategorias] = useState([])
    const [ingresos, setIngresos] = useState();
    const [gastos, setGastos] = useState();
    const [gastosPorCategoria, setGastosPorCategoria] = useState([]);
    const [gastosInversiones, setGastosInversiones] = useState();

    // Cargar categorías al montar el componente
    useEffect(() => {
        fetch("http://localhost:3000/categorias")
            .then(response => response.json())
            .then(data => setCategorias(data))
            .catch(error => console.error(error))
    }, []);

    // Cargar transacciones
    useEffect(() => {
        fetch("http://localhost:3000/transacciones")
            .then(response => response.json())
            .then(data => setTransacciones(data))
            .catch(error => console.error(error))
    }, []);

    // Cargar inversiones
    useEffect(() => {
        fetch("http://localhost:3000/transacciones/inversiones")
            .then(response => response.json())
            .then(data => setInversiones(data))
            .catch(error => console.error(error))
    }, []);

    // Funciones de cálculo con useCallback
    const calculateIngresos = useCallback(() => {
        const ingresos = transacciones.filter(t => t.tipo_id === 1).reduce((acc, t) => acc + t.cantidad, 0);
        setIngresos(ingresos);
    }, [transacciones]);

    const calculateGastos = useCallback(() => {
        const gastos = transacciones.filter(t => t.tipo_id === 2 ).reduce((acc, t) => acc + t.cantidad, 0);
        setGastos(gastos);
    }, [transacciones]);

    const calculateGastosInversiones = useCallback(() => {
        const gastos = transacciones.filter(t => t.tipo_id === 2 && t.es_inversion === 1).reduce((acc, t) => acc + t.cantidad, 0);
        setGastosInversiones(gastos);
    }, [transacciones]);

    const calculateGastosPorCategoria = useCallback(() => {
        // Filtrar solo transacciones de tipo gasto (tipo_id === 2)
        const gastosTransacciones = transacciones.filter(t => t.tipo_id === 2);

        // Agrupar por categoria_id y sumar cantidades
        const gastosAgrupados = gastosTransacciones.reduce((acc, t) => {
            const categoria = categorias.find(c => c.id === t.categoria_id);
            const nombreCategoria = categoria ? categoria.name : 'Otros';

            if (!acc[nombreCategoria]) {
                acc[nombreCategoria] = 0;
            }
            acc[nombreCategoria] += t.cantidad;
            return acc;
        }, {});

        // Convertir a array de objetos para el gráfico
        const gastosArray = Object.entries(gastosAgrupados).map(([categoria, cantidad]) => ({
            categoria,
            cantidad
        }));

        setGastosPorCategoria(gastosArray);
    }, [transacciones, categorias]);

    // Calcular valores cuando cambian transacciones o categorías
    useEffect(() => {
        if (transacciones.length > 0 && categorias.length > 0) {
            calculateIngresos();
            calculateGastos();
            calculateGastosInversiones();
            calculateGastosPorCategoria();
        }
    }, [transacciones, categorias, calculateIngresos, calculateGastos, calculateGastosPorCategoria, calculateGastosInversiones]);
    return (
        <div className='flex flex-col gap-4'>
            <BalanceCards ingresos={ingresos} gastos={(-gastos - gastosInversiones)} balance={ingresos - gastos + gastosInversiones} />
            <div className="flex gap-4">
                <GastosGraficoCard gastos={gastosPorCategoria} />
                <UltimasTransaccionesCard transacciones={transacciones} setPage={setPage} />
            </div>
            <div className="flex gap-4">
                <InversionGraficoCard inversiones={inversiones}  />
                <DistribuciónInversionCard inversiones={inversiones} />
            </div>
        </div>
    )
}
