import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TodoList } from './todoLists.js';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;

    @Column()
    completed: boolean;

    @Column({ nullable: true })
    dueTo: string;

    @ManyToOne(() => TodoList, todoList => todoList.todos, {
        cascade: true,
        nullable: true,
    })
    todoList: TodoList;
}
