<script setup lang="ts">
import { onMounted } from 'vue'

interface ComponentEmits {
  (e: 'close'): void
}
const emit = defineEmits<ComponentEmits>()

const handleSlotClick = () => {
  emit('close')
}

onMounted(() => {
  setTimeout(() => {
    emit('close')
  }, 3000)
})
</script>

<template>
  <div
    class="slot-container"
    @click="handleSlotClick"
  >
    <p>验证码已发送，注意查收</p>
  </div>
</template>

<style scoped lang="postcss">
.slot-container {
  position: fixed;
  z-index: 11;
  top: calc(50% - 120px);
  left: calc(50% - 210px);
  display: block flex;
  width: 420px;
  height: 240px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: var(--shadow-dialog);

  & > p {
    margin-block: 1em;
    margin-inline: 1em;
  }
}
</style>
