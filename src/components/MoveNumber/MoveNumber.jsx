import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { moveNumberConstants } from '../../services/constants'
import { toggleFilter } from '../../store/moveNumberSlice'

import classes from './MoveNumber.module.scss'

const MoveNumber = () => {
  const dataOfFilters = useSelector((state) => state.moveNumber)
  const dispatch = useDispatch()
  const moves = Object.keys(moveNumberConstants)
  const filters = moves.map((item) => {
    return (
      <li key={item} className={classes.FilterItem} onClick={() => dispatch(toggleFilter(moveNumberConstants[item]))}>
        <input className={classes.Checkbox} type="checkbox" checked={dataOfFilters[item]} readOnly />
        <label htmlFor={item} className={classes.FilterLabel}>
          {moveNumberConstants[item]}
        </label>
      </li>
    )
  })
  return (
    <div className={classes.Filter}>
      <span className={classes.FilterTitle}>Количество пересадок</span>
      <ul className={classes.FilterList}>{filters}</ul>
    </div>
  )
}
export default MoveNumber
