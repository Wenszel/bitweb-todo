import { useEffect, useState } from 'react';
import ToDoList from './components/ToDoList/ToDoList';
import Todo from './interfaces/Todo';
import { getTodoListNames, fetchTodos, removeTodoById } from './graphQLRequests';
import NameObject from './interfaces/NameObject';
import AddToDo from './components/AddToDo/AddToDo';
import DrawerLayout from './layout/DrawerLayout';
import ListCollection from './components/ListCollection';

function App() {
    const [todos, setTodos] = useState<Array<Todo>>([]);
    const [lists, setLists] = useState<Array<NameObject>>([]);

    const fetchingData = async () => {
        const todosData: Todo[] = await fetchTodos();
        const listsData: NameObject[] = await getTodoListNames();
        setTodos(todosData);
        setLists(listsData);
    };

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

    const onDelete = async (id: number) => {
        console.log('Deleting todo with id:', id);
        await removeTodoById(id);
        fetchingData();
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
