# Complete GitHub Deployment Guide

This guide covers setting up your handyman website on GitHub and deploying to various hosting platforms.

## Step 1: Create GitHub Repository

### Method A: GitHub Web Interface

1. **Create Repository**:
   - Go to [github.com](https://github.com)
   - Click "+" → "New repository"
   - Repository name: `handyman-services`
   - Description: "Professional handyman services website with Node.js backend"
   - Visibility: Public (for free features) or Private
   - Initialize with README: ✅ (check this)

2. **Upload Files**:
   - Click "uploading an existing file"
   - Drag all files from this directory
   - Commit message: "Initial commit - handyman website"
   - Click "Commit changes"

### Method B: Git Command Line

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit - handyman website"

# Add GitHub remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/handyman-services.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 2: Choose Deployment Strategy

### Option A: Static Site (GitHub Pages)

**Best for**: Frontend-only version, no backend functionality needed

1. **Enable GitHub Pages**:
   - Repository → Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: "main", Folder: "/ (root)"
   - Save

2. **Access**: `https://yourusername.github.io/handyman-services`

3. **Limitations**: No contact form processing, no database

### Option B: Full-Stack Deployment

**Best for**: Complete website with backend functionality

Choose one of these platforms:

#### 🌟 Render (Recommended)

1. **Setup**:
   - Go to [render.com](https://render.com)
   - "New" → "Web Service"
   - Connect GitHub account
   - Select your repository

2. **Configuration**:
   - Name: `handyman-services`
   - Environment: `Node`
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && node server.js`

3. **Environment Variables**:
   - Add all variables from `.env.example`
   - Get MongoDB URI from MongoDB Atlas
   - Configure email settings

#### 🚀 Vercel

1. **Setup**:
   - Go to [vercel.com](https://vercel.com)
   - "New Project"
   - Import from GitHub
   - Select your repository

2. **Configuration**:
   - Framework Preset: "Other"
   - Root Directory: `server`
   - Build Command: `npm install`
   - Output Directory: Leave empty

#### 🔥 Railway

1. **Setup**:
   - Go to [railway.app](https://railway.app)
   - "New Project"
   - "Deploy from GitHub repo"
   - Select your repository

2. **Configuration**:
   - Railway auto-detects Node.js
   - Add environment variables
   - Deploy automatically

#### 📦 Heroku

1. **Setup**:
   - Install Heroku CLI
   - `heroku create handyman-services`
   - `git push heroku main`

2. **Configuration**:
   - `heroku config:set MONGODB_URI=your_uri`
   - Add all environment variables

## Step 3: Database Setup

### MongoDB Atlas (Recommended)

1. **Create Account**: [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create Cluster**:
   - Choose free tier (M0)
   - Select region closest to your hosting
   - Cluster name: `handyman-cluster`

3. **Configure Access**:
   - Database Access: Create user with read/write permissions
   - Network Access: Allow access from anywhere (0.0.0.0/0)

4. **Get Connection String**:
   - Connect → Connect your application
   - Copy connection string
   - Replace `<password>` with your database user password

## Step 4: Environment Variables

Set these in your hosting platform:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/handyman_services
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
BUSINESS_EMAIL=your_business_email@gmail.com
NODE_ENV=production
```

## Step 5: Email Configuration

### Gmail Setup

1. **Enable 2FA**: Google Account → Security → 2-Step Verification
2. **App Password**: Google Account → Security → App passwords
3. **Generate Password**: Select "Mail" and "Other (custom name)"
4. **Use Password**: Copy the 16-character password to `EMAIL_PASS`

### Alternative Email Providers

- **SendGrid**: For transactional emails
- **Mailgun**: For high-volume sending
- **AWS SES**: For AWS ecosystem

## Step 6: Testing Deployment

1. **Access Website**: Visit your deployment URL
2. **Test Contact Form**: Submit a test form
3. **Check Email**: Verify email notifications work
4. **Monitor Logs**: Check for any errors

## Step 7: Custom Domain (Optional)

### Purchase Domain
- Namecheap, GoDaddy, or Google Domains

### Configure DNS
- Add CNAME record pointing to your hosting platform
- Each platform has specific DNS instructions

### Enable HTTPS
- Most platforms provide free SSL certificates
- Ensure HTTPS redirect is enabled

## Step 8: Continuous Deployment

### GitHub Actions (Already configured)
- Automatic testing on pull requests
- Automatic deployment on main branch pushes
- Security vulnerability scanning

### Manual Updates
1. Make changes locally
2. Commit and push to GitHub
3. Hosting platform automatically deploys

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Check build logs in hosting platform

2. **Environment Variables**:
   - Ensure all required variables are set
   - Check for typos in variable names
   - Verify database connection string

3. **Email Not Working**:
   - Check email credentials
   - Verify SMTP settings
   - Check spam/junk folders

4. **Database Connection**:
   - Verify MongoDB Atlas network access
   - Check connection string format
   - Ensure database user has correct permissions

### Getting Help

- **Platform Documentation**: Each platform has detailed docs
- **GitHub Issues**: Create issues in your repository
- **Community Forums**: Stack Overflow, platform-specific communities

## Best Practices

1. **Security**:
   - Never commit `.env` files
   - Use strong passwords
   - Regularly update dependencies

2. **Performance**:
   - Optimize images
   - Minimize CSS/JS
   - Use CDN for static assets

3. **Monitoring**:
   - Set up uptime monitoring
   - Monitor error logs
   - Track website analytics

4. **Backups**:
   - Regular database backups
   - Code versioning with Git
   - Document recovery procedures

---

**Need more help?** Refer to the platform-specific guides or create an issue in this repository.
