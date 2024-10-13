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
    todosByListName(listName: String!): [Todo!]!
    todos: [Todo!]!
  }

  type Mutation {
    addList(name: String!): TodoList!
    addTodo(title: String!, dueTo: String): Todo!
    toggleTodoStatus(id: ID!): Todo!
    removeTodoById(id: ID!): Boolean!
    addTodoDueDate(id: ID!, dueTo: String!): Todo!
    renameTodo(id: ID!, title: String!): Todo!
  }
`);
