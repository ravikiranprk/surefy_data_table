import Papa from 'papaparse';
import { Row } from '../types';
import { saveAs } from 'file-saver';

export function parseCsv(file: File): Promise<{ data: Row[]; errors: string[] }> {
    return new Promise((resolve) => {
        const errors: string[] = [];
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete(results) {
                const data = (results.data as any[]).map((r, i) => ({ id: r.id ?? `${Date.now()}-${i}`, ...r })) as Row[];
                resolve({ data, errors });
            },
            error(err) {
                errors.push(err.message);
                resolve({ data: [], errors });
            }
        });
    });
}


export function exportCsv(rows: Row[], columns: string[], filename = 'export.csv') {
    const header = columns;
    const data = rows.map(r => columns.map(c => (r[c] ?? '')));
    const csv = [header.join(','), ...data.map(d => d.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))].join('');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
}