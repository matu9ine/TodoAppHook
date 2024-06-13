import React from 'react'
import exactPropTypes from 'prop-types-exact'
import PropTypes from 'prop-types'

import { TaskFilter } from '@/components'

import './Footer.css'

export const Footer = ({ filter, doneCount, onDeleted, onFilterSelect }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{doneCount} items left</span>
      <TaskFilter filter={filter} onFilterSelect={onFilterSelect} />
      <button className="clear-completed" type="button" onClick={onDeleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = exactPropTypes({
  filter: PropTypes.string,
  doneCount: PropTypes.number,
  onDeleted: PropTypes.func,
  onFilterSelect: PropTypes.func,
})
