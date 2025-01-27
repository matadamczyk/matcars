<template>
  <div class="welcome-container">
    <div
      class="textarea"
      :class="{ 'animate-left': animate, scrolling: isScrolling }"
    >
      <h2>{{ $t('welcome.title') }}</h2>
      <h1>
        <span class="orange">{{ $t('welcome.subtitle.part1') }}</span> {{ $t('welcome.subtitle.part2') }}<br />
        <span class="orange">{{ $t('welcome.subtitle.part3') }}</span> {{ $t('welcome.subtitle.part4') }}<br />
        {{ $t('welcome.subtitle.part5') }} <span class="orange">{{ $t('welcome.subtitle.part6') }}</span> 
        {{ $t('welcome.subtitle.part7') }}
      </h1>
      <Button @click="moveToRent" class="booking" :label="$t('welcome.bookNow')" />
      <Button @click="moveToOffer" class="offer" :label="$t('welcome.viewOffer')" />
    </div>
    <div
      class="image-container"
      :class="{ 'animate-right': animate, scrolling: isScrolling }"
    >
      <img src="../../public/supra.png" alt="Car" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const animate = ref(false);
const isScrolling = ref(false);
const router = useRouter();

const handleScroll = () => {
  if (window.scrollY > 100) {
    isScrolling.value = true;
  } else {
    isScrolling.value = false;
  }
};

const moveToRent = () => {
  const aspectRatio = window.innerWidth / window.innerHeight;
  let scrollPosition;

  if (Math.abs(aspectRatio - 16 / 10) < 0.01) {
    scrollPosition = window.innerHeight * (16 / 10);
  } else if (Math.abs(aspectRatio - 16 / 9) < 0.01) {
    scrollPosition = window.innerHeight * (16 / 9);
  } else {
    scrollPosition = window.innerHeight;
  }

  window.scrollTo({
    top: scrollPosition * 2,
    behavior: "smooth",
  });
};

const moveToOffer = () => {
  router.push("/offer");
};

onMounted(() => {
  setTimeout(() => {
    animate.value = true;
  }, 100);
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.welcome-container {
  display: flex;
  padding-top: 15rem;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  height: 100vh;
  background-image: url("../../public/welcome-background.jpg");
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
}
.image-container {
  width: 900px;
  height: 373px;
  overflow: hidden;
  position: relative;
  clip-path: inset(0 15px 0 0);
}

img {
  object-fit: cover;
  object-position: center;
}
.textarea {
  margin-left: 12rem;
  opacity: 0;
  transform: translateX(-100%);
  transition: all 1s ease-in-out;
}
h1 {
  font-size: 3rem;
}
h2 {
  font-size: 2rem;
  font-weight: 600;
}
.orange {
  color: var(--orange);
}
.booking {
  font-weight: 500;
  font-size: 30px;
  position: relative;
  border: 1px solid var(--orange);
  background-color: var(--orange);
  padding: 10px;
  border-radius: 15px;
  color: var(--white);
  margin-right: 1rem;
}
.p-button.p-component.booking:hover {
  border: 1px solid var(--orange);
  background-color: var(--orange);
  padding: 10px;
  border-radius: 15px;
  color: var(--white);
  box-shadow: 0 0 15px var(--light-orange);
}
.offer {
  font-weight: 500;
  font-size: 30px;
  position: relative;
  border: 1px solid var(--light-grey);
  background-color: var(--light-grey);
  padding: 10px;
  border-radius: 15px;
  color: var(--white);
  margin-right: 1rem;
}
.p-button.p-component.offer:hover {
  border: 1px solid var(--light-grey);
  background-color: var(--light-grey);
  padding: 10px;
  border-radius: 15px;
  color: var(--white);
  box-shadow: 0 0 15px var(--white);
}

.animate-left {
  opacity: 1;
  transform: translateX(0);
}
.animate-right {
  opacity: 1;
  transform: translateX(0);
}
.textarea.animate-left {
  transform: translateX(0);
  opacity: 1;
}
.image-container {
  transform: translateX(100%);
  opacity: 0;
  transition: all 1s ease-in-out;
}
.image-container.animate-right {
  transform: translateX(0);
  opacity: 1;
}
.animate-left {
  opacity: 1;
  transform: translateX(0);
}
.animate-right {
  opacity: 1;
  transform: translateX(0);
}

.textarea.scrolling {
  transform: translateX(-100%);
  opacity: 0;
}

.image-container.scrolling {
  transform: translateX(100%);
  opacity: 0;
}

@media (min-aspect-ratio: 16/10) {
  .welcome-container {
    padding-top: 12rem;
  }
  .textarea {
    scale: 0.8;
    margin-left: 9rem;
  }
  .image-container {
    width: 900px;
    height: 373px;
    overflow: hidden;
    position: relative;
  }
  img {
    scale: 0.8;
    transform: translateX(-12rem);
  }
}
@media (max-width: 768px) {
}
</style>
