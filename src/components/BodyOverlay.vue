<script setup lang="ts">
import { computed } from 'vue'

interface ComponentProperties {
  modelValue: boolean
  enableClose?: boolean
  backdropTheme?: 'transparent' | 'light' | 'dark'
  backdropTransitionName?: string | undefined
  slotTransitionName?: string | undefined,
  transitionDuration?: string
}

interface ComponentEmits {
  (e: 'update:modelValue', value: boolean): void
}

// eslint-disable-next-line vue/no-setup-props-destructure
const {
  modelValue,
  enableClose = true,
  backdropTheme = 'dark',
  backdropTransitionName = 'fade',
  slotTransitionName = undefined,
  transitionDuration = '250ms'
} = defineProps<ComponentProperties>()
const emit = defineEmits<ComponentEmits>()

const backdropClass = computed<string>(() => `-bg-${backdropTheme}`)

const handleBackdropClick = () => {
  if (enableClose) {
    emit('update:modelValue', false)
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition :name="backdropTransitionName">
      <div
        v-if="modelValue"
        class="overlay-backdrop"
        :class="backdropClass"
        :style="{'--transition-duration': transitionDuration}"
        @click="handleBackdropClick"
      />
    </Transition>

    <Transition :name="slotTransitionName">
      <slot v-if="modelValue" />
    </Transition>
  </Teleport>
</template>

<style scoped lang="postcss">
.overlay-backdrop {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  &.-bg-transparent {
    background-color: transparent;
  }

  &.-bg-light {
    background-color: rgb(255 255 255 / 80%);
  }

  &.-bg-dark {
    background-color: rgb(0 0 0 / 50%);
  }
}

/* vue transition class */
.fade-enter-active {
  transition-duration: var(--transition-duration);
  transition-property: opacity;
  transition-timing-function: linear;
}

.fade-leave-active {
  transition-duration: var(--transition-duration);
  transition-property: opacity;
  transition-timing-function: linear;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>
