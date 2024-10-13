import { useEffect, useState } from 'react';
import ToDoList from './components/ToDoList/ToDoList';
import Todo from './interfaces/Todo';
import { getTodoListNames, fetchTodos, fetchNotStandardLists, removeTodoById } from './graphQLRequests';
import NameObject from './interfaces/NameObject';
import AddToDo from './components/AddToDo/AddToDo';
import DrawerLayout from './layout/DrawerLayout';
import ListCollection from './components/ListCollection';

function App() {
    const [todos, setTodos] = useState<Array<Todo>>([]);
    const [lists, setLists] = useState<Array<NameObject>>([]);
    const [selectedList, setSelectedList] = useState<number>(-1);
    const [selectedListName, setSelectedListName] = useState<string>('Inbox');

    const handleListClick = (id: number, name: string) => {
        setSelectedList(id);
        setSelectedListName(name);    
    }

    const fetchingData = async () => {
        let todosData: Todo[];
        switch (selectedList) {
            case -1:
                todosData = await fetchNotStandardLists('Inbox');
                console.log('Fetching Inbox');
                break;
            case -2:
                todosData = await fetchNotStandardLists('Today');
                console.log('Fetching Today');
                break;
            case -3:
                todosData = await fetchNotStandardLists('Week');
                console.log('Fetching Next 7 days');
                break;
            case -4:
                todosData = await fetchNotStandardLists('Important');
                console.log('Fetching Important');
                break;
            default:
                todosData = await fetchTodos(selectedList);
                console.log('Fetching list with id:', selectedList);
                break;
        }
        const listsData: NameObject[] = await getTodoListNames();
        setTodos(todosData);
        setLists(listsData);
    };

    useEffect(() => {
        fetchingData();
    }, [selectedList]);

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
                    drawerContent={<ListCollection lists={lists} handleListClick={handleListClick} />}
                    mainContent={<ToDoList listName={selectedListName} todos={todos} onToggleComplete={onToggleComplete} onDelete={onDelete} />}
                    footerContent={<AddToDo fetchTodos={fetchingData} />}
                />
            </div>
        </>
    );
}

export default App;
