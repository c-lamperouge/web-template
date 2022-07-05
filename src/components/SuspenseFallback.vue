<script setup lang="ts">
import IconLoop from '~icons/ic/baseline-loop'

</script>

<template>
  <div
    class="suspense-fallback"
    data-transition-identifier="fallback"
  >
    <IconLoop
      class="icon-loop"
    />
  </div>
</template>

<style scoped lang="postcss">
.suspense-fallback {
  position: absolute;
  display: block flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: white;
}

.icon-loop {
  animation: rotate 3s linear 0s infinite normal none running;
  color: hsl(0deg 0% 30%);
  font-size: 36px;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-360deg);
  }
}
</style>
