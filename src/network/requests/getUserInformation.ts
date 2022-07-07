import { ResponseResult } from '@network/ResponseResult'

interface Data {
  message: string
  data: {
    id: number
    name: string
    photo: string
    is_media: 0 | 1
    intro: string
    ceti: string
    art_count: number
    follow_count: number
    fans_count: number
    like_count: number
  }
}

type GetUserInformation = (token: string) => Promise<ResponseResult>

const getUserInformation: GetUserInformation = async (token: string) => {
  const response = await fetch('/v1_0/user', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`
    }
  })

  if (response.ok) {
    return new ResponseResult('getUserInformation', 'success', response)
  } else {
    return new ResponseResult('getUserInformation', 'failure', response)
  }
}

export {
  getUserInformation
}

export type {
  Data
}
