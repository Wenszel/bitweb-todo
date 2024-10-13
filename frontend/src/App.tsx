import { useEffect, useState } from 'react';
import ToDoList from './components/ToDoList/ToDoList';
import Todo from './interfaces/Todo';
import { fetchTodos } from './graphQLRequests';
import AddToDo from './components/AddToDo/AddToDo';

function App() {
    const [todos, setTodos] = useState<Array<Todo>>([]);

    const fetchingData = async () => {
        const data = await fetchTodos();
        setTodos(data);
    }

    useEffect(() => {
        fetchingData();
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
                <AddToDo fetchTodos={fetchingData}/>
            </div>
        </>
    );
}

export default App;
