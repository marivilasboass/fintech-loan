export class ResponseError extends Error {
  constructor (response) {
    super(response.statusText)
    this.response = response
  }
}
