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
    err.message = `Looks like there went something wrong with the server.`;
    res.render('error', { err });
  }
});

// listens for port 3000 on localhost
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});