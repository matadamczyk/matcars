<template>
  <div ref="navbar" class="navbar-container" :class="{ hidden: isHidden }">
    <div class="navbar">
      <RouterLink to="/">
        <img class="logo" src="../../../public/logo.png" alt="logo" />
      </RouterLink>
      <div class="links">
        <RouterLink to="/" :class="{ link: true, active: activePath === '/' }"
          >Home</RouterLink
        >
        <RouterLink
          to="/about"
          :class="{ link: true, active: activePath === '/about' }"
          >About</RouterLink
        >
        <RouterLink
          to="/offer"
          :class="{ link: true, active: activePath === '/offer' }"
          >Vehicle Models</RouterLink
        >
        <RouterLink
          to="/contact"
          :class="{ link: true, active: activePath === '/contact' }"
          >Contact</RouterLink
        >
      </div>
      <div class="login">
        <Button class="signin" label="Sign in" @click="signin = true"></Button>
        <Button
          class="register"
          label="Register"
          @click="register = true"
        ></Button>
      </div>
    </div>
    <SignIn :visible="signin" @update:visible="signin = $event" />
    <Register :visible="register" @update:visible="register = $event" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watchEffect, watch } from "vue";
import { useRoute } from "vue-router";
import SignIn from "../account/SignIn.vue";
import Register from "../account/Register.vue";

const signin = ref(false);
const register = ref(false);
const isHidden = ref(false);
const route = useRoute();

const activePath = ref(route.path);

watch(() => route.path, (newPath) => {
  activePath.value = newPath;
});

const handleScroll = () => {
  if (window.scrollY > window.innerHeight) {
    isHidden.value = true;
  } else {
    isHidden.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.navbar-container {
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1000;
  transition: opacity 0.5s ease-in-out;
}
.navbar-container.hidden {
  opacity: 0;
  pointer-events: none;
}
.navbar {
  position: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  height: 5rem;
  margin: 3rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.logo {
  height: 8rem;
  margin-top: 25px;
  margin-left: 1rem;
  cursor: pointer;
}
.active {
  color: var(--orange);
}
.link {
  position: relative;
  text-decoration: none;
  margin: 30px;
  font-size: 20px;
  font-weight: 500;
  color: var(--black);
}
.link:hover {
  color: var(--orange);
}
.link::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 4px;
  border-radius: 4px;
  background-color: var(--orange);
  bottom: -5px;
  left: 0;
  transform-origin: right;
  transform: scaleX(0);
  transition: transform 0.3s ease-in-out;
}

.link:hover::before {
  transform-origin: left;
  transform: scaleX(1);
}

.signin,
.register {
  margin: 1rem;
  font-weight: 500;
  font-size: 20px;
  position: relative;
}
.register {
  border: 1px solid var(--orange);
  background-color: var(--orange);
  padding: 10px;
  border-radius: 15px;
  color: var(--white);
}
.p-button.p-component.register:hover {
  border: 1px solid var(--orange);
  background-color: var(--orange);
  padding: 10px;
  border-radius: 15px;
  color: var(--white);
  box-shadow: 0 0 10px var(--light-orange);
}
.signin {
  border: 1px solid var(--light-grey);
  background-color: var(--light-grey);
  padding: 10px;
  border-radius: 15px;
  color: var(--white);
}
.p-button.p-component.signin:hover {
  border: 1px solid var(--light-grey);
  background-color: var(--light-grey);
  padding: 10px;
  border-radius: 15px;
  color: var(--white);
  box-shadow: 0 0 10px var(--white);
}
@media (min-aspect-ratio: 16/10) {
  .navbar {
    scale: 0.9;
  }
}
</style>
