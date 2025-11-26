import React, { useState, useEffect, useMemo } from 'react'
import { History, Search, Filter, TrendingUp, TrendingDown, Calendar, X } from 'lucide-react'
import { getCategories, getTransactions } from '../services/api'

export default function Historial() {
    const [transacciones, setTransacciones] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all'); // all, income, expense, investment
    const [filterCategory, setFilterCategory] = useState('all');
    const [sortBy, setSortBy] = useState('date-desc'); // date-desc, date-asc, amount-desc, amount-asc

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [transData, catsData] = await Promise.all([
                    getTransactions(),
                    getCategories()
                ]);
                setTransacciones(transData);
                setCategorias(catsData);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filter and sort transactions
    const filteredTransactions = useMemo(() => {
        let filtered = [...transacciones];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(t =>
                t.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.activo?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Type filter
        if (filterType !== 'all') {
            if (filterType === 'income') {
                filtered = filtered.filter(t => t.tipo_id === 1);
            } else if (filterType === 'expense') {
                filtered = filtered.filter(t => t.tipo_id === 2);
            } else if (filterType === 'investment') {
                filtered = filtered.filter(t => t.tipo_id === 3);
            }
        }

        // Category filter
        if (filterCategory !== 'all') {
            filtered = filtered.filter(t => t.categoria_id === parseInt(filterCategory));
        }

        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'date-desc':
                    return new Date(b.fecha) - new Date(a.fecha);
                case 'date-asc':
                    return new Date(a.fecha) - new Date(b.fecha);
                case 'amount-desc':
                    return b.cantidad - a.cantidad;
                case 'amount-asc':
                    return a.cantidad - b.cantidad;
                default:
                    return 0;
            }
        });

        return filtered;
    }, [transacciones, searchTerm, filterType, filterCategory, sortBy]);

    const clearFilters = () => {
        setSearchTerm('');
        setFilterType('all');
        setFilterCategory('all');
        setSortBy('date-desc');
    };

    const hasActiveFilters = searchTerm || filterType !== 'all' || filterCategory !== 'all' || sortBy !== 'date-desc';

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const getCategoryName = (categoryId) => {
        return categorias.find(c => c.id === categoryId)?.name || 'Sin categoría';
    };

    const getTypeLabel = (tipoId) => {
        if (tipoId === 1) return 'Ingreso';
        if (tipoId === 2) return 'Gasto';
        if (tipoId === 3) return 'Inversión';
        return 'Desconocido';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <p className="text-slate-400">Cargando historial...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="glass-panel p-6">
                <div className="flex items-center gap-3 mb-6">
                    <History className="h-6 w-6 text-blue-400" />
                    <h1 className="text-2xl font-bold text-gradient">Historial de Transacciones</h1>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar transacción..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                    </div>

                    {/* Type Filter */}
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-slate-800"
                    >
                        <option value="all">Todos los tipos</option>
                        <option value="income">Ingresos</option>
                        <option value="expense">Gastos</option>
                        <option value="investment">Inversiones</option>
                    </select>

                    {/* Category Filter */}
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-slate-800"
                    >
                        <option value="all">Todas las categorías</option>
                        {categorias.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-slate-800"
                    >
                        <option value="date-desc">Fecha (más reciente)</option>
                        <option value="date-asc">Fecha (más antigua)</option>
                        <option value="amount-desc">Cantidad (mayor)</option>
                        <option value="amount-asc">Cantidad (menor)</option>
                    </select>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="mt-4 flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="h-4 w-4" />
                        Limpiar filtros
                    </button>
                )}

                {/* Results count */}
                <p className="mt-4 text-sm text-slate-400">
                    Mostrando {filteredTransactions.length} de {transacciones.length} transacciones
                </p>
            </div>

            {/* Transactions List */}
            <div className="glass-panel">
                {filteredTransactions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <History className="h-16 w-16 text-slate-600 mb-4" />
                        <p className="text-slate-400 text-center">
                            {transacciones.length === 0
                                ? 'No hay transacciones registradas'
                                : 'No se encontraron transacciones con los filtros aplicados'
                            }
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {filteredTransactions.map((transaccion) => (
                            <div
                                key={transaccion.id}
                                className="p-4 hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    {/* Left side - Icon and details */}
                                    <div className="flex items-center gap-4 flex-1">
                                        {/* Icon */}
                                        <div className={`p-3 rounded-xl ${transaccion.tipo_id === 1
                                                ? 'bg-green-500/10'
                                                : transaccion.tipo_id === 3
                                                    ? 'bg-blue-500/10'
                                                    : 'bg-red-500/10'
                                            }`}>
                                            {transaccion.tipo_id === 1 ? (
                                                <TrendingUp className="h-5 w-5 text-green-400" />
                                            ) : (
                                                <TrendingDown className={`h-5 w-5 ${transaccion.tipo_id === 3 ? 'text-blue-400' : 'text-red-400'
                                                    }`} />
                                            )}
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-medium text-slate-200 truncate">
                                                    {transaccion.descripcion || 'Sin descripción'}
                                                </h3>
                                                {transaccion.es_inversion === 1 && transaccion.activo && (
                                                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-md border border-blue-500/30">
                                                        {transaccion.activo}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                                <span className="bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                                                    {getCategoryName(transaccion.categoria_id)}
                                                </span>
                                                <span>•</span>
                                                <Calendar className="h-3 w-3" />
                                                <span>{formatDate(transaccion.fecha)}</span>
                                                {transaccion.plataforma && (
                                                    <>
                                                        <span>•</span>
                                                        <span>{transaccion.plataforma}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right side - Amount */}
                                    <div className="text-right">
                                        <p className={`text-lg font-semibold ${transaccion.tipo_id === 1
                                                ? 'text-green-400'
                                                : transaccion.tipo_id === 3
                                                    ? 'text-blue-400'
                                                    : 'text-red-400'
                                            }`}>
                                            {transaccion.tipo_id === 1 ? '+' : '-'} {transaccion.cantidad}€
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {getTypeLabel(transaccion.tipo_id)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
