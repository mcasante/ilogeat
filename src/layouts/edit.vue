<script lang="ts" setup>
const router = useRouter()
</script>

<template>
  <div class="h-full flex">
    <main class="w-full flex flex-col relative">
      <m-button class="rounded text-black absolute! z-99 px-2! left-2 top-2" @click="router.back()">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </m-button>
      <Suspense>
        <RouterView />
        <template #fallback>
          <div>
            loading...
          </div>
        </template>
      </Suspense>
    </main>
  </div>
</template>
