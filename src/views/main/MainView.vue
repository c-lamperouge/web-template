<script setup lang="ts">
// vue
import { $ref } from 'vue/macros'
// components
import TheHeader from './TheHeader.vue'
import TheAside from './TheAside.vue'
import TheMain from './TheMain.vue'
// for view switch
import { useStore } from '@stores/view'
import { ViewName, ViewTransitionType } from '@/AppViewSwitch'
// network
import { postToken2GetProfile } from '@network/requests/postToken2GetProfile'
import type { Data } from '@network/requests/postToken2GetProfile'
import { match } from 'ts-pattern'

// for aside
let isShowAside = $ref(false)
const isAsidePinned = $ref(false)
const switchAside = () => {
  isShowAside = !isShowAside
}

// network request
let userName = $ref('User')
const store = useStore()
try {
  match(await postToken2GetProfile())
    .with({ responseType: 'success' }, async result => {
      const data: Data = await result.responseContent.json()
      console.log(data)
      userName = data.data.username
    })
    .with({ responseType: 'failure', responseContent: { status: 401 } }, () => {
      // token expired, back to login view
      history.pushState(ViewName.Login, 'login', '/login')
      store.appViewTransitionType = ViewTransitionType.SlideDown
      store.appActiveView = ViewName.Login
    })
    .otherwise(result => {
      console.log(result)
    })
} catch (e) {
  console.log(e)
}
</script>

<template>
  <div
    class="main-view"
    :data-view-name="ViewName.Main"
  >
    <TheHeader
      :user-name="userName"
      @switch-aside="switchAside"
    />

    <TheAside
      v-model="isShowAside"
      :is-pinned="isAsidePinned"
    />

    <TheMain />
  </div>
</template>

<style scoped lang="postcss">
.main-view {
  position: absolute;
  display: block flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: white;
  box-shadow: var(--shadow-layer);
  overflow-y: auto;
}
</style>
