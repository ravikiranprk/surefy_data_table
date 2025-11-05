'use client';

import { Button } from '@mui/material';
import { parseCsv, exportCsv } from '@/app/lib/csv';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';
import { setRows } from '@/app/store/tableSlice';

export default function CsvButtons() {
    const rows = useSelector((s: RootState) => s.table.rows);
    const columns = useSelector((s: RootState) => s.table.columns.filter(c => c.visible).map(c => c.key));
    const dispatch = useDispatch();

    const onImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        const res = await parseCsv(f);
        if (res.errors.length) return alert('CSV parse errors: ' + res.errors.join(', '));
        dispatch(setRows(res.data));
    };

    return (
        <div style={{ display: 'flex', gap: 8 }}>
            <label>
                <input type="file" accept="text/csv" style={{ display: 'none' }} onChange={onImport} />
                <Button variant="contained">Import CSV</Button>
            </label>
            <Button variant="outlined" onClick={() => exportCsv(rows, columns)}>Export CSV</Button>
        </div>
    );
}
