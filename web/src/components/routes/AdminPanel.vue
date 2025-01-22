<template>
  <div class="admin-panel">
    <div class="rentals-container">
      <h2>Panel <span style="color: var(--orange)">Administratora</span></h2>

      <div class="report-section">
        <h3>Użytkownicy</h3>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Imię i Nazwisko</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id_uzytkownika">
                <td>{{ user.id_uzytkownika }}</td>
                <td>{{ user.imie }} {{ user.nazwisko }}</td>
                <td>{{ user.email }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="report-section">
        <h3>Samochody</h3>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Marka</th>
                <th>Model</th>
                <th>Rok produkcji</th>
                <th>Cena za dzień</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="car in cars" :key="car.id_samochodu">
                <td>{{ car.id_samochodu }}</td>
                <td>{{ car.marka }}</td>
                <td>{{ car.model }}</td>
                <td>{{ car.rok_produkcji }}</td>
                <td>{{ car.cena_za_dzien }} PLN</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="report-section">
        <h3>Klienci</h3>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Imię i Nazwisko</th>
                <th>Email</th>
                <th>Telefon</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="customer in customers" :key="customer.id_klienta">
                <td>{{ customer.id_klienta }}</td>
                <td>{{ customer.imie }} {{ customer.nazwisko }}</td>
                <td>{{ customer.email }}</td>
                <td>{{ customer.telefon }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="report-section">
        <h3>Wypożyczenia</h3>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Klient</th>
                <th>Nr telefonu</th>
                <th>Samochód</th>
                <th>Data wypożyczenia</th>
                <th>Data zwrotu</th>
                <th>Koszt całkowity</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="rental in rentals" :key="rental.id_wypozyczenia">
                <td>{{ rental.id_wypozyczenia }}</td>
                <td>{{ rental.klient.imie }} {{ rental.klient.nazwisko }}</td>
                <td>{{ rental.klient.telefon }}</td>
                <td>{{ rental.samochod.marka }} {{ rental.samochod.model }}</td>
                <td>{{ rental.data_wypozyczenia }}</td>
                <td>{{ rental.data_zwrotu }}</td>
                <td>{{ rental.calkowity_koszt }} PLN</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { Car } from "../../interfaces/Car.interface";
import { Rent } from "../../interfaces/Rent.interface";
import { User } from "../../interfaces/User.interface";
import { Customer } from "../../interfaces/Customer.interface";

const users = ref<User[]>([]);
const cars = ref<Car[]>([]);
const rentals = ref<Rent[]>([]);
const customers = ref<Customer[]>([]);

const fetchUsers = async () => {
  const response = await axios.get("http://localhost:3050/api/uzytkownicy");
  users.value = response.data;
};

const fetchCars = async () => {
  const response = await axios.get("http://localhost:3050/api/samochody");
  cars.value = response.data;
};

const fetchRentals = async () => {
  const response = await axios.get("http://localhost:3050/api/wypozyczenia");
  rentals.value = response.data;
};

const fetchCustomers = async () => {
  const response = await axios.get("http://localhost:3050/api/klienci");
  customers.value = response.data;
};

onMounted(() => {
  fetchUsers();
  fetchCars();
  fetchRentals();
  fetchCustomers();
});
</script>

<style scoped>
.admin-panel {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 5rem;
}

h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
}

h3 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

.rentals-container {
  background-color: var(--white);
  border: 2px solid var(--orange);
  box-shadow: 0 0 15px var(--orange);
  border-radius: 15px;
  padding: 1.5rem;
  width: 100%;
  margin-top: 6rem;
}

.report-section {
  margin-bottom: 2rem;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: separate;
  border: 2px solid var(--orange);
  border-spacing: 0;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 2rem;
}

th,
td {
  padding: 1rem;
  text-align: left;
}

th {
  background-color: var(--orange);
  color: white;
  font-weight: 600;
}

tr:hover {
  background-color: var(--light-orange);
}

@media (max-width: 768px) {
  .admin-panel {
    padding: 1rem;
  }

  .rentals-container {
    padding: 1rem;
  }

  h2 {
    font-size: 1.75rem;
  }

  h3 {
    font-size: 1.25rem;
  }

  th,
  td {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
}
</style>
