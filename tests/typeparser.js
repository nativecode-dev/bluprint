const expect = require('chai').expect

const schema = require('./artifacts/schema')

const parsers = require('../lib/parsers')
const types = require('../lib/types')

describe('when using {TypeParser}', () => {
  describe('to resolve type strings to {TypeDefinitions}', () => {
    it('should get `date` type', () => {
      const typedef = types.Resolve('date')
      expect(typedef.type).of.equal('Date')
    })
    it('should get `function` type', () => {
      const typedef = types.Resolve('function')
      expect(typedef.type).of.equal('Function')
    })
    it('should get `number` type', () => {
      const typedef = types.Resolve('number')
      expect(typedef.type).of.equal('Number')
    })
    it('should get `regex` type', () => {
      const typedef = types.Resolve('regex')
      expect(typedef.type).of.equal('RegExp')
    })
    it('should get `string` type', () => {
      const typedef = types.Resolve('string')
      expect(typedef.type).of.equal('String')
    })
  })

  describe('to parse strings to {TypeDefinition}', () => {
    it('should parse string with max set', () => {
      const typedef = parsers.TypeParser.from('string:256')
      expect(typedef.max).to.equal(256)
      expect(typedef.type).to.equal('String')
    })
  })
})
