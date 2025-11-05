import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Row, ColumnDef } from '../types';

type TableState = {
    rows: Row[];
    columns: ColumnDef[];
    search: string;
    sortBy: { key: string | null; dir: 'asc' | 'desc' | null };
    page: number;
};


const initialColumns: ColumnDef[] = [
    { key: 'name', label: 'Name', visible: true },
    { key: 'email', label: 'Email', visible: true },
    { key: 'age', label: 'Age', visible: true },
    { key: 'role', label: 'Role', visible: true },
];


const initialState: TableState = {
    rows: [],
    columns: initialColumns,
    search: '',
    sortBy: { key: null, dir: null },
    page: 0,
};


const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setRows(state, action: PayloadAction<Row[]>) {
            state.rows = action.payload;
        },
        addRow(state, action: PayloadAction<Row>) {
            state.rows.unshift(action.payload);
        },
        updateRow(state, action: PayloadAction<{ id: string; changes: Partial<Row> }>) {
            const idx = state.rows.findIndex(r => r.id === action.payload.id);
            if (idx >= 0) state.rows[idx] = { ...state.rows[idx], ...action.payload.changes };
        },
        deleteRow(state, action: PayloadAction<string>) {
            state.rows = state.rows.filter(r => r.id !== action.payload);
        },
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
            state.page = 0;
        },
        setSort(state, action: PayloadAction<{ key: string; dir: 'asc' | 'desc' }>) {
            state.sortBy = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setColumns(state, action: PayloadAction<ColumnDef[]>) {
            state.columns = action.payload;
        }
    }
});


export const { setRows, addRow, updateRow, deleteRow, setSearch, setSort, setPage, setColumns } = tableSlice.actions;

export default tableSlice.reducer;