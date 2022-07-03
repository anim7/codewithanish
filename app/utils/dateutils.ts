export const getDate = (date: Date) => {
  const year = date.getFullYear()
  const month = getMonth(date.getMonth())
  const day = date.getDate()
  return `${day} ${month}, ${year}`
}

const getMonth = (index: number) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  return months[index]
}

export default getDate
