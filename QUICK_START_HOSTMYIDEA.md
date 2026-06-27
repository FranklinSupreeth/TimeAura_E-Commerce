# Quick Start Guide - HostMyIdea Deployment

## 5-Minute Deployment Steps

### 1. Upload Files to HostMyIdea

#### Backend (Node.js)
```
Home Directory or /app/ folder:
├── server/
│   ├── index.js
│   ├── seed.js
│   ├── models/
│   ├── package.json
│   └── .env (create with production values)
```

#### Frontend (Built App)
```
/public_html/ or /www/:
├── index.html
├── assets/
│   ├── index-*.css
│   ├── index-*.js
│   └── other files...
```

### 2. Configure Environment

**Backend .env file** (create via control panel or FTP):
```
MONGO_URI=mongodb+srv://anivithakumari_db_user:tbLSQqlP6AOVPMpD@timeaura-production.fwpomrk.mongodb.net/TimeAura-Production?retryWrites=true&w=majority
NODE_ENV=production
PORT=5000
```

### 3. Install & Start Backend

Via HostMyIdea Terminal/SSH:
```bash
cd server
npm install
npm run seed    # Only first time
npm start
```

### 4. Test Connection

```bash
# Test API is working
curl http://localhost:5000/api/products
```

### 5. Configure Domain

- Point your domain to HostMyIdea servers (use nameservers provided)
- Wait 24-48 hours for DNS propagation
- Enable SSL/HTTPS in control panel

---

## File Locations on HostMyIdea

| Component | Location |
|-----------|----------|
| Frontend Build | `/public_html/` |
| Backend Code | `/app/` or `/home/yourusername/` |
| Node Modules | `server/node_modules/` |
| Logs | Check cPanel or SSH logs |
| Database | MongoDB Cloud (external) |

---

## Common Issues & Solutions

### Problem: "Cannot find module"
```bash
# Solution: Re-install dependencies
cd server && npm install
```

### Problem: "Port 5000 already in use"
Check if another process is using that port, or configure different PORT in .env

### Problem: "MongoDB connection timeout"
- Verify IP is whitelisted in MongoDB Atlas
- Check internet connection on server
- Verify credentials in .env

### Problem: "Frontend showing blank page"
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors (F12)
- Verify dist/ folder was uploaded correctly

---

## Monitoring Commands

```bash
# Check if Node is running
ps aux | grep node

# View logs
tail -f /path/to/logs

# Check disk space
df -h

# Check memory usage
free -h
```

---

## Useful Links

- [HostMyIdea Setup](https://hostmyidea.com/setup)
- [MongoDB Connection String](https://docs.mongodb.com/manual/reference/connection-string/)
- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)

---

**Next Step**: Follow the detailed [DEPLOYMENT.md](./DEPLOYMENT.md) guide for complete information.
