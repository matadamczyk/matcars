<template>
  <div class="rent-container">
    <div class="rent-panel">
      <h2>Book a <span style="color: var(--orange)">Car</span></h2>
      <form action="">
        <div class="form-data">
          <div class="form-column">
            <label for="model">Select Your Car Model</label>
            <select name="" id="">
              <option value=""></option>
            </select>
          </div>
          <div class="form-column">
            <label for="model">Select Pick-up Date</label>
            <input type="date" name="" id="" />
          </div>
          <div class="form-column">
            <label for="model">Select Drop-off Date</label>
            <input type="date" name="" id="" />
          </div>
        </div>
        <Button class="submit" label="Submit" />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.rent-container {
  background-color: var(--light-grey);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: url("../../public/rent-background.jpg");
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
}
.rent-panel {
  box-shadow: 0 0 5px var(--dark-grey);
  height: 45%;
  width: 70%;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-data {
  display: flex;
  flex-direction: row;
}
.form-column {
  display: flex;
  flex-direction: column;
  margin: 0 30px;
  text-align: center;
}
label {
  font-weight: 600;
  font-size: 20px;
}
input,
select {
  width: 220px;
  height: 45px;
  border-radius: 15px;
  border: 2px solid var(--white);
  background-color: var(--light-orange);
  margin-top: 10px;
}
.submit {
  font-weight: 500;
  font-size: 25px;
  position: relative;
  border: 1px solid var(--orange);
  background-color: var(--orange);
  padding: 10px;
  border-radius: 15px;
  color: var(--white);
  margin: 3rem;
}
.p-button.p-component.submit:hover {
  border: 1px solid var(--orange);
  background-color: var(--orange);
  padding: 10px;
  border-radius: 15px;
  color: var(--white);
  box-shadow: 0 0 15px var(--light-orange);
}
h2 {
  font-size: 40px;
  text-align: center;
}
</style>
