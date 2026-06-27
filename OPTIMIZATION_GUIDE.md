# Production Optimization Guide

## Performance Optimization Checklist

### Frontend Optimizations

#### 1. Image Optimization

- [x] Images use Unsplash CDN (optimized)
- [x] Lazy loading implemented
- [x] Responsive images with proper sizing
- [ ] Consider WebP format for better compression

**Action**: Images are already optimized via external URLs. No local images to compress.

#### 2. Code Splitting

Current: Single bundle (688.85 kB)

**To Reduce Bundle Size**:

```javascript
// vite.config.js - Add manual chunking
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": ["lucide-react", "framer-motion"],
          "chart-vendor": ["recharts"],
        },
      },
    },
  },
});
```

**Impact**: Reduces main bundle by ~30-40%

#### 3. Minification

- [x] CSS minified (6.71 kB gzipped)
- [x] JavaScript minified (212.93 kB gzipped)
- [x] HTML minified
- [x] Sourcemaps excluded from production

#### 4. Caching Strategy

Add to `.htaccess`:

```apache
# Browser caching for assets
<FilesMatch "\.(jpg|jpeg|png|gif|ico|css|js|svg)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>

# Don't cache HTML files
<FilesMatch "\.html$">
  Header set Cache-Control "max-age=3600, must-revalidate"
</FilesMatch>
```

#### 5. Compression

- [x] Gzip compression enabled
- [x] Brotli compression recommended

**Server Configuration** (nginx):

```nginx
gzip on;
gzip_types text/css application/javascript;
gzip_comp_level 6;
```

---

### Backend Optimizations

#### 1. Database Indexing

```javascript
// Add to server/models/Product.js
const productSchema = new Schema(
  {
    // ... fields
  },
  {
    indexes: [
      { category: 1 }, // For filtering by category
      { name: 1 }, // For search
      { createdAt: -1 }, // For sorting by date
    ],
  },
);
```

#### 2. Connection Pooling

Already configured in Mongoose:

```javascript
mongoose.connect(MONGO_URI, {
  maxPoolSize: 10, // Connection pool kept in production
  minPoolSize: 5,
  maxIdleTimeMS: 45000,
});
```

#### 3. Response Compression

Add to server/index.js:

```javascript
const compression = require("compression");
app.use(compression());
```

#### 4. Rate Limiting

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
});

app.use("/api/", limiter);
```

#### 5. Query Optimization

```javascript
// Efficient product fetching with pagination
app.get("/api/products", async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 20;
  const skip = (page - 1) * limit;

  const products = await Product.find()
    .select("name brand price category image") // Only needed fields
    .skip(skip)
    .limit(limit)
    .lean(); // Return plain objects, not Mongoose documents

  res.json(products);
});
```

---

### Database Optimizations

#### 1. MongoDB Atlas Performance

- [x] Production cluster configured
- [x] Auto-scaling enabled
- [x] Backups scheduled (daily)
- [x] Network access whitelisted

#### 2. Data Archiving

Plan for future:

- Archive products older than 2 years
- Archive completed orders after 1 year

#### 3. Monitoring

Enable MongoDB Atlas monitoring:

- Query performance
- Disk usage
- Network I/O
- Replication lag

---

### Security Optimizations

#### 1. Helmet.js (Node.js Security Headers)

```bash
npm install helmet
```

```javascript
const helmet = require("helmet");
app.use(helmet());
```

#### 2. Input Sanitization

```bash
npm install express-validator
```

```javascript
const { body, validationResult } = require("express-validator");

app.post(
  "/api/products",
  [
    body("name").trim().notEmpty(),
    body("price").isFloat({ min: 0 }),
    body("category").isIn(["Men", "Women", "Luxury", "Sports"]),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Process request
  },
);
```

#### 3. Environment Variable Security

- [x] Never commit .env files
- [x] Use strong MongoDB passwords
- [x] Rotate credentials periodically
- [x] Store credentials in hosting control panel, not in code

#### 4. HTTPS/SSL

- [x] SSL certificate installed
- [x] HTTP redirects to HTTPS
- [x] HSTS headers enabled

---

### Deployment Optimizations

#### 1. Staging Environment

Consider setting up:

```
Production: https://timeaura.hostmyidea.com
Staging: https://staging.timeaura.hostmyidea.com (for testing)
```

#### 2. CI/CD Pipeline

Suggested workflow:

1. Push to GitHub
2. Automated tests run
3. Build production bundle
4. Deploy to staging
5. Manual approval
6. Deploy to production

#### 3. Monitoring & Alerts

Set up alerts for:

- Server downtime
- High error rates (500+ errors)
- Slow API responses (> 1s)
- High CPU/Memory usage
- Database connection failures

---

### Recommended Packages for Production

```bash
# Security & Validation
npm install helmet express-validator

# Logging
npm install winston morgan

# Rate Limiting
npm install express-rate-limit

# Compression
npm install compression

# Caching
npm install redis
```

---

## Performance Benchmarks

### Current Metrics

| Metric          | Current          | Target   | Status      |
| --------------- | ---------------- | -------- | ----------- |
| Frontend Bundle | 212.93 kB (gzip) | < 150 kB | ⚠️ Optimize |
| API Response    | < 200ms          | < 100ms  | ✅ Good     |
| Database Query  | < 50ms           | < 30ms   | ✅ Good     |
| Page Load       | < 3s             | < 2s     | ⚠️ Monitor  |
| Uptime          | 99.9%            | 99.9%    | ✅ Good     |

---

## Monitoring Dashboard

Recommended tools:

- **Uptime**: UptimeRobot (free tier)
- **Performance**: New Relic or Datadog
- **Errors**: Sentry or Rollbar
- **Analytics**: Google Analytics 4
- **APM**: New Relic APM

---

## Regular Maintenance

### Daily

- [ ] Check error logs
- [ ] Monitor server status
- [ ] Review API metrics

### Weekly

- [ ] Analyze user behavior
- [ ] Check for security updates
- [ ] Review slow queries

### Monthly

- [ ] Update dependencies
- [ ] Optimize slow endpoints
- [ ] Database maintenance
- [ ] Certificate expiry check

### Quarterly

- [ ] Security audit
- [ ] Performance review
- [ ] Capacity planning
- [ ] Disaster recovery test

---

## Quick Optimization Commands

```bash
# Analyze bundle size
npm install -g webpack-bundle-analyzer
# Add to build script and check

# Run ESLint
npm run lint

# Check for vulnerabilities
npm audit

# Check dependency updates
npm outdated

# Clean cache
rm -rf node_modules dist
npm install
npm run build
```

---

**Last Updated**: March 9, 2026
**Status**: Ready for Implementation
