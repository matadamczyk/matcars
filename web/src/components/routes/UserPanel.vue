<template>
  <div class="user-panel">
    <div class="rentals-container" v-if="rentals.length">
      <h2>{{ $t('user.title') }}</h2>
      <table>
        <thead>
          <tr>
            <th>{{ $t('user.table.car') }}</th>
            <th>{{ $t('user.table.pickupDate') }}</th>
            <th>{{ $t('user.table.dropoffDate') }}</th>
            <th>{{ $t('user.table.totalCost') }}</th>
            <th>{{ $t('user.table.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rental in rentals" :key="rental.id_wypozyczenia">
            <td>{{ rental.samochod.marka }} {{ rental.samochod.model }}</td>
            <td>{{ formatDate(rental.data_wypozyczenia) }}</td>
            <td>{{ formatDate(rental.data_zwrotu) }}</td>
            <td>{{ rental.calkowity_koszt }} PLN</td>
            <td>
              <button class="delete-btn" @click="deleteRental(rental.id_wypozyczenia)">
                {{ $t('user.table.cancel') }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="no-rentals">
      {{ $t('user.noRentals') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useStore } from '../../store/store';
import { Rent } from '../../interfaces/Rent.interface';

const store = useStore();
const rentals = ref<Rent[]>([]);

const fetchRentals = async () => {
  try {
    await store.fetchUserData();
    const userDetails = store.getUserDetails();
    
    if (!userDetails) {
      return;
    }

    const response = await axios.get('/wypozyczenia', {
      params: { email: userDetails.email }
    });
    rentals.value = response.data;
  } catch (error) {
    console.error('Error fetching rentals:', error);
  }
};

const deleteRental = async (id: number) => {
  if (!confirm('Are you sure you want to cancel this rental?')) {
    return;
  }

  try {
    const token = store.getToken(); 
    await axios.delete(`/wypozyczenia/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    await fetchRentals();
  } catch (error) {
    console.error('Error deleting rental:', error);
    alert('Failed to cancel rental');
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

onMounted(fetchRentals);
</script>

<style scoped>
.user-panel {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.rentals-container {
  background-color: var(--white);
  border: 2px solid var(--orange);
  box-shadow: 0 0 15px var(--orange);
  border-radius: 15px;
  padding: 1.5rem;
}

table {
  width: 100%;
  border-collapse: separate;
  border: 2px solid var(--orange);
  border-spacing: 0;
  border-radius: 15px;
  overflow: hidden;
}

th, td {
  padding: 1rem;
  text-align: center;
}

th {
  background-color: var(--orange);
  color: white;
}

tr:hover {
  background-color: var(--light-orange);
}

.delete-btn {
  background-color: red;
  color: var(--white);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.delete-btn:hover {
  box-shadow: 0 0 10px 0 red;
}

.no-rentals {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.2rem;
}
</style>