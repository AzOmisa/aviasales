function toStr(arr) {
  let result = arr.map((element) => {
    if (element < 10) {
      return '0' + String(element)
    }
    return String(element)
  })
  return result.join(':')
}
export function depArrTime(departureDate, duration) {
  const departure = new Date(departureDate)
  const arrival = new Date(departure.getTime() + duration * 60000)
  let depTime = toStr([departure.getHours(), departure.getMinutes()])
  let arrTime = toStr([arrival.getHours(), arrival.getMinutes()])
  return depTime + ' - ' + arrTime
}
export function durationTime(duration) {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  const result = String(hours) + 'ч ' + String(minutes) + 'мин'
  return result
}
export function stopsCounter(num) {
  if (!num) return 'Без пересадок'
  if (num === 1) return '1 пересадка'
  return String(num) + ' пересадки'
}
