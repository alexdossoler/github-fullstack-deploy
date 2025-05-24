# Handyman Services Website

A professional website for handyman services featuring both frontend presentation and backend functionality.

## 🚀 Live Demo

- **Frontend**: [GitHub Pages](https://yourusername.github.io/handyman-services)
- **Full Application**: [Production Site](https://your-production-url.com)

## 📋 Features

### Frontend
- ✅ Responsive design for all devices
- ✅ Professional service showcase
- ✅ Image gallery
- ✅ Contact information
- ✅ About page with team information

### Backend
- ✅ Node.js/Express server
- ✅ MongoDB database integration
- ✅ Contact form processing
- ✅ Email notifications
- ✅ Admin dashboard
- ✅ Lead management system

## 🛠️ Technology Stack

### Frontend
- HTML5, CSS3, JavaScript
- Responsive design
- Modern web standards

### Backend
- Node.js
- Express.js
- MongoDB
- Nodemailer for email
- Environment variable configuration

## 🏗️ Project Structure

```
handyman-services/
├── index.html          # Homepage
├── css/                # Stylesheets
├── js/                 # Frontend JavaScript
├── images/             # Image assets
├── pages/              # Additional pages
└── server/             # Backend application
    ├── server.js       # Main server file
    ├── package.json    # Dependencies
    ├── admin/          # Admin dashboard
    └── .env.example    # Environment variables template
```

## 🚀 Deployment Options

This repository is configured for deployment to multiple platforms:

### 1. GitHub Pages (Static Version)
- **Use case**: Frontend-only version
- **Setup**: Enable GitHub Pages in repository settings
- **URL**: `https://yourusername.github.io/repository-name`

### 2. Render (Recommended for Full-Stack)
- **Use case**: Complete application with backend
- **Setup**: Connect GitHub repository to Render
- **Features**: Automatic deployments, free tier available

### 3. Heroku
- **Use case**: Established platform with add-ons
- **Setup**: Connect GitHub repository to Heroku
- **Features**: Extensive marketplace, Git-based deployment

### 4. Vercel
- **Use case**: Modern deployment platform
- **Setup**: Import GitHub repository to Vercel
- **Features**: Automatic deployments, serverless functions

### 5. Railway
- **Use case**: Developer-friendly platform
- **Setup**: Connect GitHub repository to Railway
- **Features**: Simple setup, built-in database options

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB database (local or cloud)

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/handyman-services.git
   cd handyman-services
   ```

2. **Install dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

5. **Open your browser**:
   Navigate to `http://localhost:3000`

### Environment Variables

Create a `.env` file in the `server` directory with:

```env
MONGODB_URI=your_mongodb_connection_string
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
BUSINESS_EMAIL=your_business_email@gmail.com
PORT=3000
```

## 🔧 Configuration

### Database Setup
1. **MongoDB Atlas** (Recommended):
   - Create account at [mongodb.com](https://mongodb.com)
   - Create new cluster
   - Get connection string
   - Add to `MONGODB_URI` in environment variables

2. **Local MongoDB**:
   - Install MongoDB locally
   - Use `mongodb://localhost:27017/handyman_services`

### Email Configuration
1. **Gmail** (Easy setup):
   - Enable 2-factor authentication
   - Generate app-specific password
   - Use in `EMAIL_PASS` environment variable

2. **Other SMTP providers**:
   - Update `EMAIL_HOST` and `EMAIL_PORT`
   - Configure authentication as needed

## 📱 Contact Form

The contact form supports multiple configuration options:

### Server-side Processing (Full deployment)
- Form submissions are processed by the Node.js backend
- Emails are sent using Nodemailer
- Lead data is stored in MongoDB

### Client-side Processing (GitHub Pages)
- Use Formspree, EmailJS, or Netlify Forms
- No backend required
- Suitable for static hosting

## 🔄 Continuous Deployment

### GitHub Actions
Automated deployment workflows are configured for:
- Code quality checks
- Automated testing
- Deployment to production

### Manual Deployment
Each hosting platform supports manual deployment:
1. Push changes to GitHub
2. Platform automatically deploys updates
3. Monitor deployment status in platform dashboard

## 🛡️ Security

- Environment variables for sensitive data
- Input validation on all forms
- HTTPS enforced on all platforms
- Regular dependency updates

## 📈 Analytics & Monitoring

Consider adding:
- Google Analytics for visitor tracking
- Error monitoring (Sentry, LogRocket)
- Uptime monitoring (UptimeRobot, Pingdom)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

All rights reserved. This project is proprietary.

## 📞 Support

For support with this website:
- Create an issue in this repository
- Contact: [your-email@example.com](mailto:your-email@example.com)

## 🎯 Roadmap

Future enhancements planned:
- [ ] Online booking system
- [ ] Payment processing
- [ ] Customer review system
- [ ] Service area mapping
- [ ] Mobile app

---

**Built with ❤️ for professional handyman services**
