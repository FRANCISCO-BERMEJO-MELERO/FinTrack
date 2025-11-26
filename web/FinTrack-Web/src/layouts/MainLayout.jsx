import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="max-w-7xl mx-auto py-6 flex flex-col gap-4">
            <Header />
            <Navbar />
            <Outlet />
        </div>
    );
}
