import { ResponseResult } from '@network/ResponseResult'
import { getToken } from '@stores/dBStoreAuthorization'

type PostToken2GetProfile = () => Promise<ResponseResult>

const postToken2GetProfile: PostToken2GetProfile = async () => {
  const token = await getToken()

  const response = await fetch('/sys/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`
    }
  })

  if (response.ok) {
    return new ResponseResult('postToken2GetProfile', 'success', response)
  } else {
    return new ResponseResult('postToken2GetProfile', 'failure', response)
  }
}

interface Data {
  success: boolean
  code: number
  message: string
  data: {
    userId: string
    mobile: string
    username: string
    company: string
    companyId: string
    roles: {
      apis: string[]
      menus: string[]
      points: string[]
    }
    authCacheKey?: null
  }
}

export {
  postToken2GetProfile
}

export type {
  Data
}
