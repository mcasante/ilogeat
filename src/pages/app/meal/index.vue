<script lang="ts" setup>
interface MealForm {
  name: string
  photo: string | ArrayBuffer | null
  timestamp: number
}

const props = defineProps<{
  model: MealForm
}>()

const modelCopy = reactive({
  ...props.model,
})

interface Perceptions {
  mood: number
  hunger: number
  satiety: number
}
const perceptions = reactive<Perceptions>({
  mood: 5,
  hunger: 5,
  satiety: 5,
})

interface Fields {
  label: string
  tip: string
}

const displayMap: { [key: string]: Fields } = {
  mood: {
    label: 'Mood',
    tip: '(how are your feeling?)',
  },
  hunger: {
    label: 'Hunger',
    tip: '(how hungry were you?)',
  },
  satiety: {
    label: 'Satiety',
    tip: '(how satisfied are you?)',
  },
}

const keys = computed(() => Object.keys(perceptions) as (keyof Perceptions)[])
const activeKey = ref<keyof Perceptions>('mood')
const rangeValue = ref(5)

const isCollapsed = ref(true)

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

watch(rangeValue, (v) => {
  perceptions[activeKey.value] = v
})

const activate = (key: keyof Perceptions) => {
  if (key === activeKey.value)
    return toggleCollapse()
  rangeValue.value = perceptions[key]
  activeKey.value = key
  isCollapsed.value = false
}

const formatted = computed(() => {
  const mapper = (v: number) => v.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
  })
  const [mood, hunger, satiety] = Object.values(perceptions).map(mapper)
  return {
    mood,
    hunger,
    satiety,
  }
})
</script>

<template>
  <div>
    <m-input
      v-model:value="modelCopy.name"
      label="Meal name"
      name="mealName"
      type="text"
      placeholder="Delicious meal name"
    />

    <div class="grid gap-2 grid-cols-3 mt-4">
      <m-button
        v-for="key of keys" :key="key"
        class="rounded bg-amber-300!"
        :class="{ 'brutal-translate! shadow-none!': activeKey === key && !isCollapsed }"
        @click="activate(key)"
      >
        <h4 class="text-4 text-center flex gap-x-1.5 justify-center items-center flex-row">
          {{ displayMap[key].label }}:
          <small class="bg-white flex items-center justify-center rounded text-pink-500 px-1 text-4">{{ formatted[key] }}</small>
        </h4>
      </m-button>
    </div>

    <div
      :class="{ 'border-solid brutal brutal--translate bg-white! mt-4': !isCollapsed }"
      class="brutal-translate relative py-2 px-4 rounded-lg mt-3 transition-all-500 border-black border-3 border-dashed bg-white/85"
    >
      <h4 class="text-5 inline-block w-full" @click="toggleCollapse">
        {{ displayMap[activeKey].label }}:
        <small
          class="text-black/40"
          v-text="isCollapsed ? formatted[activeKey] : displayMap[activeKey].tip "
        />
      </h4>
      <m-transition-expand>
        <div v-if="!isCollapsed" class="flex gap-4">
          <span class="text-6 text-pink-500 font-bold" v-text="formatted[activeKey]" />
          <m-range
            v-model:value.number="rangeValue"
            class="mt-2"
          />
        </div>
      </m-transition-expand>
    </div>
  </div>
</template>
