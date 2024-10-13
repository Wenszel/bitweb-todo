import { Repository } from 'typeorm';
import { getTodoRepository, getTodoListRepository } from '../orm/datasource.js';
import { Todo } from '../orm/entity/todo.js';
import { TodoList } from '../orm/entity/todoLists.js';

export default {
    async getAllTodos(): Promise<Todo[]> {
        const todoRepository = await getTodoRepository();
        return await todoRepository.find();
    },

    async getTodoById(id: number): Promise<Todo | null> {
        const todoRepository = await getTodoRepository();
        return await todoRepository.findOneBy({ id });
    },

    async createTodo(data: Partial<Todo>, listId: number|undefined): Promise<Todo> {
        const todoRepository: Repository<Todo> = await getTodoRepository();
        const listRepository: Repository<TodoList> = await getTodoListRepository();
        const todo: Todo = todoRepository.create(data);
        if (listId) {
            const list: TodoList = await listRepository.findOneBy({ id: listId });
            todo.todoList = list;
            list.todos.push(todo);
        }
        return await todoRepository.save(todo);
    },

    async updateTodo(id: number, data: Partial<Todo>): Promise<Todo | null> {
        const todoRepository = await getTodoRepository();
        const todo = await todoRepository.findOneBy({ id });

        if (!todo) {
            return null;
        }

        Object.assign(todo, data);
        return await todoRepository.save(todo);
    },

    async deleteTodo(id: number): Promise<boolean> {
        const todoRepository = await getTodoRepository();
        const todo: Todo = await todoRepository.findOneBy({ id: id });
        if (!todo) {
            return false;
        }
        if (todo.todoList) {
            todo.todoList.todos = todo.todoList.todos.filter(t => t.id !== id);
        }
        const result = await todoRepository.delete(id);
        return result.affected === 1;
    },
};
