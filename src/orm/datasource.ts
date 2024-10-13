import { DataSource } from "typeorm";

import { Todo } from "./entity/todo.js";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite", 
    synchronize: true, 
    logging: false,
    entities: [Todo],
})