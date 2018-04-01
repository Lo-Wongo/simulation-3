
const passport = require('passport');

//=================auththentication controller============

module.exports = {
  setUser: ( req, res, next ) => {
    if ( req.user && !req.session.user ) {
      req.session.user = req.user;
    }

    if ( process.env.ENV === "development" ) {
      res.redirect('http://localhost:3001/auth');
    } else if ( process.env.ENV === "production" ) {
      res.redirect('http://localhost:3000/auth');
    } else {
      res.status(500).send(`The API wasn't started in development or production mode. Please refer to the documentation in the README.`);
    }
  },

  //session
  sendUserToClient: ( req, res, next ) => {
    if ( !req.session.user ) {
      res.status(200).send( false );
    } else {
      res.status(200).send( req.session.user );
    }
  },

  logout: ( req, res, next ) => {
    req.session.destroy();
    res.status(200).send();
  }


//=================user controller============

function numberOfPages( count ) {
    let temp = count > 25 ? Math.ceil( count / 25 ) : 1;
    let availablePages = [];
  
    for( var i = 0; i < temp; i++ ) {
      availablePages.push( i.toString() );
    }
  
    return availablePages;
  }
  
  
    edit: ( req, res, next ) => {
      const db = req.app.get('db');
      const id = req.params.id || null;
      if ( !id ) res.status(500).send('No ID attached to request parameters');
  
      db.users.find_user([ id ]).then( users => {
        if ( users.length > 0 ) {
          const { id, birthday, hair_color, eye_color, hobby, gender, first_name, last_name } = req.body;
          db.users.edit_user([
            id,
            birthday || null,
            hair_color || null,
            eye_color || null,
            hobby || null,
            gender || null,
            first_name || null,
            last_name || null
          ]).then( user => {
            req.session.user = user[0];
            res.status(200).send(user[0]) 
          }).catch( err => console.log(err) );
        } else {
          res.status(500).send(`No user matching id of: ${id}`);
        }
      }).catch( err => console.log(err) );
    },
  
    list: ( req, res, next ) => {
      const db = req.app.get('db');
      const offset = req.query.page * 25;
      const { id } = req.query;
  
      db.users.count_users([ id ]).then( result => {
        const count = result[0].count;
        let availablePages = numberOfPages( count );
  
        db.users.find_users([ id, offset ]).then( users => res.status(200).send({ users, count, availablePages }) )
          .catch( err => console.log(err) );
      }).catch( err => console.log(err) );
    },
  
    search: ( req, res, next ) => {
      const db = req.app.get('db');
      const { filter, name } = req.query;
  
      switch( filter ) {
        case 'first':
          db.users.search_user_first([ name.toLowerCase() ]).then( users => {
            let availablePages = numberOfPages( users.length );
            res.status(200).send({ users, count: users.length, availablePages });
          }).catch( err => console.log(err) );
  
          break;
        case 'last':
          db.users.search_user_last([ name.toLowerCase() ]).then( users => {
            let availablePages = numberOfPages( users.length );
            res.status(200).send({ users, count: users.length, availablePages });
          }).catch( err => console.log( err ) );
  
          break;
      }
    },
  

  //=================friend controller============

  function formatIDs( arr ) {
    let friends = [];
  
    for( var i = 0; i < arr.length; i++ ) {
      friends.push( arr[i].friend_id );
    }
  
    return friends;
  }
  
  
    list: ( req, res, next ) => {
      const db = req.app.get('db');
      const { id } = req.query;
  
      db.friends.find_friends([ id ]).then( ids => {
        const friends = formatIDs( ids );
        res.status(200).send( friends );
      }).catch( err => console.log(err) );
    }
  
    addFriend: ( req, res, next ) => {
      const db = req.app.get('db');
      const { user_id, friend_id } = req.body;
  
      db.friends.add_friend([ user_id, friend_id ]).then( () => {
        db.friends.find_friends([ user_id ]).then( ids => {
          const friends = formatIDs( ids );
          res.status(200).send( friends );
        }).catch( err => console.log(err) );
      }).catch( err => console.log(err) );
    }
  
    removeFriend: ( req, res, next ) => {
      const db = req.app.get('db');
      const { user_id, friend_id } = req.body;
  
      db.friends.remove_friend([ user_id, friend_id ]).then( () => {
        db.friends.find_friends([ user_id ]).then( ids => {
          const friends = formatIDs( ids );
          res.status(200).send( friends );
        }).catch( err => console.log(err) );
      }).catch( err => console.log(err) );
    }
  
  
  
//=================recommended_friends controller============


    find: ( req, res, next ) => {
      const db = req.app.get('db');
      let { user, filter } = req.body;
  
      if ( filter !== 'birthday' ) {
        user[filter] = user[filter];
      }
  
      db.recommended[filter]([ user.id, user[filter] ]).then( users => {
        res.status(200).send(users);
      }).catch( err => console.log( err ) );
    }
  
    addFriend: ( req, res, next ) => { 
      const db = req.app.get('db');
      const { user, filter, friend_id } = req.body;
  
      db.friends.add_friend([ user.id, friend_id ]).then( () => {
        db.recommended[filter]([ user.id, user[filter] ]).then( users => {
          res.status(200).send(users);
        }).catch( err => console.log( err ) );
      }).catch( err => console.log( err ) );
    }
  }
