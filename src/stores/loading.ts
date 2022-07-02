import { defineStore } from 'pinia'

type Id = 'loading'

interface State {
  isLoading: boolean
}

interface Acttions {
}

const useStore = defineStore<Id, State, {}, Acttions>('loading', {
  state: () => ({
    isLoading: false
  }),

  actions: {
  }
})

export {
  useStore
}
