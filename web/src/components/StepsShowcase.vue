<template>
  <div class="steps-container">
    <div class="title">
      <h3>Plan your trip right now!</h3>
      <h1>Check out <span>steps</span> of renting</h1>
    </div>
    <div class="steps">
      <div class="step">
        <i class="pi pi-search"></i>
        <h2>Select Car</h2>
      </div>
      <i class="pi pi-arrow-right"></i>
      <div class="step">
        <i class="pi pi-book"></i>
        <h2>Book</h2>
      </div>
      <i class="pi pi-arrow-right"></i>
      <div class="step">
        <i class="pi pi-car"></i>
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
  margin-top: 7rem; 
}
.title {
  text-align: center;
}
.steps {
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: space-between;
  margin: 7rem;
}
.step {
  margin: 0 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 150px 50px 150px 50px;
  border: 1px solid var(--orange);
  border-width: 5px;;
  background-color: var(--light-orange);
  padding: 20px;
  box-shadow: 0 0 15px var(--light-orange);
}
.pi-arrow-right {
  margin: 8rem 10px;
}
i {
  font-size: 2rem;
}
.pi-arrow-right {
  border: none;
  background-color: transparent;
}
h3 {
  font-size: 20px;
}
h2 {
  width: 100px;
}
span {
  color: var(--orange);
}
@media (min-aspect-ratio: 16/10) {
  .steps {
    scale: 0.8;
  }
}
</style>