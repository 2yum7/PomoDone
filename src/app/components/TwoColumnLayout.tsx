import ToDoList from './todolist'
import PomodoroTimer from './pomodoroTimer'

export default function TwoColumnLayout() {
    return (
      <div className="flex h-screen">
        {/* 左カラム（ToDo） */}
        <div className="w-1/2 border-r border-gray-300 p-4">
          <ToDoList />
        </div>
  
        {/* 右カラム（ポモドーロ） */}
        <div className="w-1/2 p-4">
          <PomodoroTimer />
        </div>
      </div>
    )
  }