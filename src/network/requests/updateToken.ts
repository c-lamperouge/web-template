import { baseURL } from '@network/URL'
import { ResponseResult } from '@network/ResponseResult'

interface Data {
  message: string
  data: {
    token: string
  }
}

type UpdateToken = (refreshToken: string) => Promise<ResponseResult>

const updateToken: UpdateToken = async (refreshToken) => {
  const response = await fetch(`${baseURL}/v1_0/authorizations`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${refreshToken}`
    }
  })

  if (response.ok) {
    return new ResponseResult('updateToken', 'success', response)
  } else {
    return new ResponseResult('updateToken', 'failure', response)
  }
}

export {
  updateToken
}

export type {
  Data
}
