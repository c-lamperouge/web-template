<script setup lang="ts">
// vue
import { $ref, $computed } from 'vue/macros'
import { defineAsyncComponent, onBeforeMount } from 'vue'
// style
import './assets/style/base.postcss'
import './assets/style/theme.postcss'
// for view select
import { getToken } from '@stores/dbStoreAuthorization'
// for view switch
import { ViewName, ViewTransitionType } from '@/AppViewSwitch'
import { useStore } from '@stores/view'
import gasp from 'gsap'
import SuspenseFallback from '@components/SuspenseFallback.vue'

// view dynamic component
const store = useStore()
const TestComp = defineAsyncComponent(() => import('@views/TheTest.vue'))
const LoginComp = defineAsyncComponent(() => import('@views/Login&SignIn/LoginView.vue'))
const MainComp = defineAsyncComponent(() => import('@views/main/MainView.vue'))
const dynComp = $computed(() => {
  switch (store.appActiveView) {
    case ViewName.Test:
      return TestComp
    case ViewName.Login:
      return LoginComp
    case ViewName.Main:
      return MainComp
    default:
      throw new Error('app view namee error')
  }
})

/* view switch transition */
// transition hook
const FALLBACK_TRANSITION_DURATION = 0.25
const VIEW_TRANSITION_DURATION = 0.5
const onBeforeEnter = (el: HTMLElement) => {
  if (el.dataset.viewName === undefined) {
    throw new Error('could not find dataset.viewName from the element')
  }

  if (el.dataset.viewName === ViewName.Fallback) {
    gasp.set(el, {
      opacity: 0
    })
  } else {
    switch (store.appViewTransitionType) {
      case ViewTransitionType.None:
        break
      case ViewTransitionType.SlideLeft:
        gasp.set(el, {
          xPercent: 100
        })
        break
      case ViewTransitionType.SlideRight:
        gasp.set(el, {
          xPercent: -100
        })
        break
      case ViewTransitionType.SlideUp:
        gasp.set(el, {
          yPercent: 100
        })
        break
      case ViewTransitionType.SlideDown:
        gasp.set(el, {
          yPercent: -100
        })
        break
      default:
        throw new Error('unknown view transition type')
    }
  }
}
const onEnter = async (el: HTMLElement, done: any) => {
  if (el.dataset.viewName === undefined) {
    throw new Error('could not find dataset.viewName from the element')
  }

  if (el.dataset.viewName === ViewName.Fallback) {
    gasp.to(el, {
      opacity: 1,
      duration: FALLBACK_TRANSITION_DURATION,
      onComplete: done
    })
  } else {
    switch (store.appViewTransitionType) {
      // appViewTransitionType = None indicate this view is the first view
      // when render first view, previous fallback will be rendered certainly
      // so need to cooperate fallback leaving
      case ViewTransitionType.None:
        gasp.from(el, {
          opacity: 0,
          duration: FALLBACK_TRANSITION_DURATION,
          onComplete: done
        })
        break
      case ViewTransitionType.SlideLeft:
        gasp.to(el, {
          xPercent: 0,
          duration: VIEW_TRANSITION_DURATION,
          onComplete: done()
        })
        break
      case ViewTransitionType.SlideRight:
        gasp.to(el, {
          xPercent: 0,
          duration: VIEW_TRANSITION_DURATION,
          onComplete: done()
        })
        break
      case ViewTransitionType.SlideUp:
        gasp.to(el, {
          yPercent: 0,
          duration: VIEW_TRANSITION_DURATION,
          onComplete: done()
        })
        break
      case ViewTransitionType.SlideDown:
        gasp.to(el, {
          yPercent: 0,
          duration: VIEW_TRANSITION_DURATION,
          onComplete: done()
        })
        break
      default:
        throw new Error('unknown view transition type')
    }
  }
}
// fallback will influence view leave
let isFallbackEntering = $ref(false)
const handleSuspenseFallback = () => {
  isFallbackEntering = true
}
const handleSuspenseResolve = () => {
  isFallbackEntering = false
}
const onLeave = async (el: HTMLElement, done: any) => {
  if (el.dataset.viewName === undefined) {
    throw new Error('could not find dataset.viewName from the element')
  }

  if (el.dataset.viewName === ViewName.Fallback) {
    if (store.appViewTransitionType !== ViewTransitionType.None) {
      gasp.to(el, {
        delay: VIEW_TRANSITION_DURATION,
        onComplete: done
      })
    } else {
      done()
    }
  } else {
    if (isFallbackEntering) {
      // if the enter view is fallback, the leave view should wait
      gasp.to(el, {
        delay: FALLBACK_TRANSITION_DURATION,
        onComplete: done
      })
    } else {
      switch (store.appViewTransitionType) {
        case ViewTransitionType.None:
          done()
          break
        case ViewTransitionType.SlideLeft:
          gasp.to(el, {
            xPercent: -50,
            duration: VIEW_TRANSITION_DURATION,
            onComplete: done
          })
          break
        case ViewTransitionType.SlideRight:
          gasp.to(el, {
            xPercent: 50,
            duration: VIEW_TRANSITION_DURATION,
            onComplete: done
          })
          break
        case ViewTransitionType.SlideUp:
          gasp.to(el, {
            yPercent: -50,
            duration: VIEW_TRANSITION_DURATION,
            onComplete: done
          })
          break
        case ViewTransitionType.SlideDown:
          gasp.to(el, {
            yPercent: 50,
            duration: VIEW_TRANSITION_DURATION,
            onComplete: done
          })
          break
        default:
          throw new Error('unknown view transition type')
      }
    }
  }
}

/* simple routing */
onBeforeMount(async () => {
  try {
    await getToken()
    // go to test
    history.pushState(ViewName.Main, 'main', '/main')
    store.appActiveView = ViewName.Main
  } catch (e) {
    // go to login
    history.pushState(ViewName.Login, 'login', '/login')
    store.appActiveView = ViewName.Login
  }
})
</script>

<template>
  <div class="app-view-transition-container">
    <Transition
      :css="false"
      appear
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
    >
      <Suspense
        timeout="400"
        @fallback="handleSuspenseFallback"
        @resolve="handleSuspenseResolve"
      >
        <component :is="dynComp" />

        <template #fallback>
          <SuspenseFallback :data-view-name="ViewName.Fallback" />
        </template>
      </Suspense>
    </Transition>
  </div>
</template>

<style scoped lang="postcss">
.app-view-transition-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
</style>
