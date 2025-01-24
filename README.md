# MatCars - Car Rental Application

A modern web application for car rental services, built with Vue.js and Node.js.

## Features

- User authentication and authorization
- Car browsing and filtering
- Car rental booking system
- Admin panel for managing cars and users
- Multi-language support (English and Polish)
- Responsive design

## Tech Stack

### Frontend
- Vue.js 3
- TypeScript
- Vue Router
- Pinia (State Management)
- PrimeVue (UI Components)
- Vue I18n (Internationalization)
- Axios (HTTP Client)
- SCSS

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- TypeORM

## Installation and Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/matcars.git
cd matcars
```

2. Install all dependencies using the provided script:
```bash
npm run install:all
```
This will install dependencies for the root project, API, and web application.

3. Set up the database:
- Create a PostgreSQL database
- Create `.env` in the api directory
- Update the database configuration in `.env`

4. Run database migrations:
```bash
npm run typeorm migration:run
```

5. Start both frontend and backend servers:
```bash
npm run start
```
This command will concurrently run:
- Backend API server (default: http://localhost:3050)
- Frontend development server (default: http://localhost:8080)

Alternatively, you can run servers separately:
```bash
# Start backend server
npm run start:api

# Start frontend server
npm run start:web
```

## Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=matcars
JWT_SECRET=your_jwt_secret
```

## Project Structure
```
matcars/
├── api/                  # Backend application
│   ├── src/
│   │   ├── controllers/ # Route controllers
│   │   ├── entities/    # TypeORM entities
│   │   ├── migrations/  # Database migrations
│   │   └── routes/     # Express routes
│   └── config/         # Configuration files
├── web/                 # Frontend application
│   ├── src/
│   │   ├── components/ # Vue components
│   │   ├── router/     # Vue Router configuration
│   │   ├── store/      # Pinia store
│   │   ├── translation/# i18n translations
│   │   └── interfaces/ # TypeScript interfaces
│   └── public/         # Static assets
└── package.json        # Root package.json with scripts
```

## Dependencies

### Main Dependencies
- axios: ^1.7.7
- express: ^4.21.1
- pinia: ^2.2.6
- primevue: ^4.2.3
- typeorm: ^0.3.20
- vue: ^3.5.13
- vue-i18n: ^10.0.5
- vue-router: ^4.0.3

### Development Dependencies
- typescript: ^5.7.2
- nodemon: ^3.1.9
- sass: ^1.32.7
- pg: ^8.13.1
- and more (see package.json)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors

- Mateusz Adamczyk - [GitHub](https://github.com/matadamczyk)
