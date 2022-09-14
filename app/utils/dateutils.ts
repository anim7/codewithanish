export const getDate = (date: Date) => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = getMonthName(d.getMonth())
  const day = d.getDate()
  return `${day} ${month}, ${year}`
}

const getMonthName = (index: number) => {
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
