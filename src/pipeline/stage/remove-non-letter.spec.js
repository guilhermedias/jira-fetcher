import {expect} from 'chai'

import removeNonLetter from './remove-non-letter'

describe('The removeNonLetter stage', () => {
  it('removes non letter characters', () => {
    let stageResult = removeNonLetter.execute('_remove_ *non* |letter| [characters]')

    expect(stageResult).to.be.deep.equal('remove non letter characters')
  })
})
