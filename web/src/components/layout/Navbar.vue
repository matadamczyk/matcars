<template>
  <div ref="navbar" class="navbar-container" :class="{ hidden: isHidden }">
    <div class="navbar">
      <RouterLink to="/">
        <img class="logo" src="../../../public/logo.png" alt="logo" />
      </RouterLink>
      <div class="links">
        <RouterLink to="/" :class="{ link: true, active: activePath === '/' }">
          {{ $t('navbar.home') }}
        </RouterLink>
        <RouterLink to="/about" :class="{ link: true, active: activePath === '/about' }">
          {{ $t('navbar.about') }}
        </RouterLink>
        <RouterLink to="/offer" :class="{ link: true, active: activePath === '/offer' }">
          {{ $t('navbar.vehicles') }}
        </RouterLink>
        <RouterLink to="/contact" :class="{ link: true, active: activePath === '/contact' }">
          {{ $t('navbar.contact') }}
        </RouterLink>
        <RouterLink
          to="/admin"
          :class="{ link: true, active: activePath === '/admin' }"
          v-if="store.isAdmin"
        >{{ $t('navbar.adminPanel') }}</RouterLink>
        <RouterLink
          to="/user"
          :class="{ link: true, active: activePath === '/user' }"
          v-if="store.isLoggedIn && !store.isAdmin"
        >{{ $t('navbar.userPanel') }}</RouterLink>
      </div>
      <div class="login" v-if="!store.isLoggedIn">
        <Button class="lang-switch" @click="toggleLanguage">
          {{ currentLanguage === 'pl' ? 'EN' : 'PL' }}
        </Button>
        <Button class="signin" :label="$t('navbar.signin')" @click="signin = true"></Button>
        <Button class="register" :label="$t('navbar.register')" @click="register = true"></Button>
      </div>
      <div class="logout" v-else>
        <Button class="lang-switch" @click="toggleLanguage">
          {{ currentLanguage === 'pl' ? 'EN' : 'PL' }}
        </Button>
        <Button class="register" :label="$t('navbar.logout')" @click="handleLogout"></Button>
      </div>
    </div>
    <SignIn :visible="signin" @update:visible="signin = $event" @switchToRegister="openRegister" />
    <Register :visible="register" @update:visible="register = $event" @switchToSignIn="openSignIn" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../../store/store";
import SignIn from "../account/SignIn.vue";
import Register from "../account/Register.vue";
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const currentLanguage = ref(locale.value);

const toggleLanguage = () => {
  locale.value = locale.value === 'pl' ? 'en' : 'pl';
  currentLanguage.value = locale.value;
};

const store = useStore();

const signin = ref(false);
const register = ref(false);
const isHidden = ref(false);
const route = useRoute();
const router = useRouter();

const activePath = ref(route.path);

const openSignIn = () => {
  register.value = false;
  signin.value = true;
};

const openRegister = () => {
  signin.value = false;
  register.value = true;
};

watch(
  () => route.path,
  (newPath) => {
    activePath.value = newPath;
  }
);

const handleScroll = () => {
  if (window.scrollY > 0.9 * window.innerHeight) {
    isHidden.value = true;
  } else {
    isHidden.value = false;
  }
};

const handleLogout = () => {
  store.clearToken();
  router.push("/").then(() => {
    window.location.reload();
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  router.afterEach((to) => {
    activePath.value = to.path;
  });
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
  background-color: rgba(160, 160, 160, 0.2);
  border-radius: 30px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 2px solid rgba(160, 160, 160, 0.3);
}
.logo {
  height: 8rem;
  margin-top: 25px;
  margin-left: 1rem;
  cursor: pointer;
}
::v-deep(.active) {
  color: var(--orange) !important;
  font-weight: bold;
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
