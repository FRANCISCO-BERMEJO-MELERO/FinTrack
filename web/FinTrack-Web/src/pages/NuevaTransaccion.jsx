import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, LineChart, Save, X } from "lucide-react";

export default function NuevaTransaccion() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/categorias")
            .then((res) => res.json())
            .then((data) => setCategorias(data))
            .catch((err) => console.error("Error fetching categories:", err));
    }, []);

    // Campos básicos
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedType, setSelectedType] = useState();
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    // Campos de inversión
    const [isInvestment, setIsInvestment] = useState(false);
    const [tipoInversion, setTipoInversion] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [activo, setActivo] = useState("");
    const [unidades, setUnidades] = useState("");
    const [valorUnitario, setValorUnitario] = useState("");
    const [moneda, setMoneda] = useState("USD");

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = isInvestment
            ? "http://localhost:3000/transacciones/inversion"
            : "http://localhost:3000/transacciones";

        const body = {
            tipo_id: selectedType,
            cantidad: amount,
            categoria_id: selectedCategory,
            fecha: date,
            descripcion: description,
            ...(isInvestment && {
                es_inversion: 1,
                tipo_inversion: tipoInversion,
                plataforma,
                activo,
                unidades,
                valor_unitario: valorUnitario,
                moneda,
            }),
        };

        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("✅ Guardado:", data);
                alert(isInvestment ? "Inversión registrada" : "Transacción registrada");
            })
            .catch((err) => console.error("❌ Error:", err));
    };

    return (
        <div className="flex flex-col gap-8 border border-neutral-500 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-neutral-300">
                Nueva transacción
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Selector de tipo de transacción */}
                <div className="space-y-3">
                    <label className="text-sm text-neutral-400">
                        Tipo de transacción
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                        {/* Ingreso */}
                        <div>
                            <input
                                type="radio"
                                id="income"
                                name="transactionType"
                                value={1}
                                checked={selectedType === 1 && !isInvestment}
                                onChange={() => {
                                    setSelectedType(1);
                                    setIsInvestment(false);
                                }}
                                className="sr-only peer"
                            />
                            <label
                                htmlFor="income"
                                className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedType === 1 && !isInvestment
                                        ? "border-green-500 bg-green-500/10"
                                        : "border-neutral-500 hover:border-neutral-400"
                                    }`}
                            >
                                <TrendingUp
                                    className={`h-5 w-5 ${selectedType === 1 && !isInvestment
                                            ? "text-green-500"
                                            : "text-neutral-400"
                                        }`}
                                />
                                <span
                                    className={
                                        selectedType === 1 && !isInvestment
                                            ? "text-green-500"
                                            : "text-neutral-400"
                                    }
                                >
                                    Ingreso
                                </span>
                            </label>
                        </div>

                        {/* Gasto */}
                        <div>
                            <input
                                type="radio"
                                id="expense"
                                name="transactionType"
                                value={2}
                                checked={selectedType === 2 && !isInvestment}
                                onChange={() => {
                                    setSelectedType(2);
                                    setIsInvestment(false);
                                }}
                                className="sr-only peer"
                            />
                            <label
                                htmlFor="expense"
                                className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedType === 2 && !isInvestment
                                        ? "border-red-500 bg-red-500/10"
                                        : "border-neutral-500 hover:border-neutral-400"
                                    }`}
                            >
                                <TrendingDown
                                    className={`h-5 w-5 ${selectedType === 2 && !isInvestment
                                            ? "text-red-500"
                                            : "text-neutral-400"
                                        }`}
                                />
                                <span
                                    className={
                                        selectedType === 2 && !isInvestment
                                            ? "text-red-500"
                                            : "text-neutral-400"
                                    }
                                >
                                    Gasto
                                </span>
                            </label>
                        </div>

                        {/* Inversión */}
                        <div>
                            <input
                                type="radio"
                                id="investment"
                                name="transactionType"
                                value={3}
                                checked={isInvestment}
                                onChange={() => {
                                    setIsInvestment(true);
                                    setSelectedType(3);
                                }}
                                className="sr-only peer"
                            />
                            <label
                                htmlFor="investment"
                                className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${isInvestment
                                        ? "border-blue-500 bg-blue-500/10"
                                        : "border-neutral-500 hover:border-neutral-400"
                                    }`}
                            >
                                <LineChart
                                    className={`h-5 w-5 ${isInvestment ? "text-blue-500" : "text-neutral-400"
                                        }`}
                                />
                                <span
                                    className={isInvestment ? "text-blue-500" : "text-neutral-400"}
                                >
                                    Inversión
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Monto */}
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
                        className="w-full px-4 py-2 bg-neutral-800 border border-neutral-500 rounded-xl text-neutral-200 focus:outline-none focus:border-neutral-400 transition-colors"
                    />
                </div>

                {/* Categoría */}
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
                        <option value="">Selecciona una categoría</option>
                        {categorias.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Fecha */}
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

                {/* Campos adicionales si es inversión */}
                {isInvestment && (
                    <div className="space-y-4 border-t border-neutral-600 pt-4">
                        <h3 className="text-neutral-300 font-medium">
                            Detalles de inversión
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-neutral-400">Tipo</label>
                                <select
                                    id="tipoInversion"
                                    value={tipoInversion}
                                    onChange={(e) => setTipoInversion(e.target.value)}
                                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-500 rounded-xl text-neutral-200 focus:outline-none focus:border-neutral-400 transition-colors cursor-pointer"
                                >
                                    <option value="">Selecciona un tipo</option>
                                    <option value="Criptomonedas">Criptomonedas</option>
                                    <option value="Bonos">Bonos</option>
                                    <option value="Fundos">Fundos</option>
                                    <option value="Propiedades">Propiedades</option>
                                    <option value="Acciones">Acciones</option>
                                    <option value="ETF">ETF</option>
                                    <option value="Otros">Otros</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm text-neutral-400">Plataforma</label>
                                <input
                                    type="text"
                                    placeholder="Binance, Degiro..."
                                    value={plataforma}
                                    onChange={(e) => setPlataforma(e.target.value)}
                                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-500 rounded-xl text-neutral-200 focus:border-neutral-400"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-neutral-400">Activo</label>
                                <input
                                    type="text"
                                    placeholder="BTC, AAPL, SP500..."
                                    value={activo}
                                    onChange={(e) => setActivo(e.target.value)}
                                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-500 rounded-xl text-neutral-200 focus:border-neutral-400"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-neutral-400">Unidades</label>
                                <input
                                    type="number"
                                    step="0.0001"
                                    placeholder="0.00"
                                    value={unidades}
                                    onChange={(e) => setUnidades(e.target.value)}
                                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-500 rounded-xl text-neutral-200 focus:border-neutral-400"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-neutral-400">
                                    Valor unitario
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="Precio por unidad"
                                    value={valorUnitario}
                                    onChange={(e) => setValorUnitario(e.target.value)}
                                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-500 rounded-xl text-neutral-200 focus:border-neutral-400"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-neutral-400">Moneda</label>
                                <input
                                    type="text"
                                    placeholder="USD, EUR..."
                                    value={moneda}
                                    onChange={(e) => setMoneda(e.target.value)}
                                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-500 rounded-xl text-neutral-200 focus:border-neutral-400"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Descripción */}
                <div className="space-y-2">
                    <label
                        htmlFor="description"
                        className="text-sm text-neutral-400"
                    >
                        Descripción (opcional)
                    </label>
                    <textarea
                        id="description"
                        placeholder="Añade una nota..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 bg-neutral-800 border border-neutral-500 rounded-xl text-neutral-200 focus:border-neutral-400 resize-none"
                    />
                </div>

                {/* Botones */}
                <div className="flex gap-3 pt-4">
                    <button
                        type="submit"
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${isInvestment
                                ? "bg-blue-500 hover:bg-blue-600 text-white"
                                : selectedType === 1
                                    ? "bg-green-500 hover:bg-green-600 text-white"
                                    : selectedType === 2
                                        ? "bg-red-500 hover:bg-red-600 text-white"
                                        : "bg-neutral-700 hover:bg-neutral-600 text-white"
                            }`}
                    >
                        <Save className="h-4 w-4" />
                        {isInvestment ? "Guardar inversión" : "Guardar transacción"}
                    </button>

                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="flex items-center justify-center gap-2 px-4 py-3 border border-neutral-500 rounded-xl text-neutral-400 hover:bg-neutral-700/50 transition-all"
                    >
                        <X className="h-4 w-4" />
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}
