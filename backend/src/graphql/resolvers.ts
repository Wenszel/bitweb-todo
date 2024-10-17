import todoService from '../service/todoService.js';
import todoListService from '../service/todoListService.js';

export default {
    Query: {
        todos: () => {
            return todoService.getAllTodos();
        },
        todosByListId: (_, { listId }) => {
            return todoListService.todoListById(listId);
        },
        listNames: () => {
            return todoListService.getAllNames();
        },
        getInbox: () => {
            return todoService.getInbox();
        },
        getToday: () => {
            return todoService.getToday();
        },
        getWeek: () => {
            return todoService.getWeek();
        },
        getImportant: () => {
            return todoService.getImportant();
        },
    },
    Mutation: {
        addList: async (_, { name }) => {
            return await todoListService.createList(name);
        },
        addTodo: async (_, { title, listId }) => {
            return await todoService.createTodo(
                {
                    title,
                    completed: false,
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
