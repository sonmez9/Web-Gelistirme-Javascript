import { useState } from 'react'
import { FilterBar } from '../components/FilterBar'
import { TodoForm } from '../components/TodoForm'
import { TodoList } from '../components/TodoList'
import { useTodos } from '../hooks/useTodos'
import type { Filter } from '../interfaces/todo'

export function HomePage() {
  const { todos, addTodo, updateTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos()
  const [filter, setFilter] = useState<Filter>('all')

  const completedCount = todos.filter((t) => t.completed).length
  const counts: Record<Filter, number> = {
    all: todos.length,
    active: todos.length - completedCount,
    completed: completedCount,
  }

  const visibleTodos = todos.filter((t) =>
    filter === 'all' ? true : filter === 'completed' ? t.completed : !t.completed,
  )

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-5 px-4 py-10">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-indigo-700">Görev Yöneticisi</h1>
        <p className="mt-1 text-slate-600">
          Görevlerini ekle, düzenle, tamamla ve sil. Veriler tarayıcında saklanır.
        </p>
      </header>

      <TodoForm onSubmit={addTodo} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <FilterBar filter={filter} onChange={setFilter} counts={counts} />
        {completedCount > 0 && (
          <button
            onClick={clearCompleted}
            className="text-sm text-rose-700 underline hover:text-rose-900"
          >
            Tamamlananları temizle
          </button>
        )}
      </div>

      <TodoList
        todos={visibleTodos}
        onToggle={toggleTodo}
        onUpdate={updateTodo}
        onDelete={deleteTodo}
      />

      <footer className="mt-auto pt-6 text-center text-sm text-slate-500">
        React + TypeScript + Tailwind CSS · LocalStorage
      </footer>
    </main>
  )
}
