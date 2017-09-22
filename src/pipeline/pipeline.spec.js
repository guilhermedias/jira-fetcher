import sinon from 'sinon'
import {expect} from 'chai'

import {Pipeline} from './pipeline'

describe('The pipeline pipe method', () => {
  var pipeline

  beforeEach(() => {
    pipeline = new Pipeline({
      value: 'Matter'
    })
  })

  it('creates a new pipeline', () => {
    let stage = {
      execute: 'Execute method'
    }

    let newPipeline = pipeline.pipe(stage)

    expect(newPipeline).to.not.equal(pipeline)
  })

  it('copies the matter', () => {
    let stage = {
      execute: 'Execute method'
    }

    let newPipeline = pipeline.pipe(stage)

    let oldMatter = pipeline.matter
    let newMatter = newPipeline.matter

    expect(newMatter).to.not.equal(oldMatter)
    expect(newMatter).to.deep.equal(oldMatter)
  })

  it('adds piped stages in order', () => {
    let stage0 = {
      execute: 'Stage 0'
    }
    let stage1 = {
      execute: 'Stage 1'
    }

    let newPipeline = pipeline
      .pipe(stage0)
      .pipe(stage1)

    expect(newPipeline.stages).to.have.deep.ordered.members([stage0, stage1])
  })
})

describe('The pipeline collect method', () => {
  var pipeline

  beforeEach(() => {
    pipeline = new Pipeline({
      value: 'Matter'
    })
  })

  it('feeds the pipeline matter to the first stage', () => {
    let spy = sinon.spy()

    let stage = {
      execute: spy
    }

    pipeline
      .pipe(stage)
      .collect()

    sinon.assert.calledWith(spy, {
      value: 'Matter'
    })
  })

  it('calls the pipeline stages in order', () => {
    let spy0 = sinon.spy()
    let spy1 = sinon.spy()

    let stage0 = {
      execute: spy0
    }
    let stage1 = {
      execute: spy1
    }

    pipeline
      .pipe(stage0)
      .pipe(stage1)
      .collect()

    sinon.assert.callOrder(spy0, spy1)
  })

  it('feeds previous stage output to next the stage', () => {
    let stub0 = sinon.stub().returns({
      value: 'Matter 0'
    })
    let stub1 = sinon.stub().returns({
      value: 'Matter 1'
    })
    let stub2 = sinon.stub().returns({
      value: 'Matter 2'
    })

    let stage0 = {
      execute: stub0
    }
    let stage1 = {
      execute: stub1
    }
    let stage2 = {
      execute: stub2
    }

    pipeline
      .pipe(stage0)
      .pipe(stage1)
      .pipe(stage2)
      .collect()

    sinon.assert.calledWith(stub1, {
      value: 'Matter 0'
    })
    sinon.assert.calledWith(stub2, {
      value: 'Matter 1'
    })
  })

  it('returns the last stage result', () => {
    let stub = sinon.stub().returns({
      value: 'Matter 1'
    })

    let stage = {
      execute: stub
    }

    let result =pipeline
      .pipe(stage)
      .collect()

    expect(result).to.be.deep.equal({
      value: 'Matter 1'
    })
  })
})
