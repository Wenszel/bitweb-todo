import { Repository, Between } from 'typeorm';
import { getTodoRepository, getTodoListRepository } from '../orm/datasource.js';
import { Todo } from '../orm/entity/todo.js';
import { TodoList } from '../orm/entity/todoLists.js';

export default {
    async getAllTodos(): Promise<Todo[]> {
        const todoRepository = await getTodoRepository();
        return await todoRepository.find({ relations: ['todoList'] });
    },

    async getTodoById(id: number): Promise<Todo | null> {
        const todoRepository = await getTodoRepository();
        return await todoRepository.findOneBy({ id });
    },
    async getImportant(): Promise<Todo[]> {
        const todoRepository: Repository<Todo> = await getTodoRepository();
        return await todoRepository.findBy({ important: true });
    },
    async getInbox(): Promise<Todo[]> {
        const todoRepository: Repository<Todo> = await getTodoRepository();
        return todoRepository
            .createQueryBuilder('todo')
            .leftJoinAndSelect('todo.todoList', 'todoList')
            .where('todoList.id IS NULL')
            .getMany();
    },
    async getToday(): Promise<Todo[]> {
        const todoRepository: Repository<Todo> = await getTodoRepository();
        return await todoRepository.findBy({ dueTo: new Date().toISOString().split('T')[0] });
    },
    async getWeek(): Promise<Todo[]> {
        const todoRepository: Repository<Todo> = await getTodoRepository();
        const today = new Date();
        const week = new Date(today);
        week.setDate(today.getDate() + 7);

        return await todoRepository.find({
            where: {
                dueTo: Between(today.toISOString().split('T')[0], week.toISOString().split('T')[0]),
            },
        });
    },
    async createTodo(data: Partial<Todo>, listId: number): Promise<Todo> {
        const todoRepository: Repository<Todo> = await getTodoRepository();
        const listRepository: Repository<TodoList> = await getTodoListRepository();
        const todo: Todo = todoRepository.create(data);
        if (listId && listId >= 0) {
            const list: TodoList = await listRepository.findOne({ where: { id: listId }, relations: ['todos'] });
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
