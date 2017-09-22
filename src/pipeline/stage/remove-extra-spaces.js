export default {
  execute: (string) => {
    return string.replace( /[\s]+/g, ' ' ).trim()
  }
}
