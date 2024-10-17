import { Entity, Column, PrimaryGeneratedColumn, OneToMany, AfterLoad, AfterInsert, AfterUpdate } from 'typeorm';
import { Todo } from './todo.js';

@Entity()
export class TodoList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @OneToMany(() => Todo, todo => todo.todoList)
    todos: Todo[];

    @AfterLoad()
    @AfterInsert()
    @AfterUpdate()
    async undefinedTodosArrayCheck() {
        if (!this.todos) {
            this.todos = [];
        }
    }
}
