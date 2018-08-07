import { Component, h } from "preact"
import { ISerie } from "./types"
import { ContextConsumer } from "./context"

interface ILegendSerieProps {
  serie: ISerie
}

class LegendSerie extends Component<ILegendSerieProps> {
  public render({ serie }: ILegendSerieProps) {
    return (
      <div>
        <span
          style={{
            display: "inline-block",
            backgroundColor: serie.color,
            borderRadius: "100%",
            width: "10px",
            height: "10px",
          }}
        />
        {serie.name}
      </div>
    )
  }
}

export default class Legend extends Component {
  public render() {
    return (
      <ContextConsumer
        render={configuration => (
          <div>
            {configuration.series.map(serie => (
              <LegendSerie serie={serie} />
            ))}
          </div>
        )}
      />
    )
  }
}

