import request from 'request-promise'

export default class {
  constructor(host) {
    this.host = host
  }

  fetchIssue(issueId) {
    let url = `${this.host}/issue/${issueId}`
    return request(url)
  }
}
