import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import { depArrTime, durationTime, stopsCounter } from '../../services/ticketFns'

import classes from './Ticket.module.scss'

export default function Ticket({ price, carrier, segments }) {
  function Cell({ description, value }) {
    return (
      <div className={classes.Cell}>
        <span className={classes.Description}>{description}</span>
        <span className={classes.Value}>{value}</span>
      </div>
    )
  }
  const table = segments.map((item) => {
    const direction = item.origin + ' - ' + item.destination
    const time = depArrTime(item.date, item.duration)
    const duration = durationTime(item.duration)
    const stopsAmount = stopsCounter(item.stops.length)
    const stops = item.stops.join(', ') || null
    return (
      <div key={uuidv4()} className={classes.Row}>
        <Cell description={direction} value={time} />
        <Cell description={'В пути'} value={duration} />
        <Cell description={stopsAmount} value={stops} />
      </div>
    )
  })
  return (
    <div className={classes.Ticket}>
      <div className={classes.Header}>
        <span className={classes.Price}>{price}</span>
        <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt="logo"></img>
      </div>
      <div className={classes.Table}>{table}</div>
    </div>
  )
}
