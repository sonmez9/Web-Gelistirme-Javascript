import { useEffect, useState } from 'react'
import type { ITodo, ITodoFormData } from '../interfaces/todo'
import { loadTodos, saveTodos } from '../utils/storage'

export function useTodos() {
  const [todos, setTodos] = useState<ITodo[]>(loadTodos)

  // Liste her değiştiğinde LocalStorage'a kaydet
  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  // EKLE (Create)
  const addTodo = (data: ITodoFormData) => {
    const todo: ITodo = {
      id: crypto.randomUUID(),
      title: data.title.trim(),
      priority: data.priority,
      completed: false,
      createdAt: Date.now(),
    }
    setTodos((prev) => [todo, ...prev])
  }

  // GÜNCELLE (Update): başlık/öncelik değiştirme
  const updateTodo = (id: string, data: ITodoFormData) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, title: data.title.trim(), priority: data.priority } : t,
      ),
    )
  }

  // GÜNCELLE (Update): tamamlandı / tamamlanmadı
  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    )
  }

  // SİL (Delete)
  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  // Tamamlananları toplu sil
  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed))
  }

  return { todos, addTodo, updateTodo, toggleTodo, deleteTodo, clearCompleted }
}
