import { useRef } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { addTodo } from '../../graphQLRequests';
import AddIcon from '@mui/icons-material/Add';
import { useBoundStore } from '../../store/boundStore';

export default function AddTodo() {
    const titleRef = useRef<HTMLInputElement>(null);
    const storeAddTodo = useBoundStore(state => state.addTodo);
    const selectedListId = useBoundStore(state => state.selectedList).id;

    const handleAddTodo = async () => {
        const title = titleRef.current?.value;
        if (!title) return;
        try {
            const { id } = await addTodo(title, selectedListId);
            storeAddTodo(title, id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <TextField
                label="Enter todo"
                inputRef={titleRef}
                fullWidth
                sx={{ backgroundColor: 'white', borderRadius: 2, marginRight: 1 }}
            />
            <Button sx={{ flex: 1 }} onClick={() => handleAddTodo()} color="primary" fullWidth>
                <AddIcon />
            </Button>
        </Box>
    );
}
