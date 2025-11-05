'use client';
import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TableSortLabel, TablePagination, IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';
import { setSort, setPage, deleteRow, updateRow } from '@/app/store/tableSlice';
import { useState, useMemo } from 'react';

export default function DataTable() {
    const { rows, columns, search, sortBy, page } = useSelector((s: RootState) => s.table);
    const dispatch = useDispatch();
    const rowsPerPage = 10;
    const [editing, setEditing] = useState<null | any>(null);

    const filtered = useMemo(() => {
        const q = (search || '').toLowerCase();
        let out = rows.filter(r => {
            return columns.filter(c => c.visible).some(col => String((r as any)[col.key] ?? '').toLowerCase().includes(q));
        });
        if (sortBy.key) {
            out = out.slice().sort((a, b) => {
                const ak = (a as any)[sortBy.key!];
                const bk = (b as any)[sortBy.key!];
                if (ak == null) return 1; if (bk == null) return -1;
                if (ak === bk) return 0;
                const res = ak > bk ? 1 : -1;
                return sortBy.dir === 'asc' ? res : -res;
            });
        }
        return out;
    }, [rows, columns, search, sortBy]);

    const pageSlice = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const onRequestSort = (key: string) => {
        const dir = sortBy.key === key && sortBy.dir === 'asc' ? 'desc' : 'asc';
        dispatch(setSort({ key, dir }));
    };

    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.filter(c => c.visible).map(c => (
                            <TableCell key={c.key}>
                                <TableSortLabel active={sortBy.key === c.key} direction={(sortBy.key === c.key ? sortBy.dir : 'asc') ?? 'asc'} onClick={() => onRequestSort(c.key)}>
                                    {c.label}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pageSlice.map(row => (
                        <TableRow key={row.id}>
                            {columns.filter(c => c.visible).map(c => (
                                <TableCell key={c.key}>{String((row as any)[c.key] ?? '')}</TableCell>
                            ))}
                            <TableCell>
                                <IconButton onClick={() => setEditing(row)}><EditIcon /></IconButton>
                                <IconButton onClick={() => { if (confirm('Delete?')) dispatch(deleteRow(row.id)); }}><DeleteIcon /></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination component="div" count={filtered.length} page={page} onPageChange={(e, p) => dispatch(setPage(p))} rowsPerPage={rowsPerPage} rowsPerPageOptions={[10]} />
        </Paper>
    );
}