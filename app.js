const express = require('express');
const {projects} = require('./data.json');
const app = express();


app.set('view engine', 'pug');
app.use('/static', express.static('public'));

// rebder index page
app.get('/', (req,res) => {
    res.render('index', {projects});
})

// render about page
app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/project/:id', (req, res, next) => {
  const projectId = req.params.id;
  const project = projects.find(({ id }) => id === +projectId);
  if (project) {
    res.render('project', { project });
  }
});

app.use((req, res, next) => {
  err = new Error('Page not found');
  err.status = 404;
  err.message = `${err.status}`;
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    console.log('No route');
  }
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});