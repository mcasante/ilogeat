<script setup lang="ts">
const entries = [
  {
    timestamp: 1627833600000,
  },
].map(entry => ({
  ...entry,
  date: new Date(entry.timestamp).toLocaleDateString(),
  weekdate: new Date(entry.timestamp).toLocaleDateString('en-US', { weekday: 'long' }),
}))
</script>

<template>
  <div class="history">
    <div v-for="entry in entries" :key="entry.timestamp" class="flex gap-3 p-4 shadow-lg shadow-black/25 rounded-lg border border-black/50">
      <div class="icon">
        <img src="https://via.placeholder.com/75x70" alt="icon">
      </div>
      <div>
        <h3 class="text-6" v-text="entry.weekdate" />
        <h5 v-text="entry.date" />
      </div>
    </div>
  </div>
</template>
