<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="localVisible"
      modal
      :style="{ width: '25rem', position: 'absolute' }"
    >
      <div class="dialog-content">
        <div class="dialog-header">
          <img src="../../../public/logo.png" alt="logo" />
          <h2>Welcome Back</h2>
          <p>
            Don't have an account?
            <a href="#" @click="switchToRegister">Create today!</a>
          </p>
        </div>
        <div class="dialog-body">
          <label for="email1">Email</label>
          <input
            id="email1"
            type="text"
            placeholder="Email address"
            class="input"
            v-model="email"
          />

          <label for="password1">Password</label>
          <input
            id="password1"
            type="password"
            placeholder="Password"
            class="input"
            v-model="password"
          />

          <div class="dialog-footer">
            <a href="#">Forgot password?</a>
          </div>

          <button class="btn btn-primary" @click="handleSignIn">Sign In</button>
        </div>
      </div>
    </Dialog>
    <Dialog
      v-model:visible="successVisible"
      modal
      :style="{ width: '25rem', position: 'absolute' }"
    >
      <div class="dialog-content">
        <div class="dialog-header">
          <h2 class="success">Login Successful</h2>
        </div>
        <div class="dialog-body">
          <button class="btn btn-primary" @click="closeSuccessDialog">
            OK
          </button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from "vue";
import { useStore } from "../../store/store";
import axios from "axios";
import Dialog from "primevue/dialog";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const store = useStore();

const emit = defineEmits(["update:visible", "switchToRegister"]);

const localVisible = ref(props.visible);
const email = ref("");
const password = ref("");

watch(localVisible, (newValue) => {
  emit("update:visible", newValue);
});

watch(
  () => props.visible,
  (newValue) => {
    localVisible.value = newValue;
  }
);

const switchToRegister = () => {
  emit("update:visible", false);
  emit("switchToRegister");
};

const successVisible = ref(false);

const handleSignIn = async () => {
  try {
    const response = await axios.post("http://localhost:3050/api/uzytkownicy/login", {
      email: email.value,
      haslo: password.value,
    });
    console.log(response.data);
    store.isLoggedIn = true;
    store.setToken(response.data.token);
    store.isAdmin = response.data.rola === "admin";
    localVisible.value = false;
    successVisible.value = true;
  } catch (error) {
    console.error("Login failed:", error);
  }
};

const closeSuccessDialog = () => {
  successVisible.value = false;
};
</script>

<style scoped lang="scss">
.p-dialog.p-component {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.dialog-content {
  padding: 20px;
}

.dialog-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.dialog-header .icon {
  fill: #666;
  height: 64px;
  margin-bottom: 1rem;
}

.dialog-header h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.dialog-header p {
  color: #555;
  font-size: 0.9rem;
}

.dialog-header p a {
  color: var(--light-orange);
  text-decoration: none;
}

.dialog-body {
  display: flex;
  flex-direction: column;
}

.dialog-body label {
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
}

.dialog-body .input {
  padding: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 15px;
  margin-bottom: 1rem;
}

.dialog-footer {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 1.5rem;
}

.dialog-footer .remember-me {
  display: flex;
  align-items: center;
}

.dialog-footer .remember-me label {
  margin-left: 0.5rem;
  font-size: 0.9rem;
}

.dialog-footer .remember-me input {
  border: 1px solid var(--grey);
  border-radius: 15px;
}

.dialog-footer a {
  text-decoration: none;
  color: var(--light-orange);
}

.btn {
  padding: 0.75rem;
  font-size: 1rem;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.btn-primary {
  background: var(--orange);
  border-radius: 15px;
}

.btn:hover {
  box-shadow: 0 0 10px var(--light-orange);
}

.dialog-header img {
  height: 150px;
  margin-bottom: 0;
  width: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.success {
  color: var(--white) !important;
}

input {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
