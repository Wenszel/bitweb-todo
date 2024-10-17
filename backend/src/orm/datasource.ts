import { DataSource } from "typeorm";
import { Todo } from "./entity/todo.js";
import { TodoList } from "./entity/todoLists.js";

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [Todo, TodoList],
});

const getTodoRepository = async () => {
    const repository = AppDataSource.getRepository(Todo);
    return repository; 
};

const getTodoListRepository = async () => {
    return AppDataSource.getRepository(TodoList);
}

export { getTodoRepository, getTodoListRepository, AppDataSource };
