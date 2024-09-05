export const timeFormmater : (firstDate: Date, secondDate: Date) => string = (firstDate, secondDate) => {
    let diff = firstDate.getTime() - secondDate.getTime()
    let days = 0, hours = 0, minutes = 0, seconds = 0
    if (diff > (1000 * 60 * 60 * 24))
    {
      days = Math.floor(diff / (1000 * 60 * 60 * 24))
      diff = diff - days * (1000 * 60 * 60 * 24)
    }
    if (diff > (1000 * 60 * 60))
    {
      hours = Math.floor(diff / (1000 * 60 * 60))
      diff = diff - hours * (1000 * 60 * 60)
    }
    if (diff > (1000 * 60))
    {
      minutes = Math.floor(diff / (1000 * 60))
      diff = diff - minutes * (1000 * 60)
    }
    if (diff > (1000))
    {
      seconds = Math.floor(diff / 1000)
      diff = diff - seconds * (1000)
    }
    return `${days}D ${hours}H ${minutes}M ${seconds}S`
  }
  