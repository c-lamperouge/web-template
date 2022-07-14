import { defineStore } from 'pinia'
import { ViewName, ViewTransitionType } from '@/AppViewSwitch'

type Id = 'view'

interface State {
  appActiveView: ViewName
  appViewTransitionType: ViewTransitionType
}

interface Acttions {
}

const useStore = defineStore<Id, State, {}, Acttions>('view', {
  state: () => ({
    appActiveView: ViewName.Pending,
    appViewTransitionType: ViewTransitionType.None
  }),

  actions: {
  }
})

export {
  useStore
}
