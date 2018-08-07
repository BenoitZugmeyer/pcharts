import * as color from "./color"
import { ISerie, ISerieConfiguration } from "./types"

const defaultSeriesColors = color.interpolate(["#FFECB3", "#E85285", "#6A1B9A"])
function getDefaultColor(index: number, length: number) {
  const i = length === 1 ? 0.5 : index / (length - 1)
  return color.toRGBString(defaultSeriesColors(i))
}

export class ChartConfiguration {
  public readonly series: ISerie[]

  constructor({ series }: { series: ISerieConfiguration[] }) {
    this.series = series.map((serieConfig, index) => {
      return {
        name: serieConfig.name || `Serie ${index + 1}`,
        data: serieConfig.data,
        color: serieConfig.color || getDefaultColor(index, series.length),
      }
    })
  }
}

