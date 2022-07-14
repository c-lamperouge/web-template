import { openAppDB } from '@stores/openDB'
import type { UserInformation } from '@stores/openDB'

const getUserInformation = async (id: string) => {
  const db = await openAppDB()
  const transaction = db.transaction('userInformation')
  const userInformation = await transaction.store.get(id)
  transaction.done.catch(reason => {
    console.error(reason)
  })
  db.close()

  if (userInformation === undefined) {
    throw new Error('indexedDB user information not found')
  }

  return userInformation
}

const updateUserInformation = async (newUserInformation: UserInformation) => {
  const db = await openAppDB()
  const transaction = db.transaction('userInformation', 'readwrite')
  transaction.store.put(newUserInformation, newUserInformation.id)
  transaction.done.catch(reason => {
    console.error(reason)
  })
  db.close()
}

export {
  getUserInformation,
  updateUserInformation
}
