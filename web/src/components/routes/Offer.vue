<template>
  <div class="offer-container">
    <!-- <h1 v-if="cars.length === 0">Our <span style="color: var(--orange)">fleet</span></h1> -->
    <div class="search-bar">
      <input
        v-model="searchQuery"
        @input="filterCars"
        placeholder="Search for a car model..."
      />
      <div class="filter-panel">
        <i class="pi pi-filter"></i>
        <select v-model="sortOption">
          <option value="">Sort by</option>
          <option value="price_asc">Price (Low to High)</option>
          <option value="price_desc">Price (High to Low)</option>
          <option value="name_asc">Name (A to Z)</option>
          <option value="name_desc">Name (Z to A)</option>
          <option value="year_asc">Year (Oldest to Newest)</option>
          <option value="year_desc">Year (Newest to Oldest)</option>
        </select>
      </div>
      <button class="add-car" v-if="isAdmin" @click="openDialog">
        Add Car
      </button>
    </div>
    <div v-if="loading" class="loader">Loading our fleet...</div>
    <ul v-else class="car-list">
      <li v-for="car in filteredCars" :key="car.id_samochodu" class="car-item">
        <img
          :src="car.zdjecie"
          alt="Car Image"
          class="car-image"
          v-if="car.zdjecie"
        />
        <div class="car-details">
          <h3>{{ car.marka }} {{ car.model }}</h3>
          <p>{{ car.rok_produkcji }}</p>
          <p>{{ car.cena_za_dzien + "$" }}</p>
          <div class="car-actions">
            <button class="edit-remove" v-if="isAdmin" @click="editCar(car)">
              Edit
            </button>
            <button
              class="edit-remove"
              v-if="isAdmin"
              @click="removeCar(car.id_samochodu)"
            >
              Remove
            </button>
          </div>
        </div>
      </li>
    </ul>
    <Dialog
      v-model:visible="dialogVisible"
      modal
      :style="{ width: '25rem', position: 'absolute' }"
    >
      <div class="dialog-content">
        <form @submit.prevent="saveCar">
          <div class="dialog-header">
            <h2>{{ isEditing ? "Update Car" : "Add Car" }}</h2>
          </div>
          <div class="dialog-body">
            <label for="marka">Brand:</label>
            <input id="marka" v-model="newCar.marka" required />
            <label for="model">Model:</label>
            <input id="model" v-model="newCar.model" required />
            <label for="rok_produkcji">Year:</label>
            <input
              id="rok_produkcji"
              v-model="newCar.rok_produkcji"
              type="number"
              required
            />
            <label for="cena_za_dzien">Price per day:</label>
            <input
              id="cena_za_dzien"
              v-model="newCar.cena_za_dzien"
              type="number"
              step="0.01"
              required
            />
            <label for="zdjecie">Image URL:</label>
            <input id="zdjecie" v-model="newCar.zdjecie" />
          </div>
          <div class="dialog-footer">
            <button type="submit" class="btn btn-primary">
              {{ isEditing ? "Update" : "Add" }}
            </button>
            <button type="button" class="btn" @click="closeDialog">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useStore } from "../../store/store";
import { Car } from "../../interfaces/Car.interface";
import Dialog from "primevue/dialog";

const store = useStore();
const isAdmin = store.isAdmin;

const cars = ref<Car[]>([]);
const filteredCars = ref<Car[]>([]);
const searchQuery = ref("");
const sortOption = ref("");
const newCar = ref<Car>({
  id_samochodu: 0,
  marka: "",
  model: "",
  rok_produkcji: 0,
  cena_za_dzien: 0,
  zdjecie: "",
});
const dialogVisible = ref(false);
const isEditing = ref(false);
const loading = ref(true);

const fetchCars = async () => {
  try {
    const response = await axios.get("http://localhost:3050/api/samochody");
    cars.value = response.data;
    filteredCars.value = cars.value;
  } catch (error) {
    console.error("Error fetching cars:", error);
  } finally {
    loading.value = false;
  }
};

