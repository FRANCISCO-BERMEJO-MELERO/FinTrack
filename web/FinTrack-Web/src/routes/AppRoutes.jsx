import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import NuevaTransaccion from "../pages/NuevaTransaccion";
import NuevosGastoFijo from "../pages/NuevosGastoFijo";
import GastosFijos from "../pages/GastosFijos";
import Historial from "../pages/Historial";
import Objetivos from "../pages/Objetivos";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="nueva" element={<NuevaTransaccion />} />
                <Route path="historial" element={<Historial />} />
                <Route path="objetivos" element={<Objetivos />} />
                <Route path="nuevos-gastos-fijos" element={<NuevosGastoFijo />} />
                <Route path="gastos-fijos" element={<GastosFijos />} />
                <Route path="*" element={<p>No hay datos</p>} />
            </Route>
        </Routes>
    );
}
