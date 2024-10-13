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
    return AppDataSource.getRepository(Todo);
};

const getTodoListRepository = async () => {
    return AppDataSource.getRepository(TodoList);
}

export { getTodoRepository, getTodoListRepository, AppDataSource };
