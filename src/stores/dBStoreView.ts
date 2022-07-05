// import { openAppDB } from '@stores/openDB'
// import type { ViewPath } from '@views/viewPath'

// const getViewPath = async () => {
//   const db = await openAppDB()
//   const transaction = db.transaction('view')
//   const viewPath = await transaction.store.get('viewPath')
//   transaction.done.catch(reason => {
//     console.error(reason)
//   })
//   db.close()

//   if (viewPath === undefined) {
//     throw new Error('indexedDB viewPath not found')
//   }

//   return viewPath
// }

// type UpdateViewPath = (newPath: ViewPath) => void

// const updateViewPath: UpdateViewPath = async (newPath) => {
//   const db = await openAppDB()
//   const transaction = db.transaction('view', 'readwrite')
//   transaction.store.put(newPath, 'viewPath')
//   transaction.done.catch(reason => {
//     console.error(reason)
//   })
//   db.close()
// }

// export {
//   getViewPath,
//   updateViewPath
// }
