<template>
  <div class="admin-panel">
    <div class="rentals-container">
      <h2>Admin <span style="color: var(--orange)">Panel</span></h2>

      <button @click="showDialog('tables')" class="accordion">Tables</button>
      <button @click="showDialog('reports')" class="accordion">Reports</button>
      <button @click="showDialog('logs')" class="accordion">Logs</button>

      <div v-if="dialogVisible.tables" class="dialog-overlay" @click.self="closeDialog('tables')">
        <div class="dialog-content">
          <button class="close-button" @click="closeDialog('tables')">X</button>
          <h2>Tables</h2>
          <div v-for="section in tableSections" :key="section.title" class="accordion-section">
            <button @click="toggleSection(section.title)" class="accordion">{{ section.title }}</button>
            <div :class="['panel', { show: section.isOpen }]">
              <div class="report-section">
                <div class="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th v-for="header in section.headers" :key="header">{{ header }}</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in section.data" :key="resolveKey(item)">
                        <td v-for="key in section.keys" :key="key">{{ getItemValue(item, key) }}</td>
                        <td>
                          <button class="edit" @click="showEditDialog(section.title, item)">Edit</button><br/>
                          <button class="remove" @click="removeItem(section.title, item)">Remove</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div v-if="section.error" class="error">{{ section.error }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="dialogVisible.reports" class="dialog-overlay" @click.self="closeDialog('reports')">
        <div class="dialog-content">
          <button class="close-button" @click="closeDialog('reports')">X</button>
          <h2>Reports</h2>
          <div v-for="section in reportSections" :key="section.title" class="accordion-section">
            <button @click="toggleSection(section.title)" class="accordion">{{ section.title }}</button>
            <div :class="['panel', { show: section.isOpen }]">
              <div class="report-section">
                <h3>{{ section.title }}</h3>
                <div class="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th v-for="header in section.headers" :key="header">{{ header }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in section.data" :key="resolveKey(item)">
                        <td v-for="key in section.keys" :key="key">{{ getItemValue(item, key) }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div v-if="section.error" class="error">{{ section.error }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="dialogVisible.logs" class="dialog-overlay" @click.self="closeDialog('logs')">
        <div class="dialog-content">
          <button class="close-button" @click="closeDialog('logs')">X</button>
          <h2>Logs</h2>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Table</th>
                  <th>Operation</th>
                  <th>Operation Date</th>
                  <th>User ID</th>
                  <th>Old Data</th>
                  <th>New Data</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="log in logs" :key="log.id_log">
                  <td>{{ log.id_log }}</td>
                  <td>{{ log.tabela }}</td>
                  <td>{{ log.operacja }}</td>
                  <td>{{ log.data_operacji }}</td>
                  <td>{{ log.uzytkownik_id }}</td>
                  <td>{{ log.stare_dane }}</td>
                  <td>{{ log.nowe_dane }}</td>
                </tr>
              </tbody>
            </table>
            <div v-if="logsError" class="error">{{ logsError }}</div>
          </div>
        </div>
      </div>

      <div v-if="dialogVisible.edit" class="dialog-overlay" @click.self="closeEditDialog">
        <div class="dialog-content">
          <button class="close-button" @click="closeEditDialog">X</button>
          <h2>Edit {{ currentEditSection }}</h2>
          <div v-if="currentEditItem">
            <div v-for="(value, key) in currentEditItem" :key="key" class="form-group">
              <label :for="key">{{ key }}</label>
              <input v-model="currentEditItem[key]" :id="key" :type="typeof value === 'number' ? 'number' : 'text'" />
            </div>
            <button class="edit" @click="saveEditItem">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { Car } from "../../interfaces/Car.interface";
import { Rent } from "../../interfaces/Rent.interface";
import { User } from "../../interfaces/User.interface";
import { Customer } from "../../interfaces/Customer.interface";
import { Logi } from "../../interfaces/Logs.interface";
import { useStore } from "../../store/store";

const store = useStore();
const users = ref<User[]>([]);
const cars = ref<Car[]>([]);
const rentals = ref<Rent[]>([]);
const customers = ref<Customer[]>([]);
const activeRentals = ref([]);
const carAvailability = ref([]);
const rentalStatistics = ref([]);
const logs = ref<Logi[]>([]);
const logsError = ref<string | null>(null);

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3050/api',
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${store.token}`
  }
});

const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get("/uzytkownicy");
    users.value = response.data.map((user: any) => ({
      ...user,
      rola: user.rola ? user.rola.nazwa : "N/A"
    }));
    const userSection = sections.value.find(sec => sec.title === 'Użytkownicy');
    if (userSection) {
      userSection.data = users.value;
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    const userSection = sections.value.find(sec => sec.title === 'Użytkownicy');
    if (userSection) {
      userSection.error = (error as Error).message;
    }
  }
};

const fetchCars = async () => {
  try {
    const response = await axiosInstance.get("/samochody");
    cars.value = response.data;
    const carSection = sections.value.find(sec => sec.title === 'Samochody');
    if (carSection) {
      carSection.data = cars.value;
    }
  } catch (error) {
    console.error("Error fetching cars:", error);
    const carSection = sections.value.find(sec => sec.title === 'Samochody');
    if (carSection) {
      carSection.error = (error as Error).message;
    }
  }
};

const fetchRentals = async () => {
  try {
    const response = await axiosInstance.get("/wypozyczenia");
    rentals.value = response.data;
    const rentalSection = sections.value.find(sec => sec.title === 'Wypożyczenia');
    if (rentalSection) {
      rentalSection.data = rentals.value;
    }
  } catch (error) {
    console.error("Error fetching rentals:", error);
    const rentalSection = sections.value.find(sec => sec.title === 'Wypożyczenia');
    if (rentalSection) {
      rentalSection.error = (error as Error).message;
    }
  }
};

const fetchCustomers = async () => {
  try {
    const response = await axiosInstance.get("/klienci");
    customers.value = response.data;
    const customerSection = sections.value.find(sec => sec.title === 'Klienci');
    if (customerSection) {
      customerSection.data = customers.value;
    }
  } catch (error) {
    console.error("Error fetching customers:", error);
    const customerSection = sections.value.find(sec => sec.title === 'Klienci');
    if (customerSection) {
      customerSection.error = (error as Error).message;
    }
  }
};

const fetchActiveRentals = async () => {
  try {
    const response = await axiosInstance.get("/reports/active-rentals");
    activeRentals.value = response.data;
    const activeRentalsSection = sections.value.find(sec => sec.title === 'Aktywne Wypożyczenia');
    if (activeRentalsSection) {
      activeRentalsSection.data = activeRentals.value;
    }
  } catch (error) {
    console.error("Error fetching active rentals:", error);
    const activeRentalsSection = sections.value.find(sec => sec.title === 'Aktywne Wypożyczenia');
    if (activeRentalsSection) {
      activeRentalsSection.error = (error as Error).message;
    }
  }
};

const fetchCarAvailability = async () => {
  try {
    const response = await axiosInstance.get("/reports/car-availability");
    carAvailability.value = response.data;
    const carAvailabilitySection = sections.value.find(sec => sec.title === 'Dostępność Samochodów');
    if (carAvailabilitySection) {
      carAvailabilitySection.data = carAvailability.value;
    }
  } catch (error) {
    console.error("Error fetching car availability:", error);
    const carAvailabilitySection = sections.value.find(sec => sec.title === 'Dostępność Samochodów');
    if (carAvailabilitySection) {
      carAvailabilitySection.error = (error as Error).message;
    }
  }
};

const fetchRentalStatistics = async () => {
  try {
    const response = await axiosInstance.get("/reports/rental-statistics");
    rentalStatistics.value = response.data;
    const rentalStatisticsSection = sections.value.find(sec => sec.title === 'Statystyki Wypożyczeń');
    if (rentalStatisticsSection) {
      rentalStatisticsSection.data = rentalStatistics.value;
    }
  } catch (error) {
    console.error("Error fetching rental statistics:", error);
    const rentalStatisticsSection = sections.value.find(sec => sec.title === 'Statystyki Wypożyczeń');
    if (rentalStatisticsSection) {
      rentalStatisticsSection.error = (error as Error).message;
    }
  }
};

const fetchLogs = async () => {
  try {
    const response = await axiosInstance.get("/logi");
    logs.value = response.data;
  } catch (error) {
    console.error("Error fetching logs:", error);
    logsError.value = (error as Error).message;
  }
};

const showDialog = (dialog: 'tables' | 'reports' | 'logs') => {
  dialogVisible.value[dialog] = true;
  if (dialog === 'logs') {
    fetchLogs();
  }
};

const closeDialog = (dialog: 'tables' | 'reports' | 'logs') => {
  dialogVisible.value[dialog] = false;
};

const toggleSection = (title: string) => {
  const section = sections.value.find(sec => sec.title === title);
  if (section) {
    section.isOpen = !section.isOpen;
  }
};

function isUser(item: any): item is User {
  return 'id_uzytkownika' in item;
}

function isCar(item: any): item is Car {
  return 'id_samochodu' in item;
}

function isRent(item: any): item is Rent {
  return 'id_wypozyczenia' in item;
}

function resolveKey(item: User | Car | Rent | Customer): string | number | undefined {
  if (isUser(item)) return item.id_uzytkownika;
  if (isCar(item)) return item.id_samochodu;
  if (isRent(item)) return item.id_wypozyczenia;
  if ('id_klienta' in item) return item.id_klienta;
  return undefined;
}

type SectionItem = User | Car | Rent | Customer;

const sections = ref<Array<{
  title: string;
  data: SectionItem[];
  keys: string[];
  headers: string[];
  isOpen: boolean; 
  error?: string;
}>>([
  {
    title: 'Użytkownicy',
    headers: ['ID', 'Imię', 'Nazwisko', 'Email', 'Rola', 'Utworzono', 'Ostatnie logowanie'],
    keys: ['id_uzytkownika', 'imie', 'nazwisko', 'email', 'rola', 'created_at', 'last_login'],
    data: users.value,
    isOpen: false,
    error: ''
  },
  {
    title: 'Samochody',
    headers: ['ID', 'Marka', 'Model', 'Rok produkcji', 'Cena za dzień', 'Status', 'Utworzono'],
    keys: ['id_samochodu', 'marka', 'model', 'rok_produkcji', 'cena_za_dzien', 'status', 'created_at'],
    data: cars.value,
    isOpen: false,
    error: ''
  },
  {
    title: 'Klienci',
    headers: ['ID', 'Imię', 'Nazwisko', 'Email', 'Telefon', 'Utworzono'],
    keys: ['id_klienta', 'imie', 'nazwisko', 'email', 'telefon', 'created_at'],
    data: customers.value,
    isOpen: false,
    error: ''
  },
  {
    title: 'Wypożyczenia',
    headers: ['ID', 'Klient', 'Nr telefonu', 'Samochód', 'Data wypożyczenia', 'Data zwrotu', 'Koszt całkowity', 'Status', 'Utworzono'],
    keys: ['id_wypozyczenia', 'klient.imie + klient.nazwisko', 'klient.telefon', 'samochod.marka + samochod.model', 'data_wypozyczenia', 'data_zwrotu', 'calkowity_koszt', 'status', 'created_at'],
    data: rentals.value,
    isOpen: false,
    error: ''
  },
  {
    title: 'Aktywne Wypożyczenia',
    headers: ['ID', 'Klient', 'Nr telefonu', 'Samochód', 'Data wypożyczenia', 'Data zwrotu', 'Koszt całkowity'],
    keys: ['id_wypozyczenia', 'klient.imie', 'klient.telefon', 'samochod.marka', 'samochod.model', 'data_wypozyczenia', 'data_zwrotu', 'calkowity_koszt'],
    data: activeRentals.value,
    isOpen: false,
    error: ''
  },
  {
    title: 'Dostępność Samochodów',
    headers: ['ID', 'Marka', 'Model', 'Rok produkcji', 'Cena za dzień', 'Status', 'Dostępność'],
    keys: ['id_samochodu', 'marka', 'model', 'rok_produkcji', 'cena_za_dzien', 'status', 'is_available'],
    data: carAvailability.value,
    isOpen: false,
    error: ''
  },
  {
    title: 'Statystyki Wypożyczeń',
    headers: ['Marka', 'Model', 'Ilość Wypożyczeń', 'Całkowity Dochód', 'Średni Dochód'],
    keys: ['marka', 'model', 'total_rentals', 'total_revenue', 'avg_revenue'],
    data: rentalStatistics.value,
    isOpen: false,
    error: ''
  }
]);

const tableSections = computed(() => sections.value.filter(section => ['Użytkownicy', 'Samochody', 'Klienci', 'Wypożyczenia'].includes(section.title)));
const reportSections = computed(() => sections.value.filter(section => ['Aktywne Wypożyczenia', 'Dostępność Samochodów', 'Statystyki Wypożyczeń'].includes(section.title)));

const dialogVisible = ref({
  tables: false,
  reports: false,
  logs: false,
  edit: false
});

const currentEditItem = ref<SectionItem | null>(null);
const currentEditSection = ref<string | null>(null);

const showEditDialog = (sectionTitle: string, item: SectionItem) => {
  currentEditSection.value = sectionTitle;
  currentEditItem.value = { ...item };
  dialogVisible.value.edit = true;
};

const closeEditDialog = () => {
  dialogVisible.value.edit = false;
  currentEditItem.value = null;
  currentEditSection.value = null;
};

const saveEditItem = async () => {
  if (!currentEditItem.value || !currentEditSection.value) return;

  try {
    let endpoint = '';
    switch (currentEditSection.value) {
      case 'Użytkownicy':
        if (isUser(currentEditItem.value)) {
          endpoint = `/uzytkownicy/${currentEditItem.value.id_uzytkownika}`;
        }
        break;
      case 'Samochody':
        if (isCar(currentEditItem.value)) {
          endpoint = `/samochody/${currentEditItem.value.id_samochodu}`;
        }
        break;
      case 'Klienci':
        if ('id_klienta' in currentEditItem.value) {
          endpoint = `/klienci/${currentEditItem.value.id_klienta}`;
        }
        break;
      case 'Wypożyczenia':
        if (isRent(currentEditItem.value)) {
          endpoint = `/wypozyczenia/${currentEditItem.value.id_wypozyczenia}`;
        }
        break;
      default:
        console.error('Unknown section title:', currentEditSection.value);
        return;
    }
    await axiosInstance.put(endpoint, currentEditItem.value);
    closeEditDialog();
    switch (currentEditSection.value) {
      case 'Użytkownicy':
        fetchUsers();
        break;
      case 'Samochody':
        fetchCars();
        break;
      case 'Klienci':
        fetchCustomers();
        break;
      case 'Wypożyczenia':
        fetchRentals();
        break;
    }
  } catch (error) {
    console.error(`Error saving item in section ${currentEditSection.value}:`, error);
  }
};

function getItemValue(item: any, key: string) {
  if (key.includes('+')) {
    return key.split('+').map(k => k.trim()).map(k => k.split('.').reduce((o, i) => (o ? o[i] : "N/A"), item)).join(' ');
  }
  const value = key.split('.').reduce((o, i) => (o ? o[i] : "N/A"), item);
  if (key === 'avg_revenue' && typeof value === 'number') {
    return value.toFixed(2);
  }
  return value ?? "N/A";
}

const removeItem = async (sectionTitle: string, item: SectionItem) => {
  console.log(`Removing item in section ${sectionTitle}:`, item);
  try {
    let endpoint = '';
    switch (sectionTitle) {
      case 'Użytkownicy':
        if (isUser(item)) {
          endpoint = `/uzytkownicy/${item.id_uzytkownika}`;
        }
        break;
      case 'Samochody':
        if (isCar(item)) {
          endpoint = `/samochody/${item.id_samochodu}`;
        }
        break;
      case 'Klienci':
        if ('id_klienta' in item) {
          endpoint = `/klienci/${item.id_klienta}`;
        }
        break;
      case 'Wypożyczenia':
        if (isRent(item)) {
          endpoint = `/wypozyczenia/${item.id_wypozyczenia}`;
        }
        break;
      default:
        console.error('Unknown section title:', sectionTitle);
        return;
    }
    await axiosInstance.delete(endpoint);
    switch (sectionTitle) {
      case 'Użytkownicy':
        fetchUsers();
        break;
      case 'Samochody':
        fetchCars();
        break;
      case 'Klienci':
        fetchCustomers();
        break;
      case 'Wypożyczenia':
        fetchRentals();
        break;
    }
  } catch (error) {
    console.error(`Error removing item from section ${sectionTitle}:`, error);
  }
};

onMounted(() => {
  if (store.isAdmin) {
    fetchUsers();
    fetchCars();
    fetchRentals();
    fetchCustomers();
    fetchActiveRentals();
    fetchCarAvailability();
    fetchRentalStatistics();
  } else {
    console.error("Unauthorized access");
  }
});
</script>

<style scoped>
.admin-panel {
  padding: 2rem;
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

.accordion-section {
  margin-bottom: 1rem;
}

.accordion {
  background-color: var(--orange);
  color: white;
  text-align: center;
  cursor: pointer;
  padding: 1rem;
  width: 100%;
  border-radius: 15px;
  border: none;
  outline: none;
  transition: 0.4s;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.accordion:hover {
  box-shadow: 0 0 15px 0 var(--orange);
}

.panel {
  padding: 0 1rem;
  background-color: white;
  display: none;
  overflow: hidden;
}

.panel.show {
  display: block;
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
  text-align: center;
}

th {
  background-color: var(--orange);
  color: white;
  font-weight: 600;
}

tr:hover {
  background-color: var (--light-orange);
}

.error {
  color: red;
  margin-top: 1rem;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-content {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  min-width: 90%;
  max-height: 90%;
  overflow-y: auto;
  border: 2px solid var(--orange);
  box-shadow: 0 0 15px 0 var(--orange);
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
}

button.edit {
  border: none;
  background-color: var(--orange);
  color: var(--white);
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  margin-bottom: 10px;
}

button.edit:hover {
  box-shadow: 0 0 5px 0 var(--orange);
}

button.remove {
  border: none;
  background-color: red;
  color: var(--white);
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  margin-bottom: 10px;
}

button.remove:hover {
  box-shadow: 0 0 5px 0 red;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
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
