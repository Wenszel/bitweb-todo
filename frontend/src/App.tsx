import { useEffect, useState } from 'react';
import ToDoList from './components/ToDoList/ToDoList';
import Todo from './interfaces/Todo';
import { getTodoListNames, fetchTodos, fetchNotStandardLists, removeTodoById, changeTodoImportants} from './graphQLRequests';
import NameObject from './interfaces/NameObject';
import AddToDo from './components/AddToDo/AddToDo';
import DrawerLayout from './layout/DrawerLayout';
import ListCollection from './components/ListCollection';

function App() {
    const [todos, setTodos] = useState<Array<Todo>>([]);
    const [lists, setLists] = useState<Array<NameObject>>([]);
    const [selectedList, setSelectedList] = useState<number>(-1);
    const [selectedListName, setSelectedListName] = useState<string>('Inbox');
    const [showNewList, setShowNewList] = useState<boolean>(false);

    const handleListClick = (id: number, name: string) => {
        setSelectedList(id);
        setSelectedListName(name);
    };

    const fetchingData = async () => {
        let todosData: Todo[];
        switch (selectedList) {
            case -1:
                todosData = await fetchNotStandardLists('Inbox');
                break;
            case -2:
                todosData = await fetchNotStandardLists('Today');
                break;
            case -3:
                todosData = await fetchNotStandardLists('Week');
                break;
            case -4:
                todosData = await fetchNotStandardLists('Important');
                break;
            default:
                todosData = await fetchTodos(selectedList);
                break;
        }
        const listsData: NameObject[] = await getTodoListNames();
        setTodos(todosData);
        console.log(todosData);
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

    const handleAddListClick = async () => {
        setShowNewList(true);
    };

    const onDelete = async (id: number) => {
        await removeTodoById(id);
        fetchingData();
    };

    const onImportant = async (id: number, important: boolean) => {
        await changeTodoImportants(id, important);
        fetchingData();
    };
    return (
        <>
            <div className="App">
                <DrawerLayout
                    drawerContent={
                        <ListCollection
                            lists={lists}
                            showNewList={showNewList}
                            addedListCallback={fetchingData}
                            setShowNewList={setShowNewList}
                            handleListClick={handleListClick}
                            handleAddListClick={handleAddListClick}
                        />
                    }
                    mainContent={
                        <ToDoList listName={selectedListName} todos={todos} onToggleComplete={onToggleComplete} onDelete={onDelete} onImportant={onImportant} />
                    }
                    footerContent={<AddToDo fetchTodos={fetchingData} selectedList={selectedList}/>}
                />
            </div>
        </>
    );
}

export default App;
