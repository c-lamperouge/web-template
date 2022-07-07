<script setup lang="ts">
import IconMenu from '~icons/ic/round-menu'
import IconPerson from '~icons/ic/baseline-person'

interface ComponentEmits {
  (e: 'switchAside'): void
}
const emit = defineEmits<ComponentEmits>()
</script>

<template>
  <header>
    <div class="header-left">
      <IconMenu
        class="icon-block"
        @click="emit('switchAside')"
      />
    </div>

    <div class="header-center">
      header
    </div>

    <div class="header-right">
      <IconPerson class="icon-block" />
    </div>
  </header>
</template>

<style scoped lang="postcss">
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
</style>
