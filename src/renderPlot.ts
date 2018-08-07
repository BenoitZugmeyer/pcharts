import { ChartConfiguration } from './configuration'

export default function renderPlot(
  element: HTMLCanvasElement,
  configuration: ChartConfiguration,
) {
  const ctx = element.getContext("2d")
  if (ctx === null) {
    return
  }

  const padding = 1
  const plotWidth = ctx.canvas.clientWidth
  const plotHeight = ctx.canvas.clientHeight

  ctx.lineWidth = 2

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  configuration.series.forEach(serie => {
    serie.data.forEach(entry => {
      if (entry[0] < minX) {
        minX = entry[0]
      }
      if (entry[0] > maxX) {
        maxX = entry[0]
      }
      if (entry[1] < minY) {
        minY = entry[1]
      }
      if (entry[1] > maxY) {
        maxY = entry[1]
      }
    })
  })

  configuration.series.forEach(serie => {
    ctx.strokeStyle = serie.color
    ctx.beginPath()
    serie.data.forEach((entry, entryIndex) => {
      const xPosition =
        ((entry[0] - minX) / (maxX - minX)) * (plotWidth - padding * 2) +
        padding
      const yPosition =
        ((entry[1] - minY) / (maxY - minY)) * (plotHeight - padding * 2) +
        padding
      if (entryIndex === 0) {
        ctx.moveTo(xPosition, yPosition)
      } else {
        ctx.lineTo(xPosition, yPosition)
      }
    })
    ctx.stroke()
  })
}
