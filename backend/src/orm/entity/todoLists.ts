import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Todo } from './todo.js';

@Entity()
export class TodoList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;

    @OneToMany(() => Todo, todo => todo.todoList)
    todos: Todo[];
}
