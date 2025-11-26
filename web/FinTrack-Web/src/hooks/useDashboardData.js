import { useState, useEffect, useCallback } from "react";
import { getCategories, getBalance, getTransactions, getInvestments } from "../services/api";

export const useDashboardData = () => {
    const [inversiones, setInversiones] = useState([]);
    const [ingresos, setIngresos] = useState(0);
    const [gastos, setGastos] = useState(0);
    const [transaccionesActuales, setTransaccionesActuales] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [gastosPorCategoria, setGastosPorCategoria] = useState([]);
    const [gastosInversiones, setGastosInversiones] = useState(0);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [catsData, balanceData, transData, invData] = await Promise.all([
                    getCategories(),
                    getBalance(),
                    getTransactions(),
                    getInvestments()
                ]);

                setCategorias(catsData);
                setBalance(balanceData.total);
                setTransaccionesActuales(transData);
                setInversiones(invData);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const calculateIngresos = useCallback(() => {
        return transaccionesActuales
            .filter(t => t.tipo_id === 1)
            .reduce((acc, t) => acc + t.cantidad, 0);
    }, [transaccionesActuales]);

    const calculateGastos = useCallback(() => {
        return transaccionesActuales
            .filter(t => t.tipo_id === 2)
            .reduce((acc, t) => acc + t.cantidad, 0);
    }, [transaccionesActuales]);

    const calculateGastosInversiones = useCallback(() => {
        return transaccionesActuales
            .filter(t => t.es_inversion === 1)
            .reduce((acc, t) => acc + t.cantidad, 0);
    }, [transaccionesActuales]);

    const calculateGastosPorCategoria = useCallback(() => {
        const gastostransaccionesActuales = transaccionesActuales.filter(t => t.tipo_id === 2);
        const gastosAgrupados = gastostransaccionesActuales.reduce((acc, t) => {
            const categoria = categorias.find(c => c.id === t.categoria_id);
            const nombreCategoria = categoria ? categoria.name : 'Otros';

            if (!acc[nombreCategoria]) {
                acc[nombreCategoria] = 0;
            }
            acc[nombreCategoria] += t.cantidad;
            return acc;
        }, {});

        return Object.entries(gastosAgrupados).map(([categoria, cantidad]) => ({
            categoria,
            cantidad
        }));
    }, [transaccionesActuales, categorias]);

    useEffect(() => {
        if (transaccionesActuales.length > 0 && categorias.length > 0) {
            setIngresos(calculateIngresos());
            setGastos(calculateGastos());
            setGastosInversiones(calculateGastosInversiones());
            setGastosPorCategoria(calculateGastosPorCategoria());
        }
    }, [transaccionesActuales, categorias, calculateIngresos, calculateGastos, calculateGastosInversiones, calculateGastosPorCategoria]);

    return {
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
    };
};
