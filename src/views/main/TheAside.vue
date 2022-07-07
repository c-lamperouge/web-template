<script setup lang="ts">
import { $computed } from 'vue/macros'
import DialogBackdrop from '@components/DialogBackdrop.vue'
import IconPushPin from '~icons/ic/baseline-push-pin'
import IconPinOff from '~icons/ic/baseline-pin-off'
import IconClose from '~icons/ic/baseline-close'

interface ComponentProperties {
  modelValue: boolean
  isPinned: boolean
}
interface ComponentEmits {
  (e: 'update:modelValue', newValue: boolean): void
}
const props = defineProps<ComponentProperties>()
const emit = defineEmits<ComponentEmits>()

const isShowAside = $computed<boolean>({
  get () {
    return props.modelValue
  },
  set (newValue: boolean) {
    emit('update:modelValue', newValue)
  }
})
</script>

<template>
  <DialogBackdrop
    v-model="isShowAside"
    slot-transition-name="aside-slide"
  >
    <aside>
      <div class="aside-head">
        <IconPushPin
          v-if="props.isPinned"
          class="icon"
        />
        <IconPinOff
          v-else
          class="icon"
        />

        <div class="title">
          aside head
        </div>

        <IconClose
          class="icon"
          @click="isShowAside = false"
        />
      </div>

      <ul class="aside-body">
        <li class="active">
          Dashboard
        </li>

        <li>Form</li>
      </ul>
    </aside>
  </DialogBackdrop>
</template>

<style scoped lang="postcss">
aside {
  position: absolute;
  top: 0;
  left: 0;
  display: block flex;
  width: 300px;
  height: 100%;
  flex-direction: column;
  background-color: white;
  box-shadow: 3px 0 6px 0 rgb(0 0 0 / 30%);
}

.aside-head {
  display: block flex;
  height: 36px;
  box-sizing: border-box;
  align-items: center;

  /* border-bottom: 2px solid hsl(240deg 23% 95%); */
  border-bottom: 2px solid var(--theme-color);

  & > .icon {
    margin-right: 6px;
    margin-left: 6px;
    border-radius: 2px;
    font-size: 20px;
    transition: background-color 0.25s linear 0s;

    &:hover {
      background-color: hsl(0deg 0% 90%);
      cursor: pointer;
    }

    &:active {
      background-color: hsl(0deg 0% 70%);
    }
  }

  & > .title {
    display: block flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }
}

.aside-body {
  display: block flex;
  flex: 1;
  flex-direction: column;
  padding: 0;
  margin: 0;
  list-style-type: none;

  & > li {
    display: block flex;
    height: 36px;
    align-items: center;
    padding-right: 8px;
    padding-left: 8px;
    margin-top: 8px;
    margin-right: 8px;
    margin-left: 8px;
    border-radius: 4px;

    &:last-of-type {
      margin-bottom: 8px;
    }

    &:hover {
      background-color: hsl(240deg 23% 95%);
      cursor: pointer;
    }

    &.active {
      background-color: hsl(var(--theme-hue) 40% 90%);
      color: var(--theme-color);

      &:hover {
        background-color: hsl(var(--theme-hue) 40% 90%);
        cursor: default;
      }
    }
  }
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
