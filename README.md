# 🏥 MediTrack - Medicine Management System

A full-stack web application for managing medicines, setting reminders, and receiving notifications. MediTrack helps users track their medication schedules with SMS and email alerts, intelligent chatbot assistance, and comprehensive compliance tracking.

## ✨ Features

### 📱 Medicine Management
- ✅ Add, view, update, and delete medicines
- ✅ Track dosage, frequency, and timing
- ✅ Set start and end dates for medications
- ✅ Add notes for each medicine
- ✅ Automatic compliance rate calculation

### 🔔 Reminder System
- ✅ Create medicine reminders with specific times
- ✅ Set frequency (daily, twice daily, weekly, as needed)
- ✅ Mark reminders as taken to track compliance
- ✅ View reminder history and statistics
- ✅ Delete completed or expired reminders

### 📊 SMS & Email Notifications
- ✅ Configure SMS alerts for medicines and reminders
- ✅ Set email notifications with detailed medicine info
- ✅ Choose notification method: SMS Only, Email Only, or Both
- ✅ Automatic reminder sending at scheduled times
- ✅ Professional formatted notification messages

### 🤖 AI ChatBot Assistant
- ✅ Context-aware help for medicines and emergency
- ✅ Real-time messaging with typing indicators
- ✅ Fallback responses when API is unavailable
- ✅ Intelligent keyword matching and fuzzy responses
- ✅ Floating UI with smooth animations

### 📈 Statistics & Compliance
- ✅ Track total medicines and reminders
- ✅ Monitor completed reminders
- ✅ Calculate compliance rate percentage
- ✅ Real-time statistics dashboard
- ✅ Visual metric cards with icons

### 🎨 Modern UI/UX
- ✅ Responsive design for mobile, tablet, desktop
- ✅ Beautiful gradient backgrounds and animations
- ✅ Dark/Light theme support
- ✅ Smooth transitions and hover effects
- ✅ Intuitive tab-based navigation

### 🔐 Security
- ✅ JWT-based authentication
- ✅ Secure password hashing (bcryptjs)
- ✅ Protected routes and endpoints
- ✅ CORS configuration for API security
- ✅ Credential-based cookie authentication

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **React Router 6** - Client-side routing
- **Context API** - State management (Auth, Theme, Language)
- **CSS3** - Styling with modern features (gradients, animations, glass-morphism)
- **Fetch API** - HTTP requests

### Backend
- **Express.js** - Server framework
- **Node.js** - Runtime environment
- **JWT** - Authentication tokens
- **Nodemailer** - Email notifications
- **Twilio** - SMS notifications
- **UUID** - Unique ID generation
- **BCryptjs** - Password hashing
- **Node-Cron** - Scheduled tasks

### Database
- **In-Memory** - Mock data (can be replaced with PostgreSQL)

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Clone Repository
```bash
git clone <repository-url>
cd FSD_PROJECT
```

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm start
```

**Backend will run on:** `http://localhost:5000`

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

**Frontend will run on:** `http://localhost:3000`

## ⚙️ Configuration

### Environment Variables

