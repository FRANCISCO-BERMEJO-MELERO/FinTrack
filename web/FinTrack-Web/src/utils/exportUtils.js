/**
 * Utility functions for exporting data in different formats
 */

/**
 * Convert array of objects to CSV format
 * @param {Array} data - Array of objects to convert
 * @param {string} filename - Name of the file to download
 */
export const exportToCSV = (data, filename = 'export.csv') => {
    if (!data || data.length === 0) {
        console.warn('No data to export');
        return;
    }

    // Get all unique headers from all objects
    const headers = [...new Set(data.flatMap(obj => Object.keys(obj)))];

    // Create CSV header row
    const csvHeader = headers.join(',');

    // Create CSV data rows
    const csvRows = data.map(row => {
        return headers.map(header => {
            const value = row[header];
            // Handle null/undefined
            if (value === null || value === undefined) return '';
            // Escape quotes and wrap in quotes if contains comma, quote, or newline
            const stringValue = String(value);
            if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
                return `"${stringValue.replace(/"/g, '""')}"`;
            }
            return stringValue;
        }).join(',');
    });

    // Combine header and rows
    const csvContent = [csvHeader, ...csvRows].join('\n');

    // Create blob and download
    downloadFile(csvContent, filename, 'text/csv;charset=utf-8;');
};

/**
 * Export data as JSON file
 * @param {Object|Array} data - Data to export
 * @param {string} filename - Name of the file to download
 */
export const exportToJSON = (data, filename = 'export.json') => {
    if (!data) {
        console.warn('No data to export');
        return;
    }

    const jsonContent = JSON.stringify(data, null, 2);
    downloadFile(jsonContent, filename, 'application/json;charset=utf-8;');
};

/**
 * Helper function to trigger file download
 * @param {string} content - File content
 * @param {string} filename - Name of the file
 * @param {string} mimeType - MIME type of the file
 */
const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

/**
 * Format transaction data for export
 * @param {Object} exportData - Raw export data from API
 * @returns {Object} Formatted data ready for export
 */
export const formatExportData = (exportData) => {
    const { transacciones, categorias, tipos, gastosFijos } = exportData;

    // Create lookup maps for better readability
    const categoriaMap = categorias.reduce((acc, cat) => {
        acc[cat.id] = cat.name;
        return acc;
    }, {});

    const tipoMap = tipos.reduce((acc, tipo) => {
        acc[tipo.id] = tipo.name;
        return acc;
    }, {});

    // Format transactions with readable names
    const formattedTransacciones = transacciones.map(t => ({
        id: t.id,
        tipo: tipoMap[t.tipo_id] || t.tipo_id,
        categoria: categoriaMap[t.categoria_id] || t.categoria_id,
        cantidad: t.cantidad,
        fecha: t.fecha,
        descripcion: t.descripcion || '',
        es_inversion: t.es_inversion ? 'Sí' : 'No',
        tipo_inversion: t.tipo_inversion || '',
        plataforma: t.plataforma || '',
        activo: t.activo || '',
        unidades: t.unidades || '',
        valor_unitario: t.valor_unitario || '',
        moneda: t.moneda || '',
        createdAt: t.createdAt,
        updatedAt: t.updatedAt
    }));

    return {
        transacciones: formattedTransacciones,
        categorias,
        tipos,
        gastosFijos
    };
};
