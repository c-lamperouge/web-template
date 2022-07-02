class ResponseResult {
  requestName: string
  responseType: 'success' | 'failure'
  responseContent: Response

  constructor (requestName: string, responseType: 'success' | 'failure', responseContent: Response) {
    this.requestName = requestName
    this.responseType = responseType
    this.responseContent = responseContent
  }
}

class MultipleResponseResult {
  requestName: string
  responseType: 'success' | 'failure' | 'pending'
  responseResultQueue: Array<ResponseResult>

  constructor (requestName: string) {
    this.requestName = requestName
    this.responseType = 'pending'
    this.responseResultQueue = []
  }

  enqueue (responseResult: ResponseResult) {
    this.responseResultQueue.push(responseResult)
  }

  concat (multipleResponseResult: MultipleResponseResult) {
    this.responseResultQueue.concat(multipleResponseResult.responseResultQueue)
  }

  lastContent () {
    return (this.responseResultQueue.at(-1) as ResponseResult).responseContent
  }

  len () {
    return this.responseResultQueue.length
  }

  succeed () {
    this.responseType = 'success'
  }

  fail () {
    this.responseType = 'failure'
  }
}

export {
  ResponseResult,
  MultipleResponseResult
}
