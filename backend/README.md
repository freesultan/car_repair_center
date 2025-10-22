# Car Repair Center Backend

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- Docker and Docker Compose
- PostgreSQL client (optional)

### Environment Setup
1. Clone the repository
2. Copy `.env.example` to `.env` and adjust values as needed
3. Install dependencies: `npm install`

### Database Setup
1. Start PostgreSQL with Docker Compose:
   ```
   docker-compose up -d
   ```
2. Run Prisma migrations to set up the database schema:
   ```
   npm run db:migrate
   ```
3. Seed the database with initial data:
   ```
   npm run db:seed
   ```

### Running the Server
- Development mode: `npm run dev`
- Production build: `npm run build` followed by `npm start`

### API Documentation
Access the API documentation at `http://localhost:3001/docs` when the server is running.

### Database Management
- Prisma Studio (web interface for the database): `npm run db:studio`
- PgAdmin: Access at `http://localhost:5050` (login with admin@carrepair.com/admin)

### Default Users
- Admin: username: `admin`, password: `admin123`
- Service Advisor: username: `advisor`, password: `advisor123`
- Technician: username: `tech`, password: `tech123`

### License
Private and Confidential
