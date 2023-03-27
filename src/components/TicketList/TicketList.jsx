import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Space } from 'antd'
import { v4 as uuidv4 } from 'uuid'

import { filterConstants } from '../../services/constants'
import { sortByMoves, sortTickets } from '../../services/sortFns'
import { showMore } from '../../store/ticketsSlice'
import Ticket from '../Ticket'

import classes from './TicketList.module.scss'

const TicketList = () => {
  const ticketData = useSelector((state) => state.tickets)
  const selectedFilter = useSelector((state) => state.filter.selected)
  const moveNumberData = useSelector((state) => state.moveNumber)
  const { all, without, one, two, three } = moveNumberData
  const dispatch = useDispatch()
  const { renderingAmount, ticketsData } = ticketData
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  useEffect(() => {
    let newData = ticketsData
    if (selectedFilter === filterConstants.cheap) {
      newData = sortTickets(ticketsData).cheapArr
    }
    if (selectedFilter === filterConstants.fast) {
      newData = sortTickets(ticketsData).fastArr
    }
    if (all) {
      setError(false)
      setData(newData)
      return
    }
    if (
      !moveNumberData.all &&
      !moveNumberData.without &&
      !moveNumberData.one &&
      !moveNumberData.two &&
      !moveNumberData.three
    ) {
      setError(true)
      return
    }
    newData = sortByMoves(moveNumberData, newData)
    setData(newData)
    setError(false)
  }, [ticketsData, selectedFilter, all, without, one, two, three])
  const renderingTickets = data.slice(0, renderingAmount)
  const tickets = renderingTickets.map((item) => {
    return (
      <li key={uuidv4()}>
        <Ticket price={item.price} carrier={item.carrier} segments={item.segments} />
      </li>
    )
  })
  return (
    <div>
      {error ? (
        <Space>
          <Alert
            className="movies_alert"
            message="Выберите другие фильтры"
            description="Рейсов, подходящих под заданные фильтры, не найдено"
            type="success"
            showIcon
          />
        </Space>
      ) : (
        <React.Fragment>
          <ul>{tickets}</ul>
          <button className={classes.ShowMore} type="button" onClick={() => dispatch(showMore())}>
            Показать еще 5 билетов!
          </button>
        </React.Fragment>
      )}
    </div>
  )
}
export default TicketList
