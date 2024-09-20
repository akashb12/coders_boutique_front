const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const getAllTodos = async () => {
  const res = await fetch(`${baseUrl}/todos/listTodos`, { cache: 'no-store' });
  const todos = await res.json();
  return todos;
}

export const addTodo = async (todo) => {
  const res = await fetch(`${baseUrl}/todos/addTodo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
  const newTodo = await res.json();
  return newTodo;
}

export const editTodo = async (todo) => {
  const res = await fetch(`${baseUrl}/todos/editTodo/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
  const updatedTodo = await res.json();
  return updatedTodo;
}

export const deleteTodo = async (id) => {
  await fetch(`${baseUrl}/todos/deleteTodo/${id}`, {
    method: 'DELETE',
  })
}