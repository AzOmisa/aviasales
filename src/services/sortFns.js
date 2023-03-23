export function sortTickets(arr) {
  const cheapArr = [...arr].sort((prev, next) => prev.price - next.price)
  const fastArr = [...arr].sort((prev, next) => prev.segments[0].duration - next.segments[0].duration)
  return { cheapArr, fastArr }
}
export function filterToggler(data, filter) {
  let newData = { ...data }
  const keys = Object.keys(data)
  let checkOthers = keys.reduce((acc, item) => {
    if (item === filter || item === 'all') return acc
    if (!newData[item]) return (acc = false)
    return acc
  }, true)
  if (newData.all && newData[filter]) {
    newData.all = false
    newData[filter] = false
  } else if (!newData[filter] && checkOthers) {
    newData[filter] = true
    newData.all = true
  } else {
    newData[filter] = !newData[filter]
  }
  return newData
}
export function sortByMoves(obj, data) {
  let selectedFiltersArr = []
  for (let key in obj) {
    if (obj[key]) {
      if (key === 'without') selectedFiltersArr.push(0)
      if (key === 'one') selectedFiltersArr.push(1)
      if (key === 'two') selectedFiltersArr.push(2)
      if (key === 'three') selectedFiltersArr.push(3)
    }
  }
  const newData = data.filter((item) => selectedFiltersArr.some((num) => item.segments[0].stops.length === num))
  return newData
}
