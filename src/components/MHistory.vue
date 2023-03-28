<script setup lang="ts">
const entries = [
  {
    timestamp: 1627833600000,
  },
  {
    timestamp: 1627920000000,
  },
  {
    timestamp: 1628006400000,
  },
  {
    timestamp: 1628092800000,
  },
  {
    timestamp: 1628179200000,
  },
  {
    timestamp: 1628265600000,
  },
  {
    timestamp: 1628352000000,
  },
  {
    timestamp: 1628438400000,
  },
  {
    timestamp: 1628524800000,
  },
  {
    timestamp: 1628611200000,
  },
  {
    timestamp: 1628697600000,
  },
  {
    timestamp: 1628784000000,
  },
  {
    timestamp: 1628870400000,
  },
  {
    timestamp: 1628956800000,
  },
  {
    timestamp: 1629043200000,
  },
  {
    timestamp: 1629129600000,
  },
  {
    timestamp: 1629216000000,
  },
  {
    timestamp: 1629302400000,
  },
  {
    timestamp: 1629388800000,
  },
  {
    timestamp: 1629475200000,
  },
  {
    timestamp: 1629561600000,
  },
  {
    timestamp: 1629648000000,
  },
  {
    timestamp: 1629734400000,
  },
  {
    timestamp: 1629820800000,
  },
  {
    timestamp: 1629907200000,
  },
  {
    timestamp: 1629993600000,
  },
  {
    timestamp: 1630080000000,
  },
  {
    timestamp: 1630166400000,
  },
  {
    timestamp: 1630252800000,
  },
  {
    timestamp: 1630339200000,
  },
  {
    timestamp: 1630425600000,
  },
  {
    timestamp: 1630512000000,
  },
  {
    timestamp: 1630598400000,
  },
  {
    timestamp: 1630684800000,
  },
  {
    timestamp: 1630771200000,
  },
  {
    timestamp: 1630857600000,
  },
  {
    timestamp: 1630944000000,
  },
].map(entry => ({
  ...entry,
  date: new Date(entry.timestamp).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  weekdate: new Date(entry.timestamp).toLocaleDateString('en-US', { weekday: 'long' }),
}))
</script>

<template>
  <div class="history h-full grid gap-3">
    <MButton v-for="entry in entries" :key="entry.timestamp" class="bg-pink-300 flex gap-3 p-4 py-2 brutal justify-center rounded-lg">
      <div class="w-full">
        <div class="icon p-1 bg-white rounded-md b-3 b-black">
          <img class="rounded-md overflow-hidden w-full" src="https://via.placeholder.com/75x70" alt="icon">
        </div>
        <div>
          <h3 class="text-6 text-border-1.5 text-border-[#000] text-white" v-text="entry.weekdate" />
          <h4 v-text="entry.date" />
        </div>
      </div>
    </MButton>
  </div>
</template>

<style lang="scss" scoped>
.history {
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
}
</style>
