<template>
  <div>
    <h1>Admin Panel</h1>
    <div>
      <h2>Report 1: Users</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
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
    <div>
      <h2>Report 2: Cars</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Year</th>
            <th>Price per day</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="car in cars" :key="car.id_samochodu">
            <td>{{ car.id_samochodu }}</td>
            <td>{{ car.marka }}</td>
            <td>{{ car.model }}</td>
            <td>{{ car.rok_produkcji }}</td>
            <td>{{ car.cena_za_dzien }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h2>Report 3: Rentals</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Car</th>
            <th>Rental Date</th>
            <th>Return Date</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rental in rentals" :key="rental.id_wypozyczenia">
            <td>{{ rental.id_wypozyczenia }}</td>
            <td>{{ rental.klient.imie }} {{ rental.klient.nazwisko }}</td>
            <td>{{ rental.samochod.marka }} {{ rental.samochod.model }}</td>
            <td>{{ rental.data_wypozyczenia }}</td>
            <td>{{ rental.data_zwrotu }}</td>
            <td>{{ rental.calkowity_koszt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Car } from '../../interfaces/Car.interface';
import { Rent } from '../../interfaces/Rent.interface';
import { User } from '../../interfaces/User.interface';

const users = ref<User[]>([]);
const cars = ref<Car[]>([]);
const rentals = ref<Rent[]>([]);

const fetchUsers = async () => {
  const response = await axios.get('http://localhost:3050/api/uzytkownicy');
  users.value = response.data;
};

const fetchCars = async () => {
  const response = await axios.get('http://localhost:3050/api/samochody');
  cars.value = response.data;
};

const fetchRentals = async () => {
  const response = await axios.get('http://localhost:3050/api/wypozyczenia');
  rentals.value = response.data;
};

onMounted(() => {
  fetchUsers();
  fetchCars();
  fetchRentals();
});
</script>

<style scoped>
/* Add your styles here if needed */
</style>