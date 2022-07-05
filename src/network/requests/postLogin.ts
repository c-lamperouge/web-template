import { baseURL } from '@network/URL'
import { ResponseResult } from '@network/ResponseResult'

type PostLogin = (mobile: string, password: string) => Promise<ResponseResult>

const postLogin: PostLogin = async (mobile, password) => {
  const response = await fetch(`${baseURL}/sys/login`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      mobile,
      password
    })
  })

  if (response.ok) {
    return new ResponseResult('postLogin', 'success', response)
  } else {
    return new ResponseResult('postLogin', 'failure', response)
  }
}

interface Data {
  success: boolean
  code: number
  message: string
  // this data is token
  data: string
}

export {
  postLogin
}

export type {
  Data
}
