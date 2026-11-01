import type { Filter } from '../interfaces/todo'

interface FilterBarProps {
  filter: Filter
  onChange: (filter: Filter) => void
  counts: Record<Filter, number>
}

const options: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Tümü' },
  { value: 'active', label: 'Yapılacak' },
  { value: 'completed', label: 'Tamamlanan' },
]

export function FilterBar({ filter, onChange, counts }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Görev filtresi">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          aria-pressed={filter === o.value}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            filter === o.value
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-slate-700 shadow hover:bg-slate-50'
          }`}
        >
          {o.label} ({counts[o.value]})
        </button>
      ))}
    </div>
  )
}
