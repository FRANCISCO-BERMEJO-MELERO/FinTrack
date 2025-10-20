import Header from "./components/global/header"
import Navbar from "./components/global/Navbar"
import Dashboard from "./pages/Dashboard"
import NuevaTransaccion from "./pages/NuevaTransaccion"
import {  useState } from "react"


function App() {
  const [page, setPage] = useState("dashboard");

 


  return (
    <div className="max-w-7xl mx-auto py-6 flex flex-col gap-4">
      <Header />
      <Navbar setPage={setPage} />
      {page === "dashboard" ? <Dashboard setPage={setPage} /> : 
      page === "nueva" ? <NuevaTransaccion /> : 
      page === "historial" ? <p>Historial</p> : 
      page === "gastosFijos" ? <p>GastosFijos</p>: 
      "No hay datos"
      }

      
    </div>
  )
}

export default App
