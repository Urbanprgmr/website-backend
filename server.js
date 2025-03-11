const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const cors = require('cors');

const app = express();
const adapter = new FileSync('db.json');
const db = low(adapter);

// Initialize the database
db.defaults({
  profile: { name: 'Your Name', bio: 'Full-Stack Developer', image: '' },
  projects: [],
  blogPosts: [],
  contact: { email: '', socialMedia: {} },
}).write();

app.use(cors());
app.use(express.json());

// Routes for profile
app.get('/api/profile', (req, res) => {
  const profile = db.get('profile').value();
  res.json(profile);
});

app.put('/api/profile', (req, res) => {
  db.set('profile', req.body).write();
  res.json({ message: 'Profile updated successfully' });
});

// Routes for projects
app.get('/api/projects', (req, res) => {
  const projects = db.get('projects').value();
  res.json(projects);
});

app.post('/api/projects', (req, res) => {
  db.get('projects').push(req.body).write();
  res.json({ message: 'Project added successfully' });
});

app.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  db.get('projects').find({ id }).assign(req.body).write();
  res.json({ message: 'Project updated successfully' });
});

app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  db.get('projects').remove({ id }).write();
  res.json({ message: 'Project deleted successfully' });
});

// Routes for blog posts
app.get('/api/blog-posts', (req, res) => {
  const blogPosts = db.get('blogPosts').value();
  res.json(blogPosts);
});

app.post('/api/blog-posts', (req, res) => {
  db.get('blogPosts').push(req.body).write();
  res.json({ message: 'Blog post added successfully' });
});

app.put('/api/blog-posts/:id', (req, res) => {
  const { id } = req.params;
  db.get('blogPosts').find({ id }).assign(req.body).write();
  res.json({ message: 'Blog post updated successfully' });
});

app.delete('/api/blog-posts/:id', (req, res) => {
  const { id } = req.params;
  db.get('blogPosts').remove({ id }).write();
  res.json({ message: 'Blog post deleted successfully' });
});

// Routes for contact
app.get('/api/contact', (req, res) => {
  const contact = db.get('contact').value();
  res.json(contact);
});

app.put('/api/contact', (req, res) => {
  db.set('contact', req.body).write();
  res.json({ message: 'Contact updated successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
