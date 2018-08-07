class Color {
  public readonly r: number
  public readonly g: number
  public readonly b: number
  public readonly a: number

  constructor(r: number, g: number, b: number, a: number = 1) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
  }
}

export function toRGBString(color: Color) {
  const rgb = `${color.r}, ${color.g}, ${color.b}`
  return color.a ? `rgba(${rgb}, ${color.a})` : `rgb(${rgb})`
}

type ColorAsArray = [number, number, number, number | undefined]
type ParsableColor =
  | Color
  | string
  | ColorAsArray
  | { r: number; g: number; b: number; a?: number }

class ParseError extends Error {
  constructor(color: any) {
    super(`Failed to parse color ${color}`)
  }
}

export function parse(color: ParsableColor): Color {
  if (color instanceof Color) {
    return color
  }

  if (Array.isArray(color)) {
    const [r, g, b, a = 1] = color
    return new Color(r, g, b, a)
  }

  if (typeof color === "object" && color) {
    return new Color(color.r, color.g, color.b, color.a)
  }

  if (typeof color === "string") {
    if (color.startsWith("#")) {
      const matched = color.match(/[0-9a-f]{2}/gi)
      if (!matched || (matched.length !== 3 && matched.length !== 4)) {
        throw new ParseError(color)
      }

      return parse(matched.map((m, index) => {
        const value = parseInt(m, 16)
        return index === 3 ? value / 255 : value
      }) as ColorAsArray)
    }

    if (color.startsWith("rgb(") || color.startsWith("rgba(")) {
      const matched = color.match(/[0-9.]+/g)
      if (!matched) {
        throw new ParseError(color)
      }
      return parse(matched.map(m => parseFloat(m)) as ColorAsArray)
    }
  }

  throw new ParseError(color)
}

export function mix(
  colorStart: ParsableColor,
  colorEnd: ParsableColor,
  percent: number,
) {
  const parsedColorStart = parse(colorStart)
  const parsedColorEnd = parse(colorEnd)
  return new Color(
    parsedColorStart.r * (1 - percent) + parsedColorEnd.r * percent,
    parsedColorStart.g * (1 - percent) + parsedColorEnd.g * percent,
    parsedColorStart.b * (1 - percent) + parsedColorEnd.b * percent,
    parsedColorStart.a * (1 - percent) + parsedColorEnd.a * percent,
  )
}

export function interpolate(palette: ParsableColor[]) {
  palette = palette.map(parse)

  return (t: number) => {
    const idx = (palette.length - 1) * t
    const lIdx = Math.floor(idx)
    const rIdx = Math.ceil(idx)
    return mix(palette[lIdx], palette[rIdx], idx - lIdx)
  }
}
