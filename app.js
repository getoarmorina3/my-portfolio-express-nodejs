const express = require('express');
const {projects} = require('./data.json');
const app = express();


app.set('view engine', 'pug');
app.use('/static', express.static('public'));

// render index page
app.get('/', (req,res) => {
    res.render('index', {projects});
})

// render about page
app.get('/about', (req, res) => {
    res.render('about');
})

/*
  render projects based on project id and throws error if the project does not exist
*/
app.get('/project/:id', (req, res, next) => {
  const projectId = req.params.id;
  const project = projects.find(({ id }) => id === +projectId);
  if (project) {
    res.render('project', { project });
  } else {
    const err = new Error('Page not found');
    res.status(404).render('page-not-found', { err });
    next(err);
  }
});

// Error 404 
app.use((req, res, next) => {
  err = new Error('Page not found');
  err.status = 404;
  next(err);
});


// Render Error pages based on status code
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).render('page-not-found', { err });
    console.log("Page not found");
  } else {
    res.status(err.status || 500);
    res.render('error', { err });
  }
});

// app listens for port
const server_port = process.env.YOUR_PORT || process.env.PORT || 80;
const server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});
