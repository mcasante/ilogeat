<script lang="ts" setup>
const afterEnter = (el: HTMLElement) => {
  el.style.height = 'auto'
}

const enter = (el: HTMLElement) => {
  const width = getComputedStyle(el).width
  el.style.width = width
  el.style.position = 'absolute'
  el.style.visibility = 'hidden'
  el.style.height = 'auto'

  const height = getComputedStyle(el).height

  el.style.width = 'unset'
  el.style.position = 'unset'
  el.style.visibility = 'unset'
  el.style.height = '0'

  // Force repaint
  // eslint-disable-next-line
  getComputedStyle(el).height

  requestAnimationFrame(() => {
    el.style.height = height
  })
}

const leave = (el: HTMLElement) => {
  const height = getComputedStyle(el).height
  el.style.height = height

  // Force repaint
  // eslint-disable-next-line
  getComputedStyle(el).height

  requestAnimationFrame(() => {
    el.style.height = '0'
  })
}
</script>

<template>
  <transition
    name="expand"
    @after-enter="afterEnter"
    @enter="enter"
    @leave="leave"
  >
    <slot />
  </transition>
</template>

<style scoped>
* {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

.expand-enter-active,
.expand-leave-active {
  transition: all .3s ease-in-out;
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  height: 0;
  opacity: 0;
}
</style>
