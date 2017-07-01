import { TypeDefinition } from './types'

export interface Schema {
  [key: string]: any | TypeDefinition
}
