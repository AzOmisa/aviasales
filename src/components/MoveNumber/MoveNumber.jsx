import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toggleFilter } from '../../redux/moveNumberSlice'
import { moveNumberConstants } from '../../services/constants'

import classes from './MoveNumber.module.scss'

export default function MoveNumber() {
  const dataOfFilters = useSelector((state) => state.moveNumber)
  const dispatch = useDispatch()
  const moves = Object.keys(moveNumberConstants)
  const filters = moves.map((item) => {
    return (
      <li key={item} className={classes.FilterItem} onClick={() => dispatch(toggleFilter(moveNumberConstants[item]))}>
        <input className={classes.Checkbox} type="checkbox" checked={dataOfFilters[item]} readOnly />
        <span htmlFor={item} className={classes.FilterLabel}>
          {moveNumberConstants[item]}
        </span>
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
