import { Component, ComponentChildren, h } from "preact"
import Legend from "./legend"
import { ContextProvider, ContextConsumer } from "./context"
export { Legend }
import { ChartConfiguration } from "./configuration"

import renderPlot from "./renderPlot"
export { Entry } from "./types"
import { ISerieConfiguration } from "./types"

interface IChartProps {
  series: ISerieConfiguration[]
  children: ComponentChildren
}

export class Chart extends Component<IChartProps> {
  public render(props: IChartProps) {
    return (
      <ContextProvider value={new ChartConfiguration({ series: props.series })}>
        {props.children}
      </ContextProvider>
    )
  }
}

interface IStylingProps {
  style?: any
  class?: string
}

interface IPlotCanvasProps extends IStylingProps {
  configuration: ChartConfiguration
}

class PlotCanvas extends Component<IPlotCanvasProps> {
  public render(props: IPlotCanvasProps) {
    return <canvas style={props.style} class={props.class} />
  }
  public componentDidMount() {
    renderPlot(this.base as HTMLCanvasElement, this.props.configuration)
  }
}

type IPlotProps = IStylingProps
export function Plot(props: IPlotProps) {
  return (
    <ContextConsumer
      render={configuration => (
        <PlotCanvas configuration={configuration} {...props} />
      )}
    />
  )
}