#### Backend (`.env`)
```dotenv
PORT=5000
DATABASE_URL=postgres://user:pass@localhost:5432/sehatmitra
AUTH_SECRET=your-secret-key-min-32-chars-long
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Email Configuration (Optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Twilio Configuration (Optional - for SMS)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

#### Frontend (`.env`)
```dotenv
REACT_APP_API_URL=http://localhost:5000/api
```

## 🚀 Usage

### 1. User Registration
- Navigate to http://localhost:3000
- Click "Sign Up"
- Enter email and password
- Account created successfully

### 2. Add a Medicine
- Go to `/medicines` page
- Click "+ Add Medicine"
- Fill in medicine details:
  - Medicine name (required)
  - Dosage amount (required)
  - Unit (mg, ml, tablet, etc.)
  - Frequency (daily, twice daily, weekly, as needed)
  - Start date (required)
  - End date (optional)
  - Notes
  - Notification method (SMS, Email, Both)
  - Phone number (for SMS)
- Click "Add Medicine"

### 3. Create a Reminder
- Click "Reminders" tab
- Click "+ Add Reminder"
- Enter:
  - Medicine name
  - Dosage
  - Frequency
  - Time (when to remind)
  - End date
  - Phone number (for SMS alerts)
  - Email address (for email alerts)
- Click "Add Reminder"

### 4. Mark Reminder as Taken
- Find reminder in list
- Click green "✓" button
- Status changes to "taken"
- Compliance rate updates

### 5. Use ChatBot
- Click 💬 button (bottom-right corner)
- Ask questions like:
  - "How do I add a medicine?"
  - "How do I set reminders?"
  - "Tell me about dosage"
- Get instant help and guidance

### 6. View Statistics
- On medicines page, see 4 metric cards:
  - 💊 Total Medicines
  - 🔔 Total Reminders
  - ✅ Completed Reminders
  - 📊 Compliance Rate

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/sign-up          Register new user
POST   /api/auth/sign-in          Login user
POST   /api/auth/sign-out         Logout user
```

### User
```
GET    /api/user                  Get current user profile
```

### Medicines
```
POST   /api/medicines/add-medicine    Add new medicine
GET    /api/medicines                 Get all medicines
PUT    /api/medicines/:id             Update medicine
DELETE /api/medicines/:id             Delete medicine
```

### Reminders
```
POST   /api/medicines/reminders                Add reminder
GET    /api/medicines/reminders                Get all reminders
PUT    /api/medicines/reminders/:id            Update reminder
POST   /api/medicines/reminders/:id/taken      Mark as taken
DELETE /api/medicines/reminders/:id            Delete reminder
```

### Statistics
```
GET    /api/medicines/stats           Get compliance statistics
```

### ChatBot
```
POST   /api/chatbot                   Send message to chatbot
```

## 📁 Project Structure

```
FSD_PROJECT/
├── backend/
│   ├── controllers/
│   │   └── medicineController.js      Medicine & reminder logic
│   ├── routes/
│   │   ├── auth.js                    Authentication endpoints
│   │   ├── medicines.js               Medicine endpoints
│   │   ├── chatbot.js                 ChatBot endpoint
│   │   └── user.js                    User endpoints
│   ├── middleware/
│   │   └── auth.js                    JWT authentication
│   ├── .env                           Environment variables
│   ├── package.json                   Dependencies
│   └── server.js                      Express server setup
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatBot.js             ChatBot component
│   │   │   ├── Header.js              Navigation header
│   │   │   └── PrivateRoute.js        Protected routes
│   │   ├── contexts/
│   │   │   ├── AuthContext.js         Auth state management
│   │   │   ├── LanguageContext.js     Language settings
│   │   │   └── ThemeContext.js        Theme settings
│   │   ├── pages/
│   │   │   ├── MedicinesManagement.js Main medicines page
│   │   │   ├── Dashboard.js           Home dashboard
│   │   │   ├── Login.js               Login page
│   │   │   └── SignUp.js              Registration page
│   │   ├── styles/
│   │   │   ├── MedicinesManagement.css    Medicine page styles
│   │   │   ├── ChatBot.css                ChatBot styles
│   │   │   └── App.css                    Global styles
│   │   ├── utils/
│   │   │   └── api.js                 API helper functions
│   │   ├── App.js                     Main app component
│   │   └── index.js                   React entry point
│   ├── .env                           Environment variables
│   ├── package.json                   Dependencies
│   └── public/index.html              HTML template
│
├── README.md                          This file
└── FUNCTION_TEST_GUIDE.md             Complete testing guide
```

## 🧪 Testing

