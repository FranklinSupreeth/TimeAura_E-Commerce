# TimeAura Watch Store - Production Deployment Guide

## Project Overview
TimeAura is a luxury watch e-commerce platform built with:
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **Hosting**: HostMyIdea

---

## 📁 Project Structure

```
watch-store/
├── src/                          # React frontend source
│   ├── components/               # Reusable UI components
│   ├── pages/                    # Page components (Shop, Profile, Cart)
│   ├── context/                  # State management (Auth, Cart, Products)
│   ├── layouts/                  # Layout components
│   ├── assets/                   # Images and static files
│   ├── App.jsx                   # Main app component
│   └── main.jsx                  # Entry point
├── server/                       # Node.js backend
│   ├── index.js                  # Express server
│   ├── models/                   # MongoDB schemas
│   ├── seed.js                   # Database seeding script
│   ├── package.json              # Backend dependencies
│   └── .env.production           # Production env variables
├── dist/                         # Production build (generated)
├── package.json                  # Frontend dependencies
├── vite.config.js                # Frontend bundler config
├── postcss.config.js             # PostCSS config
├── tailwind.config.js            # Tailwind CSS config
├── .env.production               # Frontend production env
└── public/                       # Public assets
```

---

## 🚀 Deployment Steps

### Step 1: Prepare Backend

1. **Upload to HostMyIdea**
   - Upload the `server/` folder to your hosting account
   - Ensure Node.js 18+ is supported

2. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Set Environment Variables**
   Create `.env` file in server directory:
   ```
   MONGO_URI=mongodb+srv://anivithakumari_db_user:tbLSQqlP6AOVPMpD@timeaura-production.fwpomrk.mongodb.net/TimeAura-Production?retryWrites=true&w=majority
   NODE_ENV=production
   PORT=5000
   ```

4. **Seed Database (First Time Only)**
   ```bash
   npm run seed
   ```

5. **Start Server**
   ```bash
   npm start
   ```

### Step 2: Prepare Frontend

1. **Building** (Already done locally)
   ```bash
   npm run build
   ```

2. **Upload Production Build**
   - Upload the `dist/` folder to your hosting's public_html or www directory
   - This folder contains the compiled, optimized frontend

3. **Configure API URL**
   Update `.env.production`:
   ```
   VITE_API_URL=https://your-domain.hostmyidea.com/api/products
   # Replace with your actual API endpoint
   ```

### Step 3: Configure Server Connection

1. **Set CORS Headers** (Already configured)
   - Backend allows requests from any origin
   - Update in `server/index.js` if needed

2. **Verify API Endpoints**
   - GET `/api/products` - Fetch all watches
   - POST `/api/products` - Add new product
   - DELETE `/api/products/:id` - Remove product

---

## 🔧 API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Fetch all watches |
| POST | `/api/products` | Add new watch |
| DELETE | `/api/products/:id` | Delete watch |

---

## 🗄️ Database (MongoDB)

**Connection**: Production MongoDB Atlas cluster
- **Cluster**: timeaura-production.fwpomrk.mongodb.net
- **Database**: TimeAura-Production
- **Credentials**: Stored in environment variables

**Collections**:
- `products` - Watch inventory with specs, price, images

---

## 🔐 Security Best Practices

1. ✅ **Never commit .env files** - Already in .gitignore
2. ✅ **Use HTTPS only** - Configure on HostMyIdea
3. ✅ **CORS enabled** - Backend accepts requests from frontend
4. ✅ **Input validation** - Add request validation before storing
5. ✅ **Rate limiting** - Consider adding for API endpoints

### Recommended Security Enhancements
```javascript
// Add to server/index.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api/', limiter);
```

---

## 📊 Performance Optimization

### Frontend
- ✅ Minified CSS (6.71 kB gzipped)
- ✅ Code splitting enabled
- ✅ Image lazy loading
- ✅ Responsive design

### Backend
- ✅ MongoDB indexing on frequently queried fields
- ✅ Compression enabled
- ✅ Connection pooling

---

## 🐛 Troubleshooting

### Issue: Products not loading
**Solution**: Check if backend server is running and API_URL is correct
```bash
# Test API endpoint
curl https://your-domain/api/products
```

### Issue: CORS errors
**Solution**: Verify backend CORS configuration
```javascript
app.use(cors()); // Frontend domain should be configured
```

### Issue: Database connection failed
**Solution**: Verify MongoDB credentials in .env
```bash
# Test connection
echo $MONGO_URI
```

---

## 📈 Monitoring & Logs

1. **Backend Logs**: Check HostMyIdea control panel for server logs
2. **Browser Console**: Open browser DevTools (F12) to check frontend errors
3. **Network Tab**: Monitor API calls and response times

---

## 🔄 Updating in Production

### Update Products
```bash
# SSH into host
npm run seed  # Re-seed with new products
```

### Update Code
1. Make changes locally
2. Run `npm run build`
3. Upload `dist/` folder to replace production build
4. For backend: upload updated code and restart server

---

## 📱 Access Points

| Service | URL |
|---------|-----|
| Frontend | https://timeaura.hostmyidea.com |
| API | https://api.timeaura.hostmyidea.com |
| Admin Panel | https://timeaura.hostmyidea.com/admin |

---

## 💡 Key Features Deployed

✅ Luxury watch catalog with advanced filtering
✅ User authentication (login/signup)
✅ Shopping cart with persistent storage
✅ Product details with specifications
✅ Admin dashboard for product management
✅ Responsive design (mobile-friendly)
✅ Contact form with email integration

---

## 📞 Support

For HostMyIdea deployment issues:
1. Check their documentation: https://hostmyidea.com
2. Contact their support team
3. Review error logs in hosting control panel

---

**Last Updated**: March 9, 2026
**Status**: Ready for Production Deployment
