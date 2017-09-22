import {expect} from 'chai'

import toLowerCase from './to-lower-case'

describe('The toLowerCase stage', () => {
  it('converts a string to lower case', () => {
    let stageResult = toLowerCase.execute('STRING')

    expect(stageResult).to.be.deep.equal('string')
  })
})
