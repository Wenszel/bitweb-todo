import { buildSchema } from 'graphql';

export default buildSchema(`#graphql
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    dueTo: String
  }

  type TodoList {
    id: ID!
    name: String!
    todos: [Todo!]!  
  }

  type NameObject {
    id: ID!
    name: String!
  }

  type Query {
    listNames: [NameObject!]!
    todosByListId(listId: ID!): [Todo!]!
    getInbox: [Todo!]!
    getToday: [Todo!]!
    getWeek: [Todo!]!
    getImportant: [Todo!]!
    todos: [TodoWithList!]!
  }

  type TodoWithList {
    id: ID!
    title: String!
    completed: Boolean!
    dueTo: String
    todoList: TodoList
  }

  type Mutation {
    addList(name: String!): TodoList!
    addTodo(title: String!, listId: ID!): Todo!
    toggleTodoStatus(id: ID!): Todo!
    removeTodoById(id: ID!): Boolean!
    addTodoDueDate(id: ID!, dueTo: String!): Todo!
    renameTodo(id: ID!, title: String!): Todo!
  }
`);
