<template>
  <div class="footer-container">
    <div class="pre-footer">
      <h2>{{ $t('footer.slogan.part1') }}<span class="able">{{ $t('footer.slogan.able1') }}</span>, 
          {{ $t('footer.slogan.part2') }}<span class="able">{{ $t('footer.slogan.able2') }}</span>, 
          {{ $t('footer.slogan.part3') }}<span class="able">{{ $t('footer.slogan.able3') }}</span>.</h2>
    </div>
    <div class="footer-content">
      <div class="footer-section">
        <h3>MATCARS</h3>
        <p>{{ $t('footer.rights') }}</p>
      </div>
      <div class="footer-section">
        <h3>{{ $t('footer.workingHours.title') }}</h3>
        <p>{{ $t('footer.workingHours.weekdays') }}</p>
        <p>{{ $t('footer.workingHours.saturday') }}</p>
        <p>{{ $t('footer.workingHours.sunday') }}</p>
      </div>
      <div class="footer-section">
        <h3>{{ $t('footer.contact.title') }}</h3>
        <p>{{ $t('footer.contact.email') }}</p>
        <p>{{ $t('footer.contact.phone') }}</p>
      </div>
      <div class="footer-section">
        <h3>{{ $t('footer.designedBy') }}</h3>
        <a href="https://github.com/matadamczyk"><i class="pi pi-github"></i> matadamczyk</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<style scoped>
  .footer-container {
    background-color: var(--white);
    height: 17rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .pre-footer {
    background-color: var(--dark-grey);
    width: 100%;
    height: 5rem;
    text-align: center;
    color: var(--white);
  }
  .footer-content {
    display: flex;
    justify-content: space-between;
  }

  .footer-section {
    flex: 1;
    /* padding: 1rem; */
    margin: 0 5rem;
  }
  .able {
    color: var(--light-orange);
  }
  a {
    text-decoration: none;
    color: var(--orange);
    font-size: 25px;
    font-weight: 600;
  }
  a:hover {
    color: var(--light-orange);
  }
</style>