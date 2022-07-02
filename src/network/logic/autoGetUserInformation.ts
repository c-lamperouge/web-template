import { match } from 'ts-pattern'
import { openAppDB } from '@stores/openDB'
import { getUserInformation } from '@network/requests/getUserInformation'
import type { Data } from '@network/requests/getUserInformation'
import { updateToken } from '@network/requests/updateToken'
import { MultipleResponseResult } from '@network/ResponseResult'

type AutoGetUserInformation = (token: string) => Promise<MultipleResponseResult>

const multipleResponseResult = new MultipleResponseResult('autogetUserInformation')

const autogetUserInformation: AutoGetUserInformation = async (token: string) => {
  return match(await getUserInformation(token))
    .with({ responseType: 'success' }, result => {
      multipleResponseResult.enqueue(result)
      multipleResponseResult.succeed()
      return multipleResponseResult
    })
    .with({ responseType: 'failure' }, result => {
      return match(result.responseContent)
        .with({ status: 401 }, async () => {
          multipleResponseResult.enqueue(result)
          return await retryAfterRefreshToken()
        })
        .otherwise(() => {
          multipleResponseResult.enqueue(result)
          multipleResponseResult.fail()
          return multipleResponseResult
        })
    })
    .exhaustive()
}

const readRefreshToken = async () => {
  const db = await openAppDB()
  const transaction = db.transaction('authorization')
  const refreshToken = await transaction.store.get('refreshToken')
  transaction.done.catch(e => {
    console.error(e)
  })
  db.close()

  if (refreshToken === undefined) {
    throw new Error('when get new token network request, refresh token not found')
  }

  return refreshToken
}

const retryAfterRefreshToken = async () => {
  const refreshToken = await readRefreshToken()

  return match(await updateToken(refreshToken))
    .with({ responseType: 'success' }, result => {
      multipleResponseResult.enqueue(result)
      multipleResponseResult.succeed()
      return multipleResponseResult
    })
    .otherwise(result => {
      multipleResponseResult.enqueue(result)
      multipleResponseResult.fail()
      return multipleResponseResult
    })
}

export {
  autogetUserInformation
}

export type {
  Data
}
