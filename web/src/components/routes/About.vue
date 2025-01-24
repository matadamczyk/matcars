<template>
  <div class="about-container">
    <img src="../../../public/view.jpg" alt="Car Rental" class="about-image" />
    <div class="about-info">
      <h1>{{ $t('about.title') }}</h1>
      <div v-for="(text, index) in aboutTexts" :key="index">
        <p>{{ text }}</p>
      </div>
      <p class="addr">{{ $t('about.visit') }}</p>
      <address>
        123 Main Street<br />
        Cracow, Poland
      </address>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const aboutTexts = computed(() => {
  const description = t('about.description');
  return Array.isArray(description) ? description : [description];
});
</script>

<style scoped>
.about-container {
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 3rem;
}

.about-image {
  width: 70%;
  max-width: 600px;
  margin-bottom: 20px;
  border: 5px solid var(--light-grey);
  border-radius: 15px;
  box-shadow: 0 0 8px var(--dark-grey);
  margin-top: 3rem;
}

.about-info {
  max-width: 500px;
  text-align: justify;
  margin-top: 3rem;
}

address {
  font-style: normal;
  line-height: 1.5;
  font-size: 20px;
}

.addr {
  font-weight: 600;
  font-size: 25px;
}
</style>
