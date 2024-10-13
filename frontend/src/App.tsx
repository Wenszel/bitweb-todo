import { useEffect, useState } from 'react';
import ToDoList from './components/ToDoList/ToDoList';
import Todo from './interfaces/Todo';
import { fetchTodos } from './graphQLRequests';

function App() {
    const [todos, setTodos] = useState<Array<Todo>>([]);
    
    useEffect(() => {
        fetchTodos().then(todos => setTodos(todos));
    }, []);

    const onToggleComplete = (id: number) => {
        setTodos(
            todos.map((todo: Todo) =>
                todo.id == id
                    ? {
                          ...todo,
                          completed: !todo.completed,
                      }
                    : todo,
            ),
        );
    };

    const onDelete = (id: number) => {
        setTodos(todos.filter((todo: Todo) => todo.id !== id));
    };

    return (
        <>
            <div className="App">
                <ToDoList todos={todos} onToggleComplete={onToggleComplete} onDelete={onDelete} />
            </div>
        </>
    );
}

export default App;
