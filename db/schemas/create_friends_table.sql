CREATE TABLE friends (
  user_id TEXT not null,
  friend_id TEXT not null,
  FOREIGN KEY ( user_id ) REFERENCES users( id ),
  FOREIGN KEY ( friend_id ) REFERENCES users( id )
);