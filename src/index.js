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

    issue.summary = normalizationPipeline.process(issue.summary)
    issue.description = normalizationPipeline.process(issue.description)

    issue.comments = issue.comments.map((comment) => {
      return normalizationPipeline.process(comment)
    })

    console.log(JSON.stringify(issue))
  })
