import { h } from "preact"
import { Context, createContext } from "preact-context"
import { ChartConfiguration } from "./configuration"

const ChartContext: Context<ChartConfiguration | undefined> = createContext(
  undefined as ChartConfiguration | undefined,
)

interface IContextConsumerProps {
  render: (val: ChartConfiguration) => any
}

export function ContextConsumer(props: IContextConsumerProps) {
  return (
    <ChartContext.Consumer
      render={configuration =>
        configuration ? props.render(configuration) : "Not in a Chart context"
      }
    />
  )
}

export const ContextProvider = ChartContext.Provider
