'use client';

import { useEffect, useState } from 'react';
import TopBar from '../components/TopBar';
import DataTable from '../components/DataTable';
import ManageColumnsModal from '../components/ManageColumnsModal';
import CsvButtons from '../components/CsvButtons';
import { mockUsers } from './data/mockUsers';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { setRows } from './store/tableSlice';

export default function Home() {
    const dispatch = useDispatch();
    const rows = useSelector((s: RootState) => s.table.rows);

    useEffect(() => {
        if (rows.length === 0) dispatch(setRows(mockUsers));
    }, [rows.length, dispatch]);

    dispatch(setRows(mockUsers));

    const [openCols, setOpenCols] = useState(false);
    return (
        <main className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
            <TopBar />
            <div className="mt-6 flex justify-between items-center">
                <CsvButtons />
                <div>
                    <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => setOpenCols(true)}>Manage Columns</button>
                </div>
            </div>
            <div className="mt-6">
                <DataTable />
            </div>
            <ManageColumnsModal
                open={openCols}
                onClose={() => setOpenCols(false)}
            />
        </main>
    );
}