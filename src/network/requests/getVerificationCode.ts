import { baseURL } from '@network/URL'
import { ResponseResult } from '@network/ResponseResult'

interface Data {
  message: string
  data?: {
    number: string
  }
}

type GetVerificationCode = (phoneNumber: string) => Promise<ResponseResult>

const getVerificationCode: GetVerificationCode = async (phoneNumber) => {
  const response = await fetch(`${baseURL}/v1_0/sms/codes/${phoneNumber}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })

  if (response.ok) {
    return new ResponseResult('getVerificationCode', 'success', response)
  } else {
    return new ResponseResult('getVerificationCode', 'failure', response)
  }
}

export {
  getVerificationCode
}

export type {
  Data
}
