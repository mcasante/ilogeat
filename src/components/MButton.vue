<script setup lang="ts">
defineProps<{
  link?: string
}>()

const handleClick = () => {
  // Handle button click
}

const defaults = 'px-3 py-1 transition text-white c-style bg-[var(--green)]'
const hover = 'hover:bg-[var(--light-green)]'
const active = 'active:shadow-none relative active:translate-[var(--shadow-size)]'

const classes = [defaults, hover, active].join(' ')
</script>

<template>
  <button v-if="!link" v-bind="$attrs" :class="classes" @click="handleClick">
    <slot>Click!</slot>
  </button>
  <router-link v-else :to="link">
    <button v-bind="$attrs" :class="classes" @click="handleClick">
      <slot>Click!</slot>
    </button>
  </router-link>
</template>
