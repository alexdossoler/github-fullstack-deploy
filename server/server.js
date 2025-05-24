/**
 * Handyman Services - Backend Server
 * Author: Cline
 * Date: May 2025
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../')); // Serve static files from parent directory
app.use('/server/admin', express.static('./admin')); // Serve admin static files

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/handyman_services', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Continuing without database connection. Form submissions will not be saved.');
});

// Define Contact schema and model
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    service: String,
    message: { type: String, required: true },
    urgent: { type: Boolean, default: false },
    referenceNumber: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: 'new', enum: ['new', 'in-progress', 'completed'] },
    adminNotes: { type: String, default: '' }
});

const Contact = mongoose.model('Contact', contactSchema);

// Configure email transporter with error handling
let transporter;
try {
    transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.example.com',
        port: process.env.EMAIL_PORT || 587,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_USER || 'info@handymanservices.com',
            pass: process.env.EMAIL_PASS || 'password'
        }
    });
    
    // Verify the connection configuration
    transporter.verify(function(error, success) {
        if (error) {
            console.error('Email configuration error:', error);
            console.log('Email functionality will be disabled.');
        } else {
            console.log('Email server is ready to send messages');
        }
    });
} catch (error) {
    console.error('Failed to create email transporter:', error);
    console.log('Email functionality will be disabled.');
}

// API Routes

// Get all contact requests
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            data: contacts
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contact requests'
        });
    }
});

// Get contact by ID
app.get('/api/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: contact
        });
    } catch (error) {
        console.error('Error fetching contact:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contact request'
        });
    }
});

// Update contact status
app.patch('/api/contacts/:id', async (req, res) => {
    try {
        const { status, adminNotes } = req.body;
        
        const contact = await Contact.findById(req.params.id);
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }
        
        // Update fields if provided
        if (status) contact.status = status;
        if (adminNotes !== undefined) {
            // Add adminNotes field if it doesn't exist in the schema
            contact.set('adminNotes', adminNotes);
        }
        
        await contact.save();
        
        res.status(200).json({
            success: true,
            data: contact
        });
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update contact request'
        });
    }
});

// Delete contact
app.delete('/api/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete contact request'
        });
    }
});

// Submit contact form
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, service, message, urgent } = req.body;
        
        // Generate unique reference number
        const referenceNumber = `HM-${Date.now().toString().slice(-6)}-${uuidv4().slice(0, 4)}`;
        
        // Try to save to database, but continue if it fails
        try {
            const newContact = new Contact({
                name,
                email,
                phone,
                service,
                message,
                urgent,
                referenceNumber
            });
            
            await newContact.save();
            console.log(`Contact form saved to database with reference: ${referenceNumber}`);
        } catch (dbError) {
            console.error('Failed to save contact form to database:', dbError);
            // Continue processing even if database save fails
        }
        
        // Only attempt to send emails if transporter is configured
        if (transporter) {
            try {
                // Send email to business owner
                const businessMailOptions = {
                    from: process.env.EMAIL_USER || 'info@handymanservices.com',
                    to: process.env.BUSINESS_EMAIL || 'owner@handymanservices.com',
                    subject: urgent ? '🔴 URGENT: New Contact Form Submission' : 'New Contact Form Submission',
                    html: `
                        <h2>New Contact Form Submission</h2>
                        <p><strong>Reference Number:</strong> ${referenceNumber}</p>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                        <p><strong>Service:</strong> ${service || 'Not specified'}</p>
                        <p><strong>Urgent:</strong> ${urgent ? 'Yes' : 'No'}</p>
                        <h3>Message:</h3>
                        <p>${message}</p>
                        <hr>
                        <p>You can respond to this inquiry by replying to this email or by logging into your admin dashboard.</p>
                    `
                };
                
                // Send confirmation email to customer
                const customerMailOptions = {
                    from: process.env.EMAIL_USER || 'info@handymanservices.com',
                    to: email,
                    subject: 'Thank You for Contacting Handyman Services',
                    html: `
                        <h2>Thank You for Contacting Handyman Services</h2>
                        <p>Dear ${name},</p>
                        <p>We have received your inquiry and will get back to you as soon as possible.</p>
                        <p><strong>Your Reference Number:</strong> ${referenceNumber}</p>
                        <p>Please keep this reference number for future correspondence.</p>
                        <h3>Your Message Details:</h3>
                        <p><strong>Service Requested:</strong> ${service || 'Not specified'}</p>
                        <p><strong>Message:</strong> ${message}</p>
                        <hr>
                        <p>If you need immediate assistance, please call us at (864) 743-3178.</p>
                        <p>Thank you for choosing Handyman Services!</p>
                    `
                };
                
                // Send emails
                await transporter.sendMail(businessMailOptions);
                await transporter.sendMail(customerMailOptions);
                console.log('Confirmation emails sent successfully');
            } catch (emailError) {
                console.error('Failed to send emails:', emailError);
                // Continue processing even if email sending fails
            }
        } else {
            console.log('Skipping email sending due to missing email configuration');
        }
        
        // Return success response
        res.status(200).json({
            success: true,
            message: 'Contact form submitted successfully',
            referenceNumber
        });
        
    } catch (error) {
        console.error('Error processing contact form:', error);
        res.status(500).json({
            success: false,
            message: 'There was a problem processing your request'
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
