// Create web server
// Create web server with Express.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/comments', (req, res) => {
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        }
        res.send(data);
    });
});

app.post('/comments', (req, res) => {
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        }
        const comments = JSON.parse(data);
        const newComment = {
            id: comments.length + 1,
            ...req.body,
        };
        comments.push(newComment);
        fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments, null, 4), (err) => {
            if (err) {
                res.status(500).send('Internal Server Error');
            }
            res.send(newComment);
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// Run the server
// Run the server with the command node comment.js and test the API with Postman or curl.
// Use the GET method to get a list of comments.
// Use the POST method to create a new comment.
// The comments are stored in the comments.json file.


