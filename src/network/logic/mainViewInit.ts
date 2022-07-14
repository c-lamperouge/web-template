import { match } from 'ts-pattern'
import { updateUserInformation } from '@stores/dBStoreUserInformation'
import { postToken2GetProfile } from '@network/requests/postToken2GetProfile'
import type { Data } from '@network/requests/postToken2GetProfile'
import { MultipleResponseResult } from '@network/ResponseResult'

type MainViewInit = (token: string) => Promise<MultipleResponseResult>

const multipleResponseResult = new MultipleResponseResult('autogetUserInformation')

const mainViewInit: MainViewInit = async () => {
  return match(await postToken2GetProfile())
    .with({ responseType: 'success' }, async result => {
      multipleResponseResult.enqueue(result)
      multipleResponseResult.succeed()

      const data: Data = await result.responseContent.json()
      await updateUserInformation({
        id: data.data.userId,
        mobile: data.data.mobile,
        userName: data.data.username,
        companyName: data.data.company,
        companyId: data.data.companyId
      })

      return multipleResponseResult
    })
    .with({ responseType: 'failure' }, result => {
      multipleResponseResult.enqueue(result)
      multipleResponseResult.fail()
      return multipleResponseResult
    })
    .exhaustive()
}

export {
  mainViewInit
}
