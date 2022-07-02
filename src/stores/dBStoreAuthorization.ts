import { openAppDB } from '@stores/openDB'

const getToken = async () => {
  const db = await openAppDB()
  const transaction = db.transaction('authorization')
  const token = await transaction.store.get('token')
  transaction.done.catch(reason => {
    console.error(reason)
  })
  db.close()

  if (token === undefined) {
    throw new Error('indexedDB token not found')
  }

  return token
}

const updateToken = async (newToken: string) => {
  const db = await openAppDB()
  const transaction = db.transaction('authorization', 'readwrite')
  transaction.store.put(newToken, 'token')
  transaction.done.catch(reason => {
    console.error(reason)
  })
  db.close()
}

const getRefreshToken = async () => {
  const db = await openAppDB()
  const transaction = db.transaction('authorization')
  const refreshToken = await transaction.store.get('refreshToken')
  transaction.done.catch(reason => {
    console.error(reason)
  })
  db.close()

  if (refreshToken === undefined) {
    throw new Error('indexedDB refresh token not found')
  }

  return refreshToken
}

export {
  getToken,
  updateToken,
  getRefreshToken
}
