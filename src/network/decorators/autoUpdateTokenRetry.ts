import { match } from 'ts-pattern'
import { getRefreshToken, updateToken as dbUpdateToken } from '@stores/dBStoreAuthorization'
import { updateToken } from '@network/requests/updateToken'
import type { Data } from '@network/requests/updateToken'
import { MultipleResponseResult, ResponseResult } from '@network/ResponseResult'

type RequestFunction = (...args: any[]) => Promise<ResponseResult>

type AutoUpdateTokenRetry =
  <T extends RequestFunction>(f: T) =>
  (...args: Parameters<T>) => Promise<MultipleResponseResult>

const autoUpdateTokenRetry: AutoUpdateTokenRetry = (f) => {
  const multipleResponseResult = new MultipleResponseResult('autoUpdateTokenRetry')

  return async (...args) => {
    return match(await f(...args))
      .with({ responseType: 'success' }, result => {
        multipleResponseResult.enqueue(result)
        multipleResponseResult.succeed()
        return multipleResponseResult
      })
      .with({ responseType: 'failure' }, result => {
        return match(result.responseContent)
          .with({ status: 401 }, async () => {
            multipleResponseResult.enqueue(result)
            return await retryAfterRefreshToken(multipleResponseResult)
          })
          .otherwise(() => {
            multipleResponseResult.enqueue(result)
            multipleResponseResult.fail()
            return multipleResponseResult
          })
      })
      .exhaustive()
  }
}

type RetryAfterRefreshToken = (multipleResponseResult: MultipleResponseResult) => Promise<MultipleResponseResult>

const retryAfterRefreshToken: RetryAfterRefreshToken = async (multipleResponseResult) => {
  const refreshToken = await getRefreshToken()

  return match(await updateToken(refreshToken))
    .with({ responseType: 'success' }, async result => {
      multipleResponseResult.enqueue(result)
      multipleResponseResult.succeed()
      // update indexdb token
      const data: Data = await result.responseContent.json()
      dbUpdateToken(data.data.token)

      return multipleResponseResult
    })
    .otherwise(result => {
      multipleResponseResult.enqueue(result)
      multipleResponseResult.fail()
      return multipleResponseResult
    })
}

export {
  autoUpdateTokenRetry
}
