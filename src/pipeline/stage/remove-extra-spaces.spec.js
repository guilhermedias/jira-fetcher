import {expect} from 'chai'

import removeExtraSpaces from './remove-extra-spaces'

describe('The removeExtraSpaces stage', () => {
  it('removes inner extra spaces', () => {
    let stageResult = removeExtraSpaces.execute('remove  extra  spaces')

    expect(stageResult).to.be.deep.equal('remove extra spaces')
  })

  it('removes leading spaces', () => {
    let stageResult = removeExtraSpaces.execute('  remove leading spaces')

    expect(stageResult).to.be.deep.equal('remove leading spaces')
  })

  it('removes trailing spaces', () => {
    let stageResult = removeExtraSpaces.execute('remove trailing spaces  ')

    expect(stageResult).to.be.deep.equal('remove trailing spaces')
  })

  it('removes tabs', () => {
    let stageResult = removeExtraSpaces.execute('\tremove\ttabs\t')

    expect(stageResult).to.be.deep.equal('remove tabs')
  })

  it('removes line breaks', () => {
    let stageResult = removeExtraSpaces.execute('\n\rremove\n\rline\n\rbreaks\n\r')

    expect(stageResult).to.be.deep.equal('remove line breaks')
  })
})
