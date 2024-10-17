import { useRef } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { addTodo } from '../../graphQLRequests';
import AddIcon from '@mui/icons-material/Add';

interface AddTodoProps {
    selectedList: number;
    fetchTodos: () => Promise<void>;
}

export default function AddTodo({ selectedList, fetchTodos }: AddTodoProps) {
    const titleRef = useRef<HTMLInputElement>(null);

    const handleAddTodo = async () => {
        const title = titleRef.current?.value;
        if (!title) return;
        await addTodo(title, selectedList);
        await fetchTodos();
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
