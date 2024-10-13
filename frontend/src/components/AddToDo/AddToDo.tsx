import { useRef } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { addTodo } from '../../graphQLRequests';

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
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
                padding: 2,
                margin: '0 auto',
                width: '100%',
                boxShadow: 3,
                borderRadius: 2,
            }}
        >
            <TextField label="Title" variant="outlined" inputRef={titleRef} fullWidth placeholder="Title" />
            <Button onClick={() => handleAddTodo()} variant="contained" color="primary" fullWidth>
                Add
            </Button>
        </Box>
    );
}
