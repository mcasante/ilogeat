<script setup lang="ts">
defineOptions({
  name: 'login',
})
</script>

<template>
  <div display="grid" grid-cols="2" gap="10">
    <div>
      <h1>login</h1>
    </div>
    <div>
      <button>Login</button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
