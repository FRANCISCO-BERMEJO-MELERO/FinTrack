import React, { useState } from 'react'
import { Download, ChevronDown } from 'lucide-react'
import { exportAllData } from '../../services/api'
import { exportToCSV, exportToJSON, formatExportData } from '../../utils/exportUtils'

export default function Header() {
    const [isExporting, setIsExporting] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const handleExport = async (format) => {
        try {
            setIsExporting(true);
            setShowMenu(false);

            // Fetch all data from API
            const data = await exportAllData();

            // Format data for better readability
            const formattedData = formatExportData(data);

            // Generate filename with current date
            const date = new Date().toISOString().split('T')[0];
            const filename = `fintrack_export_${date}`;

            if (format === 'csv') {
                // Export transactions as CSV (main data)
                exportToCSV(formattedData.transacciones, `${filename}_transacciones.csv`);

                // Optionally export other data
                if (formattedData.gastosFijos.length > 0) {
                    exportToCSV(formattedData.gastosFijos, `${filename}_gastos_fijos.csv`);
                }
            } else if (format === 'json') {
                // Export all data as single JSON file
                exportToJSON(formattedData, `${filename}.json`);
            }

        } catch (error) {
            console.error('Error al exportar datos:', error);
            alert('Error al exportar datos. Por favor, intenta de nuevo.');
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <header className="flex justify-between items-center py-4 px-2">
            <div>
                <h1 className="text-3xl font-bold text-gradient tracking-tight">FinTrack</h1>
                <p className='text-sm text-slate-400 font-medium'>Gestión de gastos 100%</p>
            </div>

            <div className="relative">
                <button
                    className='btn-primary flex items-center gap-2'
                    onClick={() => setShowMenu(!showMenu)}
                    disabled={isExporting}
                >
                    <Download className="h-4 w-4" />
                    {isExporting ? 'Exportando...' : 'Exportar datos'}
                    <ChevronDown className={`h-4 w-4 transition-transform ${showMenu ? 'rotate-180' : ''}`} />
                </button>

                {showMenu && (
                    <div className="absolute right-0 mt-2 w-48 glass-panel border border-white/10 rounded-lg shadow-lg z-10">
                        <button
                            className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-white/5 transition-colors rounded-t-lg"
                            onClick={() => handleExport('csv')}
                        >
                            Exportar como CSV
                        </button>
                        <button
                            className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-white/5 transition-colors rounded-b-lg border-t border-white/5"
                            onClick={() => handleExport('json')}
                        >
                            Exportar como JSON
                        </button>
                    </div>
                )}
            </div>
        </header>
    )
}
