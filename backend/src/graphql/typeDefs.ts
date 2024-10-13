import { buildSchema } from 'graphql';

export default buildSchema(`#graphql
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    dueTo: String
  }

  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    addTodo(title: String!, dueTo: String): Todo!
    toggleTodoStatus(id: ID!): Todo!
    removeTodoById(id: ID!): Todo!
    addTodoDueDate(id: ID!, dueTo: String!): Todo!
    renameTodo(id: ID!, title: String!): Todo!
  }
`);

