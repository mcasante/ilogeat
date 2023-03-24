<script lang="ts" setup>
import logo from '~/assets/logo.png'
const getStartedModal = reactive({
  visible: false,
})

const showModal = () => {
  getStartedModal.visible = true
}
</script>

<template>
  <main class="px-4">
    <header class="py-4 flex justify-between items-center">
      <router-link to="/">
        <img :src="logo" class="image-render-pixel" width="48" height="48">
      </router-link>
      <m-button @click="showModal">
        Get started
      </m-button>
    </header>
    <RouterView />
    <TheFooter />
    <m-modal v-model:visible="getStartedModal.visible">
      <h1 class="text-2xl font-bold mb-4">
        Get started
      </h1>
      <p class="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet nisl.
      </p>

      <!-- login form -->
      <form class="mb-4">
        <m-input label="Email" name="email" type="email" />
        <m-input label="Password" name="password" type="password" />
        <div class="mb-4">
          <m-button type="submit">
            Login
          </m-button>
        </div>

        <m-button @click="getStartedModal.visible = false">
          Close
        </m-button>
      </form>
    </m-modal>
  </main>
</template>
