# Handyman Services - Backend Server

This is the backend server for the Handyman Services website. It handles contact form submissions, email notifications, and database storage.

## Features

- **Contact Form Processing**: Handles form submissions from the website
- **Email Notifications**: Sends confirmation emails to customers and notifications to business owners
- **Database Storage**: Stores contact requests in MongoDB for future reference
- **Admin Dashboard**: Provides an interface for managing contact requests
- **Reference Number Generation**: Creates unique reference numbers for each submission
- **Status Tracking**: Allows tracking the status of each request (new, in-progress, completed)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- SMTP email service (for sending emails)

### Installation

1. Clone the repository
2. Navigate to the server directory:
   ```
   cd handyman-services/server
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your configuration

### Environment Variables

- `PORT`: The port the server will run on (default: 3000)
- `MONGODB_URI`: Connection string for MongoDB
- `EMAIL_HOST`: SMTP host for sending emails
- `EMAIL_PORT`: SMTP port
- `EMAIL_SECURE`: Whether to use SSL (true/false)
- `EMAIL_USER`: SMTP username
- `EMAIL_PASS`: SMTP password
- `BUSINESS_EMAIL`: Email address to receive notifications

### Running the Server

#### Development Mode

```
npm run dev
```

This will start the server with nodemon, which automatically restarts when changes are detected.

#### Production Mode

```
npm start
```

## API Endpoints

### POST /api/contact

Processes contact form submissions.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "(555) 123-4567",
  "service": "Plumbing Repairs",
  "message": "I have a leaking faucet that needs repair.",
  "urgent": true
}
```

**Response:**

```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "referenceNumber": "HM-123456-7890"
}
```

## Admin Dashboard

The admin dashboard is available at `/admin` and provides an interface for managing contact requests. Features include:

- View all contact requests
- Filter by status, date, or search term
- Update status of requests
- Add admin notes
- View detailed information for each request

## Database Schema

### Contact

| Field           | Type      | Description                                   |
|-----------------|-----------|-----------------------------------------------|
| name            | String    | Customer's full name                          |
| email           | String    | Customer's email address                      |
| phone           | String    | Customer's phone number (optional)            |
| service         | String    | Requested service (optional)                  |
| message         | String    | Customer's message                            |
| urgent          | Boolean   | Whether the request is marked as urgent       |
| referenceNumber | String    | Unique reference number                       |
| createdAt       | Date      | When the request was submitted                |
| status          | String    | Status of the request (new/in-progress/completed) |

## Email Templates

### Customer Confirmation Email

Sent to the customer after form submission, includes:
- Thank you message
- Reference number
- Summary of their request
- Contact information for urgent needs

### Business Notification Email

Sent to the business owner after form submission, includes:
- Customer details
- Request details
- Urgent flag (if applicable)
- Link to admin dashboard

## Security Considerations

- All form inputs are validated on both client and server side
- MongoDB connection uses authentication
- SMTP credentials are stored in environment variables
- Admin dashboard should be protected with authentication in production

## Production Deployment

For production deployment, consider:
- Using a process manager like PM2
- Setting up NGINX as a reverse proxy
- Enabling HTTPS
- Implementing proper authentication for the admin dashboard
- Setting up database backups
