<template>
  <div class="footer-container">
    <div class="footer-content">
      <div class="footer-section">
        <h3>MATCARS</h3>
        <p>&copy; 2024 Car Rental Company.<br> All rights reserved.</p>
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
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
  .footer-container {
    background-color: var(--white);
    height: 20rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
  }

  .footer-section {
    flex: 1;
    padding: 1rem;
    margin: 5rem;
  }

  .footer-section h3 {
    margin-bottom: 1rem;
  }

  .footer-section ul {
    list-style: none;
    padding: 0;
  }

  .footer-section ul li {
    margin-bottom: 0.5rem;
  }

  .footer-section ul li a {
    text-decoration: none;
    color: var(--black);
  }
</style>