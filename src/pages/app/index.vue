<script setup lang="ts">
import { Carousel, Slide } from 'vue3-carousel'
import photo from '~/assets/sample-plate.jpeg'
import 'vue3-carousel/dist/carousel.css'

defineOptions({
  name: 'appIndex',
})

const meals = [
  {
    id: 1,
    photo,
    time: '8:00 AM',
    tags: ['breakfast'],
    name: 'Eggs',
  },
  {
    id: 2,
    photo,
    time: '12:00 PM',
    tags: ['lunch'],
    name: 'Salad',
  },
  {
    id: 3,
    photo,
    time: '6:00 PM',
    tags: ['dinner'],
    name: 'Chicken',
  },
  {
    id: 4,
    photo,
    time: '8:00 PM',
    tags: ['snack'],
    name: 'Peanut Butter',
  },
  {
    add: true,
  },
]

const handleAdd = () => {
  console.log('add')
}
</script>

<template>
  <section>
    <h1 class="text-2xl font-bold mb-4">
      Daily Log
    </h1>
    <!-- <div>
      <Carousel :touch-drag="true" :items-to-show="1.05" :model-value="meals.length + 1" snap-align="center" class="py-8" @click="handleAdd">
        <Slide v-for="meal in meals" :key="meal.name" @click="handleAdd">
          <MButton v-if="meal.add" class="add-meal-button" @click="handleAdd">
            +
          </MButton>
          <div v-else class="border rounded-2 overflow-hidden border-black">
            <img :src="meal.photo" class="block rounded image-render-pixel">
          </div>
        </Slide>
      </Carousel>
    </div> -->
    <TestCarousel :items="meals">
      <template #default="{ item }">
        <MButton v-if="item.add" class="add-meal-button" @click="handleAdd">
          +
        </MButton>
        <div v-else class="border rounded-2 h-100% overflow-hidden border-black">
          <img :src="item.photo" class="block rounded image-render-pixel">
        </div>
      </template>
    </TestCarousel>
    <!-- <div class="ml-4">
            <h2 class="text-lg font-bold">
              {{ meal.name }}
            </h2>
            <p class="text-sm">
              {{ meal.time }}
            </p>
          </div>
        </div>
        <div class="flex flex-wrap">
          <m-tag v-for="tag in meal.tags" :key="tag" class="mr-2 mb-2">
            {{ tag }}
          </m-tag>
        </div> -->
    <!-- </div> -->
  </section>
  <section>
    <m-button>Add Meal</m-button>
  </section>
</template>

<style lang="scss" scoped>
.add-meal-button {
  @apply text-30 text-black flex justify-center items-center font-light w-100\% block h-100\% rounded-4 bg-white\/90;
}
.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  /* transform: rotateY(-20deg) scale(0.9); */
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.8);
}

.carousel__slide--prev {
  opacity: 1;
  transform: translateX(40%) /* rotateY(-10deg) */ scale(0.8);
}

.carousel__slide--next {
  opacity: 1;
  transform: translateX(-10%) rotateY(10deg) scale(0.9) !important;
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1);
  z-index: 9999;
}
</style>

<route lang="yaml">
meta:
  layout: app
</route>
