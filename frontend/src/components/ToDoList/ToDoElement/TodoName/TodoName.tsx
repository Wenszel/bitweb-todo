import { renameTodo as databaseRenameTodo } from '../../../../graphQLRequests';
import EnterText from '../../../EnterText/EnterText';
import Todo from '../../../../interfaces/Todo';
import { useBoundStore } from '../../../../store/boundStore';

interface TodoNameProps {
    todo: Todo;
}

export default function TodoName({ todo }: TodoNameProps) {
    const modifyingTodo: Todo | null = useBoundStore(state => state.modifyingTodo);
    const modifyingTodoName: boolean = useBoundStore(state => state.modifyTodoName);
    const setModifyingTodoName = useBoundStore(state => state.setModifyTodoName);
    const setModifyingTodo = useBoundStore(state => state.setModifyingTodo);

    const renameTodo = useBoundStore(state => state.renameTodo);
    return modifyingTodoName && modifyingTodo === todo ? (
        <EnterText
            defaultValue={todo.title}
            close={() => {
                setModifyingTodo(null);
                setModifyingTodoName(false);
            }}
            submit={async (text: string) => {
                try {
                    await databaseRenameTodo(todo.id, text);
                    renameTodo(todo.id, text);
                } catch (error) {
                    console.error(error);
                }
            }}
        />
    ) : (
        todo.title
    );
}
