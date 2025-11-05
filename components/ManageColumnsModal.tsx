'use client';

import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControlLabel, Checkbox } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';
import { setColumns } from '@/app/store/tableSlice';

export default function ManageColumnsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const columns = useSelector((s: RootState) => s.table.columns);
    const dispatch = useDispatch();
    const [local, setLocal] = useState(columns);

    useEffect(() => setLocal(columns), [columns]);

    const toggle = (key: string) => {
        setLocal(prev => prev.map(c => c.key === key ? { ...c, visible: !c.visible } : c));
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Manage Columns</DialogTitle>
            <DialogContent>
                {local.map(c => (
                    <div key={c.key}>
                        <FormControlLabel control={<Checkbox checked={c.visible} onChange={() => toggle(c.key)} />} label={c.label} />
                    </div>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={() => { dispatch(setColumns(local)); onClose(); }} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
}