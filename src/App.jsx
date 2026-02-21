import { useEffect, useMemo, useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('todos') || '[]')
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const remaining = useMemo(() => todos.filter((t) => !t.done).length, [todos])

  const addTodo = () => {
    const text = input.trim()
    if (!text) return
    setTodos((prev) => [{ id: crypto.randomUUID(), text, done: false }, ...prev])
    setInput('')
  }

  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="app-wrap">
      <div className="app">
        <h1>Todo App</h1>

        <div className="row">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a task..."
          />
          <button className="add" onClick={addTodo}>
            Add
          </button>
        </div>

        <div className="meta">{remaining} remaining</div>

        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className={todo.done ? 'done' : ''}>
              <span>{todo.text}</span>
              <div className="actions">
                <button className="ghost" onClick={() => toggleTodo(todo.id)}>
                  {todo.done ? 'Undo' : 'Done'}
                </button>
                <button className="danger" onClick={() => deleteTodo(todo.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
