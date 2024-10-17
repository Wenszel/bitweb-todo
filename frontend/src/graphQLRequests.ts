function graphQLFetch(query: string) {
    return fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
        }),
    });
}

export async function fetchTodos(listId: number) {
    const query = `
          query {
            todosByListId(listId: ${listId}) {
              id
              title
              completed
              important
              dueTo
            }
          }
        `;

    const response = await graphQLFetch(query);
    const result = await response.json();
    return result.data.todosByListId;
}

export async function fetchNotStandardLists(type: string) {
    const query = `
            query {
                get${type} {
                id
                title
                completed
                dueTo
                }
    }`;
    const response = await graphQLFetch(query);
    const result = await response.json();
    return result.data[`get${type}`];
}

export async function changeImportance(id: number, important: boolean) {
    const query = `
        mutation {
          updateTodo(id: ${id}, data: {important: ${important}}) {
            id
            title
            completed
            dueTo
            important
          }
        }`;
    const response = await graphQLFetch(query);
    const result = await response.json();
    return result.data.updateTodo;
}

export async function changeCompletedStatus(id: number, completed: boolean) {
    const query = `
        mutation {
          updateTodo(id: ${id}, data: {completed: ${completed}}) {
            id
            title
            completed
            dueTo
            important
          }
        }`;
    const response = await graphQLFetch(query);
    const result = await response.json();
    return result.data.updateTodo;
}

export async function removeTodoById(id: number) {
    const query = `
        mutation {
          removeTodoById(id: ${id})
}
            `;
    graphQLFetch(query);
}

export async function addTodo(title: string, listId: number) {
    const query = `
        mutation {
            addTodo(title: "${title}", listId: ${listId}) {
            id
            title
            completed
            dueTo
          }
        }
      `;
    const response = await graphQLFetch(query);
    const result = await response.json();
    return result.data.addTodo;
}

export async function getTodoListNames() {
    const query = `
        query {
          listNames {
            id
            name
          }
        }
      `;
    const response = await graphQLFetch(query);
    const result = await response.json();
    return result.data.listNames;
}

export async function addTodoList(name: string) {
    const query = `
        mutation {
          addList(name: "${name}") {
            id
            name
          }
        }
      `;
    const response = await graphQLFetch(query);
    const result = await response.json();
    const newList = result.data.addList;
    return newList;
}
