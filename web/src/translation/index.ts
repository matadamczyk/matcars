import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    navbar: {
      home: 'Home',
      about: 'About',
      vehicles: 'Vehicle Models',
      contact: 'Contact',
      adminPanel: 'Admin Panel',
      userPanel: 'User Panel',
      signin: 'Sign in',
      register: 'Register',
      logout: 'Logout'
    },
    welcome: {
      title: 'Rent the car of your dreams today!',
      subtitle: {
        part1: 'Unbeatable',
        part2: 'prices,',
        part3: 'unlimited',
        part4: 'miles,',
        part5: 'and',
        part6: 'flexible',
        part7: 'pick-up options await you.'
      },
      bookNow: 'Book now',
      viewOffer: 'View offer'
    },
    steps: {
      planTrip: 'Plan your',
      trip: 'trip',
      rightNow: 'right now!',
      checkOut: 'Check out',
      stepsOf: 'steps',
      renting: 'of renting',
      step1: 'Select Car',
      step2: 'Book',
      step3: 'Drive car of your dreams'
    },
    about: {
      title: 'About Us',
      description:
        'We offer a wide range of car models for rent. Currently, we have over 10 different models available. Our mission is to provide high-quality car rental services to our customers. We strive to offer the best prices and the most convenient rental experience. We are committed to customer satisfaction and work hard to ensure that every rental experience is a positive one. Thank you for choosing our car rental service. We look forward to serving you!',
      visit: 'Visit us at our Cracow office:'
    },
    rent: {
      title: 'Book',
      secondTitle: 'Car',
      carModel: 'Car Model',
      selectCar: 'Select a car',
      pickupDate: 'Pick-up Date',
      dropoffDate: 'Drop-off Date',
      phone: 'Phone Number',
      perDay: 'day',
      submit: 'Book Now',
      confirm: {
        title: 'Confirm Booking',
        message: 'Are you sure you want to book this car?',
        yes: 'Yes, Book Now',
        no: 'Cancel'
      }
    },
    admin: {
      title: 'Admin Panel',
      sections: {
        users: 'Users',
        reports: 'Reports',
        logs: 'System Logs'
      },
      users: {
        title: 'User Management',
        table: {
          email: 'Email',
          firstName: 'First Name',
          lastName: 'Last Name',
          role: 'Role',
          actions: 'Actions'
        }
      },
      reports: {
        title: 'Reports',
        revenue: {
          title: 'Revenue',
          total: 'Total Revenue'
        },
        rentals: {
          title: 'Rentals',
          total: 'Total Rentals'
        }
      },
      logs: {
        title: 'System Logs'
      },
      actions: {
        delete: 'Delete'
      }
    },
    user: {
      title: 'My Rentals',
      noRentals: 'You have no active rentals',
      table: {
        car: 'Car',
        pickupDate: 'Pick-up Date',
        dropoffDate: 'Drop-off Date',
        totalCost: 'Total Cost',
        actions: 'Actions',
        cancel: 'Cancel'
      }
    },
    auth: {
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      register: {
        title: 'Create Account',
        haveAccount: 'Already have an account?',
        signInNow: 'Sign in now!',
        firstName: 'First Name',
        lastName: 'Last Name',
        success: 'Registration Successful',
        successMessage: 'Your account has been created successfully.'
      },
      login: {
        title: 'Welcome Back',
        noAccount: 'Don\'t have an account?',
        createToday: 'Create today!',
        forgotPassword: 'Forgot password?',
        success: 'Login Successful'
      }
    },
    footer: {
      slogan: {
        part1: 'Drive Your Dreams with MatCars - Afford',
        able1: 'able',
        part2: 'Reli',
        able2: 'able',
        part3: 'Unforgett',
        able3: 'able'
      },
      rights: '© 2024 Car Rental Company. All rights reserved.',
      workingHours: {
        title: 'Working Hours',
        weekdays: 'Mon - Fri: 9:00 AM - 6:00 PM',
        saturday: 'Sat: 10:00 AM - 4:00 PM',
        sunday: 'Sun: Closed'
      },
      contact: {
        title: 'Contact Us',
        office: 'Our Office',
        address: {
          street: '123 Main Street',
          city: 'Cracow',
          country: 'Poland'
        },
        getInTouch: 'Get in Touch',
        email: 'Email: info@matcars.com',
        phone: 'Phone: (123) 456-7890',
        workingHours: 'Mon - Fri: 9:00 AM - 6:00 PM'
      },
      designedBy: 'Designed by'
    },
    offer: {
      search: {
        placeholder: 'Search for a car model...'
      },
      sort: {
        default: 'Sort by',
        priceLowToHigh: 'Price (Low to High)',
        priceHighToLow: 'Price (High to Low)',
        brandAZ: 'Brand (A to Z)',
        brandZA: 'Brand (Z to A)',
        yearOldToNew: 'Year (Oldest to Newest)',
        yearNewToOld: 'Year (Newest to Oldest)'
      },
      actions: {
        edit: 'Edit',
        remove: 'Remove',
        add: 'Add Car',
        update: 'Update',
        cancel: 'Cancel'
      },
      dialog: {
        add: 'Add Car',
        edit: 'Update Car'
      },
      form: {
        brand: 'Brand',
        model: 'Model',
        year: 'Production Year',
        price: 'Price per Day',
        image: 'Image URL'
      },
      loading: 'Loading our fleet...'
    }
  },
  pl: {
    navbar: {
      home: 'Strona główna',
      about: 'O nas',
      vehicles: 'Modele pojazdów',
      contact: 'Kontakt',
      adminPanel: 'Panel admina',
      userPanel: 'Panel użytkownika',
      signin: 'Zaloguj się',
      register: 'Zarejestruj się',
      logout: 'Wyloguj'
    },
    welcome: {
      title: 'Wypożycz samochód swoich marzeń już dziś!',
      subtitle: {
        part1: 'Bezkonkurencyjne',
        part2: 'ceny,',
        part3: 'nielimitowane',
        part4: 'kilometry,',
        part5: 'oraz',
        part6: 'elastyczne',
        part7: 'opcje odbioru czekają na Ciebie.'
      },
      bookNow: 'Zarezerwuj teraz',
      viewOffer: 'Zobacz ofertę'
    },
    steps: {
      planTrip: 'Zaplanuj swoją',
      trip: 'podróż',
      rightNow: 'już teraz!',
      checkOut: 'Sprawdź',
      stepsOf: 'kroki',
      renting: 'wypożyczenia',
      step1: 'Wybierz samochód',
      step2: 'Zarezerwuj',
      step3: 'Prowadź samochód marzeń'
    },
    about: {
      title: 'O nas',
      description:
        'Oferujemy szeroki wybór modeli samochodów do wynajęcia. Obecnie mamy ponad 10 różnych modeli. Naszą misją jest świadczenie wysokiej jakości usług wynajmu samochodów. Staramy się oferować najlepsze ceny i najwygodniejsze doświadczenie wynajmu. Jesteśmy zaangażowani w zadowolenie klienta i dokładamy wszelkich starań, aby każde wypożyczenie było pozytywnym doświadczeniem. Dziękujemy za wybór naszej wypożyczalni. Czekamy na Ciebie!',
      visit: 'Odwiedź nas w naszym biurze w Krakowie:'
    },
    rent: {
      title: 'Wypożycz',
      secondTitle: 'Samochód',
      carModel: 'Model Samochodu',
      selectCar: 'Wybierz samochód',
      pickupDate: 'Data odbioru',
      dropoffDate: 'Data zwrotu',
      phone: 'Numer telefonu',
      perDay: 'dzień',
      submit: 'Zarezerwuj',
      confirm: {
        title: 'Potwierdź rezerwację',
        message: 'Czy na pewno chcesz zarezerwować ten samochód?',
        yes: 'Tak, Rezerwuj',
        no: 'Anuluj'
      }
    },
    admin: {
      title: 'Panel Administratora',
      sections: {
        users: 'Użytkownicy',
        reports: 'Raporty',
        logs: 'Logi systemowe'
      },
      users: {
        title: 'Zarządzanie użytkownikami',
        table: {
          email: 'Email',
          firstName: 'Imię',
          lastName: 'Nazwisko',
          role: 'Rola',
          actions: 'Akcje'
        }
      },
      reports: {
        title: 'Raporty',
        revenue: {
          title: 'Przychody',
          total: 'Całkowity przychód'
        },
        rentals: {
          title: 'Wypożyczenia',
          total: 'Liczba wypożyczeń'
        }
      },
      logs: {
        title: 'Logi systemowe'
      },
      actions: {
        delete: 'Usuń'
      }
    },
    user: {
      title: 'Moje wypożyczenia',
      noRentals: 'Nie masz aktywnych wypożyczeń',
      table: {
        car: 'Samochód',
        pickupDate: 'Data odbioru',
        dropoffDate: 'Data zwrotu',
        totalCost: 'Całkowity koszt',
        actions: 'Akcje',
        cancel: 'Anuluj'
      }
    },
    auth: {
      email: 'Email',
      password: 'Hasło',
      confirmPassword: 'Potwierdź hasło',
      register: {
        title: 'Utwórz konto',
        haveAccount: 'Masz już konto?',
        signInNow: 'Zaloguj się teraz!',
        firstName: 'Imię',
        lastName: 'Nazwisko',
        success: 'Rejestracja udana',
        successMessage: 'Twoje konto zostało pomyślnie utworzone.'
      },
      login: {
        title: 'Witaj ponownie',
        noAccount: 'Nie masz konta?',
        createToday: 'Utwórz je dziś!',
        forgotPassword: 'Zapomniałeś hasła?',
        success: 'Logowanie udane'
      }
    },
    footer: {
      slogan: {
        part1: 'Spełnij marzenia z MatCars - Dostęp',
        able1: 'ny',
        part2: 'Nieza',
        able2: 'wodny',
        part3: 'Niezapomnia',
        able3: 'ny'
      },
      rights: '© 2024 Wypożyczalnia samochodów. Wszelkie prawa zastrzeżone.',
      workingHours: {
        title: 'Godziny otwarcia',
        weekdays: 'Pon - Pt: 9:00 - 18:00',
        saturday: 'Sob: 10:00 - 16:00',
        sunday: 'Niedz: Zamknięte'
      },
      contact: {
        title: 'Kontakt',
        office: 'Nasze Biuro',
        address: {
          street: 'ul. Główna 123',
          city: 'Kraków',
          country: 'Polska'
        },
        getInTouch: 'Skontaktuj się z nami',
        email: 'Email: info@matcars.com',
        phone: 'Telefon: (123) 456-7890',
        workingHours: 'Pon - Pt: 9:00 - 18:00'
      },
      designedBy: 'Zaprojektowane przez'
    },
    offer: {
      search: {
        placeholder: 'Szukaj modelu samochodu...'
      },
      sort: {
        default: 'Sortuj według',
        priceLowToHigh: 'Cena (od najniższej)',
        priceHighToLow: 'Cena (od najwyższej)',
        brandAZ: 'Marka (A do Z)',
        brandZA: 'Marka (Z do A)',
        yearOldToNew: 'Rok (od najstarszych)',
        yearNewToOld: 'Rok (od najnowszych)'
      },
      actions: {
        edit: 'Edytuj',
        remove: 'Usuń',
        add: 'Dodaj samochód',
        update: 'Aktualizuj',
        cancel: 'Anuluj'
      },
      dialog: {
        add: 'Dodaj samochód',
        edit: 'Aktualizuj samochód'
      },
      form: {
        brand: 'Marka',
        model: 'Model',
        year: 'Rok produkcji',
        price: 'Cena za dzień',
        image: 'URL zdjęcia'
      },
      loading: 'Ładowanie naszej floty...'
    }
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: 'pl',
  fallbackLocale: 'en',
  messages
})