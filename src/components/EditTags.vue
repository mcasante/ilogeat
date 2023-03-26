<script setup lang="ts">
const props = defineProps<{
  selected: string[]
}>()

const selectedModel = ref(new Set(props.selected))

const defaultTags = new Set([
  'breakfast',
  'lunch',
  'dinner',
  'snack',
  'dessert',
  'drink',
])

const customTags = new Set([
  'blá blá blá',
  'blá',
])

const availableTags = computed(() => {
  const tags = new Set([...defaultTags, ...customTags])
  return [...tags].filter(tag => !selectedModel.value.has(tag))
})

const handleAdd = (tag: string) => {
  selectedModel.value.add(tag)
}

const handleRemove = (tag: string) => {
  selectedModel.value.delete(tag)
}
</script>

<template>
  <div class="edit-tags flex flex-col gap-4">
    <div class="selected-tags flex gap-2 flex-wrap">
      <MTag v-for="tag in selectedModel" :key="tag" class="tag" @click="() => handleRemove(tag)">
        {{ tag }} -
      </MTag>
    </div>
    <hr>
    <div class="defaul-tags flex gap-2 flex-wrap">
      <MTag v-for="tag in availableTags" :key="tag" class="tag" @click="() => handleAdd(tag)">
        {{ tag }} +
      </MTag>
    </div>
  </div>
</template>
