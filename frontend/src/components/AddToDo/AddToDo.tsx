import { useRef } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { addTodo } from '../../graphQLRequests';
import AddIcon from '@mui/icons-material/Add';
import { useBoundStore } from '../../store/boundStore';

interface AddTodoProps {
    selectedList: number;
}

export default function AddTodo({ selectedList }: AddTodoProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const storeAddTodo = useBoundStore(state => state.addTodo);

    const handleAddTodo = async () => {
        const title = titleRef.current?.value;
        if (!title) return;
        try {
            await addTodo(title, selectedList);
            storeAddTodo(title);
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
