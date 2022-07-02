import { match } from 'ts-pattern'
import { openAppDB } from '@stores/openDB'
import { getAuthorization } from '@network/requests/getAuthorization'
import type { Data as AuthorizationData } from '@network/requests/getAuthorization'
import { getUserInformation } from '@network/requests/getUserInformation'
import type { Data } from '@network/requests/getUserInformation'
import { MultipleResponseResult } from '@network/ResponseResult'

type Login = (phoneNumber: string, verificationCode: string) => Promise<MultipleResponseResult>

const multipleResponseResult = new MultipleResponseResult('login')

const login: Login = async (phoneNumber, verificationCode) => {
  return match(await getAuthorization(phoneNumber, verificationCode))
    .with({ responseType: 'success' }, async result => {
      multipleResponseResult.enqueue(result)
      const token = await updateStoreAuthorization(result.responseContent)

      return match(await getUserInformation(token))
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
    })
    .otherwise(result => {
      multipleResponseResult.enqueue(result)
      multipleResponseResult.fail()
      return multipleResponseResult
    })
}

const updateStoreAuthorization = async (response: Response) => {
  const data: AuthorizationData = await response.json()
  const token = data.data.token
  const refreshToken = data.data.refresh_token

  const db = await openAppDB()
  const transaction = db.transaction(['authorization', 'view'], 'readwrite')
  transaction.objectStore('authorization').put(token, 'token')
  transaction.objectStore('authorization').put(refreshToken, 'refreshToken')
  transaction.objectStore('view').put('/main', 'viewPath')
  transaction.done.catch(e => {
    console.error(e)
  })
  db.close()

  return token
}

export {
  login
}

export type {
  Data
}
