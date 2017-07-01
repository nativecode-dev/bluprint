import { Schema } from './Schema'

export class Bluprint {
  private readonly schema: Schema

  constructor(schema: Schema) {
    this.schema = schema
  }
}
