'use client';

import { AppBar, Toolbar, Typography, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { setSearch } from '@/app/store/tableSlice';


export default function TopBar() {
    const dispatch = useDispatch();
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>Data Table</Typography>
                <div style={{ display: 'flex', alignItems: 'center', background: '#efefef', padding: '2px 8px', borderRadius: 6 }}>
                    <InputBase placeholder="Search…" onChange={(e) => dispatch(setSearch(e.target.value))} />
                    <IconButton><SearchIcon /></IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
}