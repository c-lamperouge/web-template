<script setup lang="ts">
import { $ref, $computed } from 'vue/macros'
import { RefreshState } from './SlideList'

// css bind
let translateY = $ref(0)
interface CssBind {
  translateY: string
}
const cssBind = $computed<CssBind>(() => ({
  translateY: `${translateY}px`
}))

// slide down refresh implement
let isListContainerEnableTransform = $ref(false)
const handleListContainerMouseDown = () => {
  isListContainerEnableTransform = true
}

let refreshState = $ref<RefreshState>(RefreshState.SlideDownToRefresh)
let isListContainerTransformTransition = $ref(false)
const handleListContainerMouseMove = (e: MouseEvent) => {
  if (!isListContainerEnableTransform) {
    return
  }

  // isListContainerEnableTransform = true
  isListContainerTransformTransition = false

  const movementY = e.movementY
  if (movementY <= 0) {
    return
  }

  // movementY > 0
  translateY += movementY
  if (translateY + movementY >= 100) {
    refreshState = RefreshState.MouseUpToRefresh
  } else {
    refreshState = RefreshState.SlideDownToRefresh
  }
}

const handleListContainerTransformCancel = () => {
  isListContainerEnableTransform = false
  isListContainerTransformTransition = true

  if (translateY >= 100) {
    refreshState = RefreshState.Refreshing
  }

  translateY = 0
}
</script>

<template>
  <div class="slide-list">
    <slot
      name="refresh"
      :state="refreshState"
    />

    <div
      class="list-container"
      :class="{'transform-transition': isListContainerTransformTransition}"
      @mousedown="handleListContainerMouseDown()"
      @mousemove="handleListContainerMouseMove($event)"
      @mouseup="handleListContainerTransformCancel()"
      @mouseleave="handleListContainerTransformCancel()"
    >
      <slot />

      <slot name="more" />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.slide-list {
  position: relative;
  flex: 1;
  overflow-y: hidden;
}

.list-container {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  box-shadow: var(--shadow-separate);
  overflow-y: auto;
  transform: translateY(v-bind("cssBind.translateY"));
}

.transform-transition {
  transition: transform 0.25s ease-out 0s;
}
</style>
