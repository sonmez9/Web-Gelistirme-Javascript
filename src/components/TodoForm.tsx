import { useState } from 'react'
import type { ITodoFormData, Priority } from '../interfaces/todo'

interface TodoFormProps {
  onSubmit: (data: ITodoFormData) => void
}

export function TodoForm({ onSubmit }: TodoFormProps) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit({ title, priority })
    setTitle('')
    setPriority('medium')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow sm:flex-row"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Yeni görev yaz..."
        aria-label="Görev başlığı"
        className="flex-1 rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        aria-label="Öncelik"
        className="rounded-lg border border-slate-300 px-3 py-2"
      >
        <option value="low">Düşük</option>
        <option value="medium">Orta</option>
        <option value="high">Yüksek</option>
      </select>
      <button
        type="submit"
        className="rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        disabled={!title.trim()}
      >
        Ekle
      </button>
    </form>
  )
}
