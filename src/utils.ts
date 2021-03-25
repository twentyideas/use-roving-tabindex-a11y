import { nanoid } from 'nanoid'
import * as React from 'react'

export const useUUID = (prefix?: string) => {
  const [id] = React.useState(`${prefix ? prefix + '-' : ''}${nanoid(5)}`)
  return id
}

export const clampNumber = (num: number, a: number, b: number) =>
  Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b))
