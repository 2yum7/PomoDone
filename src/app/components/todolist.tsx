'use client'

import { useState, useEffect } from 'react'
import { Plus, Check, Trash2 } from 'lucide-react'

export default function ToDoList() {
  const [inputValue, setInputValue] = useState('')
  const [tasks, setTasks] = useState<{ id: string; text: string; completed: boolean }[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('tasks')
    if (stored) {
      setTasks(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleAddTask = () => {
    if (!inputValue.trim()) return
    const newTask = { id: Date.now().toString(), text: inputValue.trim(), completed: false }
    setTasks([...tasks, newTask])
    setInputValue('')
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div className="flex flex-col bg-[#1E1E1E] border border-gray-700 rounded-2xl p-6 max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Tasks</h2>

      {/* 入力フォーム */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleAddTask() }}
          placeholder="Add a new task..."
          className="flex-1 bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
        />
        <button
          onClick={handleAddTask}
          className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-400 hover:to-purple-600 text-white font-semibold px-4 rounded-lg transition flex items-center gap-1"
        >
          <Plus size={18} />
          Add
        </button>
      </div>

      {/* タスクリスト */}
      <div className="space-y-3 overflow-y-auto max-h-72 pr-2">
        {tasks.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            No tasks yet. Add your first task!
          </div>
        ) : (
          tasks.map(task => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-3 rounded-lg transition ${
                task.completed ? 'bg-gray-800' : 'hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center transition-colors ${
                    task.completed
                      ? 'bg-yellow-400 border-yellow-400 text-black'
                      : 'border-gray-500'
                  }`}
                >
                  {task.completed && <Check size={12} />}
                </button>
                <span
                  className={`text-sm ${
                    task.completed
                      ? 'text-gray-500 line-through'
                      : 'text-white'
                  }`}
                >
                  {task.text}
                </span>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-gray-400 hover:text-red-400 transition"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* フッター */}
      <div className="flex justify-between text-sm text-gray-400 mt-6 pt-4 border-t border-gray-700">
        <span>{tasks.filter(t => !t.completed).length} tasks remaining</span>
        <span>{tasks.filter(t => t.completed).length} completed</span>
      </div>
    </div>
  )
}