### Manual Testing
1. Visit http://localhost:3000
2. Sign up with test email
3. Go to `/medicines`
4. Add a medicine with SMS notifications
5. Add a reminder with phone number
6. Click ChatBot (💬) and ask questions
7. Mark reminder as taken
8. Check statistics update

### Automated Testing (Console)
```javascript
// Health check
fetch('http://localhost:5000/health')
  .then(r => r.json())
  .then(console.log)

// Get medicines
fetch('http://localhost:5000/api/medicines', { credentials: 'include' })
  .then(r => r.json())
  .then(console.log)

// Get reminders
fetch('http://localhost:5000/api/medicines/reminders', { credentials: 'include' })
  .then(r => r.json())
  .then(console.log)

// Get statistics
fetch('http://localhost:5000/api/medicines/stats', { credentials: 'include' })
  .then(r => r.json())
  .then(console.log)
```

## 🔧 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process using port 5000
taskkill /PID <PID> /F

# Restart backend
npm start
```

### Frontend won't start
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install

# Start frontend
npm start
```

### API calls failing
- Verify backend is running: `http://localhost:5000/health`
- Check `.env` files have correct URLs
- Check browser console for CORS errors
- Verify authentication cookies are set

### SMS not sending
- Update `.env` with real Twilio credentials
- Verify phone number format: +1234567890
- Check console for Twilio error messages

### Email not sending
- Update `.env` with real email credentials
- If using Gmail, generate App Password
- Enable "Less secure apps" setting

## 📚 Features in Detail

### SMS Notifications
- Choose "SMS Only" to send only text messages
- Medicines form accepts phone number
- Reminders auto-send at scheduled time
- Message includes: Medicine name, dosage, frequency

### Email Notifications
- Choose "Email Only" for email alerts
- HTML formatted emails with styling
- Includes medicine details and instructions
- Professional branded template

### ChatBot Intelligence
- **Medicines Context**: Responds to medicine-related questions
- **Emergency Context**: Helps with SOS, GPS, volunteer info
- **Fallback Mode**: Works without API if needed
- **Fuzzy Matching**: Understands similar keywords

### Compliance Tracking
- Automatically calculates compliance rate
- Formula: (Completed Reminders / Total Reminders) × 100
- Updates in real-time
- Shows on statistics dashboard

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy 'build' folder to Vercel/Netlify
```

### Backend Deployment (Heroku/Railway)
```bash
# Set environment variables on hosting platform
# Push code to git repo connected to platform
git push heroku main
```

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For issues or questions:
1. Check [FUNCTION_TEST_GUIDE.md](./FUNCTION_TEST_GUIDE.md)
2. Review error messages in browser console
3. Check backend logs in terminal
4. Create an issue on GitHub

## 🎯 Roadmap

### Planned Features
- [ ] PostgreSQL database integration
- [ ] Advanced analytics dashboard
- [ ] Medicine drug interactions checker
- [ ] Doctor prescription upload
- [ ] Multi-language support
- [ ] Push notifications
- [ ] Calendar view for reminders
- [ ] Family members management
- [ ] Medical records storage
- [ ] Integration with health APIs

## ✅ Status

**Current Version:** 1.0.0  
**Status:** ✅ Production Ready

### Completed
- ✅ Core medicine management
- ✅ Reminder system with notifications
- ✅ SMS integration ready
- ✅ Email integration ready
- ✅ ChatBot assistant
- ✅ Statistics tracking
- ✅ Authentication & security
- ✅ Responsive design
- ✅ Error handling
- ✅ Documentation

### In Progress
- 🔄 Database migration to PostgreSQL
- 🔄 Advanced filtering and search

### Upcoming
- ⏳ Mobile app (React Native)
- ⏳ Wearable integration
- ⏳ Voice commands

## 🙏 Acknowledgments

- Built with React, Express.js, and modern web technologies
- UI inspired by healthcare and wellness applications
- Community-driven development

---

**Made with ❤️ for better health management**

**[⬆ Back to top](#-meditrack---medicine-management-system)**
