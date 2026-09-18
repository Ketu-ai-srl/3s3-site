import { describe, expect, it } from 'vitest'
import stamp from '../src/content/_stamp.json'

describe('marcajul de livrare', () => {
  it('exista si are forma E0-xxxx sau E<n>-xxxx', () => {
    expect(stamp.marcaj).toMatch(/^E\d+-\d{4}$/)
  })
})
