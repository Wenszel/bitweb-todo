import { List, Typography, Paper, Box } from '@mui/material';
import Todo from "../../interfaces/Todo"; 
import ToDoElement from '../ToDoElement/ToDoElement';

interface ToDoListProps {
    todos: Todo[];
    onToggleComplete: (id: number) => void;
    onDelete: (id: number) => void;
}

const ToDoList = ({ todos, onToggleComplete, onDelete }: ToDoListProps) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Paper elevation={3} sx={{ width: '100%', maxWidth: 600, p: 2 }}>
                <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
                    My To-Do List
                </Typography>
                <List>
                    {todos.map(todo => (
                        <ToDoElement
                            key={todo.id}
                            todo={todo}
                            onToggleComplete={onToggleComplete}
                            onDelete={onDelete}
                        />
                    ))}
                </List>
            </Paper>
        </Box>
    );
};

export default ToDoList;
