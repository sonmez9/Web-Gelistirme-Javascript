import { useState } from 'react'
import type { ITodo, ITodoFormData, Priority } from '../interfaces/todo'

interface TodoItemProps {
  todo: ITodo
  onToggle: (id: string) => void
  onUpdate: (id: string, data: ITodoFormData) => void
  onDelete: (id: string) => void
}

const priorityLabels: Record<Priority, string> = {
  low: 'Düşük',
  medium: 'Orta',
  high: 'Yüksek',
}

const priorityStyles: Record<Priority, string> = {
  low: 'bg-emerald-100 text-emerald-800',
  medium: 'bg-amber-100 text-amber-800',
  high: 'bg-rose-100 text-rose-800',
}

export function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [priority, setPriority] = useState<Priority>(todo.priority)

  const startEdit = () => {
    setTitle(todo.title)
    setPriority(todo.priority)
    setIsEditing(true)
  }

  const save = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onUpdate(todo.id, { title, priority })
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (confirm(`"${todo.title}" görevini silmek istediğine emin misin?`)) {
      onDelete(todo.id)
    }
  }

  if (isEditing) {
    return (
      <li className="rounded-xl bg-white p-4 shadow">
        <form onSubmit={save} className="flex flex-col gap-3 sm:flex-row">
          <input
            autoFocus
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Görev başlığını düzenle"
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            aria-label="Önceliği düzenle"
            className="rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="low">Düşük</option>
            <option value="medium">Orta</option>
            <option value="high">Yüksek</option>
          </select>
          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              Kaydet
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-lg bg-slate-200 px-4 py-2 hover:bg-slate-300"
            >
              İptal
            </button>
          </div>
        </form>
      </li>
    )
  }

  return (
    <li className="flex items-center gap-3 rounded-xl bg-white p-4 shadow">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`${todo.title} tamamlandı`}
        className="h-5 w-5 cursor-pointer accent-indigo-600"
      />
      <span
        className={`flex-1 break-words ${todo.completed ? 'text-slate-400 line-through' : ''}`}
      >
        {todo.title}
      </span>
      <span
        className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityStyles[todo.priority]}`}
      >
        {priorityLabels[todo.priority]}
      </span>
      <button
        onClick={startEdit}
        className="rounded-lg px-3 py-1 text-sm text-indigo-700 hover:bg-indigo-50"
      >
        Düzenle
      </button>
      <button
        onClick={handleDelete}
        className="rounded-lg px-3 py-1 text-sm text-rose-700 hover:bg-rose-50"
      >
        Sil
      </button>
    </li>
  )
}
