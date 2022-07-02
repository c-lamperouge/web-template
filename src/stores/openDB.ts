import { openDB, DBSchema } from 'idb'
import type { ViewPath } from '@views/viewPath'

interface DB extends DBSchema {
  view: {
    key: 'viewPath'
    value: ViewPath
  }
  authorization: {
    key: 'token' | 'refreshToken'
    value: string
  }
  userInformation: {
    key: 'id' | 'name' | 'avatarUrl' | 'isWeMedia' | 'introduction' | 'certification'
      | 'articleCount' | 'followerCount' | 'fansCount' | 'likeCount'
    value: string | number | boolean
  }
}

const openAppDB = async () => {
  const db = await openDB<DB>('headline-mobile', 1, {
    blocked: () => {
      // seems an older version of this app is running in another tab
      window.alert('Please close this app opened in other browser tabs.')
    },

    blocking: () => {
      // seems the user just opened this app again in a new tab
      // which happens to have gotten a version change
      window.alert('App is outdated, please close this tab')
      location.reload()
    },

    upgrade: (db, oldVersion, newVersion, transaction) => {
      if (oldVersion === 0 && newVersion === 1) {
        db.createObjectStore('view')
        db.createObjectStore('authorization')
        db.createObjectStore('userInformation')
      } else {
        console.error('unknown database network version change')
      }

      transaction.done.catch(e => {
        console.error(e)
      })
    }
  })

  return db
}

export {
  openAppDB
}
