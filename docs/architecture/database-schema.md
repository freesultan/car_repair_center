# Database Schema

## Last Updated
- **Date and Time (UTC)**: 2025-10-20 05:13:04
- **User**: freesultan

## Entity Relationship Diagram

```
┌────────────────┐       ┌────────────────┐       ┌────────────────┐
│    Users       │       │   Customers    │       │    Vehicles    │
├────────────────┤       ├────────────────┤       ├────────────────┤
│ id             │       │ id             │       │ id             │
│ username       │       │ name           │       │ phone          │◄─┐
│ password_hash  │       │ email          │       │ customer_id    │  │
│ full_name      │       │ address        │       │ make           │  │
│ role           │       │ created_at     │       │ model          │  │
│ active         │       │ updated_at     │       │ year           │  │
│ created_at     │       └──────┬─────────┘       │ license_plate  │  │
└────────────────┘              │                 │ vin            │  │
                                │                 │ created_at     │  │
                                │                 │ updated_at     │  │
                                │                 └────────────────┘  │
                                │                                     │
                                └─────────────────────────────────────┘
                                          │
                                          │
                                          ▼
┌────────────────┐       ┌────────────────┐       ┌────────────────┐
│   Repairs      │       │    Photos      │       │   Approvals    │
├────────────────┤       ├────────────────┤       ├────────────────┤
│ id             │       │ id             │       │ id             │
│ vehicle_id     │◄──────┤ repair_id      │       │ repair_id      │
│ description    │       │ file_path      │       │ type           │
│ status         │    ┌──┤ category       │       │ content_path   │
│ estimated_cost │    │  │ description    │       │ timestamp      │
│ actual_cost    │    │  │ created_at     │       │ created_by     │
│ technician_id  │◄─┐ │  │ created_by     │◄──┐   │ created_at     │
│ created_at     │  │ │  └────────────────┘   │   └────────────────┘
│ updated_at     │  │ │                       │           ▲
│ completed_at   │  │ │                       │           │
└──────┬─────────┘  │ │                       │           │
       │            │ │                       │           │
       │            │ └───────────────────────┼───────────┘
       │            │                         │
       │            ▼                         │
       │  ┌────────────────┐                  │
       │  │  Technicians   │                  │
       └─►│ id             │                  │
          │ user_id        │◄─────────────────┘
          │ specialization │
          │ active         │
          │ created_at     │
          └────────────────┘
```

## Table Definitions

### Users
- **id**: SERIAL PRIMARY KEY
- **username**: VARCHAR(50) UNIQUE NOT NULL
- **password_hash**: VARCHAR(255) NOT NULL
- **full_name**: VARCHAR(100) NOT NULL
- **role**: ENUM('admin', 'service_advisor', 'technician') NOT NULL
- **active**: BOOLEAN DEFAULT TRUE
- **created_at**: TIMESTAMP DEFAULT NOW()
- **updated_at**: TIMESTAMP DEFAULT NOW()

### Customers
- **id**: SERIAL PRIMARY KEY
- **name**: VARCHAR(100) NOT NULL
- **phone**: VARCHAR(20) NOT NULL
- **email**: VARCHAR(100)
- **address**: TEXT
- **created_at**: TIMESTAMP DEFAULT NOW()
- **updated_at**: TIMESTAMP DEFAULT NOW()

### Vehicles
- **id**: SERIAL PRIMARY KEY
- **customer_id**: INTEGER REFERENCES customers(id)
- **make**: VARCHAR(50) NOT NULL
- **model**: VARCHAR(50) NOT NULL
- **year**: INTEGER NOT NULL
- **license_plate**: VARCHAR(20) NOT NULL
- **vin**: VARCHAR(50)
- **color**: VARCHAR(30)
- **created_at**: TIMESTAMP DEFAULT NOW()
- **updated_at**: TIMESTAMP DEFAULT NOW()

### Repairs
- **id**: SERIAL PRIMARY KEY
- **vehicle_id**: INTEGER REFERENCES vehicles(id)
- **description**: TEXT NOT NULL
- **status**: ENUM('registered', 'in_progress', 'waiting_approval', 'approved', 'completed', 'cancelled') NOT NULL
- **estimated_cost**: DECIMAL(12,2)
- **actual_cost**: DECIMAL(12,2)
- **technician_id**: INTEGER REFERENCES technicians(id)
- **created_at**: TIMESTAMP DEFAULT NOW()
- **updated_at**: TIMESTAMP DEFAULT NOW()
- **completed_at**: TIMESTAMP

### Technicians
- **id**: SERIAL PRIMARY KEY
- **user_id**: INTEGER REFERENCES users(id)
- **specialization**: VARCHAR(50)
- **active**: BOOLEAN DEFAULT TRUE
- **created_at**: TIMESTAMP DEFAULT NOW()
- **updated_at**: TIMESTAMP DEFAULT NOW()

### Photos
- **id**: SERIAL PRIMARY KEY
- **repair_id**: INTEGER REFERENCES repairs(id)
- **file_path**: VARCHAR(255) NOT NULL
- **category**: ENUM('pre_repair', 'during_repair', 'post_repair', 'damaged_parts') NOT NULL
- **description**: TEXT
- **created_at**: TIMESTAMP DEFAULT NOW()
- **created_by**: INTEGER REFERENCES users(id)

### Approvals
- **id**: SERIAL PRIMARY KEY
- **repair_id**: INTEGER REFERENCES repairs(id)
- **type**: ENUM('signature', 'voice', 'text') NOT NULL
- **content_path**: VARCHAR(255) NOT NULL
- **timestamp**: TIMESTAMP DEFAULT NOW()
- **created_by**: INTEGER REFERENCES users(id)
- **created_at**: TIMESTAMP DEFAULT NOW()

## Indexes

### Users
- INDEX ON users(username)
- INDEX ON users(role)

### Customers
- INDEX ON customers(phone)
- INDEX ON customers(name)

### Vehicles
- INDEX ON vehicles(customer_id)
- INDEX ON vehicles(license_plate)
- INDEX ON vehicles(vin)

### Repairs
- INDEX ON repairs(vehicle_id)
- INDEX ON repairs(technician_id)
- INDEX ON repairs(status)
- INDEX ON repairs(created_at)

### Photos
- INDEX ON photos(repair_id)
- INDEX ON photos(category)

### Approvals
- INDEX ON approvals(repair_id)
- INDEX ON approvals(type)

## Relationships

- One Customer can have Many Vehicles (1:N)
- One Vehicle can have Many Repairs (1:N)
- One Repair belongs to One Technician (N:1)
- One Technician belongs to One User (1:1)
- One Repair can have Many Photos (1:N)
- One Repair can have Many Approvals (1:N)
- One User can create Many Photos (1:N)
- One User can create Many Approvals (1:N)

## Data Constraints

- Customer phone numbers must be unique
- Vehicle license plates must be unique
- Photos must have valid file paths
- Approvals must have valid content paths
- Repair status transitions must follow logical flow
