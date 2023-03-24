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
    <main>
      <header class="px-4 py-4 flex justify-between items-center">
        <router-link to="/app" class="flex items-end gap-2">
          <img :src="logo" class="image-render-pixel" width="32" height="32">
          <h1 class="text-6 lh-6">
            iLogEat
          </h1>
        </router-link>

        <m-button text="black" @click="toggleHistory">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </m-button>
      </header>
      <RouterView />
      <!-- <TheFooter /> -->
    </main>
    <section class="history">
      <div class="px-4">
        <header class="py-4 flex justify-between items-center">
          <m-button text="black" @click="toggleHistory">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </m-button>
        </header>
        <div class="history-body">
          <div class="history-item">
            <div class="history-item-header">
              <h1 class="text-2xl font-bold mb-4">
                2021-09-01
              </h1>
              <m-button text="black">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </m-button>
            </div>
            <div class="history-item-body">
              <div class="history-item-body-item">
                <h1 class="text-2xl font-bold mb-4">
                  2021-09-01
                </h1>
                <p class="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet nisl.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  @apply w-200\% max-w-unset grid grid-cols-2;
}
</style>
