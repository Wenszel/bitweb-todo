import { getTodoRepository } from "../orm/datasource.js"; 
import { Todo } from "../orm/entity/todo.js"; 

export default {
    async getAllTodos(): Promise<Todo[]> {
        const todoRepository = await getTodoRepository();
        return await todoRepository.find();
    },

    async getTodoById(id: number): Promise<Todo | null> {
        const todoRepository = await getTodoRepository();
        return await todoRepository.findOneBy({ id });
    },

    async createTodo(data: Partial<Todo>): Promise<Todo> {
        const todoRepository = await getTodoRepository();
        const todo = todoRepository.create(data);
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
        const result = await todoRepository.delete(id);
        return result.affected !== 0; 
    }
};