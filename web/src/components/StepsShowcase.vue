<template>
  <div class="steps-container">
    <div class="title">
      <h3>{{ $t('steps.planTrip') }} <span>{{ $t('steps.trip') }}</span> {{ $t('steps.rightNow') }}</h3>
      <h1>{{ $t('steps.checkOut') }} <span>{{ $t('steps.stepsOf') }}</span> {{ $t('steps.renting') }}</h1>
    </div>
    <div class="steps">
      <div class="step">
        <i class="pi pi-search"></i>
        <h2>{{ $t('steps.step1') }}</h2>
      </div>
      <i class="pi pi-angle-right first"></i>
      <i class="pi pi-angle-right second"></i>
      <div class="step">
        <i class="pi pi-book"></i>
        <h2>{{ $t('steps.step2') }}</h2>
      </div>
      <i class="pi pi-angle-right first"></i>
      <i class="pi pi-angle-right second"></i>
      <div class="step">
        <i class="pi pi-car"></i>
        <h2>{{ $t('steps.step3') }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<style scoped>
@keyframes colorChange {
  0% {
    color: var(--orange);
  }
  50% {
    color: black;
  }
  100% {
    color: var(--orange);
  }
}
.steps-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.title {
  text-align: center;
}
.steps {
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: space-between;
  margin-top: 7rem;
}
.step {
  margin: 0 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 150px 50px 150px 50px;
  border: 1px solid var(--orange);
  border-width: 5px;;
  background-color: var(--light-orange);
  padding: 20px;
  box-shadow: 0 0 15px var(--light-orange);
}
i {
  font-size: 2rem;
}
.pi-angle-right {
  margin: 8rem 0;
  border: none;
  font-size: 4rem;
  background-color: transparent;
  animation: colorChange 2s infinite;
}
.first {
  margin-right: -15px;
  animation-delay: 0s;
}
.second {
  margin-left: -15px;
  animation-delay: 1s;
}
h3 {
  font-size: 30px;
}
h2 {
  width: 100px;
}
h1 {
  font-size: 40px;
}
span {
  color: var(--orange);
}
@media (min-aspect-ratio: 16/10) {
  .steps {
    scale: 0.8;
  }
}
</style>