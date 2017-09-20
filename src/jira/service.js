export default class {
  constructor(client) {
    this.client = client
  }

  fetchIssue(issueId) {
    return this.client.fetchIssue(issueId)
      .then((response) => {
        let issue = JSON.parse(response)

        return {
          summary: issue.fields.summary,
          description: issue.fields.description
        }
      })
  }
}
