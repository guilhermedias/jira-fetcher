import JiraClient from './jira/client'
import JiraService from './jira/service'

import removeNonLetter from './pipeline/stage/remove-non-letter'
import removeExtraSpaces from './pipeline/stage/remove-extra-spaces'
import toLowerCase from './pipeline/stage/to-lower-case'
import {Pipeline} from './pipeline/pipeline'

let jiraClient = new JiraClient('https://jira.atlassian.com/rest/api/latest')
let jiraService = new JiraService(jiraClient)

jiraService.fetchIssue('JRA-9')
  .then((issue) => {
    let normalizationPipeline = new Pipeline()
      .pipe(removeNonLetter)
      .pipe(removeExtraSpaces)
      .pipe(toLowerCase)

    let normalizedSummary = normalizationPipeline.process(issue.summary)
    let normalizedDescription = normalizationPipeline.process(issue.description)

    console.log(`Summary: ${normalizedSummary}`)
    console.log(`Description: ${normalizedDescription}`)

    issue.comments.forEach((comment) => {
      console.log('Comment:')
      console.log(normalizationPipeline.process(comment))
    })
  })
