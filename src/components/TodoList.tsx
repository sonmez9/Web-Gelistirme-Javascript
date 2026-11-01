import type { ITodo, ITodoFormData } from '../interfaces/todo'
import { TodoItem } from './TodoItem'

interface TodoListProps {
  todos: ITodo[]
  onToggle: (id: string) => void
  onUpdate: (id: string, data: ITodoFormData) => void
  onDelete: (id: string) => void
}

export function TodoList({ todos, onToggle, onUpdate, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="rounded-xl border-2 border-dashed border-slate-300 p-10 text-center text-slate-500">
        <p className="text-lg font-medium">Gösterilecek görev yok</p>
        <p className="text-sm">Yukarıdaki formdan yeni bir görev ekleyebilirsin.</p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
