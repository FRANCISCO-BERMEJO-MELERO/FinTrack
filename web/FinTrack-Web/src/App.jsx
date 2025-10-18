import Header from "./components/global/header"
import Navbar from "./components/global/Navbar"
import BalanceCards from "./components/dashboard/BalanceCards"

function App() {

  return (
    <div className="max-w-7xl mx-auto py-6 flex flex-col gap-4">
      <Header />
      <Navbar />
      <BalanceCards ingresos={1000} gastos={-1000} balance={0} />
      
    </div>
  )
}

export default App
