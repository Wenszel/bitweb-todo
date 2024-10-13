import todoService from '../service/todoService.js';

export default {
    Query: {
        todos: () => {
            return todoService.getAllTodos();
        },
    },
    Mutation: {
        addTodo: async (_, {title, dueTo}) => {
            return await todoService.createTodo({
                title,
                completed: false,
                dueTo,
            });
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
