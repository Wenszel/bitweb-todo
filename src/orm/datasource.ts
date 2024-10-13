import { DataSource } from "typeorm";
import { Todo } from "./entity/todo.js";

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [Todo],
});

const getTodoRepository = async () => {
    return AppDataSource.getRepository(Todo);
};

export { getTodoRepository, AppDataSource };
