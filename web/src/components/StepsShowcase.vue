<template>
  <div class="steps-container">
    <div class="title">
      <h3>Plan your trip right now!</h3>
      <h2>Check out steps of renting</h2>
    </div>
    <div class="steps">
      <div class="step1">
        <h2>Select Car</h2>
      </div>
      <div class="step2">
        <h2>Book</h2>
      </div>
      <div class="step3">
        <h2>Drive car of your dreams</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.steps-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  text-align: center;
}
.steps {
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: space-between;
}
.step1, .step2, .step3 {
  margin: 10rem;
}
</style>