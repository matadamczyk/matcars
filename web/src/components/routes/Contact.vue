<template>
  <div class="contact-container">
    <div class="contact-content">
      <h1>{{ $t('contact.title') }}</h1>
      <div class="contact-info">
        <div class="contact-section">
          <h2>{{ $t('contact.office') }}</h2>
          <p>{{ $t('contact.address.street') }}</p>
          <p>{{ $t('contact.address.city') }}</p>
          <p>{{ $t('contact.address.country') }}</p>
        </div>
        <div class="contact-section">
          <h2>{{ $t('contact.getInTouch') }}</h2>
          <p>{{ $t('contact.email') }}</p>
          <p>{{ $t('contact.phone') }}</p>
          <p>{{ $t('contact.workingHours') }}</p>
        </div>
        <div class="contact-form">
          <h2>{{ $t('contact.sendMessage') }}</h2>
          <form @submit.prevent="sendMessage">
            <input type="text" :placeholder="$t('contact.form.name')" v-model="form.name" required />
            <input type="email" :placeholder="$t('contact.form.email')" v-model="form.email" required />
            <textarea :placeholder="$t('contact.form.message')" v-model="form.message" required></textarea>
            <button type="submit">{{ $t('contact.form.send') }}</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const form = ref({
  name: '',
  email: '',
  message: ''
});

const sendMessage = () => {
  // Implementacja wysyłania wiadomości
  console.log('Message sent:', form.value);
  form.value = { name: '', email: '', message: '' };
};
</script>

<style scoped>
.contact-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.contact-content {
  max-width: 1200px;
  width: 100%;
}

.contact-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.contact-section {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

.contact-form {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

.contact-form form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input, textarea {
  padding: 0.8rem;
  border: 1px solid var(--light-grey);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.8);
}

textarea {
  min-height: 150px;
  resize: vertical;
}

button {
  padding: 1rem;
  background: var(--orange);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background: var(--light-orange);
  box-shadow: 0 0 15px var(--light-orange);
}
</style>