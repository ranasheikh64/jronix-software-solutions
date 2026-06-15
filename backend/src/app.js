const express = require('express');
const cors = require('cors');
const healthRoutes = require('./routes/healthRoutes');
const heroRoutes = require('./routes/heroRoutes');
const orbitRoutes = require('./routes/orbitRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const statRoutes = require('./routes/statRoutes');
const projectRoutes = require('./routes/projectRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const journeyRoutes = require('./routes/journeyRoutes');
const teamRoutes = require('./routes/teamRoutes');
const techRoutes = require('./routes/techRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const careerRoutes = require('./routes/careerRoutes');
const jobRoutes = require('./routes/jobRoutes');
const blogRoutes = require('./routes/blogRoutes');
const contactRoutes = require('./routes/contactRoutes');
const footerRoutes = require('./routes/footerRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/orbit', orbitRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/journey', journeyRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/tech', techRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/footer', footerRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Base Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

module.exports = app;
