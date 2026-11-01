import type { ITodo } from '../interfaces/todo'

const STORAGE_KEY = 'gorev-yoneticisi-todos'

// LocalStorage'dan görevleri oku (hata olursa boş liste döner)
export function loadTodos(): ITodo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ITodo[]) : []
  } catch (error) {
    console.error('LocalStorage okuma hatası:', error)
    return []
  }
}

// Görevleri LocalStorage'a yaz
export function saveTodos(todos: ITodo[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch (error) {
    console.error('LocalStorage yazma hatası:', error)
  }
}
