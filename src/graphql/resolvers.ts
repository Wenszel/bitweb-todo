interface ToDoInput {
    title: string;
    dueTo: string | null;
}

export default {
    Query: {
        todos: () => {
            return [
                {
                    id: '1',
                    title: 'Buy milk',
                    completed: false,
                    dueTo: '2020-01-01'
                },
                {
                    id: '2',
                    title: 'Call mom',
                    completed: true,
                    dueTo: '2020-01-02'
                }
            ];
        }
    },
    Mutation: {
        addTodo: (args: ToDoInput) => {
            return {
                id: '3',
                title: args.title,
                completed: false,
                dueTo: args.dueTo
            };
        },
        toggleTodoStatus: (id: number) => {
            return {
                id: id,
                title: 'Buy milk',
                completed: true,
                dueTo: '2020-01-01'
            };
        },
        removeTodoById: (id: number) => {
            return {
                id: id,
                title: 'Buy milk',
                completed: false,
                dueTo: '2020-01-01'
            };
        },
        addTodoDueDate: (id: number) => {
            return {
                id: id,
                title: 'Buy milk',
                completed: false,
                dueTo: "2020-01-01" 
            };
        },
    }
}