require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const auth0Strategy = require('passport-auth0');
const massive = require('massive');
const bodyParser = require('body-parser');
// const router = express.Router();
const controller = require('./controller');

const {
    DOMAIN, 
    CLIENTID, 
    CLIENT_SECRET, 
    CALLBACK_URL, 
    SERVER_PORT, 
    CONNECTION_STRING
} = process.env;


const app = express();

//top-level middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true 
}))


app.use( bodyParser.json() );
passport.use( strategy );


app.use(passport.initialize() );
app.use(passport.session() );

//connecting server to database
massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
})

//strategy
passport.use(new auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENTID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function(accessToekn, refreshToken, extraParams, profile, done) {
    // done(null, profile)
    const db = app.get('db')

    const{sub, firstName, lastName, picture } = profile._json;

    db.find_user([sub]).then(response => {
        if (response[0]) {
            done(null, response[0].id)
        } else {
            db.create_user([firstName, lastName, picture, sub]).then( response => {
                done(null, response[0].id)
            })
        }
    })
}))
passport.serializeUser( (id, done) => {
    done(null, id);
})

passport.deserializeUser( (id, done) => {
    // done(null, profile);
    const db = app.get('db');
    db.find_logged_in_user([id]).then(res => {
        done(null, res[0])
    })
});

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/private'
}));

app.get('/auth/me', (req, res) => {
    if(!req.user) {
        res.status(404).send('Not logged in.')
    } else {
        res.status(200).send(req.user)
    }
})

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000/')
}) 


//=====auth endpoints========
app.get('/login', passport.authenticate('auth0', { 
    successRedirect: '/api/auth/setUser', 
    failureRedirect: '/api/auth/login', 
    failureFlash: true 
  }));
  
  app.get('/api/setUser', controller.setUser);
  app.get('/api/authenticated', controller.sendUserToClient);
  app.post('/api/logout', controller.logout);


//=====users endpoints========
app.put('/api/edit/:id', controller.patch);
app.get('/api/list', controller.list);
app.get('/api/search', controller.search);


//=====friends endpoints========
app.get('/api/list', controller.list);
app.post('/api/add', controller.add);
app.post('/api/remove', controller.remove);


//=====recommended friends endpoints========
app.post('/', controller.find);
app.post('/api/add', controller.add);







app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: ${SERVER_PORT}`)
})




//correct

// passport.serializeUser( (user, done) => done(null, { id: user.id, picture: user.picture }) );
// passport.deserializeUser( (obj, done) => {
//   const db = app.get('db');

//   db.users.find_user([ obj.id ]).then( response => {
//     if ( response.length === 1 ) {
//       // User is in the database
//       done(null, response[0]);
//     } else if ( response.length === 0 ) {
//       // User is not in the database - Add them in
//       db.users.add_user([ obj.id, obj.picture ]).then( response => {
//         done(null, response[0]);
//       });
//     }
//   });
// });

// // Routes
// app.use(`/api/auth`, require(`${__dirname}/routes/auth_router.js`));
// app.use(`/api/user`, require(`${__dirname}/routes/user_router.js`));
// app.use(`/api/friend`, require(`${__dirname}/routes/friend_router.js`));
// app.use(`/api/recommended`, require(`${__dirname}/routes/recommended_router.js`));

// // Re-send front-end
// app.get('*', ( req, res, next ) => {
//   res.sendFile( path.resolve( `${__dirname}/../public/build/index.html`) );
// });

// const port = 3000;
// app.listen( port, () => { console.log(`Server listening on port 3000.\nMode: ${process.env.ENV}`); } );


