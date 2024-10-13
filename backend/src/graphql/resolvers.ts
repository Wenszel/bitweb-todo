import todoService from '../service/todoService.js';
import todoListService from '../service/todoListService.js';

export default {
    Query: {
        todos: () => {
            return todoService.getAllTodos();
        },
        todosByListName: (_, { listName }) => {
            return todoListService.todosByListName(listName);
        },
        listNames: () => {
            return todoListService.getAllNames();
        },
    },
    Mutation: {
        addList: async (_, { name }) => {
            return await todoListService.createList(name);
        },
        addTodo: async (_, { title, dueTo, listId }) => {
            return await todoService.createTodo(
                {
                    title,
                    completed: false,
                    dueTo,
                },
                listId,
            );
        },
        toggleTodoStatus: async (_, { id }) => {
            return await todoService.updateTodo(id, { completed: true });
        },
        removeTodoById: async (_, { id }) => {
            return await todoService.deleteTodo(id);
        },
        addTodoDueDate: async (_, { id }) => {
            return await todoService.updateTodo(id, { dueTo: '2021-12-31' });
        },
        renameTodo: async (_, { id, title }) => {
            return await todoService.updateTodo(id, { title });
        },
    },
};
