import sinon from 'sinon'
import {expect} from 'chai'

import {Pipeline} from './pipeline'

describe('The pipeline pipe method', () => {
  var pipeline

  beforeEach(() => {
    pipeline = new Pipeline()
  })

  it('creates a new pipeline', () => {
    let stage = {
      execute: 'Execute method'
    }

    let newPipeline = pipeline.pipe(stage)

    expect(newPipeline).to.not.equal(pipeline)
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

describe('The pipeline process method', () => {
  var pipeline

  beforeEach(() => {
    pipeline = new Pipeline()
  })

  it('feeds the process matter to the first stage', () => {
    let spy = sinon.spy()

    let stage = {
      execute: spy
    }

    pipeline
      .pipe(stage)
      .process({
        value: 'Matter'
      })

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
      .process()

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
      .process()

    sinon.assert.calledWith(stub1, {
      value: 'Matter 0'
    })
    sinon.assert.calledWith(stub2, {
      value: 'Matter 1'
    })
  })

  it('returns the last stage result', () => {
    let stub = sinon.stub().returns({
      value: 'Matter'
    })

    let stage = {
      execute: stub
    }

    let result =pipeline
      .pipe(stage)
      .process()

    expect(result).to.be.deep.equal({
      value: 'Matter'
    })
  })
})
