/*
    Based on the Drawer example from Material-UI
    https://mui.com/material-ui/react-drawer/#system-ResponsiveDrawer.tsx
*/
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

interface Props {
    drawerContent: React.ReactElement;
    mainContent: React.ReactElement;
    footerContent: React.ReactElement;
}

export default function DrawerLayout({ mainContent, drawerContent, footerContent }: Props) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <IconButton
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    display: { xs: 'block', sm: 'none' }, // Ukryj przycisk na większych ekranach
                }}
            >
                <MenuIcon />
            </IconButton>
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawerContent}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawerContent}
                </Drawer>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` } }}>
                <Box>{mainContent}</Box>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        paddingX: 3,
                        paddingY: 1,
                        width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
                    }}
                >
                    {footerContent}
                </Box>
            </Box>
        </Box>
    );
}
