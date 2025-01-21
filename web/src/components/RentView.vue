<template>
  <div class="rent-container">
    <div class="rent-panel">
      <h2>Book a <span style="color: var(--orange)">Car</span></h2>
      <form @submit.prevent="confirmBooking">
        <div class="form-data">
          <div class="form-row">
            <div class="form-column">
              <label for="carModel">Select Your Car Model</label>
              <select id="carModel" v-model="selectedCarModel">
                <option
                  v-for="car in availableCars"
                  :key="car.id_samochodu"
                  :value="car.id_samochodu"
                >
                  {{ car.marka }} {{ car.model }}
                </option>
              </select>
            </div>
            <div class="form-column">
              <label for="pickupDate">Select Pick-up Date</label>
              <input type="date" id="pickupDate" v-model="pickupDate" />
            </div>
            <div class="form-column">
              <label for="dropoffDate">Select Drop-off Date</label>
              <input type="date" id="dropoffDate" v-model="dropoffDate" />
            </div>
          </div>
          <div class="form-column phone">
            <label for="telefon">Phone Number</label>
            <input type="text" id="telefon" v-model="client.telefon" required />
          </div>
        </div>
        <div class="form-buttons">
          <Button class="submit" label="Submit" @click="confirmBooking" />
        </div>
      </form>
    </div>
    <Dialog
      v-model:visible="dialogVisible"
      modal
      :style="{ width: '25rem', position: 'absolute' }"
    >
      <div class="dialog-content">
        <h2>Confirm Booking</h2>
        <p>Are you sure you want to book this car?</p>
        <div class="dialog-footer">
          <button class="btn btn-primary" @click="submitForm">Yes</button>
          <button class="btn" @click="dialogVisible = false">No</button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { Car } from "../interfaces/Car.interface";
import { Rent } from "../interfaces/Rent.interface";
import { Customer } from "../interfaces/Customer.interface";
import { useStore } from "../store/store";
import Dialog from "primevue/dialog";

const store = useStore();

const cars = ref<Car[]>([]);
const availableCars = ref<Car[]>([]);
const selectedCarModel = ref<number | null>(null);
const pickupDate = ref<string>("");
const dropoffDate = ref<string>("");
const dialogVisible = ref(false);
const client = ref<Customer>({
  id_klienta: 0,
  imie: store.user?.imie || "",
  nazwisko: store.user?.nazwisko || "",
  email: store.user?.email || "",
  telefon: "",
});

const fetchCars = async () => {
  try {
    const response = await axios.get("/samochody");
    cars.value = response.data;
    availableCars.value = response.data.filter((car: Car) => {
      return true;
    });
  } catch (error) {
    console.error("Error fetching cars:", error);
  }
};

const checkCarAvailability = async (carId: number, startDate: string, endDate: string) => {
  try {
    const response = await axios.get(`/wypozyczenia/availability/${carId}`, {
      params: {
        startDate,
        endDate
      }
    });
    return response.data.available;
  } catch (error) {
    console.error("Error checking car availability:", error);
    return false;
  }
};

const confirmBooking = () => {
  if (
    !selectedCarModel.value ||
    !pickupDate.value ||
    !dropoffDate.value ||
    !client.value.telefon
  ) {
    alert("Please fill in all fields.");
    return;
  }
  dialogVisible.value = true;
};

const submitForm = async () => {
  try {
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    };

    // Check car availability first
    const isAvailable = await checkCarAvailability(
      selectedCarModel.value!,
      pickupDate.value,
      dropoffDate.value
    );

    if (!isAvailable) {
      dialogVisible.value = false;
      alert("This car is not available for the selected dates. Please choose different dates or another car.");
      return;
    }

    await store.fetchUserData();
    const userDetails = store.getUserDetails();
    
    if (!userDetails) {
      alert("Please log in first");
      dialogVisible.value = false;
      return;
    }

    const clientData = {
      imie: userDetails.imie,
      nazwisko: userDetails.nazwisko,
      email: userDetails.email,
      telefon: client.value.telefon
    };

    // Create or update client
    const clientResponse = await axios.post(
      "http://localhost:3050/api/klienci",
      clientData,
      axiosConfig
    );

    // Calculate rental cost
    const selectedCar = cars.value.find(car => car.id_samochodu === selectedCarModel.value);
    if (!selectedCar) {
      throw new Error("Selected car not found");
    }

    const totalCost = calculateCost(
      selectedCarModel.value!,
      pickupDate.value,
      dropoffDate.value
    );

    // Create rental
    const rentalData = {
      data_wypozyczenia: pickupDate.value,
      data_zwrotu: dropoffDate.value,
      calkowity_koszt: totalCost,
      klient: clientResponse.data,
      samochod: { id_samochodu: selectedCarModel.value }
    };

    await axios.post(
      "http://localhost:3050/api/wypozyczenia",
      rentalData,
      axiosConfig
    );

    // Show success message and reset form
    dialogVisible.value = false;
    alert("Car rented successfully!");
    
    // Reset form
    selectedCarModel.value = null;
    pickupDate.value = "";
    dropoffDate.value = "";
    client.value.telefon = "";
    
    // Refresh available cars
    await fetchCars();

  } catch (error) {
    console.error("Error during rental process:", error);
    dialogVisible.value = false;
    alert("Failed to complete the rental. Please try again.");
  }
};

const calculateCost = (
  carId: number,
  pickupDate: string,
  dropoffDate: string
): number => {
  const car = cars.value.find((car) => car.id_samochodu === carId);
  if (!car) return 0;

  const pickup = new Date(pickupDate);
  const dropoff = new Date(dropoffDate);
  const days = (dropoff.getTime() - pickup.getTime()) / (1000 * 3600 * 24);

  return days * car.cena_za_dzien;
};

onMounted(fetchCars);
</script>

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
  height: 60%;
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
  flex-direction: column;
}
.form-row {
  display: flex;
  flex-direction: row;
}
.form-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 30px;
  text-align: center;
}
.phone {
  margin-top: 1rem;
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
  text-align: center;
}

input:focus,
select:focus {
  border: 2px solid var(--orange);
  box-shadow: 0 0 15px 0 var(--orange);
  outline: none;
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
.user-details {
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
.p-button.p-component.user-details:hover {
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
.dialog-content {
  padding: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
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
</style>
