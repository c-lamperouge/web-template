<script setup lang="ts">
interface ComponentProperties {
  content: string
  color?: string
}
interface ComponentEmits {
  (e: 'close'): void
}
// eslint-disable-next-line vue/no-setup-props-destructure
const { content, color = 'black' } = defineProps<ComponentProperties>()
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
    <p>{{ content }}</p>
  </div>
</template>

<style scoped lang="postcss">
.slot-container {
  position: fixed;
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
    color: v-bind("color");
    margin-block: 1em;
    margin-inline: 1em;
  }
}
</style>
