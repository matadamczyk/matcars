<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="localVisible"
      modal
      :style="{ width: '25rem', position: 'absolute' }"
    >
      <div class="dialog-content">
        <div class="dialog-header">
          <img src="../../public/logo.png" alt="logo" />
          <h2>Welcome Back</h2>
          <p>Don't have an account? <a href="#">Create today!</a></p>
        </div>
        <div class="dialog-body">
          <label for="email1">Email</label>
          <input
            id="email1"
            type="text"
            placeholder="Email address"
            class="input"
          />

          <label for="password1">Password</label>
          <input
            id="password1"
            type="password"
            placeholder="Password"
            class="input"
          />

          <div class="dialog-footer">
            <a href="#">Forgot password?</a>
          </div>

          <button class="btn btn-primary">Sign In</button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from "vue";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:visible"]);

const localVisible = ref(props.visible);
const checked1 = ref(false);

watch(localVisible, (newValue) => {
  emit("update:visible", newValue);
});

watch(
  () => props.visible,
  (newValue) => {
    localVisible.value = newValue;
  }
);
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
}

.dialog-body .input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
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

input {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
