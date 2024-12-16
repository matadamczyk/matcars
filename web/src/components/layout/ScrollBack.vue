<template>
  <div>
    <button
      v-show="true"
      @click="scrollToTop"
      class="scroll-back-button"
      :class="{ visible: isVisible }"
    >
      <i class="pi pi-arrow-up"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const isVisible = ref(false);

const toggleVisibility = () => {
  if (window.scrollY > window.innerHeight) {
    isVisible.value = true;
  } else {
    isVisible.value = false;
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", toggleVisibility);
});

onUnmounted(() => {
  window.removeEventListener("scroll", toggleVisibility);
});
</script>

<style scoped>
.scroll-back-button {
  position: fixed;
  bottom: 50px;
  right: 20px;
  padding: 10px 20px;
  background-color: var(--orange);
  color: var(--white);
  border: none;
  border-radius: 15px;
  cursor: pointer;
  z-index: 1000;
  opacity: 0; 
  transition: opacity 0.3s ease-in-out; 
}
.scroll-back-button.visible {
  opacity: 1; 
}
.scroll-back-button:hover {
  background-color: var(--light-orange);
}
.scroll-back-button:active {
  background-color: var(--dark-grey);
}
</style>