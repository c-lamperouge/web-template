<script setup lang="ts">
// vue
import { $ref } from 'vue/macros'
// components
import IconMenu from '~icons/ic/round-menu'
import IconPerson from '~icons/ic/baseline-person'
import DialogBackdrop from '@components/DialogBackdrop.vue'
// for view switch
import { ViewName } from '@/AppViewSwitch'
// for aside
let isShowAside = $ref(false)

const switchAside = () => {
  isShowAside = !isShowAside
}
</script>

<template>
  <div
    class="main-view"
    :data-view-name="ViewName.Test"
  >
    <header>
      <div class="header-left">
        <IconMenu
          class="icon-block"
          @click="switchAside"
        />
      </div>

      <div class="header-center">
        header
      </div>

      <div class="header-right">
        <IconPerson class="icon-block" />
      </div>
    </header>

    <DialogBackdrop
      v-model="isShowAside"
      slot-transition-name="aside-slide"
    >
      <aside>
        aside
      </aside>
    </DialogBackdrop>

    <main>main</main>
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

header {
  display: block flex;
  height: 36px;
  justify-content: space-between;
  background-color: var(--theme-color);
  box-shadow: 0 3px 6px 0 rgb(0 0 0 / 24%);
  color: white;
}

.icon-block {
  border-radius: 2px;
  font-size: 20px;
  transition: background-color 0.25s linear 0s;

  &:hover {
    background-color: hsl(var(--theme-hue) var(--theme-saturation) 58%);
    cursor: pointer;
  }

  &:active {
    background-color: hsl(var(--theme-hue) var(--theme-saturation) 70%);
  }
}

.header-left {
  display: block flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
}

.header-center {
  display: block flex;
  align-items: center;
  justify-content: center;
}

.header-right {
  display: block flex;
  align-items: center;
  justify-content: center;
  padding-right: 10px;
}

main {
  display: block flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
}

aside {
  position: absolute;
  top: 0;
  left: 0;
  display: block flex;
  width: 300px;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: white;
  box-shadow: 3px 0 6px 0 rgb(0 0 0 / 30%);
}

.aside-slide-enter-active {
  transform: translateX(0);
  transition: transform 0.25s ease-out 0s;
}

.aside-slide-leave-active {
  transform: translateX(0);
  transition: transform 0.25s ease-in 0s;
}

.aside-slide-enter-from {
  transform: translateX(-100%);
}

.aside-slide-leave-to {
  transform: translateX(-100%);
}
</style>
