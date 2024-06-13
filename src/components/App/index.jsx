import React, { useState, useCallback } from 'react'
import { v4 as uuidV4 } from 'uuid'

import { NewTaskForm, TaskList, Footer } from '@/components'

import './App.css'

export function App() {
  function createTodoItem(description, minNumber, secNumber) {
    const createdTime = new Date()
    const timeSpent = minNumber * 60 + secNumber
    return {
      id: uuidV4(),
      status: '',
      description,
      minNumber: Math.floor(timeSpent / 60),
      secNumber: timeSpent % 60,
      created: createdTime,
      isEditing: false,
      completed: false,
      isTimerRunning: false,
      timerStart: 0,
      elapsedTime: 0,
      timerId: null,
      timeSpent,
    }
  }
  const [filter, setFilter] = useState('all')
  const [todoData, setTodoData] = useState(
    [
      createTodoItem('Drink Coffee', 10, 20),
      createTodoItem('Drink Juice', 10, 20),
      createTodoItem('Drink Tea', 10, 20),
    ] || []
  )

  const deleteItem = (id) => {
    setTodoData((prevTodoData) => prevTodoData.filter((el) => el.id !== id))
  }

  const onEditItem = useCallback((id) => {
    const toggleEditing = (task) => ({
      ...task,
      isEditing: task.id === id ? !task.isEditing : task.isEditing,
    })
    setTodoData((prevTodoData) => prevTodoData.map(toggleEditing))
  }, [])

  const updateTime = useCallback((id) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((task) => {
        if (task.id === id && task.isTimerRunning) {
          const elapsedTimeInSeconds = task.timeSpent - Math.floor((Date.now() - task.timerStart) / 1000)
          if (elapsedTimeInSeconds <= 0) {
            clearInterval(task.timerId)
            return {
              ...task,
              isTimerRunning: false,
              timerId: null,
              completed: true,
              timeSpent: 0,
              minNumber: 0,
              secNumber: 0,
            }
          }
          return {
            ...task,
            elapsedTime: elapsedTimeInSeconds,
            minNumber: Math.floor(elapsedTimeInSeconds / 60),
            secNumber: elapsedTimeInSeconds % 60,
          }
        }
        return task
      })
    )
  }, [])
  const onPlay = useCallback((id) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((task) => {
        if (task.id === id && !task.isTimerRunning) {
          const now = Date.now()
          const timerId = setInterval(() => {
            updateTime(id)
          }, 1000)

          return {
            ...task,
            isTimerRunning: true,
            timerStart: now,
            timerId,
          }
        }
        return task
      })
    )
  }, [])

  const onPause = useCallback((id) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((task) => {
        if (task.id === id && task.isTimerRunning) {
          clearInterval(task.timerId)
          const elapsedTimeInSeconds = Math.floor((Date.now() - task.timerStart) / 1000)
          const timeSpent = task.timeSpent - elapsedTimeInSeconds

          return {
            ...task,
            isTimerRunning: false,
            timerId: null,
            timeSpent,
            minNumber: Math.floor(timeSpent / 60),
            secNumber: timeSpent % 60,
          }
        }
        return task
      })
    )
  }, [])

  const editedItem = useCallback((id, newDescription) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((task) => (task.id === id ? { ...task, description: newDescription, isEditing: false } : task))
    )
  }, [])

  const deleteAllDone = useCallback(() => {
    setTodoData((prevTodoData) => prevTodoData.filter((el) => !el.completed))
  }, [])

  const addItem = useCallback((text, minNumber, secNumber) => {
    const newItem = createTodoItem(text, minNumber, secNumber)
    setTodoData((prevTodoData) => [...prevTodoData, newItem])
  }, [])

  const onToggleDone = useCallback((id) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((task) => {
        if (task.id === id) {
          const updatedTask = { ...task, completed: !task.completed }
          if (task.isTimerRunning) {
            clearInterval(task.timerId)
            const elapsedTimeInSeconds = task.timeSpent - Math.floor((Date.now() - task.timerStart) / 1000)
            return {
              ...updatedTask,
              isTimerRunning: false,
              timerId: null,
              timeSpent: elapsedTimeInSeconds,
              minNumber: Math.floor(elapsedTimeInSeconds / 60),
              secNumber: elapsedTimeInSeconds % 60,
            }
          }
          return updatedTask
        }
        return task
      })
    )
  }, [])

  const handleFilterSelect = (filterName) => {
    setFilter(filterName)
  }

  const applyFilter = (items, filterName) => {
    switch (filterName) {
      case 'done':
        return items.filter((item) => item.completed)
      case 'active':
        return items.filter((item) => !item.completed)
      case 'all':
        return items
      default:
        return items
    }
  }

  const filteredData = applyFilter(todoData, filter)
  const doneCount = todoData.filter((el) => !el.completed).length

  return (
    <div className="todoapp">
      <NewTaskForm onItemAdded={addItem} />
      <section className="main">
        <TaskList
          todos={filteredData}
          onPlay={onPlay}
          onPause={onPause}
          onDeleted={deleteItem}
          onEditing={onEditItem}
          onItemEdited={editedItem}
          onToggleDone={onToggleDone}
        />
        <Footer filter={filter} doneCount={doneCount} onDeleted={deleteAllDone} onFilterSelect={handleFilterSelect} />
      </section>
    </div>
  )
}
