import { baseURL } from '@network/URL'
import { ResponseResult } from '@network/ResponseResult'

interface Data {
  message: string
  data: {
    token: string
    refresh_token: string
  }
}

type GetAuthorization = (phoneNumber: string, verificationCode: string) => Promise<ResponseResult>

const getAuthorization: GetAuthorization = async (phoneNumber, verificationCode) => {
  const response = await fetch(`${baseURL}/v1_0/authorizations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      mobile: phoneNumber,
      code: verificationCode
    })
  })

  if (response.ok) {
    return new ResponseResult('getAuthorization', 'success', response)
  } else {
    return new ResponseResult('getAuthorization', 'failure', response)
  }
}

export {
  getAuthorization
}

export type {
  Data
}
