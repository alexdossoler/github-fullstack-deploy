# Handyman Services Web Application - Project Setup Guide

This guide will help you set up your development environment for the Handyman Services web application based on your chosen technology stack.

## VS Code Workspace Setup

A VS Code workspace file (`handyman-services.code-workspace`) has been created with recommended settings and extensions. To use it:

1. Open VS Code
2. Go to File > Open Workspace from File...
3. Select the `handyman-services.code-workspace` file

The workspace includes:
- Formatting settings (Prettier)
- Live Server configuration
- Recommended extensions
- Debugging configuration

## Development Environment Setup

Choose your preferred technology stack from the options below:

### Option 1: HTML/CSS/JavaScript with Progressive Enhancements

#### Prerequisites:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

#### Setup Steps:

1. **Initialize npm project:**
   ```bash
   cd handyman-services
   npm init -y
   ```

2. **Install development dependencies:**
   ```bash
   npm install --save-dev live-server prettier
   ```

3. **Add Alpine.js (optional):**
   ```bash
   npm install alpinejs
   ```
   
   Then add to your HTML files:
   ```html
   <script defer src="node_modules/alpinejs/dist/cdn.min.js"></script>
   ```
   
   Or use the CDN:
   ```html
   <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
   ```

4. **Add npm scripts to package.json:**
   ```json
   "scripts": {
     "start": "live-server --port=5500",
     "format": "prettier --write \"**/*.{html,css,js}\""
   }
   ```

5. **Run the development server:**
   ```bash
   npm start
   ```

### Option 2: React.js Frontend

#### Prerequisites:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

#### Setup Steps:

1. **Create a new React app:**
   ```bash
   npx create-react-app handyman-services-react
   ```
   
   Or with Vite (recommended for faster development):
   ```bash
   npm create vite@latest handyman-services-react -- --template react
   ```

2. **Move existing assets:**
   ```bash
   mkdir -p handyman-services-react/public/images
   cp -r handyman-services/images/* handyman-services-react/public/images/
   ```

3. **Install additional dependencies:**
   ```bash
   cd handyman-services-react
   npm install react-router-dom axios styled-components
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```
   
   Or with Vite:
   ```bash
   npm run dev
   ```

### Option 3: Vue.js Frontend

#### Prerequisites:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

#### Setup Steps:

1. **Create a new Vue app:**
   ```bash
   npm init vue@latest handyman-services-vue
   ```
   
   Follow the prompts to select features (Vue Router, ESLint, etc.)

2. **Move existing assets:**
   ```bash
   mkdir -p handyman-services-vue/public/images
   cp -r handyman-services/images/* handyman-services-vue/public/images/
   ```

3. **Install dependencies and start the server:**
   ```bash
   cd handyman-services-vue
   npm install
   npm run dev
   ```

## Backend Setup Options

### Option 1: Node.js with Express.js

#### Prerequisites:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

#### Setup Steps:

1. **Create a backend directory:**
   ```bash
   mkdir handyman-services-backend
   cd handyman-services-backend
   npm init -y
   ```

2. **Install dependencies:**
   ```bash
   npm install express cors mongoose dotenv bcrypt jsonwebtoken
   npm install --save-dev nodemon
   ```

3. **Create basic server structure:**
   ```bash
   mkdir -p src/controllers src/models src/routes src/middleware
   touch src/server.js .env
   ```

4. **Add npm scripts to package.json:**
   ```json
   "scripts": {
     "start": "node src/server.js",
     "dev": "nodemon src/server.js"
   }
   ```

5. **Create a basic server.js file:**
   ```javascript
   const express = require('express');
   const cors = require('cors');
   const dotenv = require('dotenv');

   dotenv.config();

   const app = express();
   const PORT = process.env.PORT || 5000;

   // Middleware
   app.use(cors());
   app.use(express.json());

   // Routes
   app.get('/', (req, res) => {
     res.send('Handyman Services API is running');
   });

   // Start server
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
   ```

6. **Start the development server:**
   ```bash
   npm run dev
   ```

### Option 2: Python with FastAPI

