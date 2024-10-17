import { useEffect } from 'react';
import { useBoundStore } from './store/boundStore';
import ToDoList from './components/ToDoList/ToDoList';
import Todo from './interfaces/Todo';
import { getTodoListNames, fetchTodos, fetchNotStandardLists } from './graphQLRequests';
import NameObject from './interfaces/NameObject';
import AddToDo from './components/AddToDo/AddToDo';
import DrawerLayout from './layout/DrawerLayout';
import ListCollection from './components/ListCollection';

function App() {
    const setTodos = useBoundStore(state => state.setTodos);
    const setLists = useBoundStore(state => state.setLists);
    const selectedListId = useBoundStore(state => state.selectedList).id;

    const fetchData = async () => {
        let todosData: Todo[];
        switch (selectedListId) {
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
                todosData = await fetchTodos(selectedListId);
                break;
        }
        const listsData: NameObject[] = await getTodoListNames();
        setTodos(todosData);
        setLists(listsData);
    };

    useEffect(() => {
        fetchData();
    }, [selectedListId]);

    return (
        <>
            <div className="App">
                <DrawerLayout drawerContent={<ListCollection />} mainContent={<ToDoList />} footerContent={<AddToDo />} />
            </div>
        </>
    );
}

export default App;
