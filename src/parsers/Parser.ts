import * as vcr from '@nofrills/vcr'

import { Logger } from '../Logging'

export interface ParserOptions {
  namespace?: string
}

export class Parser {
  protected readonly log: vcr.VCR
  protected readonly options: ParserOptions

  constructor(options?: ParserOptions) {
    const namespace = options && options.namespace ? options.namespace : 'parser'
    this.log = Logger.extend(namespace)
    this.options = options || {}
  }

  public parse(value: any): any {
    this.log.debug(value)
    return null
  }
}
