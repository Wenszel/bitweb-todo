import { useEffect, useState } from 'react';
import ToDoList from './components/ToDoList/ToDoList';
import Todo from './interfaces/Todo';
import { fetchTodos } from './graphQLRequests';
import AddToDo from './components/AddToDo/AddToDo';
import DrawerLayout from './layout/DrawerLayout';
import ListCollection from './components/ListCollection';

function App() {
    const [todos, setTodos] = useState<Array<Todo>>([]);
    const [lists, setLists] = useState<Array<string>>([]);

    const fetchingData = async () => {
        const data = await fetchTodos();
        setTodos(data);
    };

    useEffect(() => {
        setLists(['Inbox', 'Today', 'Next 7 days']);
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
                <DrawerLayout
                    drawerContent={<ListCollection lists={lists} />}
                    mainContent={<ToDoList listName={'Inbox'} todos={todos} onToggleComplete={onToggleComplete} onDelete={onDelete} />}
                    footerContent={<AddToDo fetchTodos={fetchingData} />}
                />
            </div>
        </>
    );
}

export default App;
