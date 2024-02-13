// Create web server
// Run the server
// Create a route to handle a GET request
// Create a route to handle a POST request
// Create a route to handle a DELETE request
// Create a route to handle a PUT request
// Create a route to handle a PATCH request

// Import the express module
const express = require('express');
// Create an instance of express
const app = express();
// Import the body-parser module
const bodyParser = require('body-parser');
// Import the comments array
const comments = require('./comments');

// Use the body-parser module to parse the body of the request
app.use(bodyParser.json());

// Create a route to handle a GET request
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Create a route to handle a POST request
app.post('/comments', (req, res) => {
  const { username, comment } = req.body;
  const id = comments.length + 1;
  comments.push({ id, username, comment });
  res.json({ id });
});

// Create a route to handle a DELETE request
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  const commentIndex = comments.findIndex(comment => comment.id == id);
  if (commentIndex > -1) {
    comments.splice(commentIndex, 1);
  }
  res.json({ id });
});

// Create a route to handle a PUT request
app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const { username, comment } = req.body;
  const commentIndex = comments.findIndex(comment => comment.id == id);
  if (commentIndex > -1) {
    comments[commentIndex] = { id, username, comment };
  }
  res.json({ id });
});

// Create a route to handle a PATCH request
app.patch('/comments/:id', (req, res) => {
  const id = req.params.id;
  const { username, comment } = req.body;
  const commentIndex = comments.findIndex(comment => comment.id == id);
  if (commentIndex > -1) {
    const previousComment = comments[commentIndex];
    comments[commentIndex] = {
      id,
      username: username || previousComment.username,
      comment: comment || previousComment.comment
    };
  }
  res.json({ id });
});

// Run