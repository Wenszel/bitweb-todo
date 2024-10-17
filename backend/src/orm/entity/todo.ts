import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TodoList } from './todoLists.js';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;

    @Column({ default: false, nullable: false })
    completed: boolean;

    @Column({ nullable: true })
    dueTo: string;

    @Column({ default: false, nullable: false })
    important: boolean;

    @ManyToOne(() => TodoList, todoList => todoList.todos, {
        cascade: true,
        nullable: true,
    })
    todoList: TodoList;
}
