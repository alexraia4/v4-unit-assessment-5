require('dotenv').config();
const massive = require('massive');
const express = require('express');
const userCtrl = require('./controllers/user.js');
const postCtrl = require('./controllers/posts.js');
const session = require('express-session');




const app = express();

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;



massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(dbInstance => {
    app.set("db", dbInstance);
    console.log("database connected");
}).catch(err => console.log(err));


app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {maxAge: 60000}
}))

//Auth Endpoints
app.post('/api/auth/register', userCtrl.register);
app.post('/api/auth/login', userCtrl.login);
app.get('/api/auth/me', userCtrl.getUser);
app.post('/api/auth/logout', userCtrl.logout);


//Post Endpoints
app.get('/api/posts', postCtrl.readPosts);
app.post('/api/post', postCtrl.createPost);
app.get('/api/post/:id', postCtrl.readPost);
app.delete('/api/post/:id', postCtrl.deletePost)



app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}.`);
  });