import Header from "./components/global/header"
import Navbar from "./components/global/Navbar"
import Dashboard from "./pages/Dashboard"
import NuevaTransaccion from "./pages/NuevaTransaccion"
import {  useState, useEffect } from "react"
import NuevosGastoFijo from "./pages/NuevosGastoFijo"
import GastosFijos from "./pages/GastosFijos"


function App() {
  const [page, setPage] = useState("dashboard");

  useEffect(() => {
    fetch("http://localhost:3000/gastosFijos/sincronizar");
  }, []);



  return (
    <div className="max-w-7xl mx-auto py-6 flex flex-col gap-4">
      <Header />
      <Navbar setPage={setPage} />
      {page === "dashboard" ? <Dashboard setPage={setPage} /> : 
      page === "nueva" ? <NuevaTransaccion /> : 
      page === "historial" ? <p>Historial</p> : 
      page === "NuevosGastosFijos" ? <NuevosGastoFijo />:
      page === "gastosFijos" ? <GastosFijos />:
      
      "No hay datos"
      }

      
    </div>
  )
}

export default App
