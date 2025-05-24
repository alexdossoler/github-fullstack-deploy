# Handyman Services Database Schema

This document outlines the recommended database schema for the Handyman Services web application. The schema is presented for both relational databases (MySQL/PostgreSQL) and NoSQL databases (MongoDB/Firebase).

## Relational Database Schema (MySQL/PostgreSQL)

### Tables and Relationships

#### 1. Users Table
Stores information about all users in the system.

```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(50),
    zip_code VARCHAR(20),
    role ENUM('customer', 'service_provider', 'admin') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 2. Service Categories Table
Stores categories of services offered.

```sql
CREATE TABLE service_categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 3. Services Table
Stores specific services within each category.

```sql
CREATE TABLE services (
    service_id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES service_categories(category_id),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    base_price DECIMAL(10, 2),
    duration_minutes INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 4. Service Providers Table
Stores information about service providers (handymen).

```sql
CREATE TABLE service_providers (
    provider_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    bio TEXT,
    years_experience INTEGER,
    hourly_rate DECIMAL(10, 2),
    is_available BOOLEAN DEFAULT TRUE,
    average_rating DECIMAL(3, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 5. Provider Services Table
Many-to-many relationship between providers and services they offer.

```sql
CREATE TABLE provider_services (
    provider_service_id SERIAL PRIMARY KEY,
    provider_id INTEGER REFERENCES service_providers(provider_id),
    service_id INTEGER REFERENCES services(service_id),
    custom_price DECIMAL(10, 2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE(provider_id, service_id)
);
```

#### 6. Service Areas Table
Geographic areas where services are provided.

```sql
CREATE TABLE service_areas (
    area_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    zip_code VARCHAR(20),
    city VARCHAR(100),
    state VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 7. Provider Service Areas Table
Many-to-many relationship between providers and areas they serve.

```sql
CREATE TABLE provider_service_areas (
    provider_area_id SERIAL PRIMARY KEY,
    provider_id INTEGER REFERENCES service_providers(provider_id),
    area_id INTEGER REFERENCES service_areas(area_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE(provider_id, area_id)
);
```

#### 8. Appointments Table
Stores service appointments/bookings.

```sql
CREATE TABLE appointments (
    appointment_id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES users(user_id),
    provider_id INTEGER REFERENCES service_providers(provider_id),
    service_id INTEGER REFERENCES services(service_id),
    appointment_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
    total_price DECIMAL(10, 2) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 9. Reviews Table
Stores customer reviews for service providers.

```sql
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    appointment_id INTEGER REFERENCES appointments(appointment_id),
    customer_id INTEGER REFERENCES users(user_id),
    provider_id INTEGER REFERENCES service_providers(provider_id),
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 10. Payments Table
Stores payment information for appointments.

```sql
CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    appointment_id INTEGER REFERENCES appointments(appointment_id),
    amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('credit_card', 'debit_card', 'paypal', 'cash') NOT NULL,
    transaction_id VARCHAR(255),
    status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    payment_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Entity Relationship Diagram (ERD)

```
Users 1──┐
         │
         │ N
         ▼
Service Providers N──┐     ┌───1 Service Categories
                     │     │
                     │     │ N
                     │     ▼
                     └──N Services N─┐
                                     │
                                     │ N
                                     ▼
                                  Appointments 1──┐
                                     ▲            │
                                     │            │ 1
                                     │            ▼
                                     └───N     Payments
                                     
                                     1
                                     │
                                     │ N
                                     ▼
                                   Reviews
```

## NoSQL Database Schema (MongoDB/Firebase)

### Collections and Document Structure

#### 1. Users Collection

```json
{
  "userId": "user123",
  "email": "john.doe@example.com",
  "passwordHash": "hashed_password",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "555-123-4567",
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "state": "CA",
    "zipCode": "12345"
  },
  "role": "customer",
  "createdAt": "2025-05-01T12:00:00Z",
  "updatedAt": "2025-05-01T12:00:00Z"
}
```

#### 2. ServiceProviders Collection

```json
{
  "providerId": "provider123",
  "userId": "user456",
  "bio": "Professional handyman with 10 years of experience",
  "yearsExperience": 10,
  "hourlyRate": 75.00,
  "isAvailable": true,
  "averageRating": 4.8,
  "services": [
    {
      "serviceId": "service123",
      "customPrice": 85.00,
      "isActive": true
    },
    {
      "serviceId": "service456",
      "customPrice": null,
      "isActive": true
    }
  ],
  "serviceAreas": ["area123", "area456"],
  "createdAt": "2025-05-01T12:00:00Z",
  "updatedAt": "2025-05-01T12:00:00Z"
}
```

#### 3. ServiceCategories Collection

```json
{
  "categoryId": "category123",
  "name": "Plumbing",
  "description": "All plumbing services",
  "icon": "faucet",
  "isActive": true,
  "createdAt": "2025-05-01T12:00:00Z",
  "updatedAt": "2025-05-01T12:00:00Z"
}
```

#### 4. Services Collection

```json
{
  "serviceId": "service123",
  "categoryId": "category123",
  "name": "Faucet Replacement",
  "description": "Remove old faucet and install new one",
  "basePrice": 75.00,
  "durationMinutes": 60,
  "isActive": true,
  "createdAt": "2025-05-01T12:00:00Z",
  "updatedAt": "2025-05-01T12:00:00Z"
}
```

#### 5. ServiceAreas Collection

```json
{
  "areaId": "area123",
  "name": "Downtown",
  "zipCode": "12345",
  "city": "Anytown",
  "state": "CA",
  "isActive": true,
  "createdAt": "2025-05-01T12:00:00Z",
  "updatedAt": "2025-05-01T12:00:00Z"
}
```

#### 6. Appointments Collection

```json
{
  "appointmentId": "appointment123",
  "customerId": "user123",
  "providerId": "provider123",
  "serviceId": "service123",
  "appointmentDate": "2025-06-15",
  "startTime": "14:00:00",
  "endTime": "15:00:00",
  "status": "confirmed",
  "totalPrice": 85.00,
  "location": {
    "address": "456 Oak St",
    "city": "Anytown",
    "state": "CA",
    "zipCode": "12345"
  },
  "notes": "Please bring tools for both bathroom faucets",
  "payment": {
    "paymentId": "payment123",
    "amount": 85.00,
    "paymentMethod": "credit_card",
    "transactionId": "tx_123456",
    "status": "completed",
    "paymentDate": "2025-06-10T09:30:00Z"
  },
  "review": {
    "rating": 5,
    "comment": "Excellent service, very professional",
    "createdAt": "2025-06-15T16:00:00Z"
  },
  "createdAt": "2025-06-01T10:00:00Z",
  "updatedAt": "2025-06-15T16:00:00Z"
}
```

## Firebase Firestore Structure

For Firebase Firestore, the structure would be similar to the MongoDB collections, but with some adjustments for Firestore's specific features:

### Main Collections:

- `users`
- `serviceProviders`
- `serviceCategories`
- `services`
- `serviceAreas`
- `appointments`

### Sub-collections:

- `users/{userId}/notifications`
- `serviceProviders/{providerId}/availability`
- `appointments/{appointmentId}/messages`

## Sample Queries

### Relational Database Queries

1. **Find all available service providers for a specific service in a zip code:**

```sql
SELECT sp.* FROM service_providers sp
JOIN provider_services ps ON sp.provider_id = ps.provider_id
JOIN provider_service_areas psa ON sp.provider_id = psa.provider_id
JOIN service_areas sa ON psa.area_id = sa.area_id
WHERE ps.service_id = ? AND sa.zip_code = ? AND sp.is_available = TRUE;
```

2. **Get all appointments for a customer:**

```sql
SELECT a.*, s.name as service_name, 
       CONCAT(u.first_name, ' ', u.last_name) as provider_name
FROM appointments a
JOIN services s ON a.service_id = s.service_id
JOIN service_providers sp ON a.provider_id = sp.provider_id
JOIN users u ON sp.user_id = u.user_id
WHERE a.customer_id = ?
ORDER BY a.appointment_date DESC, a.start_time DESC;
```

3. **Calculate average rating for a service provider:**

```sql
SELECT AVG(rating) as average_rating
FROM reviews
WHERE provider_id = ?;
```

### NoSQL Database Queries

1. **Find all available service providers for a specific service in a zip code:**

```javascript
// Firebase example
db.collection('serviceProviders')
  .where('services', 'array-contains', {serviceId: 'service123', isActive: true})
  .where('serviceAreas', 'array-contains', 'area123')
  .where('isAvailable', '==', true)
  .get();
```

2. **Get all appointments for a customer:**

```javascript
// Firebase example
db.collection('appointments')
  .where('customerId', '==', 'user123')
  .orderBy('appointmentDate', 'desc')
  .orderBy('startTime', 'desc')
  .get();
```

## Data Migration Considerations

When migrating between different database systems:

### Relational to NoSQL:
- Denormalize data to reduce joins
- Embed related data that's frequently accessed together
- Use references for data that changes frequently or is accessed independently

### NoSQL to Relational:
- Normalize embedded data into separate tables
- Create junction tables for many-to-many relationships
- Define proper foreign key constraints

## Scaling Considerations

### For Relational Databases:
- Use connection pooling
- Implement database indexing on frequently queried columns
- Consider read replicas for read-heavy workloads
- Implement query caching

### For NoSQL Databases:
- Design documents for query patterns
- Use composite indexes for complex queries
- Implement sharding for large datasets
- Consider caching frequently accessed data

## Backup and Recovery Strategy

Regardless of the database chosen, implement:

1. Regular automated backups
2. Point-in-time recovery options
3. Disaster recovery plan
4. Data retention policies

## Security Considerations

1. Use parameterized queries to prevent SQL injection
2. Implement row-level security where applicable
3. Encrypt sensitive data at rest
4. Use secure connection strings and credentials
5. Implement proper access controls and authentication

This database schema provides a solid foundation for your handyman services application. Adjust as needed based on your specific business requirements and chosen technology stack.
