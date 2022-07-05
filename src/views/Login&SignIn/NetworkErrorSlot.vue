<script setup lang="ts">
interface ComponentEmits {
  (e: 'close'): void
}
const emit = defineEmits<ComponentEmits>()

const handleSlotClick = () => {
  emit('close')
}
</script>

<template>
  <div
    class="slot-container"
    @click="handleSlotClick"
  >
    <p>网络请求错误</p>
  </div>
</template>

<style scoped lang="postcss">
.slot-container {
  position: fixed;
  z-index: 11;
  top: calc(50% - 60px);
  left: calc(50% - 105px);
  display: block flex;
  width: 210px;
  height: 120px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: white;
  border-radius: 6px;
  box-shadow: var(--shadow-dialog);

  & > p {
    color: red;
    margin-block: 1em;
    margin-inline: 1em;
  }
}
</style>