#### Prerequisites:
- [Python](https://www.python.org/) (3.7 or higher)
- [pip](https://pip.pypa.io/en/stable/installation/)

#### Setup Steps:

1. **Create a backend directory and virtual environment:**
   ```bash
   mkdir handyman-services-fastapi
   cd handyman-services-fastapi
   python -m venv venv
   ```

2. **Activate the virtual environment:**
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

3. **Install dependencies:**
   ```bash
   pip install fastapi uvicorn sqlalchemy pydantic python-jose passlib python-multipart
   ```

4. **Create basic project structure:**
   ```bash
   mkdir -p app/routers app/models app/schemas app/services
   touch app/main.py
   ```

5. **Create a basic main.py file:**
   ```python
   from fastapi import FastAPI
   from fastapi.middleware.cors import CORSMiddleware

   app = FastAPI(title="Handyman Services API")

   # Configure CORS
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["*"],  # Update this in production
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )

   @app.get("/")
   def read_root():
       return {"message": "Handyman Services API is running"}

   if __name__ == "__main__":
       import uvicorn
       uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
   ```

6. **Start the development server:**
   ```bash
   uvicorn app.main:app --reload
   ```

### Option 3: PHP with Laravel

#### Prerequisites:
- [PHP](https://www.php.net/) (8.0 or higher)
- [Composer](https://getcomposer.org/)

#### Setup Steps:

1. **Create a new Laravel project:**
   ```bash
   composer create-project laravel/laravel handyman-services-laravel
   ```

2. **Navigate to the project directory:**
   ```bash
   cd handyman-services-laravel
   ```

3. **Start the development server:**
   ```bash
   php artisan serve
   ```

## Database Setup Options

### Option 1: MySQL

#### Prerequisites:
- [MySQL](https://dev.mysql.com/downloads/) (5.7 or higher)

#### Setup Steps:

1. **Create a new database:**
   ```sql
   CREATE DATABASE handyman_services;
   CREATE USER 'handyman_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON handyman_services.* TO 'handyman_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

2. **Configure your backend to connect to MySQL:**
   - For Node.js/Express with Sequelize:
     ```bash
     npm install mysql2 sequelize
     ```
   - For Python/FastAPI with SQLAlchemy:
     ```bash
     pip install sqlalchemy pymysql
     ```
   - For PHP/Laravel:
     Update `.env` file with database credentials

### Option 2: PostgreSQL

#### Prerequisites:
- [PostgreSQL](https://www.postgresql.org/download/) (12 or higher)

#### Setup Steps:

1. **Create a new database:**
   ```sql
   CREATE DATABASE handyman_services;
   CREATE USER handyman_user WITH ENCRYPTED PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE handyman_services TO handyman_user;
   ```

2. **Configure your backend to connect to PostgreSQL:**
   - For Node.js/Express with Sequelize:
     ```bash
     npm install pg pg-hstore sequelize
     ```
   - For Python/FastAPI with SQLAlchemy:
     ```bash
     pip install sqlalchemy psycopg2-binary
     ```
   - For PHP/Laravel:
     Update `.env` file with database credentials

### Option 3: MongoDB

#### Prerequisites:
- [MongoDB](https://www.mongodb.com/try/download/community) (4.4 or higher)

#### Setup Steps:

1. **Start MongoDB service**

2. **Configure your backend to connect to MongoDB:**
   - For Node.js/Express with Mongoose:
     ```bash
     npm install mongoose
     ```
   
   Example connection in server.js:
   ```javascript
   const mongoose = require('mongoose');
   
   mongoose.connect('mongodb://localhost:27017/handyman_services', {
     useNewUrlParser: true,
     useUnifiedTopology: true
   })
   .then(() => console.log('Connected to MongoDB'))
   .catch(err => console.error('MongoDB connection error:', err));
   ```

### Option 4: Firebase (Firestore)

#### Prerequisites:
- [Firebase account](https://firebase.google.com/)

#### Setup Steps:

1. **Create a new Firebase project** in the Firebase console

2. **Add Firestore database** to your project

3. **Configure your frontend to connect to Firebase:**
   - For JavaScript/HTML:
     ```bash
     npm install firebase
     ```
   
   Example initialization:
   ```javascript
   import { initializeApp } from "firebase/app";
   import { getFirestore } from "firebase/firestore";
   
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   
   const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);
   ```

## Full-Stack Development Workflow

### Development Workflow with Separate Frontend and Backend:

1. **Start the backend server** in one terminal
2. **Start the frontend development server** in another terminal
3. **Configure the frontend** to communicate with the backend API
4. **Use Git for version control:**
   ```bash
   git init
   git add .
   git commit -m "Initial project setup"
   ```

### Deployment Considerations:

1. **Frontend Deployment Options:**
   - Netlify
   - Vercel
   - GitHub Pages (for static sites)
   - AWS Amplify

2. **Backend Deployment Options:**
   - Heroku
   - DigitalOcean
   - AWS (EC2, Lambda, Elastic Beanstalk)
   - Google Cloud Platform
   - Microsoft Azure

3. **Database Deployment Options:**
   - Managed services (AWS RDS, Google Cloud SQL)
   - MongoDB Atlas
   - Firebase (managed automatically)
   - Self-hosted on VPS

## Next Steps

After setting up your development environment:

1. **Implement authentication system**
2. **Create database schema/models**
3. **Develop API endpoints**
4. **Build frontend components**
5. **Implement form handling and validation**
6. **Add appointment scheduling functionality**
7. **Integrate payment processing (if needed)**
8. **Implement admin dashboard**
9. **Add service provider management**
10. **Test thoroughly and deploy**

Let me know if you need help with any specific part of the setup process!
