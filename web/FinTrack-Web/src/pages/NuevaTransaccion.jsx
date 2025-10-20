import React from 'react'
import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Save, X } from 'lucide-react'

export default function NuevaTransaccion() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/categorias')
            .then(response => response.json())
            .then(data => setCategorias(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedType, setSelectedType] = useState();
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(selectedType)
        fetch('http://localhost:3000/transacciones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tipo_id: selectedType,
                cantidad: amount,
                categoria_id: selectedCategory,
                fecha: date,
                descripcion: description,
            }),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error fetching categories:', error));
        
    }

    // const comprobarCantidad = () => {
    //     if (amount < 0) {
    //         alert('La cantidad debe ser mayor que 0');
    //         return false;
    //     }
    //     return true;
    // }
    
    return (
        <div className='flex flex-col gap-8 border border-neutral-500 rounded-2xl p-8'>
            <h2 className='text-2xl font-bold text-neutral-300'>Nueva transacción</h2>
            <form  className="space-y-6" onSubmit={handleSubmit}>
                {/* Type Selection */}
                <div className="space-y-3">
                    <label className="text-sm text-neutral-400">Tipo de transacción</label>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <input
                                type="radio"
                                id="income"
                                name="transactionType"
                                value={1}
                                checked={selectedType === 1}
                                onChange={() => setSelectedType(1)}
                                className="sr-only peer"
                            />
                            <label
                                htmlFor="income"
                                className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                    selectedType === 1
                                        ? 'border-green-500 bg-green-500/10'
                                        : 'border-neutral-500 hover:border-neutral-400'
                                }`}
                            >
                                <TrendingUp className={`h-5 w-5 ${
                                    selectedType === 1 ? 'text-green-500' : 'text-neutral-400'
                                }`} />
                                <span className={selectedType === 1 ? 'text-green-500' : 'text-neutral-400'}>
                                    Ingreso
                                </span>
                            </label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="expense"
                                name="transactionType"
                                value={2}
                                checked={selectedType === 2}
                                onChange={() => setSelectedType(2)}
                                className="sr-only peer"
                            />
                            <label
                                htmlFor="expense"
                                className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                    selectedType === 2
                                        ? 'border-red-500 bg-red-500/10'
                                        : 'border-neutral-500 hover:border-neutral-400'
                                }`}
                            >
                                <TrendingDown className={`h-5 w-5 ${
                                    selectedType === 2 ? 'text-red-500' : 'text-neutral-400'
                                }`} />
                                <span className={selectedType === 2 ? 'text-red-500' : 'text-neutral-400'}>
                                    Gasto
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Amount */}
                <div className="space-y-2">
                    <label htmlFor="amount" className="text-sm text-neutral-400">
                        Monto <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="amount"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-4 py-2 bg-neutral-800 border border-neutral-500 rounded-xl text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"
                    />
                </div>

                {/* Category */}
                <div className="space-y-2">
                    <label htmlFor="category" className="text-sm text-neutral-400">
                        Categoría <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-2 bg-neutral-800 border border-neutral-500 rounded-xl text-neutral-200 focus:outline-none focus:border-neutral-400 transition-colors cursor-pointer"
                    >
                        <option value="" className="bg-neutral-800">Selecciona una categoría</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id} className="bg-neutral-800">
                                {categoria.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Date */}
                <div className="space-y-2">
                    <label htmlFor="date" className="text-sm text-neutral-400">
                        Fecha <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-2 bg-neutral-800 border border-neutral-500 rounded-xl text-neutral-200 focus:outline-none focus:border-neutral-400 transition-colors cursor-pointer"
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label htmlFor="description" className="text-sm text-neutral-400">Descripción (opcional)</label>
                    <textarea
                        id="description"
                        placeholder="Añade una nota sobre esta transacción..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 bg-neutral-800 border border-neutral-500 rounded-xl text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors resize-none"
                    />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                    <button
                        type="submit"
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                            selectedType === 1
                                ? 'bg-green-500 hover:bg-green-600 text-white'
                                : selectedType === 2
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-neutral-700 hover:bg-neutral-600 text-white'
                        }`}
                    >
                        <Save className="h-4 w-4" />
                        Guardar transacción
                    </button>
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="flex items-center justify-center gap-2 px-4 py-3 border border-neutral-500 rounded-xl text-neutral-400 hover:bg-neutral-700/50 transition-all duration-300"
                    >
                        <X className="h-4 w-4" />
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    )
}
