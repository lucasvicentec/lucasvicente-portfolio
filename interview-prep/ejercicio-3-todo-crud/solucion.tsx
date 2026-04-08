// =============================================
// NO ABRAS ESTE ARCHIVO HASTA HABERLO INTENTADO
// AL MENOS 3 VECES POR TU CUENTA
// =============================================

import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  // CREAR
  function handleAdd() {
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
    };

    setTodos([...todos, todo]);
    setNewTodo("");
  }

  // BORRAR
  function handleDelete(id: number) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  // TOGGLE COMPLETADA
  function handleToggle(id: number) {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  // EMPEZAR A EDITAR
  function handleStartEdit(todo: Todo) {
    setEditingId(todo.id);
    setEditText(todo.text);
  }

  // GUARDAR EDICION
  function handleSaveEdit(id: number) {
    if (!editText.trim()) return;

    setTodos(
      todos.map((t) => (t.id === id ? { ...t, text: editText.trim() } : t))
    );
    setEditingId(null);
    setEditText("");
  }

  const pending = todos.filter((t) => !t.completed).length;

  return (
    <div>
      <h1>Tareas</h1>

      <div>
        <input
          type="text"
          placeholder="Nueva tarea..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button onClick={handleAdd}>Agregar</button>
      </div>

      <p>{pending} tareas pendientes</p>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />

            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveEdit(todo.id)}
                />
                <button onClick={() => handleSaveEdit(todo.id)}>Guardar</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "#999" : "#000",
                  }}
                >
                  {todo.text}
                </span>
                <button onClick={() => handleStartEdit(todo)}>Editar</button>
                <button onClick={() => handleDelete(todo.id)}>Borrar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
