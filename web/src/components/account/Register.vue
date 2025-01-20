<template>
  <div class="card flex justify-center">
    <Dialog v-model:visible="localVisible" modal :style="{ width: '25rem', position: 'absolute' }">
      <div class="dialog-content">
        <div class="dialog-header">
          <img src="../../../public/logo.png" alt="logo">
          <h2>Create Account</h2>
          <p>Have an account? <a href="#" @click="switchToSignIn">Sign in now!</a></p>
        </div>
        <div class="dialog-body">
          <label for="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            class="input"
            v-model="firstName"
          />

          <label for="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            class="input"
            v-model="lastName"
          />
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

          <label for="password2">Confirm password</label>
          <input
            id="password2"
            type="password"
            placeholder="Password"
            class="input"
            v-model="confirmPassword"
          />


          <button class="btn btn-primary" @click="handleRegister">Register</button>
        </div>
      </div>
    </Dialog>
    <Dialog v-model:visible="successVisible" modal :style="{ width: '25rem', position: 'absolute' }">
      <div class="dialog-content">
        <div class="dialog-header">
          <h2>Registration Successful</h2>
        </div>
        <div class="dialog-body">
          <p>Your account has been created successfully.</p>
          <button class="btn btn-primary" @click="closeSuccessDialog">OK</button>
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
import axios from "axios";
import Dialog from "primevue/dialog";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:visible", "switchToSignIn"]);

const localVisible = ref(props.visible);
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const firstName = ref("");
const lastName = ref("");
const successVisible = ref(false);

watch(localVisible, (newValue) => {
  emit("update:visible", newValue);
});

watch(
  () => props.visible,
  (newValue) => {
    localVisible.value = newValue;
  }
);

const switchToSignIn = () => {
  emit("update:visible", false);
  emit("switchToSignIn");
};

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    console.error("Passwords do not match");
    return;
  }

  try {
    const response = await axios.post("http://localhost:3050/api/uzytkownicy/register", {
      imie: firstName.value,
      nazwisko: lastName.value,
      email: email.value,
      haslo: password.value,
    });
    console.log(response.data);
    localVisible.value = false;
    successVisible.value = true;
  } catch (error) {
    console.error("Registration failed:", error);
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
  margin-top: 3rem;
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

input {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.success {
  color: var(--white) !important;
}

</style>
