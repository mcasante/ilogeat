<script lang="ts" setup>
import logo from '~/assets/logo.png'

const history = reactive({
  visible: false,
})

const toggleHistory = () => {
  history.visible = !history.visible
}
</script>

<template>
  <div class="app-container transition-400" :class="{ 'translate-x--50%': history.visible }">
    <main class="flex flex-col">
      <header class="bg-lime-400/80 border-b-4 border-black px-4 py-4 flex justify-between items-center">
        <router-link to="/app" class="flex items-end gap-2">
          <img :src="logo" class="image-render-pixel" width="32" height="32">
          <h1 class="text-6 lh-6">
            iLogEat
          </h1>
        </router-link>

        <m-button class="rounded" text="black" @click="toggleHistory">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </m-button>
      </header>
      <Suspense>
        <RouterView />
        <template #fallback>
          <div>
            loading...
          </div>
        </template>
      </Suspense>
      <!-- <TheFooter /> -->
    </main>
    <section class="history">
      <header class="bg-lime-400/80 border-b-4 px-4 border-black py-4 flex justify-between items-center">
        <m-button class="rounded" text="black" @click="toggleHistory">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </m-button>
      </header>
      <div class="side p-4">
        <m-history />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  @apply w-200\% max-w-unset grid grid-cols-2 h-full;
}
</style>
