export async function fetchTodos(listId: number) {
    const query = `
          query {
            todosByListId(listId: ${listId}) {
              id
              title
              completed
              dueTo
            }
          }
        `;

    try {
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
            }),
        });

        const result = await response.json();
        console.log('result' + JSON.stringify(result));
        return result.data.todosByListId;
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
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
    try {
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
            }),
        });

        const result = await response.json();
        return result.data[`get${type}`];
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

export async function removeTodoById(id: number) {
    const query = `
        mutation {
          removeTodoById(id: ${id})
}
            `;
    try {
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
            }),
        });

        const result = await response.json();
        const removedTodo = result.data.removeTodoById;
        return removedTodo;
    } catch (error) {
        console.error('Error removing todo:', error);
    }
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
    try {
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
            }),
        });

        const result = await response.json();
        const newTodo = result.data.addTodo;
        return newTodo;
    } catch (error) {
        console.error('Error adding todo:', error);
    }
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
    try {
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
            }),
        });

        const result = await response.json();
        console.log(result.data.listNames);
        return result.data.listNames;
    } catch (error) {
        console.error('Error fetching todo list names:', error);
    }
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
    try {
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
            }),
        });

        const result = await response.json();
        const newList = result.data.addList;
        return newList;
    } catch (error) {
        console.error('Error adding todo list:', error);
    }
}
