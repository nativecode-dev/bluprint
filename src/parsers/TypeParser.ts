import * as vcr from '@nofrills/vcr'
import * as types from '../types'

import { merge } from 'lodash'

import { Parser, ParserOptions } from './Parser'

export interface TypeParserOptions extends ParserOptions {
  property?: string
}

export class TypeParser extends Parser {
  public static from(typestr: string): types.TypeDefinition {
    return (new TypeParser()).parse(typestr)
  }

  public static realtype(name: string): types.TypeDefinition {
    const typedef = TypeParser.from(name)
    if (typedef.typebase) {
      return TypeParser.realtype(typedef.typebase)
    }
    return typedef
  }

  public static string(typedef: types.TypeDefinition): string {
    if (typedef.property && typedef[typedef.property]) {
      const value = typedef[typedef.property]
      return `${typedef.type}:${value}`
    }
    return typedef.type
  }

  public static type(name: string): types.TypeDefinition {
    return types.Resolve(name)
  }

  public static validate(typedef: types.TypeDefinition | string, value: any): boolean {
    const type: types.TypeDefinition = (typeof typedef === 'string')
      ? types.Resolve(typedef)
      : typedef

    if (typeof type.validator === 'function') {
      return type.validator(value)
    }
    return true
  }

  constructor(options?: TypeParserOptions) {
    super(merge({}, options, {
      namespace: 'type-parser'
    }))
  }

  public parse(value: string): types.TypeDefinition {
    const parts = value.split(':')
    const type = parts[0]
    const typedef = types.Resolve(type)

    if (parts.length === 1) {
      return merge({}, typedef)
    }
    return merge({}, typedef, this.properties(typedef, parts[1].split(',')))
  }

  private properties(typedef: types.TypeDefinition, properties: string[]): any {
    const options: TypeParserOptions = this.options as TypeParserOptions
    const results: { [key: string]: any } = {}
    properties.forEach((property) => {
      const parts: string[] = property.split('=')
      if (parts.length === 1 && typedef.property) {
        const value: string = parts[0]
        results[typedef.property] = this.convert(value)
      } else if (parts.length === 1) {
        const value: string = parts[0]
        this.log.error(`Don't know what to do with ${value}.`)
      } else if (parts.length === 2) {
        const key: string = options.property ? options.property : parts[0]
        const value: string = parts[1]
        results[key] = this.convert(value)
      }
    })
    return results
  }

  private convert(value: string): any {
    const int: number = Number(value)
    if (isNaN(int)) {
      return value
    }
    return int
  }
}
