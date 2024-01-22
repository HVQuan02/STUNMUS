import { useEffect, useState } from "react"

const ToLearnList = () => {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('stunmus'))?.tasks || [])

  function handleAddTask() {
    if (task === '') {
      return
    }
    setTasks(prev => [...prev, task])
    setTask('')
  }

  function handleDeleteTask(i) {
    setTasks(tasks => tasks.filter((task, index) => index !== i))
  }

  useEffect(() => {
    window.onbeforeunload = function () {
      const oldData = JSON.parse(localStorage.getItem('stunmus'))
      const newData = { ...oldData, tasks }
      localStorage.setItem('stunmus', JSON.stringify(newData))
    }
  }, [tasks])

  return (
    <div>
      <input type="text" className="border-black border-2" value={task} onChange={e => setTask(e.target.value)} required />
      <br />
      <button className="bg-gray-500 text-white p-1" onClick={handleAddTask}>Add task</button>
      <br />
      <h3 className="text-3xl">To Learn List</h3>
      <ul>
        {tasks.map((task, index) => {
          return (
            <div key={index}>
              <li className="inline-block">{task}</li>
              <button className="bg-gray-500 text-white p-1 ml-2" onClick={() => handleDeleteTask(index)}>Delete</button>
            </div>
          )
        })}
      </ul>
    </div>
  )
}

export default ToLearnList