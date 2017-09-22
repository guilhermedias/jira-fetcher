import clone from 'clone'

export class Pipeline {
  constructor(stages=[]) {
    this.stages = stages
  }

  pipe(stage) {
    let stagesClone = clone(this.stages)

    stagesClone.push(stage)

    return new Pipeline(stagesClone)
  }

  process(matter) {
    var transformedMatter = matter

    this.stages.forEach((stage) => {
      transformedMatter = stage.execute(transformedMatter)
    })

    return transformedMatter
  }
}
