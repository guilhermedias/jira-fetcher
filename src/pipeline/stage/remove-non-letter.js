export default {
  execute: (string) => {
    return string
      .replace(/_/g, '')
      .replace(/[^\w\s]/g, '')
  }
}
