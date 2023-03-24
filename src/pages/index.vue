<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

// const router = useRouter()

// const { t } = useI18n()

const { height } = useWindowSize()
const canvasAnchor = ref<HTMLElement>()
</script>

<template>
  <div>
    <section class="select-none py-15 text-center">
      <h1 class="text-14 lh-14 md:text-20 md:lh-20">
        Love Your Food,<br> Love Your Body
      </h1>
      <h2 class="text-4 md:text-5.5 lh-[1.5] font-sans mt-10">
        <span class="text-[var(--green)]">iLogEat</span> Helps You Build a Healthier Relationship<br> with Food and Reach Your Wellness Goals
      </h2>
      <a class="mt-10 block">
        <m-button class="text-6">Get started</m-button>
      </a>
    </section>

    <div>
      <app-banner v-if="canvasAnchor" :anchor="canvasAnchor" />
      <div ref="canvasAnchor" :style="{ height: `${(height * 0.6 || 0)}px` }" />
    </div>
    <h1>The Food Diary App for Nurturing a Positive Relationship with Eating</h1>

    <p>
      Introducing a new food diary app that focuses on minimalism, usability, and a health-oriented approach towards food. Say goodbye to calorie counting and hello to building a healthier relationship with food. With a simple interface and personalized goal setting, this app helps you track your meals, mood, and progress towards healthier eating habits. Discover the benefits of tracking your food and improving your well-being with this user-friendly app.
    </p>

    <p>
      Capture photos of your meals: Take photos of your meals and store them in the app to easily track your food intake.

      Time-stamp your meals: Record the time you eat your meals to gain insight into your eating patterns and help you identify emotional triggers.

      Classify your hunger and satiety levels: Rate your hunger and satiety levels before and after meals to help you recognize when you're eating out of boredom or emotional stress, rather than actual hunger.

      Make observations: Add notes and observations about your meals to help you understand how different foods affect your body and mood.

      Personalized goal setting: Set personalized goals and track your progress towards healthier eating habits, whether it's increasing your intake of vegetables or cutting back on sugar.

      Mindful eating prompts: Receive gentle reminders to practice mindful eating and savor each bite, helping you to build a healthier relationship with food.

      Insights and analytics: Get insights into your eating habits with easy-to-read analytics and graphs, giving you a clear picture of your progress and areas for improvement.

      With these features, our food journal app empowers you to take control of your diet, build a healthier relationship with food, and achieve your wellness goals. Whether you're looking to lose weight, manage a chronic condition, or simply improve your overall health and wellbeing, our app is the perfect tool to help you get there.

      Highlight the features that make your app unique: What sets your food diary app apart from others on the market? Is it the minimalist design? The health-oriented approach? Emphasize these aspects to show potential users why they should choose your app over others.

      Describe how the app works: Walk users through the process of using the app, from setting up an account to tracking meals and progress. Explain how the personalized goal setting works and how users can use the app to improve their eating habits.

      Mention any additional features: Are there any other features that users might find helpful, such as a database of healthy recipes or tips for mindful eating? If so, make sure to mention them in the introduction.

      Use a friendly and welcoming tone: Your app is designed to help people build a healthier relationship with food, so make sure your introduction reflects that. Use a warm and welcoming tone to show users that your app is a safe and supportive space for them to track their meals and progress.

      In addition, "I Log Eat" offers a feature where users can take pictures of their meals, and the app uses image recognition technology to automatically log the foods in the picture.

      Consider that the app focus is on developing a health relation with food, without the need for calorie count and other behavior that could potentially lead to some eating disorder. Here, we want to build something beautiful that worship the relation of humans and their food in a health and pleasing way, accepting different body types and their capabilities to be health, strong and loved

      Food Harmony: This name suggests a focus on balance and a harmonious relationship with food, rather than strict tracking or monitoring.

      Mindful Meals: This name emphasizes the idea of being present and aware while eating, and could appeal to users looking for a more mindful approach to their diet.

      Nourish: This name is simple and straightforward, emphasizing the idea of nourishing the body with healthy, whole foods.

      FoodLove: This name celebrates the idea of loving and enjoying food, while still maintaining a healthy and balanced diet.

      Joyful Eating: This name emphasizes the idea of finding joy and pleasure in the act of eating, rather than focusing solely on nutrition or health.

      If the goal is to build an app that focuses on developing a positive and healthy relationship with food, without the need for strict tracking or monitoring, then the name "I Log Eat" may not be the best fit.

      The name "I Log Eat" implies a focus on logging and tracking food intake, which could potentially reinforce negative behaviors and patterns around food. While the app may not necessarily promote calorie counting or other behaviors that could lead to an eating disorder, the name may still not align with the overall goal of building a positive and healthy relationship with food.

      That being said, if the app is designed in a way that emphasizes the pleasure and enjoyment of food, and encourages users to develop a healthy and intuitive relationship with what they eat, then the name "I Log Eat" could still be a viable option. It ultimately depends on how the app is positioned and marketed to potential users.
    </p>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
