export default class {
  constructor(client) {
    this.client = client
  }

  fetchIssue(issueId) {
    return this.client.fetchIssue(issueId)
      .then((response) => {
        let issue = JSON.parse(response)
        let issueContent = issue.fields

        let originalComments = issueContent.comment.comments

        let comments = originalComments.map((comment) => {
          return comment.body
        })

        return {
          summary: issue.fields.summary,
          description: issue.fields.description,
          comments: comments
        }
      })
  }
}
