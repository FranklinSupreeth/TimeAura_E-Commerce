# Production Deployment Checklist

## Before Deployment

### Frontend
- [x] Run `npm run build` to create optimized production build
- [x] Verify all components render correctly
- [x] Check responsive design on mobile/tablet/desktop
- [x] Test all navigation links
- [x] Verify API endpoints in .env.production
- [x] Check for console errors and warnings
- [x] Minify and optimize images
- [x] Cache busting enabled in Vite config

### Backend
- [x] All dependencies installed (`npm install`)
- [x] Environment variables configured (.env.production)
- [x] MongoDB connection tested
- [x] Database seeded with initial products
- [x] CORS properly configured
- [x] Error handling implemented
- [x] Input validation enabled
- [x] Express middleware configured

### Database (MongoDB)
- [x] MongoDB Atlas cluster created
- [x] Database users with proper credentials created
- [x] Network access configured (IP whitelisting)
- [x] Backups enabled
- [x] Sample data seeded

### Security
- [x] .env files in .gitignore
- [x] No sensitive data in version control
- [x] HTTPS configured on hosting
- [x] CORS headers configured
- [x] Input sanitization implemented
- [x] Password hashing with bcryptjs
- [x] JWT tokens for authentication

### Performance
- [x] Frontend: CSS minified (6.71 kB gzipped)
- [x] Frontend: JavaScript minified
- [x] Frontend: No unused dependencies
- [x] Backend: Connection pooling enabled
- [x] Backend: Response compression enabled
- [x] Database: Indexes created on frequently queried fields
- [x] Image optimization applied

### Testing
- [x] Manual API testing with curl/Postman
- [x] Frontend functional testing in browser
- [x] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [x] Mobile responsiveness testing
- [x] Network throttling testing (slow connections)
- [x] Error handling edge cases

## During Deployment

### HostMyIdea Deployment
- [ ] Create account on HostMyIdea
- [ ] Set up Node.js environment
- [ ] Upload backend code to server
- [ ] Upload frontend dist/ folder to public_html
- [ ] Configure environment variables via control panel
- [ ] Install backend dependencies
- [ ] Run database seed script
- [ ] Start backend server
- [ ] Configure domain DNS records
- [ ] Enable SSL/HTTPS certificate

### Verification
- [ ] Visit frontend URL - page loads correctly
- [ ] API endpoint responds to requests
- [ ] Products display on Shop page
- [ ] Add to cart functionality works
- [ ] User authentication works
- [ ] Admin panel accessible
- [ ] No mixed content warnings (all HTTPS)
- [ ] Images load properly

## After Deployment

### Monitoring
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Monitor server uptime
- [ ] Check API response times
- [ ] Review server logs daily
- [ ] Monitor MongoDB performance

### Maintenance
- [ ] Set up regular backups (daily)
- [ ] Plan security updates schedule
- [ ] Monitor traffic and performance metrics
- [ ] Test disaster recovery procedures
- [ ] Document any production issues

### Optimization
- [ ] Analyze user analytics
- [ ] Get feedback from initial users
- [ ] Optimize slow API endpoints
- [ ] Consider CDN for static assets
- [ ] Implement caching strategies

## Deployment Commands Reference

```bash
# Backend Setup
cd server
npm install
npm run seed
npm start

# Frontend Build
cd ..
npm install
npm run build
# Upload dist/ folder to hosting

# Quick Health Check
curl https://yourdomain.com/api/products
```

## Emergency Procedures

### If API is down
1. Check backend server status in HostMyIdea panel
2. Check MongoDB connection
3. Review server error logs
4. Restart Node.js application
5. Contact HostMyIdea support if issue persists

### If database is inaccessible
1. Verify MongoDB credentials in .env
2. Check IP whitelist on MongoDB Atlas
3. Test connection string
4. Restore from backup if corrupted
5. Re-run seed script if necessary

### If frontend is not updating
1. Clear browser cache (Ctrl+Shift+Delete)
2. Check if dist/ folder was uploaded correctly
3. Verify domain DNS points to correct server IP
4. Wait for browser cache to expire (if cached)
5. Force refresh (Ctrl+F5)

## Credentials & Access

Store these securely (NOT in code):
- [x] MongoDB credentials in .env.production
- [x] HostMyIdea FTP/SFTP credentials
- [x] Domain registrar access
- [x] SSL certificate details
- [ ] Admin panel credentials (set after deployment)
- [ ] Email service credentials (if using)

## Performance Targets

- Frontend Load Time: < 3 seconds
- API Response Time: < 200ms
- Database Query Time: < 50ms
- Core Web Vitals: All green
- Uptime Target: 99.9%

---

**Status**: ✅ Ready for Production
**Last Updated**: March 9, 2026
