import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import exactPropTypes from 'prop-types-exact'
import PropTypes from 'prop-types'

import { useInterval } from '@/hooks'

import './Task.css'

export const Task = ({
  description,
  minNumber,
  secNumber,
  status,
  id,
  created,
  onPlay,
  onPause,
  onDeleted,
  onEditing,
  onToggleDone,
  completed,
  isEditing,
  onItemEdited,
  updateInterval = 5000,
}) => {
  const classNames = completed ? 'completed' : `${status}`
  const [label, setLabel] = React.useState(description || '')
  const [time, setTime] = React.useState(formatDistanceToNow(created, { addSuffix: true, includeSeconds: true }))

  const updateTime = () => {
    setTime(formatDistanceToNow(created, { addSuffix: true, includeSeconds: true }))
  }
  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (label.trim()) {
      onItemEdited(label.trim())
    }
  }
  useInterval(() => {
    updateTime()
  }, updateInterval)
  return (
    <li key={`li-${id}`} className={classNames}>
      {isEditing ? (
        <form className="" onSubmit={onSubmit}>
          <input type="text" className="edit" onChange={onLabelChange} value={label} autoFocus />
        </form>
      ) : (
        <div className="view">
          <input
            id={`toggle-${id}`}
            name={`toggle-${id}`}
            className="toggle"
            type="checkbox"
            onChange={onToggleDone}
            checked={completed}
          />
          <label htmlFor={`toggle-${id}`}>
            <span className="title">{description}</span>
            <span className="description">
              <button className="icon icon-play bi bi-play" type="button" onClick={onPlay} />
              <button className="icon icon-pause bi bi-pause" type="button" onClick={onPause} />
              {`${minNumber}:${secNumber.toString().padStart(2, '0')}`}
            </span>
            <span className="description">created {time}</span>
          </label>
          <button className="icon icon-edit bi bi-pencil" type="button" onClick={onEditing} />
          <button className="icon icon-destroy bi bi-x" type="button" onClick={onDeleted} />
        </div>
      )}
    </li>
  )
}

Task.propTypes = exactPropTypes({
  description: PropTypes.string,
  minNumber: PropTypes.number,
  secNumber: PropTypes.number,
  created: PropTypes.object,
  id: PropTypes.string,
  status: PropTypes.string,
  completed: PropTypes.bool,
  isEditing: PropTypes.bool,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onDeleted: PropTypes.func,
  onEditing: PropTypes.func,
  onItemEdited: PropTypes.func,
  onToggleDone: PropTypes.func,
  updateInterval: PropTypes.number,
})
