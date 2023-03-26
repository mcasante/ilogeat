<script setup lang="ts">
defineProps<{
  label?: string
  name: string
  type: string
}>()

const labelClasses = Object.values({
  defaults: 'inline-block mb-2 transition-all-500 left-2 relative top-10',
  hover: '',
  active: '',
}).join(' ')

const inputClasses = Object.values({
  defaults: 'shadow-lg shadow-black/10 outline-none w-full border border-gray-300 rounded p-2',
  hover: '',
  active: '',
  focus: '',
}).join(' ')
</script>

<template>
  <div class="m-input mb-4 relative">
    <label :for="name" :class="labelClasses">
      {{ label }}
    </label>
    <input :id="name" :type="type" :class="inputClasses">
  </div>
</template>

<style lang="scss" scoped>
.m-input:focus-within {
  label {
    @apply translate-y-0 text-red top-0 left-0;
  }
}
</style>
