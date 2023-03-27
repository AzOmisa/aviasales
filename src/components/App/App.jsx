import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Space, Spin } from 'antd'

import { fetchId, fetchPackOfTickets } from '../../store/ticketsSlice'
import MoveNumber from '../MoveNumber/'
import TicketFilter from '../TicketFilter'
import TicketList from '../TicketList'

import Logo from './Logo.svg'

import classes from './App.module.scss'

const App = () => {
  const allData = useSelector((state) => state.tickets)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchId())
  }, [dispatch])
  useEffect(() => {
    if (allData.error) return
    let timer
    if (allData.searchId && allData.status !== 'fulfilled' && window.navigator.onLine) {
      timer = setTimeout(() => {
        dispatch(fetchPackOfTickets(allData.searchId))
      }, 800)
    }
    return () => clearTimeout(timer)
  })
  const render = allData.error ? (
    <Space>
      <Alert
        className="movies_alert"
        message="Ошибка"
        description="Пожалуйста, проверьте соединение сети"
        type="error"
        showIcon
      />
    </Space>
  ) : (
    <TicketList />
  )
  return (
    <section className={classes.App}>
      <img src={Logo} className={classes.Logo} alt="aviasales-logo"></img>
      <div className={classes.Main}>
        <MoveNumber />
        <section className={classes.AboutTickets}>
          <TicketFilter />
          {allData.status === 'pending' ? <Spin size="large" /> : null}
          {render}
        </section>
      </div>
    </section>
  )
}
export default App
