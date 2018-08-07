
export type Entry = [number, number]

export interface ISerie {
  name: string
  data: Entry[]
  color: string
}

export interface ISerieConfiguration {
  name?: string
  data: Entry[]
  color?: string
}