const filterCars = () => {
  filteredCars.value = cars.value.filter(
    (car) =>
      car.model.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      car.marka.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};

const sortCars = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3050/api/samochody?sort=${sortOption.value}`
    );
    filteredCars.value = response.data;
  } catch (error) {
    console.error("Error sorting cars:", error);
  }
};

const saveCar = async () => {
  try {
    if (isEditing.value) {
      await axios.put(
        `http://localhost:3050/api/samochody/${newCar.value.id_samochodu}`,
        newCar.value
      );
      const index = cars.value.findIndex(
        (car) => car.id_samochodu === newCar.value.id_samochodu
      );
      if (index !== -1) {
        cars.value[index] = { ...newCar.value };
      }
    } else {
      const response = await axios.post(
        "http://localhost:3050/api/samochody",
        newCar.value
      );
      cars.value.push(response.data);
    }
    filterCars();
    closeDialog();
  } catch (error) {
    console.error("Error saving car:", error);
  }
};

const editCar = (car: Car) => {
  newCar.value = { ...car };
  isEditing.value = true;
  openDialog();
};

const removeCar = async (id: number) => {
  try {
    await axios.delete(`http://localhost:3050/api/samochody/${id}`);
    cars.value = cars.value.filter((car) => car.id_samochodu !== id);
    filterCars();
  } catch (error) {
    console.error("Error removing car:", error);
  }
};

const openDialog = () => {
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
  newCar.value = {
    id_samochodu: 0,
    marka: "",
    model: "",
    rok_produkcji: 0,
    cena_za_dzien: 0,
    zdjecie: "",
  };
  isEditing.value = false;
};

onMounted(fetchCars);

watch(sortOption, sortCars);
</script>

<style scoped>
.offer-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 3rem;
}
h1 {
  font-size: 50px;
}
input {
  margin: 1rem 0;
  padding: 0.5rem;
  font-size: 1rem;
}
.car-list {
  max-height: 60vh;
  overflow-y: auto;
  width: 100%;
  padding: 0.5rem;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
}
.car-item {
  /* margin: 1rem; */
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--light-grey);
  border: 2px solid var(--orange);
  border-radius: 15px;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: calc(25% - 2rem);
  flex: 1 1 calc(25% - 2rem);
}
.car-image {
  width: 240px;
  height: 160px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
}
.car-details {
  text-align: center;
}
.car-details h3 {
  margin: 0.5rem 0;
  font-size: 1.2rem;
  color: #333;
}
.car-details p {
  margin: 0.2rem 0;
  color: #666;
}
.car-actions {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
.car-actions button {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 1px solid var(--orange);
  background-color: var(--orange);
  color: var(--white);
  border-radius: 15px;
}
.car-actions button:hover {
  box-shadow: 0 0 10px var(--light-orange);
}
.dialog-content {
  padding: 10px;
}

.dialog-content input {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.dialog-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.dialog-header h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
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

.dialog-body input {
  padding: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 15px;
  margin-bottom: 1rem;
}

.dialog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
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

.search-bar {
  margin-top: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-bar input {
  padding: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 15px;
  margin-right: 1rem;
  background-color: var(--white);
}

.search-bar input:focus,
.dialog-content input:focus {
  border-color: var(--orange);
  box-shadow: 0 0 15px var(--orange);
  outline: none;
}

.add-car {
  border: 1px solid var(--orange);
  background-color: var(--orange);
  padding: 10px;
  border-radius: 15px;
  color: var(--white);
}
.add-car:hover {
  border: 1px solid var(--orange);
  background-color: var(--orange);
  padding: 10px;
  border-radius: 15px;
  color: var(--white);
  box-shadow: 0 0 10px var(--light-orange);
}

.filter-panel {
  display: flex;
  align-items: center;
  margin-right: 1rem;
}

.filter-panel i {
  margin-right: 0.5rem;
}

.filter-panel select {
  padding: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 15px;
  background-color: var(--white);
}

.filter-panel select:focus {
  border-color: var(--orange);
  box-shadow: 0 0 15px var(--orange);
  outline: none;
}

.loader {
  font-size: 1.5rem;
  color: var(--orange);
  margin-top: 2rem;
}
</style>
