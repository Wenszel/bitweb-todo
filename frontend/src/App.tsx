import { useEffect, useState } from 'react';
import useDataStore from './store/dataStore'; 
import ToDoList from './components/ToDoList/ToDoList';
import Todo from './interfaces/Todo';
import { getTodoListNames, fetchTodos, fetchNotStandardLists } from './graphQLRequests';
import NameObject from './interfaces/NameObject';
import AddToDo from './components/AddToDo/AddToDo';
import DrawerLayout from './layout/DrawerLayout';
import ListCollection from './components/ListCollection';

function App() {
    const setTodos = useDataStore(state => state.setTodos);
    const setLists = useDataStore(state => state.setLists);
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
        setLists(listsData);
    };

    useEffect(() => {
        fetchingData();
    }, [selectedList]);

    const handleAddListClick = async () => {
        setShowNewList(true);
    };

    return (
        <>
            <div className="App">
                <DrawerLayout
                    drawerContent={
                        <ListCollection
                            showNewList={showNewList}
                            addedListCallback={fetchingData}
                            setShowNewList={setShowNewList}
                            handleListClick={handleListClick}
                            handleAddListClick={handleAddListClick}
                        />
                    }
                    mainContent={
                        <ToDoList listName={selectedListName} />
                    }
                    footerContent={<AddToDo selectedList={selectedList}/>}
                />
            </div>
        </>
    );
}

export default App;
