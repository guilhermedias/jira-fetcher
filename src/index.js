import JiraClient from './jira/client'
import JiraService from './jira/service'

let jiraClient = new JiraClient('https://jira.atlassian.com/rest/api/latest')
let jiraService = new JiraService(jiraClient)

jiraService.fetchIssue('JRA-9')
  .then((issue) => {
    console.log(issue)
  })
