export type Priority = 'low' | 'medium' | 'high'

export type Filter = 'all' | 'active' | 'completed'

export interface ITodo {
  id: string
  title: string
  completed: boolean
  priority: Priority
  createdAt: number
}

export interface ITodoFormData {
  title: string
  priority: Priority
}
