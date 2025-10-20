# Technology Stack Selection

## Frontend Stack

### Core Technologies
- **Framework**: React 18
- **Language**: TypeScript 4.9+
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Router**: React Router 6

### UI Components
- **Component Library**: MUI (Material-UI) with RTL support
- **Form Handling**: React Hook Form
- **Form Validation**: Yup
- **Data Visualization**: Recharts (for future reporting features)

### Internationalization
- **i18n Library**: react-i18next
- **RTL Support**: stylis-plugin-rtl with emotion
- **Date/Time Formatting**: date-fns with Persian locale

### PWA Support
- **Service Worker**: Workbox
- **Offline Support**: Redux Persist + IndexedDB

### Testing
- **Unit Testing**: Jest + React Testing Library
- **E2E Testing**: Cypress

## Backend Stack

### Core Technologies
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript 4.9+
- **API Documentation**: Swagger/OpenAPI

### Database
- **Primary Database**: PostgreSQL
- **ORM**: Prisma
- **Migrations**: Prisma Migrate
- **Database Admin**: pgAdmin (for maintenance)

### Security
- **Authentication**: JWT
- **Password Hashing**: bcrypt
- **Input Validation**: express-validator

### File Storage
- **Image Storage**: Local file system with structured directories
- **Audio Storage**: Local file system

### Testing
- **Unit Testing**: Jest
- **API Testing**: Supertest

## Development Tools

### Code Quality
- **Linter**: ESLint
- **Formatter**: Prettier
- **Git Hooks**: Husky + lint-staged

### Build & Deployment
- **Containerization**: Docker (for ease of deployment)
- **Process Manager**: PM2 (for production)

### Monitoring
- **Logging**: Winston
- **Application Monitoring**: Simple local monitoring dashboard

## Rationale for Key Decisions

### Why React?
- Mature ecosystem with excellent TypeScript support
- Strong component model for building complex UIs
- Extensive community and resources
- Good performance characteristics for our application needs

### Why PostgreSQL?
- Excellent concurrency support for multiple simultaneous users
- Strong data integrity features for business-critical data
- Rich query capabilities for complex reporting needs
- Better scalability if the repair center grows
- Can be deployed on a local server without internet requirement
- Robust backup and recovery options
- Better ecosystem of management tools

### Why Express.js?
- Lightweight and flexible
- Excellent middleware ecosystem
- Good performance characteristics
- Familiar to most Node.js developers for easier maintenance

### Why PWA?
- Offline capabilities critical for local network operation
- Better user experience on tablets
- Installation on devices without app store
- Native-like features (camera, microphone access)
