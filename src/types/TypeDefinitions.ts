import * as vcr from '@nofrills/vcr'

import { TypeDefinition } from './TypeDefinition'

const log: vcr.VCR = new vcr.VCR(`nativecode:bluprint:types`).use(vcr.Debug)

interface TypeDefinitions {
  [key: string]: TypeDefinition
}

const PATTERN = {
  BASE64: `^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$`,
  EMAIL: `^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$`,
  PHONE: `^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$`,
  URI: `(?:(\w+):\/\/)(?:(\w+:['"]?\w+?['"]?)@)?([\w\-\.]+)+(\/[\w\/]+\/?)?(?:[\/\?]?([\w\=\&'"]+)?)`,
}

const validate = (value: string, regex: string, flags?: string | undefined): boolean => {
  const regexp = new RegExp(regex, flags)
  log.debug(regex, flags)
  return regexp.test(value)
}

const TypeDefinitions: TypeDefinitions = {
  array: {
    nullable: true,
    property: 'max',
    type: 'Array',
  },
  base64: {
    nullable: true,
    type: 'Base64',
    validator: (value: string) => validate(value, PATTERN.BASE64),
  },
  boolean: {
    nullable: true,
    type: 'Boolean',
  },
  date: {
    default: () => new Date(),
    nullable: true,
    type: 'Date',
  },
  email: {
    max: 4096,
    min: 6,
    nullable: true,
    property: 'max',
    type: 'email',
    typebase: 'string',
    validator: (value: string) => validate(value, PATTERN.EMAIL),
  },
  error: {
    nullable: true,
    type: 'Error',
    validator: (value: Error) => (value instanceof Error),
  },
  function: {
    nullable: true,
    type: 'Function',
  },
  number: {
    nullable: true,
    type: 'Number',
  },
  object: {
    nullable: true,
    type: 'Object',
  },
  phone: {
    max: 32,
    min: 8,
    nullable: true,
    type: 'phone',
    typebase: 'string',
    validator: (value: string) => validate(value, PATTERN.PHONE, 'i'),
  },
  regex: {
    nullable: true,
    type: 'RegExp',
  },
  string: {
    nullable: true,
    property: 'max',
    type: 'String',
  },
  symbol: {
    nullable: true,
    type: 'Symbol',
  },
  timestamp: {
    default: () => Date.now(),
    nullable: true,
    type: 'number',
  },
  url: {
    max: 4096,
    min: 2,
    nullable: true,
    type: 'url',
    typebase: 'string',
    validator: (value: string) => validate(value, PATTERN.URI),
  }
}

export const Register = (name: string, typedef: TypeDefinition): void => {
  TypeDefinitions[name] = typedef
}

export const Resolve = (name: string): TypeDefinition => {
  return TypeDefinitions[name]
}
