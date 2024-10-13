import { useState } from 'react';
import ToDoList from './components/ToDoList/ToDoList';
import Todo from './interfaces/Todo';
function App() {
    const t = [
        { id: 1, title: 'Learn React', completed: false },
        { id: 2, title: 'Learn GraphQL', completed: false },
        { id: 3, title: 'Learn TypeScript', completed: false },
    ];
    const [todos, setTodos] = useState<any>(t);

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
