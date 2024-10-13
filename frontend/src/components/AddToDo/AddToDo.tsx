import { useRef } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { addTodo } from '../../graphQLRequests';
import AddIcon from '@mui/icons-material/Add';

interface AddTodoProps {
    fetchTodos: () => Promise<void>;
}

export default function AddTodo({ fetchTodos }: AddTodoProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const dueToRef = useRef<HTMLInputElement>(null);

    const handleAddTodo = async () => {
        const title = titleRef.current?.value;
        if (!title) return;
        const dueTo = dueToRef.current?.value;
        await addTodo(title, dueTo);
        fetchTodos();
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <TextField label="Enter todo" inputRef={titleRef} fullWidth />
            <Button sx={{ flex: 1 }} onClick={() => handleAddTodo()} color="primary" fullWidth>
                <AddIcon />
            </Button>
        </Box>
    );
}
