export async function fetchTodos() {
    const query = `
          query {
            todos {
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
        console.log(result.data.todos);
        return result.data.todos;
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

export async function addTodo(title: string, dueTo?: string) {
    const query = `
        mutation {
          addTodo(title: "${title}" ${dueTo ? `, dueTo: "${dueTo}"` : ''}) {
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
