import React from 'react'

import './NewTaskForm.css'

export const NewTaskForm = ({ onItemAdded }) => {
  const [label, setLabel] = React.useState('')
  const [min, setMin] = React.useState('')
  const [sec, setSec] = React.useState('')
  const onChange = (e) => {
    const { name, value } = e.target
    if (name === 'label') {
      setLabel(value)
    } else if (name === 'min') {
      setMin(value)
    } else if (name === 'sec') {
      setSec(value)
    }
  }
  const clearAll = () => {
    setLabel('')
    setMin('')
    setSec('')
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const minNumber = +min
    const secNumber = +sec
    if (label.trim() && (minNumber > 0 || secNumber > 0)) {
      onItemAdded(label.trim(), minNumber, secNumber)
    }
    clearAll()
  }
  return (
    <form className="header new-todo-form" onSubmit={onSubmit}>
      <input
        type="text"
        className="new-todo"
        name="label"
        placeholder="What needs to be done?"
        onChange={onChange}
        value={label}
        autoFocus
      />
      <input
        type="number"
        className="new-todo-form__timer"
        name="min"
        placeholder="Min"
        onChange={onChange}
        value={min}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        name="sec"
        placeholder="Sec"
        onChange={onChange}
        value={sec}
      />
      <button type="submit" style={{ display: 'none' }}>
        Отправить
      </button>
    </form>
  )
}
