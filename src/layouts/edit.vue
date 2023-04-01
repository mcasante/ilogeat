<script lang="ts" setup>
const router = useRouter()
</script>

<template>
  <div class="h-full flex">
    <main class="w-full flex flex-col">
      <header ref="menuHeader" class="bg-lime-300 border-b-4 border-black px-4 py-4 flex justify-between items-center">
        <m-button class="rounded" text="black" @click="router.back()">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
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
    </main>
  </div>
</template>
