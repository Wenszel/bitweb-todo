import { TodoList } from "../orm/entity/todoLists.js";
import { Todo } from "../orm/entity/todo.js";
import { getTodoListRepository } from "../orm/datasource.js";
import { Repository } from "typeorm";

interface NameObject {
    id: number;
    name: string;
}

export default {
    async createList(name: string): Promise<TodoList> {
        const todoListRepository: Repository<TodoList> = await getTodoListRepository();
        const todoList: TodoList = new TodoList();
        todoList.title = name;
        return await todoListRepository.save(todoList);
    },
    async getAllNames(): Promise<NameObject[]> {
        const todoListRepository: Repository<TodoList> = await getTodoListRepository();
        const todoLists: TodoList[] = await todoListRepository.find();
        return todoLists.map((todoList) => ({
            id: todoList.id,
            name: todoList.title,
        }));
    },
    async todosByListName(listName: string): Promise<Todo[]> {
        const todoListRepository: Repository<TodoList> = await getTodoListRepository();
        const todoList: TodoList = await todoListRepository.findOneBy({ title: listName });
        return todoList.todos;
    }
}