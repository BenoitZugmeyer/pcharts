import { h, render } from "preact"
import { Chart, Entry, Legend, Plot } from "../src/index"

function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function* generateTrend(points: number) {
  let value = random(0, 100)
  const now = Date.now()
  for (let i = 0; i < points; i += 1) {
    yield [now - (points - i) * 1000, value]
    value = random(value - 1, value + 1)
  }
}

const series = [
  {
    name: "Foo",
    data: Array.from(generateTrend(1000)) as Entry[],
  },
  {
    name: "Bar",
    data: Array.from(generateTrend(1000)) as Entry[],
  },
]

render(
  <Chart series={series}>
    <div style={{ display: "flex" }}>
      <Plot style={{ border: "1px solid black", marginRight: "10px" }} />
      <Legend />
    </div>
  </Chart>,
  document.body,
)
