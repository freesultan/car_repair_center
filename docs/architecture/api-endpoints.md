# API Endpoints

## Authentication
- **POST /api/auth/login**: User login
- **POST /api/auth/logout**: User logout
- **GET /api/auth/profile**: Get current user profile
- **PUT /api/auth/change-password**: Change user password

## Users
- **GET /api/users**: List all users
- **GET /api/users/:id**: Get user by ID
- **POST /api/users**: Create new user
- **PUT /api/users/:id**: Update user
- **DELETE /api/users/:id**: Delete user
- **GET /api/users/:id/roles**: Get user roles

## Customers
- **GET /api/customers**: List all customers
- **GET /api/customers/:id**: Get customer by ID
- **POST /api/customers**: Create new customer
- **PUT /api/customers/:id**: Update customer
- **DELETE /api/customers/:id**: Delete customer
- **GET /api/customers/search**: Search customers
- **GET /api/customers/:id/vehicles**: Get customer vehicles

## Vehicles
- **GET /api/vehicles**: List all vehicles
- **GET /api/vehicles/:id**: Get vehicle by ID
- **POST /api/vehicles**: Create new vehicle
- **PUT /api/vehicles/:id**: Update vehicle
- **DELETE /api/vehicles/:id**: Delete vehicle
- **GET /api/vehicles/search**: Search vehicles
- **GET /api/vehicles/:id/repairs**: Get vehicle repair history

## Repairs
- **GET /api/repairs**: List all repairs
- **GET /api/repairs/:id**: Get repair by ID
- **POST /api/repairs**: Create new repair
- **PUT /api/repairs/:id**: Update repair
- **DELETE /api/repairs/:id**: Delete repair
- **GET /api/repairs/search**: Search repairs
- **PUT /api/repairs/:id/status**: Update repair status
- **GET /api/repairs/:id/photos**: Get repair photos
- **GET /api/repairs/:id/approvals**: Get repair approvals

## Photos
- **GET /api/photos**: List all photos
- **GET /api/photos/:id**: Get photo by ID
- **POST /api/photos**: Create new photo
- **PUT /api/photos/:id**: Update photo
- **DELETE /api/photos/:id**: Delete photo
- **POST /api/photos/upload**: Upload photo
- **GET /api/photos/categories**: Get photo categories

## Approvals
- **GET /api/approvals**: List all approvals
- **GET /api/approvals/:id**: Get approval by ID
- **POST /api/approvals**: Create new approval
- **DELETE /api/approvals/:id**: Delete approval
- **POST /api/approvals/signature**: Create signature approval
- **POST /api/approvals/voice**: Create voice approval
- **GET /api/approvals/types**: Get approval types

## Technicians
- **GET /api/technicians**: List all technicians
- **GET /api/technicians/:id**: Get technician by ID
- **POST /api/technicians**: Create new technician
- **PUT /api/technicians/:id**: Update technician
- **DELETE /api/technicians/:id**: Delete technician
- **GET /api/technicians/:id/repairs**: Get technician assigned repairs

## Reports
- **GET /api/reports/repairs**: Get repairs report
- **GET /api/reports/technicians**: Get technicians performance report
- **GET /api/reports/customers**: Get customers report
- **POST /api/reports/custom**: Generate custom report

## System
- **GET /api/system/status**: Get system status
- **GET /api/system/settings**: Get system settings
- **PUT /api/system/settings**: Update system settings
- **POST /api/system/backup**: Create system backup
- **GET /api/system/logs**: Get system logs
