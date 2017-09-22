import clone from 'clone'

export class Pipeline {
  constructor(matter, stages=[]) {
    this.matter = matter
    this.stages = stages
  }

  pipe(stage) {
    let matterClone = clone(this.matter)
    let stagesClone = clone(this.stages)

    stagesClone.push(stage)

    return new Pipeline(matterClone, stagesClone)
  }

  collect() {
    var transformedMatter = this.matter

    this.stages.forEach((stage) => {
      transformedMatter = stage.execute(transformedMatter)
    })

    return transformedMatter
  }
}
