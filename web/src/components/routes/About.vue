<template>
  <div class="about-container">
    <img src="../../../public/view.jpg" alt="Car Rental" class="about-image" />
    <div class="about-info">
      <h1>About Us</h1>
      <p>
        We offer a wide range of car models for rent. Currently, we have over 10
        different models available.
      </p>
      <p>
        Our mission is to provide high-quality car rental services to our
        customers. We strive to offer the best prices and the most convenient
        rental experience. Our fleet includes a variety of vehicles to suit all
        needs, from compact cars to luxury sedans, sports cars, and SUVs.
      </p>
      <p>
        We are committed to customer satisfaction and work hard to ensure that
        every rental experience is a positive one. Our team is always ready to
        assist you with any questions or concerns you may have.
      </p>
      <p>
        Thank you for choosing our car rental service. We look forward to
        serving you!
      </p>
      <p class="addr">Visit us at our Cracow office:</p>
      <address>
        123 Main Street<br />
        Cracow, Poland
      </address>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.about-container {
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 3rem;
}

.about-image {
  width: 70%;
  max-width: 600px;
  margin-bottom: 20px;
  border: 5px solid var(--light-grey);
  border-radius: 15px;
  box-shadow: 0 0 8px var(--dark-grey);
  margin-top: 3rem;
}

.about-info {
  max-width: 500px;
  text-align: justify;
  margin-top: 3rem;
}

address {
  font-style: normal;
  line-height: 1.5;
  font-size: 20px;
}

.addr {
  font-weight: 600;
  font-size: 25px;
}
</style>
