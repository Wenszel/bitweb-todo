import { useEffect, useRef } from 'react';
import { useBoundStore } from '../../store/boundStore';
import { List, ListItem, Box } from '@mui/material';

export interface ContextMenuAction {
    action: string;
    handler: (...args: any[]) => void | Promise<void>;
}

interface ContextMenuProps {
    actions: ContextMenuAction[];
}

export default function ContextMenu({ actions }: ContextMenuProps) {
    const xContextMenu = useBoundStore(state => state.xContextMenu);
    const yContextMenu = useBoundStore(state => state.yContextMenu);

    const isOpen = useBoundStore(state => state.showContextMenu);
    const setVisibility = useBoundStore(state => state.setShowContextMenu);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setVisibility(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <Box
            ref={menuRef}
            style={{
                position: 'absolute',
                top: yContextMenu,
                left: xContextMenu,
                zIndex: 1000,
                backgroundColor: 'white',
                borderRadius: '4px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            <List>
                {actions.map(({ action, handler }) => (
                    <ListItem
                        key={action}
                        onClick={handler}
                        sx={{
                            cursor: 'pointer',
                            borderBottom: '1px solid #f0f0f0',
                            '&:hover': { bgcolor: '#f0f0f0' },
                        }}
                    >
                        {action}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
