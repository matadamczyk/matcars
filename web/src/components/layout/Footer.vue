<template>
  <div class="footer-container">
    <div class="pre-footer">
      <h2>Drive Your Dreams with MatCars - Afford<span class="able">able</span>, Reli<span class="able">able</span>, Unforgett<span class="able">able</span>.</h2>
    </div>
    <div class="footer-content">
      <div class="footer-section">
        <h3>MATCARS</h3>
        <p>&copy; 2024 Car Rental Company.<br />All rights reserved.</p>
      </div>
      <div class="footer-section">
        <h3>Working Hours</h3>
        <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
        <p>Sat: 10:00 AM - 4:00 PM</p>
        <p>Sun: Closed</p>
      </div>
      <div class="footer-section">
        <h3>Contact Us</h3>
        <p>Email: info@matcars.com</p>
        <p>Phone: (123) 456-7890</p>
      </div>
      <div class="footer-section">
        <h3>Designed by</h3>
        <a href="https://github.com/matadamczyk"><i class="pi pi-github"></i> matadamczyk</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
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