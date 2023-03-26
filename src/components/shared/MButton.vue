<script setup lang="ts">
defineProps<{
  link?: string
}>()

const defaults = 'px-3 py-1 transition text-black brutal bg-lime-500'
const hover = 'hover:bg-lime-300 transition-shadow-0! hover:shadow-[calc(1.2*var(--brutal-shadow-size))_calc(1.2*var(--brutal-shadow-size))]-black hover:translate-[calc(-0.2*var(--brutal-shadow-size))]'
const active = 'active:shadow-none relative active:brutal-translate'

const classes = [defaults, hover, active].join(' ')
</script>

<template>
  <button v-if="!link" v-bind="$attrs" :class="classes">
    <slot>Click!</slot>
  </button>
  <router-link v-else :to="link">
    <button v-bind="$attrs" :class="classes">
      <slot>Click!</slot>
    </button>
  </router-link>
</template>

<style lang="scss" scoped>
button[disabled] {
  cursor: not-allowed;
  // @apply text-gray-300 bg-gray-500 shadow-none relative translate-[var(--shadow-size)];
  @apply text-black bg-lime-900\/80 shadow-none relative  brutal-translate;
}
</style>
