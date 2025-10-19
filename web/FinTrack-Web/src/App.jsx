import Header from "./components/global/header"
import Navbar from "./components/global/Navbar"
import BalanceCards from "./components/dashboard/BalanceCards"
import GastosGraficoCard from "./components/dashboard/GastosGraficoCard"
import UltimasTransaccionesCard from "./components/dashboard/UltimasTransaccionesCard"

import { useEffect, useState, useCallback } from "react"

function App() {

  const [transacciones, setTransacciones] = useState([])
  const [categorias, setCategorias] = useState([])
  const [ingresos, setIngresos] = useState();
  const [gastos, setGastos] = useState();
  const [gastosPorCategoria, setGastosPorCategoria] = useState([]);


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

  // Funciones de cálculo con useCallback
  const calculateIngresos = useCallback(() => {
    const ingresos = transacciones.filter(t => t.tipo_id === 1).reduce((acc, t) => acc + t.cantidad, 0);
    setIngresos(ingresos);
  }, [transacciones]);

  const calculateGastos = useCallback(() => {
    const gastos = transacciones.filter(t => t.tipo_id === 2).reduce((acc, t) => acc + t.cantidad, 0);
    setGastos(gastos);
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
      calculateGastosPorCategoria();
    }
  }, [transacciones, categorias, calculateIngresos, calculateGastos, calculateGastosPorCategoria]);



  return (
    <div className="max-w-7xl mx-auto py-6 flex flex-col gap-4">
      <Header />
      <Navbar />
      <BalanceCards ingresos={ingresos} gastos={-gastos} balance={ingresos - gastos} />
      <div className="flex gap-4">
        <GastosGraficoCard gastos={gastosPorCategoria} />
        <UltimasTransaccionesCard transacciones={transacciones} />
      </div>

      
    </div>
  )
}

export default App
