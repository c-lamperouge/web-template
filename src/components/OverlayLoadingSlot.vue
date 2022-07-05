<script setup lang="ts">
import IconLoop from '~icons/ic/baseline-loop'

</script>

<template>
  <IconLoop
    class="icon-loop"
  />
</template>

<style scoped lang="postcss">
@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}

.icon-loop {
  position: fixed;
  z-index: 11;
  top: 50%;
  left: 50%;
  animation: rotate 3s linear 0s infinite normal none running;
  color: hsl(0deg 0% 30%);
  font-size: 40px;
  transform: translate(-50%, -50%);
}
</style>
