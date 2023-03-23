import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { onFilterClick } from '../../redux/filterSlice'
import { filterConstants } from '../../services/constants'

import classes from './TicketFilter.module.scss'
export default function TicketFilter() {
  const dispatch = useDispatch()
  const selectedFilter = useSelector((state) => state.filter.selected)
  const filtersArr = Object.values(filterConstants)
  const filters = filtersArr.map((item) => {
    if (item === selectedFilter) {
      return (
        <li
          className={`${classes.FilterItem} ${classes.Active}`}
          key={item}
          onClick={() => dispatch(onFilterClick(item))}
        >
          {item}
        </li>
      )
    }
    return (
      <li key={item} className={classes.FilterItem} onClick={() => dispatch(onFilterClick(item))}>
        {item}
      </li>
    )
  })
  return <ul className={classes.FilterList}>{filters}</ul>
}
